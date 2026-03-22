let overlayIframe = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showOverlay") {
        createOverlay(request.text);
    }
});

function createOverlay(selectedText) {
    if (!overlayIframe) {
        // Create iframe container
        overlayIframe = document.createElement("iframe");
        overlayIframe.id = "signbridge-overlay";
        overlayIframe.src = chrome.runtime.getURL("overlay.html");
        
        // Style iframe to float bottom-right
        overlayIframe.style.position = "fixed";
        overlayIframe.style.bottom = "20px";
        overlayIframe.style.right = "20px";
        overlayIframe.style.width = "350px";
        overlayIframe.style.height = "500px";
        overlayIframe.style.border = "none";
        overlayIframe.style.borderRadius = "12px";
        overlayIframe.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
        overlayIframe.style.zIndex = "2147483647"; // Max z-index
        overlayIframe.style.backgroundColor = "transparent";
        overlayIframe.style.colorScheme = "normal";
        
        document.body.appendChild(overlayIframe);
        
        // Wait for iframe to load before sending text
        overlayIframe.onload = () => {
            sendTextToOverlay(selectedText);
        };
    } else {
        // Iframe already exists, just send the new text
        sendTextToOverlay(selectedText);
    }
}

function sendTextToOverlay(text) {
    overlayIframe.contentWindow.postMessage({
        action: "translate",
        text: text
    }, "*");
}

// Listen for messages from the iframe (e.g. to close the overlay)
window.addEventListener("message", (event) => {
    if (event.data && event.data.action === "closeOverlay") {
        if (overlayIframe) {
            overlayIframe.remove();
            overlayIframe = null;
        }
    }
});
