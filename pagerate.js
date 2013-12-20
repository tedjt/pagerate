var firebase = new Firebase('https://pagerate.firebaseio.com/');
var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
});
$(document).ready(function() {
  if (true) {
    top.postMessage('hidePageRankFrame', '*');
    return;
  }
    $('#login-btn').click(function() {
          auth.login('twitter', {rememberMe: true});
            });
});

function rank(rank) {
  // call to firebase and rankedk
  // update dom to show the rank

}

function getAverageRank() {
  // call to firebase to compute average rank for ${path}
  return 5.1;
}
