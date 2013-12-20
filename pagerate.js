var path = document.referrer;
window.addEventListener("message", getPageRankPath, false);
var firebase = new Firebase('https://pagerate.firebaseio.com/');
$(document).ready(function() {
  // get path info
  top.postMessage('getPageRankPath', '*');
  if (isPageRated()) {
    top.postMessage('hidePageRankFrame', '*');
    return;
  }
  $('#login-btn').click(function() {
    $('#authFrame').contentWindow.postMessage('getAuthToken', '*');
  });
});

function rate(rank) {
  // call to firebase and rankedk
  // update dom to show the rank
}

function getAverageRating() {
  // call to firebase to compute average rank for ${path}
  return 5.1;
}

function isPageRated() {
  // TODO(call out to firebase)
  return path.length > 0;
}

function getPageRankPath(event) {
  if (event.data.hasOwnProperty('returnPageRankPath')) {
    path = event.data['returnPageRankPath'];
    console.log(path);
    if (isPageRated()) {
      top.postMessage('hidePageRankFrame', '*');
      return;
    }
  }
}
