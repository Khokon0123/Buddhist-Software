# বাংলা Buddhist Heritage - Expo App

This is the Expo/React Native version of the Bengali Buddhist Heritage app that can run in Expo Go.

## 🚀 Quick Start

### Prerequisites
- Node.js installed (v14 or higher)
- Expo Go app installed on your phone (iOS or Android)
- Or use an emulator/simulator

### Installation

1. **Navigate to the expo-app folder:**
   ```bash
   cd expo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

### Running on Your Phone

1. **Install Expo Go:**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR code:**
   - After running `npx expo start`, a QR code will appear in your terminal
   - **iOS**: Open Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

3. **Or use the connection options:**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## 📱 Features

- ✅ Monks Stories
- ✅ Villages
- ✅ Renowned People
- ✅ Search
- ✅ Profile
- ✅ Glassmorphism UI
- ✅ Bengali language support
- ✅ Offline storage with AsyncStorage

## 🎨 UI Features

- Glassmorphism design
- Orange gradient theme
- Blur effects
- Smooth animations
- Bengali typography

## 📝 Notes

- The app uses AsyncStorage for local data storage
- Default admin credentials: `khokon` / `joy1234`
- Background image should be placed in `assets/` folder

## 🔧 Troubleshooting

If you encounter issues:

1. Clear cache: `npx expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Expo CLI version: `npx expo --version`

## 📦 Building for Production

To build standalone apps:

```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios
```

Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

