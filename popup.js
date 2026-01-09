// Store current tab info
let currentTab = null;

// Get email settings from storage
async function getEmailSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({ 
            recipients: []
        }, (items) => {
            resolve(items);
        });
    });
}

// Get current tab
async function getCurrentTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0];
}

// Share page with selected recipient
async function sharePage(recipient) {
    const tab = await getCurrentTab();
    
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
            
            // Open in new window
            let gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&" + params.toString();

            // Open in new window
            chrome.windows.create({
                url: gmailUrl,
                type: "popup",
                width: 800,
                height: 600
            });
            
            // Close popup
            window.close();
        }
    );
}

// Render recipients list
async function renderRecipients() {
    const settings = await getEmailSettings();
    const recipients = settings.recipients || [];
    const recipientsList = document.getElementById('recipients-list');
    
    if (recipients.length === 0) {
        recipientsList.innerHTML = '<div class="empty-state">No recipients configured.<br>Open settings to add email addresses.</div>';
        return;
    }
    
    recipientsList.innerHTML = recipients.map(email => `
        <div class="recipient-item" data-email="${email}">${email}</div>
    `).join('');
    
    // Add click listeners
    recipientsList.querySelectorAll('.recipient-item').forEach(item => {
        item.addEventListener('click', () => {
            const email = item.dataset.email;
            sharePage(email);
        });
    });
}

// Initialize popup
document.addEventListener('DOMContentLoaded', renderRecipients);
