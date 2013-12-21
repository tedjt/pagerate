window.addEventListener("message", getAuthToken, false);
var firebase = new Firebase('https://pagerate.firebaseio.com/');
var pagerateSource;
var storedUser;
var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
  storedUser = user;
  if (pageRateSource) {
    pagerateSource.postMessage({'fireBaseAuthCompleted': user}, '*')
  }
});

function getAuthToken(message) {
  if (message.data == 'getAuthToken') {
    pageRateSource = message.source;
    auth.login('twitter', {rememberMe: true});
  }
}
