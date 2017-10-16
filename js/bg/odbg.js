var _bg_onDownloadStart = function(downloadItem){
//   if(Debug.debug || Debug.bg)
    console.log("[odbg::_bg_onDownloadStart] I feel like someone wants to download something.", downloadItem);
  
  // todo: pause download
  
  browser.tabs.query({active: true, currentWindow: true}, function(tabs){
    browser.tabs.sendMessage(tabs[0].id, {message: "downloadStarted", downloadItem: downloadItem});
  });
  
} 







function extSetup(){
  console.log("setting up background scripts for OpenDownload³ ");
  browser.downloads.onCreated.addListener(_bg_onDownloadStart);
  
  
}

// setup bg here:

extSetup();
