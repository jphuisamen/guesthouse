
$(document).ready(function () {
    function receiveValues(event) {
        var data = JSON.parse(sessionStorage.getItem('order'));
        $.each( data, function( key, value ) {
            $( ".productOrder" ).append(
              `<div class="productInput">
              <div class="perimeter">${key}:</div>
              <div class="selection">${value}</div>
              </div>`
            );
        });
      }
    receiveValues();

    function sendValues() {
      $( "form" ).submit(function( event ) {
        event.preventDefault();
        var customizeSelection = $('form').serializeJSON();
        var data = JSON.parse(sessionStorage.getItem('order'));
        Object.assign(data, customizeSelection);
          $.ajax({
            url: "https://formspree.io/karliheine@gmail.com",
            method: "POST",
            data: data,
            dataType: "json"
        })
        .done(function() {
          window.location.href="finishedCustom.html";
        });
      });
    };
    sendValues()
  });
