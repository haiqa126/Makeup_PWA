
var template ="<div class='col mb-5'>\n\
<div class='card h-100'>\n\
    <img class='card-img-top; src='data/img/placeholder.jpg' data-src='data/img/SLUG.jpg' alt=''/>\n\
    <div class='card-body p-4'>\n\
        <div class='text-center'>\n\
            <h5 class='fw-bolder'>NAME</h5>\n\
            <span>Price:</span> <strong>PRICE</strong></li>\n\
            <span>Price:</span> <strong>BRAND</strong></li>\n\
            <p><DESCRIPTION</p>\n\
        </div>\n\
    </div>\n\
<button type='button' class='mdl-button show-modal'>Click me to view this product list of ingredients</button>\n\
  <dialog class='mdl-dialog SLUG'>\n\
    <div class='mdl-dialog__content'>\n\
    <table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'>\n\
    <thead>\n\
      <tr>\n\
        <th class=mdl-data-table__cell--non-numeric'>Material</th>\n\
        <th>Color</th>\n\
        <th>Preservatives</th>\n\
        <th>Fragnance</th>\n\
      </tr>\n\
    </thead>\n\
    <tbody>\n\
      <tr>\n\
        <td class='mdl-data-table__cell--non-numeric'>NAME</td>\n\
        <td>COLOR</td>\n\
        <td>PRESERVATIVE</td>\n\
        <td>FRAGNANCE</td>\n\
      </tr>\n\
    </tbody>\n\
  </table>\n\
   </div>\n\
    <div class='mdl-dialog__actions mdl-dialog__actions--full-width'>\n\
      <button type='button' class='mdl-button close'>Disagree</button>\n\
    </div>\n\
  </dialog>\n\
";

var content = '';
for (var i = 0; i < items.length; i++){
var entry = template.replace(/SLUG/g, items[i].slug)
    .replace(/NAME/g, items[i].name)
    .replace(/PRICE/g, items[i].price)
    .replace(/BRAND/g, items[i].brand)
    .replace(/DESCRIPTION/g, items[i].description)
    .replace(/COLOR/g,items[i].color)
    .replace(/PRESERVATIVE/g,items[i].preservatives)
    .replace(/FRAGNANCE/g,items[i].fragnance);
entry = entry.replace('<a href=\'https:///\'></a>', '-');
content += entry;
};

document.getElementById('content').innerHTML = content;

var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showModalButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});





let imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = function (image) {
image.setAttribute('src', image.getAttribute('data-src'));
image.onload = function () {
    image.removeAttribute('data-src');
};
};

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('sw.js').then((resp) =>{
    console.warn("resp", resp)
    console.log("the service worker did the registering step")
}).catch((e)=>{
    console.log(e)
})
}
else
{
console.error("sw not working")
}

if ('IntersectionObserver' in window) {
var observer = new IntersectionObserver(function (items, observer){
    if (items.isIntersecting){
        loadImages(item.target);
        observer.unobserve(item.target);
    }
});
imagesToLoad.forEach(function (img) {
    loadImages(img);
});

}