function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
injectScript(chrome.extension.getURL('jquery.js'), 'body');
injectScript(chrome.extension.getURL(`vhs.js?c=${new Date().getTime()}`), 'body');
