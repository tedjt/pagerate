window.addEventListener("message", getAuthToken, false);
var firebase = new Firebase('https://pagerate.firebaseio.com/');
var storedUser;
var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
  storedUser = user;
  top.postMessage({'fireBaseAuthCompleted': user}, '*')
});

function getAuthToken(message) {
  if (message.data == 'getAuthToken') {
    auth.login('twitter', {rememberMe: true});
  }
}
