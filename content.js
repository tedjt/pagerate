window.addEventListener("message", receiveMessage, false);
var iframe = document.createElement("iframe");
iframe.src = chrome.extension.getURL("iframe.html");
iframe.className = 'pagerage-iframe';
iframe.setAttribute("scrolling", "no");
document.body.insertBefore(iframe, document.body.firstChild);

function receiveMessage(event) {
  if (event.data == 'hidePageRankFrame') {
    iframe.style.display = 'None';
  } else if (event.data == 'getPageRankPath') {
    event.source.postMessage({'returnPageRankPath': location.href }, '*');
  }
}
