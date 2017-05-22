
$(document).ready(function () {
    function sendValues() {
      $( "form" ).submit(function( event ) {
        var customizeSelection = $('form').serializeJSON();
        sessionStorage.setItem('order', JSON.stringify(customizeSelection));
      });
    };
    sendValues()
});
