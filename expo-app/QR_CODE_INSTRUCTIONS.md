# 📱 How to Get QR Code in Terminal - Step by Step

## Step-by-Step Instructions

### Step 1: Open Terminal/Command Prompt
- Press `Windows Key + R`
- Type `cmd` or `powershell` and press Enter
- Or search for "Command Prompt" or "PowerShell" in Start Menu

**Note**: For better QR code display, use:
- **Windows Terminal** (recommended - download from Microsoft Store)
- **PowerShell** (better than Command Prompt)
- **Command Prompt** (works but QR code may be smaller)

### Step 2: Navigate to Expo App Folder
Type this command and press Enter:
```bash
cd C:\Users\User\life-stories-app\expo-app
```

### Step 3: Verify You're in the Right Folder (Optional)
Type this to see the current folder:
```bash
dir
```
You should see files like `package.json`, `App.js`, `app.json`

### Step 4: Install Dependencies (Only if not done before)
If you haven't installed dependencies yet, run:
```bash
npm install
```
Wait for it to finish (may take 1-2 minutes).

### Step 5: Start Expo Server and Get QR Code
Type this command and press Enter:
```bash
npx expo start
```

### Step 6: Look for the QR Code
After running the command, you should see:

```
Starting Metro Bundler
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

[QR CODE DISPLAYED HERE]
```

### Step 7: If QR Code Doesn't Appear in Terminal

#### Option A: Use Tunnel Mode (Recommended)
1. With the server running, press the letter `s` in the terminal
2. This switches to tunnel mode
3. A new QR code should appear

#### Option B: Check Browser
1. The server also opens at `http://localhost:19002`
2. Open your browser and go to: `http://localhost:19002`
3. The QR code will be visible there

#### Option C: Look for the URL
In the terminal output, find a line like:
```
exp://192.168.1.100:8081
```
or
```
exps://exp.host/@yourname/bangla-buddhist-heritage
```

You can manually enter this URL in Expo Go app.

### Step 8: Scan the QR Code

**For Android:**
1. Open Expo Go app on your phone
2. Tap "Scan QR code"
3. Point camera at the QR code in terminal

**For iOS:**
1. Open Camera app
2. Point at the QR code
3. Tap the notification that appears

---

## Complete Command Sequence (Copy-Paste Ready)

```bash
cd C:\Users\User\life-stories-app\expo-app
npx expo start
```

---

## Troubleshooting

### QR Code Not Visible?
- Try Windows Terminal instead of Command Prompt
- Press `s` in terminal to switch to tunnel mode
- Open browser at `http://localhost:19002`

### "npx is not recognized"
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

### "Cannot find module expo"
- Run: `npm install`
- Wait for installation to complete
- Try again: `npx expo start`

### Server Won't Start
- Clear cache: `npx expo start -c`
- Check internet connection
- Make sure you're in the correct folder

---

## Quick Reference

**Start server:** `npx expo start`
**Tunnel mode:** Press `s` (while server is running)
**Reload app:** Press `r`
**Stop server:** Press `Ctrl+C`
**Open in browser:** `http://localhost:19002`

---

## Expected Terminal Output

When successful, you should see something like:

```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ███████████████████████████████████████████████████████████████████████   │
│   ███████████████████████████████████████████████████████████████████████   │
│   ████ ▄▄▄▄▄ █▀█ █▄█▀▀▀█▄▀█▀▀█▄▄▄█▀▄▀█▀▀▀▄▄▀█ ▄▄▄▄▄ ████   │
│   ████ █   █ █▀▀▀█ ▄▄█▀▀▀█▄▀▀█▀▀▀█▄▀█▀▀▀█▄▀█ █   █ ████   │
│   ████ █▄▄▄█ █ ▀▄█ ▀ ▄▄▀█▄▀█▀▀▀█▄▀█▀▀▀█▄▀█ █▄▄▄█ ████   │
│   ... (QR code pattern) ...                                                │
│   ███████████████████████████████████████████████████████████████████████   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press s │ switch to tunnel mode

› Press r │ reload app
› Press m │ toggle menu
```

The QR code is the block of █ characters above!

