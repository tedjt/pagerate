var iframe = document.createElement("iframe");
var margin = document.createElement("div");

if (!location.href.match(/api\.twitter\.com\/oauth\//)) {
  window.addEventListener("message", receiveMessage, false);

  iframe.src = chrome.extension.getURL("iframe.html");
  iframe.className = "pagerate-iframe pagerate-hidden";
  iframe.setAttribute("scrolling", "no");
  document.body.insertBefore(iframe, document.body.firstChild);

  margin.className = "pagerate-margin pagerate-hidden";
  document.body.insertBefore(margin, document.body.firstChild);

  setTimeout(function() {
    iframe.className = "pagerate-iframe";
    margin.className = "pagerate-margin";
  }, 2000);
}

function receiveMessage(event) {
  if (event.data == 'hidePageRateIframe') {
    iframe.className += " pagerate-hidden";
    margin.className += " pagerate-hidden";
  } else if (event.data == 'getPageRatePath') {
    event.source.postMessage({returnPageRatePath: location.href}, '*');
  }
}
