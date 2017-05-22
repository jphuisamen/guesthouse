$(document).ready(function () {
function getProductData() {
  var data =  JSON.parse(sessionStorage.getItem("key"));
  $( ".products" ).append(
    `<ul>
      <a href="existing.html"><img src="${data.imagePath}" alt="" /><li><br>${data.PonchoodieName}<br>${data.price}</li></a>
    </ul>`
  );
    function sendValues(event) {
      $( "form" ).submit(function( event ) {
        event.preventDefault();
        var existingData = $('form').serializeJSON();
        Object.assign(existingData, data);
          $.ajax({
            url: "https://formspree.io/karliheine@gmail.com",
            method: "POST",
            data: existingData,
            dataType: "json"
        })
        .done(function() {
          window.location.href="finishedExisting.html";
        });
      });
    };
    sendValues();
};
getProductData();
});
