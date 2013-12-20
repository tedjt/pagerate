var firebase = new Firebase('https://pagerate.firebaseio.com/');
var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
});
$(document).ready(function() {
    $('#login-btn').click(function() {
          auth.login('twitter', {rememberMe: true});
            });
});
