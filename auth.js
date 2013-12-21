window.addEventListener("message", getAuthToken, false);
var firebase = new Firebase('https://pagerate.firebaseio.com/');
var pagerateSource;
var storedUser;
var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
  storedUser = user;
  if (pagerateSource) {
    pagerateSource.postMessage({'fireBaseAuthCompleted': user}, '*');
  } else {
    parent.postMessage({'fireBaseAuthCompleted': user}, '*');
  }
});

function getAuthToken(message) {
  if (message.data == 'getAuthToken') {
    pagerateSource = message.source;
    auth.login('twitter', {rememberMe: true});
  }
}
