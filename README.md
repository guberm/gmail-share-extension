# Gmail Share Extension 📧

A Chrome extension that lets you quickly share web pages via Gmail with multiple account support and a beautiful modern interface.

## ✨ Features

- **Quick Share**: Share any webpage via Gmail with one click
- **Multiple Account Support**: Add and manage multiple Gmail accounts
- **Smart Content**: Automatically includes page title as subject and URL in body
- **Text Selection**: If you select text on the page, it will be included in the email body
- **Default Recipient**: Set a default "To" email address for quick sharing
- **Modern UI**: Beautiful, gradient-based interface with smooth animations
- **Easy Configuration**: Simple options page to manage all settings

## 🚀 Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/gmail-share-page/hakgaankkmbjbncdjnjmlkbhmdomjfdl)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Development)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension folder

## 📖 How to Use

### Sharing a Page
1. Navigate to any webpage you want to share
2. Click the Gmail Share Extension icon in your toolbar
3. A Gmail compose window will open with:
   - **Subject**: The page title
   - **Body**: The page URL (or selected text + URL if you selected text)
   - **To**: Your default recipient (if set)
   - **From**: Your default Gmail account (if set)

### Configuring the Extension
1. Right-click the extension icon and select "Options"
2. **Add Email Accounts**:
   - Enter your Gmail addresses
   - Click "Add" to add each account
   - Remove accounts you no longer need
3. **Set Default Account**:
   - Select which Gmail account to use for sending
4. **Set Default Recipient** (optional):
   - Enter a default "To" email address
5. Click "Save All Settings"

## ⚙️ Configuration Options

- **Email Accounts (Send From)**: Manage multiple Gmail accounts you want to send from
- **Default Send From Account**: Choose which account to use by default
- **Default Recipient**: Set a default "To" email address for quick sharing

## 🎨 Interface

The extension features a modern, gradient-based UI with:
- Smooth animations and transitions
- Hover effects on interactive elements
- Clean, organized layout
- Responsive design
- Professional color scheme

## 🔒 Privacy & Permissions

This extension requires the following permissions:
- **storage**: To save your email accounts and preferences
- **scripting**: To detect text selection on web pages
- **activeTab**: To access the current page's title and URL

**Note**: This extension does not collect, store, or transmit any personal data. All settings are stored locally in your browser.

## 📋 Requirements

- Chrome Browser (Manifest V3)
- Active Gmail account(s)

## 🐛 Known Issues

None at this time. Please report any issues on the [GitHub Issues page](https://github.com/guberm/gmail-share-extension/issues).

## 🛠️ Development

### Project Structure
```
├── background.js       # Background service worker
├── manifest.json       # Extension manifest
├── options.html        # Options page UI
├── options.js          # Options page logic
├── icon.png           # Extension icon
└── README.md          # This file
```

### Version History
- **1.1.0** (2026-01-08): Added multiple account support and redesigned UI
- **1.0.1**: Initial release with basic functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by [Michael Guber](https://github.com/guberm)

## 🙏 Acknowledgments

- Gmail logo and branding belong to Google LLC
- Icons and emojis for enhanced user experience

---

**Enjoy sharing! 🚀**
