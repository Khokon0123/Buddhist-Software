# 📱 Life Stories App - বাংলা Buddhist Heritage

A comprehensive multi-platform application for preserving and sharing Buddhist heritage stories in Bangladesh, with support for Bengali, English, and Pali languages.

## 🌟 Features

- 📖 **Life Stories** - Preserve and share stories of Buddhist monks and villages
- 🌐 **Multi-language Support** - Bengali (বাংলা), English, and Pali
- 📱 **Multiple Platforms**:
  - Web (HTML/JavaScript)
  - React Native (Expo)
  - Flutter Mobile App
  - React Web Client
- 🔐 **User Authentication** - Admin panel for content management
- 💾 **Local Storage** - Offline support with local data persistence
- 🎨 **Beautiful UI** - Glassmorphism design with Bengali typography

## 📂 Project Structure

```
life-stories-app/
├── buddhist-software.html # Main web application (HTML/JS)
├── client/                # React web client
│   ├── src/
│   │   └── components/    # React components
│   └── package.json
├── expo-app/              # React Native/Expo app
│   ├── App.js
│   └── package.json
├── mobile_app/            # Flutter mobile app
│   ├── lib/
│   │   ├── models/        # Data models
│   │   ├── providers/     # State management
│   │   ├── screens/       # UI screens
│   │   └── services/      # Services
│   └── pubspec.yaml
├── server/                 # Backend server
│   └── index.js
├── locales/                # i18n translation files
│   ├── bn.json            # Bengali
│   ├── en.json            # English
│   └── pli.json           # Pali
└── js/
    └── i18n.js            # Internationalization system
```

## 🚀 Quick Start

### Web Application

Simply open `buddhist-software.html` in a web browser. No build process required!

### React Client

```bash
cd client
npm install
npm start
```

### Expo App (React Native)

```bash
cd expo-app
npm install
npx expo start
```

### Flutter App

```bash
cd mobile_app
flutter pub get
flutter run
```

### Backend Server

```bash
cd server
npm install
node index.js
```

## 🔑 Default Admin Credentials

- **Username**: `khokon`
- **Password**: `joy1234`

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript, React, React Native (Expo), Flutter
- **State Management**: Provider (Flutter), React Hooks
- **Storage**: LocalStorage, AsyncStorage, SharedPreferences
- **i18n**: Custom i18n system with JSON translation files
- **UI**: Glassmorphism design, Material 3, Bengali typography

## 📝 Features in Detail

### Monk Stories
- View, add, edit, and delete monk biographies
- Search and filter functionality
- Image support
- Multi-language descriptions

### Villages
- Village information and history
- Search by name, district
- Detailed village profiles
- Admin content management

### User System
- Registration and login
- Admin role support
- Profile management
- Secure session storage

## 🌍 Language Support

The app supports three languages:
- **Bengali (বাংলা)** - Primary language
- **English** - Secondary language
- **Pali (पालि)** - Buddhist texts language

Translation files are located in the `locales/` directory.

## 📦 Building for Production

### Web
The HTML files can be deployed directly to any web server.

### React Client
```bash
cd client
npm run build
```

### Expo App
```bash
cd expo-app
eas build --platform android
eas build --platform ios
```

### Flutter App
```bash
cd mobile_app
flutter build apk --release      # Android
flutter build ios --release      # iOS
flutter build web                # Web
```

## 🤝 Contributing

This project is designed to preserve Buddhist heritage in Bangladesh. Contributions are welcome!

## 📄 License

This project is for preserving Buddhist heritage in Bangladesh.

## 🙏 Acknowledgments

Built with respect for Buddhist heritage and culture in Bangladesh.

