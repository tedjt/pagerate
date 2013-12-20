var path = location.href;
console.log("New location " + path);
if (path.length > 0) { //swap with firbase to figure out if the user has ranked
  var iframe = document.createElement("iframe");
  iframe.src = chrome.extension.getURL("iframe.html");
  iframe.className = 'pagerankerIFrame';
  document.body.insertBefore(iframe, document.body.firstChild);
}

function rank(rank) {
  // call to firebase and rankedk
  // update dom to show the rank

}

function getAverageRank() {
  // call to firebase to compute average rank for ${path}
  return 5.1;
}
