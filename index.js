$(document).ready(function() {
  var button = $('#login');
  var user_id = "7605",
      secret = "/1HwnL1u/DzodLIXmDXYvBtmB7inr/xqKg+F8J8QKVQR7J9pVOg0boH9Lm9eFHyy9h8rfQI7h6W3vdOcL7TWrQ==";
  console.log(sign(getAuthPayload(user_id), secret));
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Quoine-Auth', sign(getAuthPayload(user_id), secret));
    }
  });

  button.click(function(){
    button.text('Logging in ...');
    button.prop('disabled', true);
    $.getJSON("https://sandbox.quoine.com/cors_auth", function(response) {
      console.log(response);
      window.location = "https://beta-stag.quoine.com/app/#/app/direct-auth?token="+response.encrypted
    });
  });

});

function sign(payload, secret){
  var oHeader = {alg: 'HS256', typ: 'JWT'};
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(payload);
  return KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
}

function getAuthPayload(user_id){
  return {
    user_id: user_id,
    path: "/cors_auth",
    nonce: new Date().getTime()
  }
}
