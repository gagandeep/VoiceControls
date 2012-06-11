actions = [
	{"regex":/^(goto|go\s*to|open)/,"action":gotourl},
	{"regex":/^(search|find)/,"action":search},
	{"regex":/^(down|dumb|don't|done)/,"action":downkey},
	{"regex":/^(up|ok)/,"action":upkey},
	{"regex":/^((page|speed|ph|be|beat)\s*(down|dial)|beagle)/,"action":pagedownkey},
	{"regex":/^(pageup|speedo|page\s*up|beat\s*up|pizza)/,"action":pageupkey},
	{"regex":/^(close|close|lowes|exit|clothes)\s*(on|all)/,"action":closeall},
	{"regex":/^(close|lowes|exit)/,"action":close}
];

if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');
  };
}

function gotourl(utterance){
    url = utterance.split(actions[0]["regex"])[2].trim();
    url = url.replace(/\s+/g,'')
    if (!/\.[a-z]{2,4}$/.test(url)){
	url = url +".com"
    }
    if(url){
        chrome.tabs.create({"url":"http://"+url});
    }
}

function search(utterance){
    query = utterance.split(actions[1]["regex"])[2].trim();

    if(query){
        url = "http://www.google.com/#q="+encodeURIComponent(query);
	chrome.tabs.create({"url":url});
    }
}

function downkey(utterance){
chrome.tabs.executeScript(null,
      {code:"window.scrollBy(0,150);"});

}
function upkey(utterance){
chrome.tabs.executeScript(null,
      {code:"window.scrollBy(0,-150);"});
}
function pagedownkey(utterance){
    
chrome.tabs.executeScript(null,
      {code:"window.scrollBy(0,750);"});
}
function pageupkey(utterance){
chrome.tabs.executeScript(null,
      {code:"window.scrollBy(0,-750);"});
}
function close(utterance){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.remove(tab.id);
  });    
}
function closeall(utterance){
    chrome.tabs.getSelected(null, function(tab) {
    chrome.windows.remove(tab.windowId);
  });
}


