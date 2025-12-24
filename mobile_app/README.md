# 📱 বাংলা Buddhist Heritage Mobile App

A beautiful, Bengali-first mobile application for preserving Buddhist heritage in Bangladesh.

## ✨ Features

- 📖 **Monk Stories** - Life stories of Buddhist monks with images, biography, and achievements
- 🏘 **Villages** - Information about Buddhist villages with history and descriptions
- 🔎 **Search & Filter** - Search across monks and villages in Bengali
- 👤 **User Profile & Authentication** - User registration and login system
- 🔐 **Admin Panel** - Content management for admins (add, edit, delete)
- 💾 **Local Storage** - Data stored locally using SharedPreferences
- 🎨 **Beautiful UI** - Material 3 design with Bengali typography support

## 🚀 Setup Instructions

### Prerequisites

1. **Install Flutter**: 
   - Download from: https://flutter.dev/docs/get-started/install
   - Verify installation: `flutter doctor`

2. **Install Dependencies**:
   ```bash
   cd mobile_app
   flutter pub get
   ```

3. **Download Bengali Fonts**:
   - Download Noto Sans Bengali and Noto Serif Bengali from Google Fonts
   - Place the following files in `mobile_app/fonts/` folder:
     - `NotoSansBengali-Regular.ttf`
     - `NotoSansBengali-Bold.ttf`
     - `NotoSerifBengali-Regular.ttf`
     - `NotoSerifBengali-Bold.ttf`
   - See `fonts/README.md` for download links

### Running the App

1. **For Android**:
   ```bash
   flutter run
   ```

2. **For iOS** (Mac only):
   ```bash
   flutter run -d ios
   ```

3. **For Web**:
   ```bash
   flutter run -d chrome
   ```

## 🔑 Default Admin Credentials

- **Username**: `khokon`
- **Password**: `joy1234`

## 📱 App Structure

```
mobile_app/
├── lib/
│   ├── models/          # Data models (Monk, Village, User)
│   ├── providers/       # State management (Provider pattern)
│   ├── screens/         # UI screens
│   │   ├── monks/       # Monk-related screens
│   │   └── villages/    # Village-related screens
│   ├── services/        # Storage and API services
│   └── main.dart        # App entry point
├── fonts/               # Bengali fonts
└── pubspec.yaml         # Dependencies
```

## 🛠️ Technologies Used

- **Flutter** - Cross-platform mobile framework
- **Provider** - State management
- **SharedPreferences** - Local data storage
- **Material 3** - Modern UI design
- **Noto Sans/Serif Bengali** - Bengali typography

## 📝 Features in Detail

### Monk Stories Module
- View list of all monks
- Search and filter monks
- View detailed biography
- Add/Edit/Delete (Admin only)
- Share stories

### Village Module
- View list of all villages
- Search villages by name, district
- View village details and history
- Add/Edit/Delete (Admin only)
- Share village information

### User System
- Registration and Login
- Profile management
- Admin role support
- Secure local session storage

## 🎨 UI/UX Features

- Bengali-first interface
- Beautiful gradient backgrounds
- Smooth animations
- Responsive design
- Material 3 components
- Search functionality
- Image support

## 📦 Building for Production

### Android APK:
```bash
flutter build apk --release
```

### iOS:
```bash
flutter build ios --release
```

## 🤝 Contributing

This app is based on the HTML version at `life-stories.html`. All data structures and features match the original implementation.

## 📄 License

This project is for preserving Buddhist heritage in Bangladesh.

