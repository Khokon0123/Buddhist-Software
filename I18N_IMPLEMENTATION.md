# Multilingual (i18n) Implementation Guide

## Overview
This application now supports runtime language switching between:
- **Bangla (bn)** - Default language
- **English (en)**
- **Pāli (pli)** - Romanized with proper diacritics

Users can switch languages at any time without page reload or app restart.

## File Structure

```
life-stories-app/
├── locales/
│   ├── bn.json      # Bangla translations
│   ├── en.json      # English translations
│   └── pli.json     # Pāli translations (Romanized)
├── js/
│   └── i18n.js      # i18n core module
└── mobile_app_web.html  # Main application file
```

## How It Works

### 1. Translation Files
All translations are stored in JSON files in the `locales/` directory. Each file contains the same keys but different language values.

Example:
```json
{
  "auth": {
    "welcome": "স্বাগতম"  // bn.json
    // "welcome": "Welcome"  // en.json
    // "welcome": "Svāgata"  // pli.json
  }
}
```

### 2. Translation Function `t(key, params)`

The `t()` function retrieves translations for the current language:

```javascript
t('auth.welcome')  // Returns translated text based on current language
t('auth.verificationSubtitle', {method: 'ইমেইল', identifier: 'test@email.com'})
```

Supports:
- **Nested keys** with dot notation: `'auth.welcome'`
- **Interpolation** with `{{variable}}` syntax: `'auth.verificationSubtitle'` with `{method: 'ইমেইল'}`

### 3. Language Switching

```javascript
// Switch language programmatically
await window.i18n.setLanguage('en');  // Switch to English
await window.i18n.setLanguage('bn');  // Switch to Bangla
await window.i18n.setLanguage('pli'); // Switch to Pāli

// Get current language
const currentLang = window.i18n.getCurrentLanguage(); // Returns 'bn', 'en', or 'pli'
```

### 4. UI Integration

#### Static Text (HTML)
Add `data-i18n` attribute to elements:

```html
<h1 data-i18n="app.title">বাংলাদেশের বৌদ্ধ ভিক্ষু</h1>
<button data-i18n="auth.loginButton">লগইন করুন</button>
```

For placeholders:
```html
<input data-i18n-placeholder="auth.passwordPlaceholder" placeholder="পাসওয়ার্ড লিখুন">
```

For values:
```html
<button data-i18n-value="forms.save">সংরক্ষণ করুন</button>
```

#### Dynamic Text (JavaScript)
Use `t()` function directly:

```javascript
// Instead of:
errorDiv.textContent = 'ব্যবহারকারী পাওয়া যায়নি';

// Use:
errorDiv.textContent = t('errors.userNotFound');

// With interpolation:
const message = t('auth.verificationSubtitle', {
    method: t('auth.email'),
    identifier: emailAddress
});
```

## Language Switcher UI

The language switcher appears in the top-right corner with three buttons:
- **বাংলা** (bn) - Bangla
- **EN** (en) - English  
- **Pāli** (pli) - Pāli

Clicking any button instantly switches the language and updates all UI text.

## Font Support

- **Bangla**: Uses `'Noto Sans Bengali'` font
- **English**: Uses `'Segoe UI'` font
- **Pāli**: Uses `'Noto Serif'` font for proper diacritic rendering (ā ī ū ṅ ñ ṭ ḍ ṇ ḷ)

Fonts are automatically applied when language changes.

## Storage

Language preference is saved to `localStorage` with key `'app_language'`. On app load, the saved language is restored, or defaults to Bangla if none is found.

## Remaining Updates Needed

Some JavaScript-generated content still needs to be updated to use `t()`:

### Error Messages in JavaScript

Update these functions to use `t()`:

1. **handleLogin()** - Error messages:
   - `t('errors.userNotFound')`
   - `t('errors.wrongPassword')`
   - `t('errors.accountNotVerified')`

2. **handleRegister()** - Error messages:
   - `t('errors.nameMinLength')`
   - `t('errors.invalidPhone')`
   - `t('errors.invalidEmail')`
   - `t('errors.passwordMinLength')`
   - `t('errors.passwordMismatch')`
   - `t('errors.emailExists')` / `t('errors.phoneExists')`
   - `t('errors.emailPending')` / `t('errors.phonePending')`

3. **handleVerification()** - Error messages:
   - `t('errors.invalidOtpFormat')`
   - `t('errors.invalidOtp')`
   - `t('errors.verificationDataMissing')`

4. **Dynamic Content Functions** - Update innerHTML strings:
   - `loadMonks()` - Empty state messages
   - `loadVillages()` - Empty state messages
   - `loadRenowned()` - Empty state messages
   - `loadAdminContent()` - Status badges, buttons
   - `showMonkDetail()` - Section headers
   - `showVillageDetail()` - Section headers
   - `showRenownedDetail()` - Section headers

5. **Form Labels** - Update modal forms:
   - Story submission form labels
   - Renowned person form labels

6. **Alert/Confirm Messages**:
   - `confirm(t('confirmations.logout'))`
   - `confirm(t('confirmations.deleteStory'))`
   - `alert(t('success.registrationSubmitted'))`
   - etc.

## Example Update Pattern

### Before:
```javascript
errorDiv.textContent = 'ব্যবহারকারী পাওয়া যায়নি। দয়া করে সঠিক তথ্য দিন।';
```

### After:
```javascript
errorDiv.textContent = t('errors.userNotFound');
```

### Before:
```html
<div class="modal-header">কাহিনী জমা দিন</div>
```

### After:
```html
<div class="modal-header" data-i18n="forms.addMonk">কাহিনী জমা দিন</div>
```

## Testing

1. **Load the app** - Should default to Bangla
2. **Click language buttons** - UI should update instantly
3. **Check all screens** - Login, Register, Main app, Forms, etc.
4. **Reload page** - Language preference should persist
5. **Test all languages** - Verify translations appear correctly
6. **Check Pāli diacritics** - Ensure ā ī ū ṅ ñ ṭ ḍ ṇ ḷ display correctly

## Adding New Languages

1. Create new JSON file in `locales/` directory (e.g., `hi.json` for Hindi)
2. Copy structure from existing translation file
3. Translate all values
4. Add language button to switcher UI
5. Update `setLanguage()` validation if needed

## Adding New Translation Keys

1. Add key to all language files (`bn.json`, `en.json`, `pli.json`)
2. Use in HTML with `data-i18n="new.key.path"`
3. Or use in JavaScript with `t('new.key.path')`

## Notes

- All translations support Unicode characters
- Pāli uses Roman script with diacritics (not Devanagari)
- Language switching is immediate - no reload required
- Font changes are automatic based on language
- Missing translations fall back to the key itself (logged as warning)

