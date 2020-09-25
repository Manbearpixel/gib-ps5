# Class Mod: Order PS5

### Bookmarker Current Version: 2.2.0
**New Version!**

##### Auto Detection
Detects current product page you're on and will configure itself to MONITOR that specific product! You can use this with PS5 Physical, Digital, Accessories, and Games! You can even monitor the pre-order for new toasters. If it can't detect the product page you're on it will let you know.

##### Sound Alerts!
You can now enable alerts! If the product is added to your cart it will loop a sound effect to get your attention instead of redirecting you to your target cart. You'll need to manually click "Continue" to head to the checkout process. If alerts are disabled, it will just redirect you to your cart. We can't have both worlds because the script is lost during a redirect.

##### GameStop Support!
Now supports GameStop product flow! Along with Target, you can now monitor a GameStop product page and it will attempt to add it to your cart every 60 seconds.

###### **Important Note!** GameStop does have some bot detection on their website. When this script detect this, it'll notify you via sound alert that you'll need to click around in order to prove you're not a robot! It will then restart the watcher for you after a minute.

### What does it do?
If you click the bookmark while on a supported retailer (see below) you will see a mini window appear in the top left corner of the page. Every 30-60 seconds, it will attempt to **AUTOMATICALLY ADD** the product you are currently looking at TO YOUR CART and then Alert/Redirect you to your checkout process. This SPEEDS up the process of waiting for page refreshes, and buttons loading by DIRECTLY communicating with the retailer that you are intending to purchase the item.

### Supported Retailers
  - Target.com
  - GameStop.com

### How does this work?
With a little magic this bookmark script essentially acts like a "pre-order" or "add to cart" button itself. It requires little to **NO** input from you other than setting it up and checking out. This script does NOT check you out automatically as it does not want to be held responsible for missed orders or your personal information.

### Ready to install?
  1) See this cute image of a cat below? Drag that image into your bookmarks bar;
  2) Navigate to a supported retailer website;
  3) Go to a specific product you would like to pre-order (examples below);
  4) Click the "Gib Product Watcher" bookmark you added to your browser earlier;
  5) In a few moments, you should see a mini window appear on the top left of your screen;
  6) ???
  7) Hopefully profit with your product being added to your cart!

#### Target + GameStop Bookmarklet
[![Gib Product Watcher](https://user-images.githubusercontent.com/6686750/93834445-91f44500-fc41-11ea-8bf7-67acf2f9eda4.png)](javascript:(function()%7Bfetch('https%3A%2F%2Fraw.githubusercontent.com%2FManbearpixel%2Fgib-ps5%2Fmaster%2Fsource.js'%2C%20%7B%20method%3A%20'GET'%2C%20cache%3A%20'no-store'%20%7D).then(function(response)%20%7Breturn%20response.text()%3B%7D).then(function(response)%20%7Bvar%20gib%20%3D%20document.createElement('script')%3Bgib.type%20%3D%20'text%2Fjavascript'%3Bgib.textContent%20%3D%20response%3Bdocument.head.appendChild(gib)%3Bvar%20sc%20%3D%20document.createElement('script')%3Bsc.type%20%3D%20'text%2Fjavascript'%3Bsc.textContent%20%3D%20'var%20sc_project%3D12398400%3Bvar%20sc_invisible%3D1%3B%20var%20sc_security%3D%22c60e3dd5%22%3Bvar%20sc_https%3D1'%3Bdocument.head.appendChild(sc)%3Bvar%20sc2%20%3D%20document.createElement('script')%3Bsc2.type%20%3D%20'text%2Fjavascript'%3Bsc2.src%20%3D%20'https%3A%2F%2Fwww.statcounter.com%2Fcounter%2Fcounter.js'%3Bdocument.head.appendChild(sc2)%3Bvar%20img%20%3D%20document.createElement('img')%3Bimg.src%20%3D%20'https%3A%2F%2Fc.statcounter.com%2F12398400%2F0%2Fc60e3dd5%2F1%2F'%3Bdocument.body.appendChild(img)%3BsetTimeout(window.gibinit%2C%201000)%3B%7D)%7D)())

###### Drag this image and drop it in your bookmarks bar!

#### Product Links
  - [Target PS5 Product page](https://www.target.com/p/playstation-5-console/-/A-81114595)
  - [GameStop PS5 Product page](https://www.gamestop.com/video-games/playstation-5/consoles/products/playstation-5/11108140.html)
  - [GameStop PS5 BUNDLE](https://www.gamestop.com/video-games/playstation-5/consoles/products/playstation-5-starter-system-bundle---ships-by-11-30-2020/B225169D.html)

### Can we trust you
Never trust anonymous people online. That said as long as you are only doing this through my official Twitter (@pixxlated) or Github (manbearpixel) then you are safe. The source code is below so you can take that as you wish and inspect it yourself.

There is always a risk that someone MIGHT impersonate me and tell you to use THEIR bookmark instead which could cause harm. I am not responsible for these actions.

### Does this work on any product?
As of 1.1.0, yes. As long as you are on an ACTUAL PRODUCT PAGE on TARGET.COM it will work. If you are not on a product page when you click the bookmark it will FAIL.

### It isn't working
Try refreshing the page and clicking the bookmark again. Target likes to cache things.

### Can I monitor more than one product?
Yes, BUT you must open a NEW window (or tab) and monitor that separately.

### I need help
I probably can't help you but if you DM me on Twitter (@pixxlated) I can try.

### Source
Moved it [here](https://raw.githubusercontent.com/Manbearpixel/gib-ps5/master/source.js).
