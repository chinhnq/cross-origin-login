$(document).ready(function() {
  var button = $('#login');
  var quoineHost = "https://sandbox.quoine.com",
      jbitsHost = "https://trade.jbits.jp";
  var userId = "7605",
      secret = "/1HwnL1u/DzodLIXmDXYvBtmB7inr/xqKg+F8J8QKVQR7J9pVOg0boH9Lm9eFHyy9h8rfQI7h6W3vdOcL7TWrQ==";

  userId = prompt("Please enter your name", userId);
  secret = prompt("Please enter your secret", secret);

  //Sign the request for Authentication
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Quoine-Auth', sign(getAuthPayload(userId), secret));
    }
  });
  //end

  button.click(function(){
    button.text('Logging in ...');
    button.prop('disabled', true);
    //Request login token
    $.getJSON(quoineHost + "/cors_auth", function(response) {
      //Use token to login to trading dashboard
      window.open(jbitsHost + "/#/auth?token=" + response.encrypted, '_blank', 'width=1280,height=1280,toolbar=0,location=0,menubar=0');
    });
  });
});

function sign(payload, secret){
  var oHeader = {alg: 'HS256', typ: 'JWT'};
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(payload);
  return KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
}

function getAuthPayload(userId){
  return {
    user_id: userId,
    path: "/cors_auth",
    nonce: new Date().getTime()
  }
}
