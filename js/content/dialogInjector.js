var POPUP_TITLEBAR_COLOR = "#31344c";
var POPUP_TITLEBAR_TEXT_COLOR = "#fff";
var POPUP_TITLEBAR_TEXT = "OpenDownload³ | Opening file"
var POPUP_COLOR_REGULAR = "#ccc";


var _di_setAction = function(){
  
}

var _di_destroyPopup = function(div){
  $(div).remove();
}

var _di_makePopup = function(downloadItem){
  var filename = downloadItem.filename.split("/");
  filename = filename[filename.length - 1];
  
  
  var body = document.getElementsByTagName("body")[0];
  
  var pagedim = document.createElement("div");
  pagedim.style.backgroundColor = "rgba(0,0,0,0.75)";
  pagedim.style.position = "fixed";
  pagedim.style.width = "100vw";
  pagedim.style.height = "100vh";
  pagedim.style.top = "0px";
  pagedim.style.left = "0px";
  pagedim.style.textAlign = "center";
  pagedim.style.zIndex = 99999;
  
  var popup = document.createElement("div");
  
  // center the popup
  
  popup.style.display = "inline-block";
  popup.style.position = "relative";
  popup.style.top = "50%";
  popup.style.transform = "translateY(-50%)";
  popup.style.backgroundColor = "#222";
  
  // determine max window size
  popup.style.height = "25em";
  popup.style.width = "66em";
  popup.style.maxWidth = "100%";
  popup.style.maxHeight = "100%";
  
  // give the window some border:
  popup.style.border = "4px solid " + POPUP_TITLEBAR_COLOR;
  
  pagedim.appendChild(popup);
  
  var titlebar = document.createElement("div");
  titlebar.textContent = POPUP_TITLEBAR_TEXT;
  titlebar.style.color = POPUP_TITLEBAR_TEXT_COLOR;
  titlebar.style.backgroundColor = POPUP_TITLEBAR_COLOR;
  titlebar.style.width = "100%";
  titlebar.style.fontSize = "1.4em";
  titlebar.style.padding = "0.15em";
  
  popup.appendChild(titlebar);
  
  
  var popup_content = document.createElement("div");
  popup_content.style.color = POPUP_COLOR_REGULAR;
  popup_content.style.textAlign = "left";
  popup_content.style.paddingTop = "1em";
  popup_content.style.paddingLeft = "1.5em";
  popup_content.style.fontSize = "1.2em";
  
  var dlinfo = document.createElement("div");
  
  dlinfo.innerHTML = "<p>You have chosen to download this file: <span style='color: #ffe'>" + filename + "</span></p>What would you like to do with it?</p>"
  
  popup_content.appendChild(dlinfo);
  
  var buttonRow = document.createElement("div");
  buttonRow.style.textAlign = "right";
  buttonRow.style.width = "100%";
  
  buttonRow.appendChild(Buttons.makeButton("Open", function(){_di_setAction("open")}));
  buttonRow.appendChild(Buttons.makeButton("Save", function(){_di_setAction("save")}));
  buttonRow.appendChild(Buttons.makeButton("Save As", function(){_di_setAction("saveas")}));
  
  // original download should be cancelled at this point
  buttonRow.appendChild(Buttons.makeButton("Cancel", function(){_di_destroyPopup(pagedim)}));
  
  
  popup_content.appendChild(buttonRow);
  popup.appendChild(popup_content);
  // put that popup over the current page
  body.appendChild(pagedim);
}

var _di_messageListener = function(message, sender, stuff){
  console.log("our message: ", message, " from sender" , sender);
  _di_makePopup(message.downloadItem);
}

function extSetup(){
  console.log("setting up OpenDownload³");
  
  browser.runtime.onMessage.addListener(_di_messageListener);
}


$(document).ready(function() {
  console.log("document ready³");
  extSetup();
});
