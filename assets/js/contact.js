$(document).ready(function () {
    function sendValues(event) {
      // event.preventDefault();
      $( "form" ).submit(function( event ) {
        event.preventDefault();
        var existingData = $('form').serializeJSON();
          $.ajax({
            url: "https://formspree.io/jphuisamen@gmail.com",
            method: "POST",
            data: existingData,
            dataType: "json"
        })
        .done(function() {
          window.location.href="mailsent.html";
        });
      });
    };
    sendValues();
});
