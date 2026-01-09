let recipients = [];

// Render recipients list
function renderRecipients() {
    const recipientsList = document.getElementById('recipients-list');
    
    if (recipients.length === 0) {
        recipientsList.innerHTML = '<div class="empty-state">No recipients added yet. Add email addresses above.</div>';
    } else {
        recipientsList.innerHTML = recipients.map((email, index) => `
            <div class="account-item">
                <span class="account-email">${email}</span>
                <button class="remove-btn" data-recipient-index="${index}">Remove</button>
            </div>
        `).join('');
        
        // Add event listeners for remove buttons
        recipientsList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.recipientIndex);
                recipients.splice(index, 1);
                renderRecipients();
            });
        });
    }
}

// Restore saved values
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ 
        recipients: [],
        defaultAccount: ""
    }, (items) => {
        recipients = items.recipients || [];
        renderRecipients();
    });
});

// Add recipient
document.getElementById('add-recipient').addEventListener('click', () => {
    const newRecipient = document.getElementById('new-recipient').value.trim();
    
    if (!newRecipient) {
        alert('Please enter an email address.');
        return;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRecipient)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Check for duplicates
    if (recipients.includes(newRecipient)) {
        alert('This recipient has already been added.');
        return;
    }
    
    recipients.push(newRecipient);
    document.getElementById('new-recipient').value = '';
    renderRecipients();
});

// Save all settings
document.getElementById('save').addEventListener('click', () => {
    chrome.storage.sync.set({ 
        recipients: recipients
    }, () => {
        const statusEl = document.getElementById('status');
        statusEl.textContent = "✅ All settings saved successfully!";
        statusEl.classList.add('show');
        setTimeout(() => { 
            statusEl.classList.remove('show');
            setTimeout(() => { statusEl.textContent = ""; }, 300);
        }, 2000);
    });
});

// Allow adding recipient with Enter key
document.getElementById('new-recipient').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-recipient').click();
    }
});