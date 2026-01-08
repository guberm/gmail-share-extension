let emailAccounts = [];

// Render accounts list
function renderAccounts() {
    const accountsList = document.getElementById('accounts-list');
    const defaultAccountSelect = document.getElementById('default-account');
    
    if (emailAccounts.length === 0) {
        accountsList.innerHTML = '<div class="empty-state">No accounts added yet. Add your Gmail accounts above.</div>';
    } else {
        accountsList.innerHTML = emailAccounts.map((email, index) => `
            <div class="account-item">
                <span class="account-email">${email}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `).join('');
        
        // Add event listeners for remove buttons
        accountsList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                emailAccounts.splice(index, 1);
                renderAccounts();
            });
        });
    }
    
    // Update default account dropdown
    const currentDefault = defaultAccountSelect.value;
    defaultAccountSelect.innerHTML = '<option value="">-- Select Account --</option>' +
        emailAccounts.map(email => 
            `<option value="${email}">${email}</option>`
        ).join('');
    
    // Restore selection if still valid
    if (emailAccounts.includes(currentDefault)) {
        defaultAccountSelect.value = currentDefault;
    }
}

// Restore saved values
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ 
        defaultRecipient: "",
        emailAccounts: [],
        defaultAccount: ""
    }, (items) => {
        document.getElementById('recipient').value = items.defaultRecipient;
        emailAccounts = items.emailAccounts || [];
        renderAccounts();
        document.getElementById('default-account').value = items.defaultAccount || "";
    });
});

// Add account
document.getElementById('add-account').addEventListener('click', () => {
    const newAccount = document.getElementById('new-account').value.trim();
    
    if (!newAccount) {
        alert('Please enter an email address.');
        return;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAccount)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Check for duplicates
    if (emailAccounts.includes(newAccount)) {
        alert('This account has already been added.');
        return;
    }
    
    emailAccounts.push(newAccount);
    document.getElementById('new-account').value = '';
    renderAccounts();
});

// Save all settings
document.getElementById('save').addEventListener('click', () => {
    const recipient = document.getElementById('recipient').value.trim();
    const defaultAccount = document.getElementById('default-account').value;
    
    chrome.storage.sync.set({ 
        defaultRecipient: recipient,
        emailAccounts: emailAccounts,
        defaultAccount: defaultAccount
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

// Allow adding account with Enter key
document.getElementById('new-account').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-account').click();
    }
});