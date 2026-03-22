chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translateSignBridge",
        title: "Translate to Sign Language",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateSignBridge" && info.selectionText) {
        chrome.tabs.sendMessage(tab.id, {
            action: "showOverlay",
            text: info.selectionText
        });
    }
});

// Relay requests to backend to avoid CORS from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translateText") {
        fetch("http://localhost:8000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: request.text })
        })
        .then(res => res.json())
        .then(data => sendResponse({ success: true, data }))
        .catch(err => sendResponse({ success: false, error: err.toString() }));
        return true; // Keep message channel open for async fetch
    }
});
