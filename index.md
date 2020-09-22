# Class Mod: Order PS5

### Bookmarker Current Version: 1.0.0
Right now it is hard-coded to attempt to add the PHYSICAL DISC PS5 into your cart. It does not matter what page you're on when you click the bookmark SO LONG as you are at least on Target.com. If you are not on the website it will not work.

### What does it do?
If you click the bookmark while on Target.com you will see a mini window appear that says "Setting up". After 10 seconds one of two things will happen:
  1) Your PS5 will be added to your cart and you'll be redirected to your cart to checkout;
  2) The text will update to "Attempt failed #X"

This will happen automatically every 10 seconds. Consider this a friendly helper in your quest to pre-order a PS5. It skips the whole mess of clicking a button or refreshing the page waiting for "Add to cart" to appear.

### How does this work?
With the magic of Javascript we can recreate what Target.com does when you try to add an item to your cart.

Below you can see an image of a cute cat right? Drag that image into your bookmarks bar. Then navigate to Target.com or the [PS5 Product page](https://www.target.com/p/playstation-5-console/-/A-81114595). Finally, click the bookmark you just added to your bookmarks bar and you should see a red box appear that says "Setting Up"

#### Target PS5 DISC Bookmarklet
[![Target PS5 DISC](https://user-images.githubusercontent.com/6686750/93834445-91f44500-fc41-11ea-8bf7-67acf2f9eda4.png)](javascript:(function()%7B(()%3D%3E%20%7Bvar%20node%20%3D%20document.createElement('div')%3Bnode.id%3D'boomer1'%3Bnode.style.backgroundColor%3D'red'%3Bnode.style.position%3D'fixed'%3Bnode.style.top%3D'0px'%3Bnode.style.height%3D'300px'%3Bnode.style.width%3D'300px'%3Bnode.style.display%3D'flex'%3Bnode.style.alignItems%3D'center'%3Bvar%20text%20%3D%20document.createElement('div')%3Btext.id%3D'boomer2'%3Btext.innerText%3D'DISC%20Setting%20up...'%3Btext.style.fontSize%3D'24px'%3Btext.style.color%3D'%23fff'%3Bnode.appendChild(text)%3Bdocument.body.appendChild(node)%3Bwindow.refreshSeconds%20%3D%2010%3Bwindow.boomerAttempts%20%3D%200%3Bfunction%20attemptAdd(textNode%2C%20upc)%20%7Bvar%20cartUrl%20%3D%20'https%3A%2F%2Fcarts.target.com%2Fweb_checkouts%2Fv1%2Fcart_items%3Ffield_groups%3DCART%252CCART_ITEMS%252CSUMMARY%26key%3Dfeaf228eb2777fd3eee0fd5192ae7107d6224b39'%3Bvar%20cart%20%3D%20%7B%22cart_type%22%3A%22REGULAR%22%2C%22channel_id%22%3A%2210%22%2C%22shopping_context%22%3A%22DIGITAL%22%2C%22cart_item%22%3A%7B%22tcin%22%3Aupc%2C%22quantity%22%3A1%2C%22item_channel_id%22%3A%2210%22%7D%2C%22fulfillment%22%3A%7B%22fulfillment_test_mode%22%3A%22grocery_opu_team_member_test%22%7D%7D%3BtextNode.innerText%20%3D%20'Attempting...'%3Bfetch(cartUrl%2C%20%7B%20method%3A%20'POST'%2C%20mode%3A%20'cors'%2C%20credentials%3A%20'include'%2C%20headers%3A%20%7B%20'Content-Type'%3A%20'application%2Fjson'%20%7D%2C%20body%3A%20JSON.stringify(cart)%20%7D).then(response%20%3D%3E%20%7Bif%20(response.status%20%3D%3D%20200%20%7C%7C%20response.status%20%3D%3D%20201)%20%7Breturn%20response%3B%7D%20else%20%7Bwindow.boomerAttempts%2B%2B%3BtextNode.innerText%20%3D%20'DISC%20Failed...%20Attempt%20%23'%20%2B%20window.boomerAttempts%3Breturn%20false%3B%7D%7D).then(response%20%3D%3E%20%7Bif%20(!response)%20return%3Bwindow.location.replace('https%3A%2F%2Fwww.target.com%2Fco-cart')%3B%7D)%3B%7DsetInterval(()%20%3D%3E%20%7Bvar%20PS5_UPC%20%3D%20'81114595'%3BattemptAdd(text%2C%20PS5_UPC)%3B%7D%2C%20window.refreshSeconds%20*%201000)%3B%7D)()%7D)())

#### Target PS5 DIGITAL Bookmarklet
[![Target PS5 DIGITAL](https://user-images.githubusercontent.com/6686750/93834445-91f44500-fc41-11ea-8bf7-67acf2f9eda4.png)](javascript:(function()%7B(()%3D%3E%20%7Bvar%20node%20%3D%20document.createElement('div')%3Bnode.id%3D'boomer1'%3Bnode.style.backgroundColor%3D'red'%3Bnode.style.position%3D'fixed'%3Bnode.style.top%3D'0px'%3Bnode.style.height%3D'300px'%3Bnode.style.width%3D'300px'%3Bnode.style.display%3D'flex'%3Bnode.style.alignItems%3D'center'%3Bvar%20text%20%3D%20document.createElement('div')%3Btext.id%3D'boomer2'%3Btext.innerText%3D'DIGITAL%20Setting%20up...'%3Btext.style.fontSize%3D'24px'%3Btext.style.color%3D'%23fff'%3Bnode.appendChild(text)%3Bdocument.body.appendChild(node)%3Bwindow.refreshSeconds%20%3D%2010%3Bwindow.boomerAttempts%20%3D%200%3Bfunction%20attemptAdd(textNode%2C%20upc)%20%7Bvar%20cartUrl%20%3D%20'https%3A%2F%2Fcarts.target.com%2Fweb_checkouts%2Fv1%2Fcart_items%3Ffield_groups%3DCART%252CCART_ITEMS%252CSUMMARY%26key%3Dfeaf228eb2777fd3eee0fd5192ae7107d6224b39'%3Bvar%20cart%20%3D%20%7B%22cart_type%22%3A%22REGULAR%22%2C%22channel_id%22%3A%2210%22%2C%22shopping_context%22%3A%22DIGITAL%22%2C%22cart_item%22%3A%7B%22tcin%22%3Aupc%2C%22quantity%22%3A1%2C%22item_channel_id%22%3A%2210%22%7D%2C%22fulfillment%22%3A%7B%22fulfillment_test_mode%22%3A%22grocery_opu_team_member_test%22%7D%7D%3BtextNode.innerText%20%3D%20'Attempting...'%3Bfetch(cartUrl%2C%20%7B%20method%3A%20'POST'%2C%20mode%3A%20'cors'%2C%20credentials%3A%20'include'%2C%20headers%3A%20%7B%20'Content-Type'%3A%20'application%2Fjson'%20%7D%2C%20body%3A%20JSON.stringify(cart)%20%7D).then(response%20%3D%3E%20%7Bif%20(response.status%20%3D%3D%20200%20%7C%7C%20response.status%20%3D%3D%20201)%20%7Breturn%20response%3B%7D%20else%20%7Bwindow.boomerAttempts%2B%2B%3BtextNode.innerText%20%3D%20'DIGITAL%20Failed...%20Attempt%20%23'%20%2B%20window.boomerAttempts%3Breturn%20false%3B%7D%7D).then(response%20%3D%3E%20%7Bif%20(!response)%20return%3Bwindow.location.replace('https%3A%2F%2Fwww.target.com%2Fco-cart')%3B%7D)%3B%7DsetInterval(()%20%3D%3E%20%7Bvar%20PS5_UPC%20%3D%20'81114596'%3BattemptAdd(text%2C%20PS5_UPC)%3B%7D%2C%20window.refreshSeconds%20*%201000)%3B%7D)()%7D)())


### Can we trust you
Never trust anonymous people online. That said as long as you are only doing this through my official Twitter (@pixxlated) or Github (manbearpixel) then you are safe. The source code is below so you can take that as you wish and inspect it yourself.

There is always a risk that someone MIGHT impersonate me and tell you to use THEIR bookmark instead which could cause harm. I am not responsible for these actions.

### Why does your code look like shit?
I spent 10 minutes making this. Don't judge me.

### I need help
I probably can't help you but if you DM me on Twitter (@pixxlated) I can try.


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
