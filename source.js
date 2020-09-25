window.gibinit = function() {
  if (typeof window.gibSettings != 'undefined') {
    console.warn('GIB Already exists... Exiting');
    return false;
  }

  function detectRetailer() {
    var host = location.host || location.hostname;
    if (!!host.match(/gamestop/ig)) return 'gamestop';
    if (!!host.match(/target/ig)) return 'target';
    if (!!host.match(/bestbuy/ig)) return 'bestbuy';
    if (!!host.match(/amazon/ig)) return 'amazon';
  }

  function gamestopProductMeta() {
    try {
      var meta = document.querySelector('button.add-to-cart').getAttribute('data-gtmdata');
      var product = JSON.parse(meta);
      return product;
    } catch(err) {
      console.warn(err);
      return null;
    }
  }

  function detectUPC() {
    if (window.gibRetailer == 'target') {
      var upcMatches = location.pathname.match(/(A-\d{8})/);
      var onlyUpc = location.pathname.match(/(\d{8})/);
      if (upcMatches) {
        var upc1 = upcMatches[0].split('-')[1];
        var upc2 = onlyUpc[0];
        if (upc1 == upc2) return upc1;
      }
    } else if (window.gibRetailer == 'gamestop') {
      var meta = gamestopProductMeta();
      if (!meta) return null;
      return meta.productInfo.sku;
    }
    return null;
  }

  function detectProductName() {
    if (window.gibRetailer == 'target') {
      var productHeading = document.querySelector('h1');
      if (!productHeading) return 'UNKNOWN PRODUCT';
      return productHeading.textContent;
    } else if (window.gibRetailer == 'gamestop') {
      var meta = gamestopProductMeta();
      if (!meta) return '';
      return meta.productInfo.name;
    }
    return '';
  }

  function target_addToCart(DEBUG_NODE, UPC) {
      var cartUrl = 'https://carts.target.com/web_checkouts/v1/cart_items?field_groups=CART%2CCART_ITEMS%2CSUMMARY&key=feaf228eb2777fd3eee0fd5192ae7107d6224b39';
      var cart = {"cart_type":"REGULAR","channel_id":"10","shopping_context":"DIGITAL","cart_item":{"tcin":UPC,"quantity":1,"item_channel_id":"10"},"fulfillment":{"fulfillment_test_mode":"grocery_opu_team_member_test"}};
      
      DEBUG_NODE.innerText = 'Attempting Cart Add...';

      fetch(cartUrl, { method: 'POST', mode: 'cors', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cart) })
      .then(function(response) {
        window.gibAttempts++;
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status == 401) {
          return 'AUTH';
        }
        return false;
      }).then(function(response) {
        if (!response) {
          DEBUG_NODE.innerText = 'Status: FAILED... Attempt #' + window.gibAttempts;
          return false;
        }

        if (response == 'AUTH') {
          DEBUG_NODE.innerText = 'CRITICAL ERROR... Refresh this page and reactivate product watcher to continue...';
          window.gibWatcherDisable(DEBUG_NODE);
          window.gibSoundLoopStart(true);
          setTimeout(function() {
            window.gibSoundLoopEnd();
          }, (10 * 1000));
          return false;
        }

        if (window.gibSettings.alerts) {
          window.gibWatcherDisable();
          DEBUG_NODE.innerText = 'THIS PRODUCT IS IN YOUR CART!! CLICK CONTINUE!!';
          document.getElementById('gib--continue').style.display = 'block';
          document.getElementById('gib--settings').style.display = 'none';
          window.gibSoundLoopStart();
        } else {
          window.gibWatcherDisable(DEBUG_NODE);
          window.location.replace('https://www.target.com/co-review');
        }
      });
  }

  function gamestop_addToCart(DEBUG_NODE, UPC) {
    var cartUrl = 'https://www.gamestop.com/on/demandware.store/Sites-gamestop-us-Site/default/Cart-AddProduct?redesignFlag=true';
    var cart = 'pid=' + UPC + '&quantity=1&pageSpecified=PLP&recentCheck=true&addToCartSource=RecentlyViewed';

    var BUILD_WARNING = function() {
      if (window.gibVerified >= 0) {
        return 'VERIFIED! Will restart watcher in ' + window.gibRetryCountdownNow + ' minute(s)';
      } else if (window.gibVerified > -5) {
        return 'ALMOST VERIFIED! Click this page a few more times! Will restart watcher in ' + window.gibRetryCountdownNow + ' minute(s)';
      }

      return "WARNING! Click ANYWHERE to prove you're not a bot! Will restart watcher in " + window.gibRetryCountdownNow + ' minute(s)';
    }

    if (window.gibRetryCountdownNow > 0) {
      window.gibRetryCountdownNow--;
      if (window.gibVerified <= -5) {
        window.gibSoundLoopStart(true);
        setTimeout(function() {
          window.gibSoundLoopEnd();
        }, (10 * 1000));
      }

      if (window.gibRetryCountdownNow > 0) {
        DEBUG_NODE.innerText = BUILD_WARNING();
      }
      return;
    }

    DEBUG_NODE.innerText = 'Attempting Cart Add...';

    fetch(cartUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: cart
    })
    .then(function(response) {
      window.gibAttempts++;
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status == 401) {
        return 'AUTH';
      } else if (response.status == 403) {
        return 'BOT';
      }
      return false;
    })
    .then(function(response) {
      if (!response) {
        DEBUG_NODE.innerText = 'Status: FAILED... Attempt #' + window.gibAttempts;
        return false;
      }

      if (response == 'AUTH') {
        DEBUG_NODE.innerText = 'CRITICAL ERROR... Refresh this page and reactivate product watcher to continue...';
        window.gibWatcherDisable(DEBUG_NODE);
        window.gibSoundLoopStart(true);
        setTimeout(function() {
          window.gibSoundLoopEnd();
        }, (10 * 1000));
        return false;
      }

      if (response == 'BOT') {
        window.gibRetryCountdownNow = window.gibRetryCountdownMAX;
        window.gibVerified = -5;
        DEBUG_NODE.innerText = BUILD_WARNING();
        addEventListener('click', window.gibVerifyUser, false);
        window.gibSoundLoopStart(true);
        setTimeout(function() {
          window.gibSoundLoopEnd();
        }, (10 * 1000));
        return false;
      }

      if (response.error) {
        var errorMsg = response.message;
        console.warn('Unable to add... %s', errorMsg);
        DEBUG_NODE.innerText = 'Status: FAILED... Attempt #' + window.gibAttempts;
        return false;
      }

      if (window.gibSettings.alerts) {
        window.gibWatcherDisable();
        DEBUG_NODE.innerText = 'THIS PRODUCT IS IN YOUR CART!! CLICK CONTINUE!!';
        document.getElementById('gib--continue').style.display = 'block';
        document.getElementById('gib--settings').style.display = 'none';
        window.gibSoundLoopStart();
      } else {
        window.gibWatcherDisable(DEBUG_NODE);
        window.location.replace('https://www.gamestop.com/checkout');
      }
    });
  }

  function loadSound() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://flukeout.github.io/simple-sounds/sounds/dead.wav', true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      window.gibSoundContext.decodeAudioData(request.response, function(nb) {
        window.gibSoundBuffer = nb;
        window.gibSoundLoaded = true;
        console.log('Gib sound effect loaded');
        window.gibSoundTrigger();
      });
    };
    request.send();
  }

  function triggerSound() {
    if (!window.gibSoundLoaded) {
      console.error('GIB Sound Effect not loaded!');
      return false;
    }

    var soundVolume = 1;
    var source = window.gibSoundContext.createBufferSource();
    source.buffer = window.gibSoundBuffer;
    var volume = window.gibSoundContext.createGain();
    volume.gain.value = soundVolume;
    volume.connect(window.gibSoundContext.destination);
    source.connect(volume);
    source.start(0);
    return true;
  }

  function startSoundLoop(override) {
    if (typeof override == 'undefined') override = false;

    if (!window.gibSoundLoaded && !override) {
      console.error('GIB Sound Effect not loaded!');
      return false;
    }

    var soundVolume = 1;
    var source = window.gibSoundContext.createBufferSource();
    source.buffer = window.gibSoundBuffer;
    var volume = window.gibSoundContext.createGain();
    volume.gain.value = soundVolume;
    volume.connect(window.gibSoundContext.destination);
    source.connect(volume);
    source.loop = true;
    source.start(0);
    window.gibSoundLoopSource = source;
    return true;
  }

  function endSoundLoop() {
    if (!window.gibSoundLoopSource) {
      console.error('GIB sound has no source');
      return false;
    }

    window.gibSoundLoopSource.stop();
    window.gibSoundLoopSource = null;
    return true;
  }

  function startWatcher(GIB, DEBUG_NODE) {
    if (!window.gibSupportedSites.includes(window.gibRetailer)) {
      DEBUG_NODE.innerText = 'Retailer not supported! This tool does not currently support ' + window.gibRetailer + '. Follow @pixxlated for the latest supported retailers.';
      window.gibWatcherDisable();
      window.gibSoundLoopStart(true);
      setTimeout(function() {
        window.gibSoundLoopEnd();
      }, (10 * 1000));
      return false;
    }

    if (!GIB.PRODUCT_UPC || GIB.PRODUCT_UPC.length == 0) {
      DEBUG_NODE.innerText = 'CRITICAL ERROR, CANNOT DETERMINE PRODUCE UPC. WATCHER FAILED.';
      window.gibWatcherDisable();
      window.gibSoundLoopStart(true);
      setTimeout(function() {
        window.gibSoundLoopEnd();
      }, (10 * 1000));
      return false;
    }

    DEBUG_NODE.innerText = 'Starting Watcher';

    clearInterval(window.gibTimerId);
    window.gibSettings.enabled = true;
    window.gibAttemptSecondsLeft = GIB.refreshSeconds;

    setTimeout(function() {
      GIB.addToCart(DEBUG_NODE, GIB.PRODUCT_UPC);

      window.gibTimerId = setInterval(function() {
        if (!window.gibSettings.enabled) {
          console.log('GIB Disabled...');
          return;
        }

        window.gibAttemptSecondsLeft--;

        if (window.gibRetryCountdownNow <= 0) {
          DEBUG_NODE.innerText = 'Attempt#' + window.gibAttempts + '... Retrying in ' + window.gibAttemptSecondsLeft + ' second(s)...';
        }

        if (window.gibAttemptSecondsLeft <= 0) {
          window.gibAttemptSecondsLeft = GIB.refreshSeconds;
          GIB.addToCart(DEBUG_NODE, GIB.PRODUCT_UPC);
        }
      }, 1000);
    }, 1000);
  }

  function stopWatcher(DEBUG_NODE) {
    if (DEBUG_NODE) DEBUG_NODE.innerText = 'Stopping Watcher';
    window.gibSettings.enabled = false;
    clearInterval(window.gibTimerId);
    if (DEBUG_NODE) DEBUG_NODE.innerText = 'Watcher DISABLED';
  }

  window.gibSupportedSites    = ['target', 'gamestop'];
  window.gibSoundContext      = new AudioContext();
  window.gibSoundLoopSource   = null;
  window.gibSoundBuffer       = null;
  window.gibSoundLoaded       = false;

  window.gibAttemptSecondsLeft  = 0;
  window.gibRetryCountdownMAX   = 2; // minutes
  window.gibRetryCountdownNow   = 0;

  window.gibRetailer  = detectRetailer();
  window.gibAttempts  = 0;
  window.gibTimerId   = null;
  window.gibVerified  = -5;
  window.gibSettings  = {
    alerts: true,
    enabled: true
  };

  var gib = {
    GIB_VERSION:    '2.2.3',
    PRODUCT_UPC:    detectUPC(),
    PRODUCT_TITLE:  detectProductName(),

    refreshSeconds: window.gibRetailer == 'gamestop' ? 60 : 10,

    createElement: function(tag, id, styles) {
      var node = document.createElement(tag);
      if (id) node.id = id;
      if (!styles) return node;
      for (var style in styles) {
        node.style[style] = styles[style];
      }
      return node;
    },

    insertStyles: function(styles) {
      var sheet = document.createElement('style');
      sheet.type = 'text/css';
      sheet.innerText = styles;
      document.head.appendChild(sheet);
    },

    addToCart: function(DEBUG_NODE, UPC) {
      if (window.gibRetailer == 'target') {
        window.gibAddToCartTarget(DEBUG_NODE, UPC);
      } else if (window.gibRetailer == 'gamestop') {
        window.gibAddToCartGameStop(DEBUG_NODE, UPC);
      }
    },

    createSettings: function(options) {
      var list = this.createElement('ul', 'gib--settings');
      for (var id in options) {
        var option = options[id];
        var optionWrapper = this.createElement('li', null, {
          marginBottom: '20px'
        });

        var toggle = this.createElement('input');
        toggle.type = 'checkbox';
        toggle.id = option['id'];
        toggle.onclick = option['click'];
        toggle.checked = option['checked'];

        var label = this.createElement('label');
        label.htmlFor = option['id'];

        var span = this.createElement('span', null, {
          color: '#fff',
          paddingLeft: '7px'
        });
        span.innerText = option['label'];

        label.appendChild(toggle);
        label.appendChild(span);
        optionWrapper.appendChild(label);
        list.appendChild(optionWrapper);
      }
      return list;
    }
  };

  var gibStyles = "#gib input[type='checkbox'] { cursor: pointer; position: relative; } #gib input[type='checkbox']::before { content: ''; height: 25px; width: 25px; background-color: #fff; left: -10px; top: -6px; position: absolute; border-radius: 50%; } #gib input[type='checkbox']:checked::after { content: ''; height: 19px; width: 19px; background-color: #4face0; position: absolute; top: -3px; left: -7px; border-radius: 50%; }";

  var wrapper = gib.createElement('div', 'gib', {
    backgroundColor: window.gibRetailer == 'target' ? 'rgba(255,0,0,0.9)' : 'rgba(0,0,0,0.9)',
    position: 'fixed',
    top: '0px',
    zIndex: 99999,
    minHeight: '300px',
    width: '300px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '0 0 25% 0'
  });

  var version = gib.createElement('span', 'gib--version', {
    position: 'absolute',
    top: '7px',
    right: '7px',
    color: '#fff',
    fontSize: '12px'
  });
  version.innerText = 'gib version: ' + gib.GIB_VERSION;
  wrapper.appendChild(version);

  var title = gib.createElement('h1', 'gib--title', {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '15px',
    marginTop: '15px'
  });
  title.innerText = gib.PRODUCT_TITLE;
  wrapper.appendChild(title);

  var continueButton = gib.createElement('button', 'gib--continue', {
    backgroundColor: '#fff',
    padding: '10px 20px',
    fontSize: '24px',
    borderRadius: '4px',
    display: 'none'
  });
  continueButton.innerText = 'CONTINUE';
  continueButton.onclick = function() {
    if (window.gibRetailer == 'target') {
      window.location.replace('https://www.target.com/co-review');
    } else if (window.gibRetailer == 'gamestop') {
      window.location.replace('https://www.gamestop.com/checkout');
    }
  };
  wrapper.appendChild(continueButton);

  var debug = gib.createElement('div', 'gib--debug', {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '30px'
  });
  debug.innerText = 'Setting up DISC Watcher';
  wrapper.appendChild(debug);

  var gibOptions = [
    {
      id: 'gibEnabled',
      label: 'Gib Watcher',
      checked: true,
      click: function(event) {
        var status = !window.gibSettings.enabled;
        window.gibSettings.enabled = status;
        event.target.checked = status;
        if (status) {
          startWatcher(gib, debug);
        } else {
          stopWatcher(debug);
        }
        console.log(window.gibSettings)
      }
    },
    {
      id: 'gibSoundAlerts',
      label: 'Gib Sound Alerts',
      checked: true,
      click: function(event) {
        var status = !window.gibSettings.alerts;
        window.gibSettings.alerts = status;
        event.target.checked = status;
        if (status) window.gibSoundTrigger();
        console.log(window.gibSettings);
      }
    }
  ];
  var settingsNode = gib.createSettings(gibOptions);
  wrapper.appendChild(settingsNode);

  gib.insertStyles(gibStyles);
  document.body.appendChild(wrapper);

  loadSound();
  startWatcher(gib, debug);

  window.gibAddToCartTarget = target_addToCart;
  window.gibAddToCartGameStop = gamestop_addToCart;

  window.gibWatcherEnable = startWatcher;
  window.gibWatcherDisable = stopWatcher;

  window.gibSoundTrigger = triggerSound;
  window.gibSoundLoopStart = startSoundLoop;
  window.gibSoundLoopEnd = endSoundLoop;

  window.gibVerifyUser = function() {
    window.gibVerified++;
    console.log('Verified user %i', window.gibVerified);
    if (window.gibVerified < 0) {
      document.getElementById('gib--debug').innerText = 'ALMOST VERIFIED! Click this page a few more times! Will retry in ' + window.gibRetryCountdownNow + ' minute(s)';
      return;
    }

    document.getElementById('gib--debug').innerText = 'VERIFIED! Will restart watcher in ' + window.gibRetryCountdownNow + ' minute(s)';
    removeEventListener('click', window.gibVerifyUser, false);
  }
}
