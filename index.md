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

[![Target PS5 DISC](https://user-images.githubusercontent.com/6686750/93834445-91f44500-fc41-11ea-8bf7-67acf2f9eda4.png)](javascript:(function()%7B(()%3D%3E%7Bvar%20e%3Ddocument.createElement(%22div%22)%3Be.id%3D%22boomer1%22%2Ce.style.backgroundColor%3D%22red%22%2Ce.style.position%3D%22fixed%22%2Ce.style.top%3D%220px%22%2Ce.style.height%3D%22300px%22%2Ce.style.width%3D%22300px%22%2Ce.style.display%3D%22flex%22%2Ce.style.alignItems%3D%22center%22%3Bvar%20t%3Ddocument.createElement(%22div%22)%3Bt.id%3D%22boomer2%22%2Ct.innerText%3D%22Setting%20up...%22%2Ct.style.fontSize%3D%2224px%22%2Ct.style.color%3D%22%23fff%22%2Ce.appendChild(t)%2Cdocument.body.appendChild(e)%2Cwindow.refreshSeconds%3D10%2Cwindow.boomerAttempts%3D0%2CsetInterval(()%3D%3E%7B!function(e%2Ct)%7Bvar%20n%3D%7Bcart_type%3A%22REGULAR%22%2Cchannel_id%3A%2210%22%2Cshopping_context%3A%22DIGITAL%22%2Ccart_item%3A%7Btcin%3At%2Cquantity%3A1%2Citem_channel_id%3A%2210%22%7D%2Cfulfillment%3A%7Bfulfillment_test_mode%3A%22grocery_opu_team_member_test%22%7D%7D%3Be.innerText%3D%22Attempting...%22%2Cfetch(%22https%3A%2F%2Fcarts.target.com%2Fweb_checkouts%2Fv1%2Fcart_items%3Ffield_groups%3DCART%252CCART_ITEMS%252CSUMMARY%26key%3Dfeaf228eb2777fd3eee0fd5192ae7107d6224b39%22%2C%7Bmethod%3A%22POST%22%2Cmode%3A%22cors%22%2Ccredentials%3A%22include%22%2Cheaders%3A%7B%22Content-Type%22%3A%22application%2Fjson%22%7D%2Cbody%3AJSON.stringify(n)%7D).then(t%3D%3E200%3D%3Dt.status%7C%7C201%3D%3Dt.status%3Ft%3A(window.boomerAttempts%2B%2B%2Ce.innerText%3D%22Failed...%20Attempt%20%23%22%2Bwindow.boomerAttempts%2C!1)).then(e%3D%3E%7Be%26%26window.location.replace(%22https%3A%2F%2Fwww.target.com%2Fco-cart%22)%7D)%7D(t%2C%2281114595%22)%7D%2C1e3*window.refreshSeconds)%7D)()%7D)())

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
