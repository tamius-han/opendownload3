var _btn_makeButton = function(text, onclick){
  var button = document.createElement("div");
  
  button.style.height = "2em";
  button.style.width = "6em";
  button.onclick = function(){onclick()};
  button.textContent = text;
  
  return button;
}

 
var Buttons = {
  makeButton: _btn_makeButton
}
