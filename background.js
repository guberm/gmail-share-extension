// Get all email accounts and default settings from storage
async function getEmailSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({ 
            recipients: []
        }, (items) => {
            resolve(items);
        });
    });
}