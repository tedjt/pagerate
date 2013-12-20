var path = location.href;
console.log("New location " + path);
window.addEventListener("message", receiveMessage, false);
var iframe = document.createElement("iframe");
iframe.src = chrome.extension.getURL("iframe.html");
iframe.className = 'pagerankerIFrame';
document.body.insertBefore(iframe, document.body.firstChild);

function rank(rank) {
  // call to firebase and rankedk
  // update dom to show the rank

}

function getAverageRank() {
  // call to firebase to compute average rank for ${path}
  return 5.1;
}

function receiveMessage(event) {
  console.log(event);
  if (event.data == 'hidePageRankFrame') {
    iframe.style.display = 'None';
  }
}
