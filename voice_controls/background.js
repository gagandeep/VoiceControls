function setStartIcon() {
  chrome.browserAction.setIcon({ path: "start.png" });
}

function setStopIcon() {
  chrome.browserAction.setIcon({ path: "stop.png" });
}


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.experimental.speechInput.isRecording(function(recording) {
    if (!recording) {
	startCapture();
    } else {
      chrome.experimental.speechInput.stop(function() {
        setStartIcon();
      });
    }
  });
});

function startCapture(){
      chrome.experimental.speechInput.start({}, function() {
        if (chrome.extension.lastError) {
          alert("Couldn't start speech input: " +
              chrome.extension.lastError.message);
          setStartIcon();
        } else {
          setStopIcon();
        }
      });
}

chrome.experimental.speechInput.onError.addListener(function(error) {

  startCapture();
});

chrome.experimental.speechInput.onResult.addListener(function(result) {

  for (i in actions){

	if( actions[i]['regex'].test(result.hypotheses[0].utterance)){
		actions[i]['action'](result.hypotheses[0].utterance);
		startCapture();
		return;
	}
  }
  
  startCapture();
});


