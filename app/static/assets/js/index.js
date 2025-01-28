document.addEventListener('DOMContentLoaded', function () {
  console.log("Document loaded");

  // Initialize the reCAPTCHA
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': function(response) {
      console.log("reCAPTCHA solved", response);
    },
    'expired-callback': function() {
      console.log("reCAPTCHA expired");
    }
  });

  recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetId = widgetId;
  });

  document.getElementById('login-button').addEventListener('click', function() {
    var countryCode = document.getElementById('countryCode').value;
    var phoneNumber = document.getElementById('mobile').value;
    var fullPhoneNumber = countryCode + phoneNumber;
    var appVerifier = window.recaptchaVerifier;

    console.log("Login button clicked. Full phone number: " + fullPhoneNumber);

    firebase.auth().signInWithPhoneNumber(fullPhoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("OTP sent successfully");
        window.confirmationResult = confirmationResult;
        document.getElementById('otpGroup').style.display = 'block';
        document.getElementById('verifyOtp').style.display = 'block';
      }).catch(function (error) {
        console.error("Error during signInWithPhoneNumber: ", error);
        alert("Error during signInWithPhoneNumber: " + error.message);
        grecaptcha.reset(window.recaptchaWidgetId); // Reset reCAPTCHA
      });
  });

  document.getElementById('verifyOtp').addEventListener('click', function() {
    var code = document.getElementById('OTP').value;
    confirmationResult.confirm(code).then(function (result) {
      var user = result.user;
      console.log("User authenticated successfully", user);

      // Redirect to home.html
      window.location.href = 'home';
    }).catch(function (error) {
      console.error("Error verifying OTP: ", error);
      alert("Error verifying OTP: " + error.message);
    });
  });
});
