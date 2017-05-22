$(document).ready(function () {
  $('.products ul a').click(function(e) {
    var el = $(e.currentTarget);
    var imagePath =  el.find('img').attr('src');
    var nameID = el.find('.name').text();
    var priceID = el.find('.price').text();
    var productObj = {
      imagePath : imagePath,
      PonchoodieName : nameID,
      price : priceID
    }
    var x =  sessionStorage.setItem("key", JSON.stringify(productObj));
  });
});
