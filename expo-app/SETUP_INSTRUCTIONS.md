# 📱 How to Run in Expo Go - Step by Step

## Step 1: Install Node.js (if not installed)
1. Download from: https://nodejs.org/
2. Install it
3. Restart your terminal/command prompt

## Step 2: Install Expo CLI
Open terminal/command prompt and run:
```bash
npm install -g expo-cli
```

Or use npx (no installation needed):
```bash
npx expo-cli --version
```

## Step 3: Navigate to Expo App Folder
```bash
cd C:\Users\User\life-stories-app\expo-app
```

## Step 4: Install Dependencies
```bash
npm install
```

This will install all required packages (may take a few minutes).

## Step 5: Start Expo Development Server
```bash
npx expo start
```

Or if you installed expo-cli globally:
```bash
expo start
```

## Step 6: Install Expo Go on Your Phone

### For Android:
1. Open Google Play Store
2. Search for "Expo Go"
3. Install the app

### For iOS:
1. Open App Store
2. Search for "Expo Go"
3. Install the app

## Step 7: Connect Your Phone

### Option A: Scan QR Code (Easiest)
1. After running `npx expo start`, a QR code will appear in your terminal
2. **Android**: Open Expo Go app → Tap "Scan QR code" → Scan the QR code
3. **iOS**: Open Camera app → Point at QR code → Tap the notification

### Option B: Same WiFi Network
1. Make sure your phone and computer are on the same WiFi network
2. Open Expo Go app
3. The app should appear in "Recently opened" or you can manually enter the URL

### Option C: Use Tunnel (if same WiFi doesn't work)
1. In the terminal, press `s` to switch to tunnel mode
2. Scan the new QR code

## Step 8: Wait for App to Load
- The app will download and start automatically
- First time may take 1-2 minutes
- You'll see "বাংলাদেশের বৌদ্ধ ভিক্ষু" app loading

## 🎉 Done!
Your app should now be running on your phone!

## Troubleshooting

### "npx is not recognized"
- Install Node.js from nodejs.org
- Restart your terminal

### "Cannot find module"
- Run `npm install` again in the expo-app folder

### QR Code not scanning
- Make sure phone and computer are on same WiFi
- Try tunnel mode (press `s` in terminal)
- Manually enter the URL shown in terminal

### App not loading
- Check your internet connection
- Try clearing Expo Go cache (shake device → "Reload")
- Restart Expo server: Press `r` in terminal

### Need to clear cache
```bash
npx expo start -c
```

## Quick Commands

- `npx expo start` - Start development server
- `r` - Reload app
- `m` - Toggle menu
- `a` - Open Android emulator
- `i` - Open iOS simulator
- `w` - Open in web browser
- `s` - Switch to tunnel mode
- `Ctrl+C` - Stop server

## Next Steps

Once running, you can:
- Make changes to `App.js` and see live updates
- Add more screens and features
- Test on both iOS and Android
- Build for production when ready

Happy coding! 🚀

