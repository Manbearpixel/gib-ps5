# Class Mod: Order PS5

### Current Version: 1
Right now it is hard-coded to attempt to add the PHYSICAL DISC PS5 into your cart. It does not matter what page you're on when you click the bookmark SO LONG as you are at least on Target.com. If you are not on the website it will not work.

### What does it do?
If you click the bookmark while on Target.com you will see a mini window appear that says "Setting up". After 10 seconds one of two things will happen:
  1) Your PS5 will be added to your cart and you'll be redirected to your cart to checkout;
  2) The text will update to "Attempt failed #X"

This will happen automatically every 10 seconds. Consider this a friendly helper in your quest to pre-order a PS5. It skips the whole mess of clicking a button or refreshing the page waiting for "Add to cart" to appear.

### How does this work?
With the magic of Javascript we can recreate what Target.com does when you try to add an item to your cart.

Below you can see an image of a cute cat right? Drag that image into your bookmarks bar. Then navigate to Target.com or the [PS5 Product page](https://www.target.com/p/playstation-5-console/-/A-81114595). Finally, click the bookmark you just added to your bookmarks bar and you should see a red box appear that says "Setting Up"

[![Target PS5 DISC](https://user-images.githubusercontent.com/6686750/93834445-91f44500-fc41-11ea-8bf7-67acf2f9eda4.png)](javascript:(function()%7Balert('nice')%7D)())

[![Creative Commons License](http://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-nd/3.0/)

### Can we trust you
Never trust anonymous people online. That said as long as you are only doing this through my official Twitter (@pixxlated) or Github (manbearpixel) then you are safe. The source code is below so you can take that as you wish and inspect it yourself.

There is always a risk that someone MIGHT impersonate me and tell you to use THEIR bookmark instead which could cause harm. I am not responsible for these actions.

### Why does your code look like shit?
I spent 10 minutes making this. Don't judge me.

### Source
```
(()=> {
var node = document.createElement('div');
node.id='boomer1';
node.style.backgroundColor='red';
node.style.position='fixed';
node.style.top='0px';
node.style.height='300px';
node.style.width='300px';
node.style.display='flex';
node.style.alignItems='center';

var text = document.createElement('div');
text.id='boomer2';
text.innerText='Setting up...';
text.style.fontSize='24px';
text.style.color='#fff';

node.appendChild(text);
document.body.appendChild(node);

window.refreshSeconds = 10;
window.boomerAttempts = 0;

function attemptAdd(textNode, upc) {
   var cartUrl = 'https://carts.target.com/web_checkouts/v1/cart_items?field_groups=CART%2CCART_ITEMS%2CSUMMARY&key=feaf228eb2777fd3eee0fd5192ae7107d6224b39';
   var cart = {"cart_type":"REGULAR","channel_id":"10","shopping_context":"DIGITAL","cart_item":{"tcin":upc,"quantity":1,"item_channel_id":"10"},"fulfillment":{"fulfillment_test_mode":"grocery_opu_team_member_test"}};
   
   textNode.innerText = 'Attempting...';

   fetch(cartUrl, { method: 'POST', mode: 'cors', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cart) })
   .then(response => {
     if (response.status == 200 || response.status == 201) {
       return response;
     } else {
       window.boomerAttempts++;
       textNode.innerText = 'Failed... Attempt #' + window.boomerAttempts;
       return false;
     }
   }).then(response => {
     if (!response) return;
     window.location.replace('https://www.target.com/co-cart');
   });
}

setInterval(() => {
  var PS5_UPC = '81114595';
  attemptAdd(text, PS5_UPC);
}, window.refreshSeconds * 1000);

})()
```
