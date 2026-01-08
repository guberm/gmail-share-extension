// Get all email accounts and default settings from storage
async function getEmailSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({ 
            defaultRecipient: "",
            emailAccounts: [],
            defaultAccount: ""
        }, (items) => {
            resolve(items);
        });
    });
}

// On extension icon click
chrome.action.onClicked.addListener(async (tab) => {
    // Get email settings from storage
    const settings = await getEmailSettings();
    const recipient = settings.defaultRecipient;

    // Inject script to get selection
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        },
        async (results) => {
            const selection = results && results[0] ? results[0].result.trim() : "";
            const subject = tab.title || '';
            const url = tab.url || '';
            let body = "";

            if (selection) {
                body = selection + "\n\n" + url;
            } else {
                body = url;
            }

            // Compose Gmail URL
            const params = new URLSearchParams({
                to: recipient,
                su: subject,
                body: body
            });
            
            // Add authuser parameter if a default account is set
            let gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&" + params.toString();
            if (settings.defaultAccount) {
                gmailUrl += "&authuser=" + encodeURIComponent(settings.defaultAccount);
            }

            // Open in new window
            chrome.windows.create({
                url: gmailUrl,
                type: "popup",
                width: 800,
                height: 600
            });
        }
    );
});