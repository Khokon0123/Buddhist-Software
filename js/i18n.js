/**
 * Internationalization (i18n) Module
 * Provides runtime language switching without page reload
 * 
 * Usage:
 *   t('auth.welcome') - Get translation for current language
 *   setLanguage('en') - Switch language immediately
 *   getCurrentLanguage() - Get current language code
 */

// Default language (Bangla)
const DEFAULT_LANGUAGE = 'bn';

// Current language state
let currentLanguage = DEFAULT_LANGUAGE;

// Translations storage
let translations = {};

// Embedded translations (to avoid CORS issues with file:// protocol)
// NOTE: These are fallback only. The system will try to load from JSON files first.
const embeddedTranslations = {
    bn: {
        "app": {"title": "বৌদ্ধ Software", "admin": "প্রশাসক"},
        "auth": {"welcome": "স্বাগতম", "loginSubtitle": "আপনার অ্যাকাউন্টে প্রবেশ করুন", "loginButton": "লগইন করুন", "newAccount": "নতুন অ্যাকাউন্ট", "createAccount": "একটি নতুন অ্যাকাউন্ট তৈরি করুন", "registerButton": "রেজিস্টার করুন", "backToLogin": "← লগইনে ফিরে যান", "goBack": "← ফিরে যান", "usernameEmailPhone": "ইউজারনেম, ইমেইল বা ফোন নম্বর", "usernameEmailPhonePlaceholder": "ইউজারনেম, ইমেইল বা ফোন নম্বর লিখুন", "password": "পাসওয়ার্ড", "passwordPlaceholder": "পাসওয়ার্ড লিখুন", "newUser": "নতুন ব্যবহারকারী?", "alreadyHaveAccount": "ইতিমধ্যে অ্যাকাউন্ট আছে?", "registrationMethod": "নিবন্ধনের মাধ্যম", "phoneNumber": "ফোন নম্বর", "email": "ইমেইল", "emailAddress": "ইমেইল ঠিকানা", "emailPlaceholder": "example@email.com", "name": "নাম", "namePlaceholder": "আপনার নাম লিখুন", "passwordMinLength": "পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর)", "confirmPassword": "পাসওয়ার্ড নিশ্চিত করুন", "confirmPasswordPlaceholder": "পাসওয়ার্ড আবার লিখুন", "verificationCode": "যাচাইকরণ কোড", "verificationSubtitle": "আপনার {{method}} ({{identifier}}) এ পাঠানো কোডটি লিখুন", "sixDigitCode": "৬ সংখ্যার যাচাইকরণ কোড", "verify": "যাচাই করুন", "resendCode": "কোড পুনরায় পাঠান", "resendTimer": "{{seconds}} সেকেন্ড পরে আবার চেষ্টা করুন", "demoMode": "ডেমো মোড: যাচাইকরণ কোড", "demoNote": "(প্রোডাকশনে এটি ইমেইল/SMS এ পাঠানো হবে)"},
        "errors": {"userNotFound": "ব্যবহারকারী পাওয়া যায়নি। দয়া করে সঠিক তথ্য দিন।", "wrongPassword": "পাসওয়ার্ড ভুল। দয়া করে আবার চেষ্টা করুন।", "accountNotVerified": "আপনার অ্যাকাউন্ট এখনও যাচাই করা হয়নি। দয়া করে যাচাইকরণ কোড দিয়ে আপনার অ্যাকাউন্ট সক্রিয় করুন।", "invalidOtp": "ভুল যাচাইকরণ কোড। দয়া করে আবার চেষ্টা করুন।", "otpExpired": "যাচাইকরণ কোড মেয়াদ শেষ হয়েছে।", "invalidOtpFormat": "সঠিক ৬ সংখ্যার কোড দিন।", "nameMinLength": "নাম কমপক্ষে ২ অক্ষরের হতে হবে।", "invalidPhone": "সঠিক ফোন নম্বর দিন (11 সংখ্যা, 01 দিয়ে শুরু)", "invalidEmail": "সঠিক ইমেইল ঠিকানা দিন।", "passwordMinLength": "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।", "passwordMismatch": "পাসওয়ার্ড মিলছে না। দয়া করে আবার চেষ্টা করুন।", "emailExists": "এই ইমেইল ইতিমধ্যে নিবন্ধিত। দয়া করে একটি ভিন্ন ইমেইল ব্যবহার করুন।", "phoneExists": "এই ফোন নম্বর ইতিমধ্যে নিবন্ধিত। দয়া করে একটি ভিন্ন ফোন নম্বর ব্যবহার করুন।", "emailPending": "এই ইমেইল দিয়ে একটি অ্যাকাউন্ট তৈরি হয়েছে কিন্তু এখনও যাচাই করা হয়নি। দয়া করে আপনার যাচাইকরণ কোড দিয়ে অ্যাকাউন্ট সক্রিয় করুন।", "phonePending": "এই ফোন নম্বর দিয়ে একটি অ্যাকাউন্ট তৈরি হয়েছে কিন্তু এখনও যাচাই করা হয়নি। দয়া করে আপনার যাচাইকরণ কোড দিয়ে অ্যাকাউন্ট সক্রিয় করুন।", "verificationDataMissing": "যাচাইকরণ তথ্য পাওয়া যায়নি। দয়া করে আবার রেজিস্টার করুন।", "resendDataMissing": "পুনরায় পাঠানোর জন্য তথ্য পাওয়া যায়নি।"},
        "success": {"verificationSuccess": "যাচাইকরণ সফল! আপনার অ্যাকাউন্ট সক্রিয় করা হয়েছে।", "codeResent": "নতুন যাচাইকরণ কোড পাঠানো হয়েছে।", "registrationSubmitted": "আপনার কাহিনী জমা দেওয়া হয়েছে! প্রশাসকের অনুমোদনের পর এটি প্রকাশিত হবে।"},
        "navigation": {"monks": "ভিক্ষু", "villages": "গ্রাম", "renowned": "বিশিষ্ট ব্যক্তিত্ব", "admin": "প্রশাসক", "search": "অনুসন্ধান", "profile": "প্রোফাইল"},
        "search": {"searchMonks": "ভিক্ষু খুঁজুন…", "searchVillages": "গ্রাম খুঁজুন…", "searchRenowned": "বিশিষ্ট ব্যক্তিত্ব খুঁজুন…", "globalSearch": "সার্চ করুন…", "noResults": "কোন ফলাফল নেই"},
        "emptyStates": {"noMonks": "এখনও কোন কাহিনী নেই", "noMonksDesc": "বাংলাদেশের একজন শ্রদ্ধেয় বৌদ্ধ ভিক্ষুর জীবন কাহিনী যোগ করে শুরু করুন।", "noVillages": "এখনও কোন গ্রাম নেই", "noVillagesDesc": "একটি বৌদ্ধ গ্রামের তথ্য যোগ করে শুরু করুন।", "noRenowned": "এখনও কোন বিশিষ্ট ব্যক্তিত্ব নেই", "noRenownedDesc": "বৌদ্ধ ইতিহাসের একজন বিশিষ্ট ব্যক্তিত্বের তথ্য যোগ করে শুরু করুন।", "noStories": "কোন কাহিনী নেই"},
        "forms": {"addMonk": "কাহিনী জমা দিন", "addRenowned": "বিশিষ্ট ব্যক্তিত্ব যোগ করুন", "editRenowned": "সম্পাদনা করুন", "name": "নাম", "occupation": "উপাধি/ভূমিকা", "birthDate": "জন্ম তারিখ", "deathDate": "মৃত্যু তারিখ", "imageUrl": "ছবির URL", "biography": "জীবনী", "biographyRequired": "জীবনী *", "achievements": "শিক্ষা / অর্জন (প্রতি লাইনে একটি)", "achievementsPlaceholder": "প্রতি লাইনে একটি অর্জন লিখুন", "era": "যুগ / Era", "eraPlaceholder": "যেমন: ১৮০০-১৯০০", "region": "অঞ্চল / Region", "regionPlaceholder": "যেমন: চট্টগ্রাম, কক্সবাজার, রামু", "legacy": "ঐতিহাসিক গুরুত্ব", "renownedAchievements": "অবদান / অর্জন (প্রতি লাইনে একটি)", "save": "সংরক্ষণ করুন", "submit": "জমা দিন", "cancel": "বাতিল"},
        "detail": {"biography": "জীবনী", "achievements": "অর্জনসমূহ", "renownedAchievements": "অবদান / অর্জন", "legacy": "ঐতিহাসিক গুরুত্ব", "description": "বর্ণনা", "history": "ইতিহাস ও বিপ্লব", "goBack": "← ফিরে যান", "edit": "সম্পাদনা", "delete": "মুছুন"},
        "admin": {"pending": "অনুমোদন অপেক্ষা", "approved": "অনুমোদিত", "all": "সব", "approve": "অনুমোদন", "reject": "প্রত্যাখ্যান", "edit": "সম্পাদনা", "delete": "মুছুন", "submittedBy": "জমা দিয়েছেন: {{name}}"},
        "profile": {"user": "ব্যবহারকারী", "admin": "প্রশাসক", "logout": "লগআউট"},
        "confirmations": {"logout": "আপনি কি লগআউট করতে চান?", "deleteStory": "আপনি কি এই কাহিনী মুছে ফেলতে চান?", "deleteRenowned": "আপনি কি এই বিশিষ্ট ব্যক্তিত্ব মুছে ফেলতে চান?", "rejectStory": "আপনি কি এই কাহিনী প্রত্যাখ্যান করতে চান?", "clearAllUsers": "আপনি কি নিশ্চিত যে আপনি সব ব্যবহারকারী মুছে ফেলতে চান?\n\nএটি সব নিবন্ধিত ব্যবহারকারী, পেন্ডিং OTP, এবং বর্তমান সেশনের তথ্য মুছে দেবে।", "allUsersCleared": "সব ব্যবহারকারী মুছে ফেলা হয়েছে।\n\nএখন আপনি নতুন ব্যবহারকারী যোগ করতে পারেন।"},
        "dev": {"clearAllUsers": "🗑️ সব ব্যবহারকারী মুছুন (ডেভেলপমেন্ট)"},
        "searchResults": {"monks": "ভিক্ষু", "villages": "গ্রাম", "renowned": "বিশিষ্ট ব্যক্তিত্ব"}
    },
    en: {
        "app": {"title": "Buddhist Software", "admin": "Administrator"},
        "auth": {"welcome": "Welcome", "loginSubtitle": "Sign in to your account", "loginButton": "Login", "newAccount": "New Account", "createAccount": "Create a new account", "registerButton": "Register", "backToLogin": "← Back to Login", "goBack": "← Go Back", "usernameEmailPhone": "Username, Email or Phone Number", "usernameEmailPhonePlaceholder": "Enter username, email or phone number", "password": "Password", "passwordPlaceholder": "Enter password", "newUser": "New user?", "alreadyHaveAccount": "Already have an account?", "registrationMethod": "Registration Method", "phoneNumber": "Phone Number", "email": "Email", "emailAddress": "Email Address", "emailPlaceholder": "example@email.com", "name": "Name", "namePlaceholder": "Enter your name", "passwordMinLength": "Enter password (minimum 6 characters)", "confirmPassword": "Confirm Password", "confirmPasswordPlaceholder": "Enter password again", "verificationCode": "Verification Code", "verificationSubtitle": "Enter the code sent to your {{method}} ({{identifier}})", "sixDigitCode": "6-digit Verification Code", "verify": "Verify", "resendCode": "Resend Code", "resendTimer": "Try again after {{seconds}} seconds", "demoMode": "Demo Mode: Verification Code", "demoNote": "(In production, this will be sent via email/SMS)"},
        "errors": {"userNotFound": "User not found. Please provide correct information.", "wrongPassword": "Wrong password. Please try again.", "accountNotVerified": "Your account has not been verified yet. Please activate your account with the verification code.", "invalidOtp": "Invalid verification code. Please try again.", "otpExpired": "Verification code has expired.", "invalidOtpFormat": "Please enter a valid 6-digit code.", "nameMinLength": "Name must be at least 2 characters.", "invalidPhone": "Please enter a valid phone number (11 digits, starting with 01)", "invalidEmail": "Please enter a valid email address.", "passwordMinLength": "Password must be at least 6 characters.", "passwordMismatch": "Passwords do not match. Please try again.", "emailExists": "This email is already registered. Please use a different email.", "phoneExists": "This phone number is already registered. Please use a different phone number.", "emailPending": "An account has been created with this email but has not been verified yet. Please activate your account with the verification code.", "phonePending": "An account has been created with this phone number but has not been verified yet. Please activate your account with the verification code.", "verificationDataMissing": "Verification data not found. Please register again.", "resendDataMissing": "Data not found for resending."},
        "success": {"verificationSuccess": "Verification successful! Your account has been activated.", "codeResent": "New verification code has been sent.", "registrationSubmitted": "Your story has been submitted! It will be published after admin approval."},
        "navigation": {"monks": "Monks", "villages": "Villages", "renowned": "Renowned People", "admin": "Admin", "search": "Search", "profile": "Profile"},
        "search": {"searchMonks": "Search monks…", "searchVillages": "Search villages…", "searchRenowned": "Search renowned people…", "globalSearch": "Search…", "noResults": "No results found"},
        "emptyStates": {"noMonks": "No stories yet", "noMonksDesc": "Start by adding the life story of a respected Buddhist monk from Bangladesh.", "noVillages": "No villages yet", "noVillagesDesc": "Start by adding information about a Buddhist village.", "noRenowned": "No renowned people yet", "noRenownedDesc": "Start by adding information about a distinguished figure in Buddhist history.", "noStories": "No stories"},
        "forms": {"addMonk": "Submit Story", "addRenowned": "Add Renowned Person", "editRenowned": "Edit", "name": "Name", "occupation": "Title/Role", "birthDate": "Birth Date", "deathDate": "Death Date", "imageUrl": "Image URL", "biography": "Biography", "biographyRequired": "Biography *", "achievements": "Education / Achievements (one per line)", "achievementsPlaceholder": "Enter one achievement per line", "era": "Era / Period", "eraPlaceholder": "e.g., 1800-1900", "region": "Region", "regionPlaceholder": "e.g., Chittagong, Cox's Bazar, Ramu", "legacy": "Historical Significance", "renownedAchievements": "Contributions / Achievements (one per line)", "save": "Save", "submit": "Submit", "cancel": "Cancel"},
        "detail": {"biography": "Biography", "achievements": "Achievements", "renownedAchievements": "Contributions / Achievements", "legacy": "Historical Significance", "description": "Description", "history": "History & Revolution", "goBack": "← Go Back", "edit": "Edit", "delete": "Delete"},
        "admin": {"pending": "Pending Approval", "approved": "Approved", "all": "All", "approve": "Approve", "reject": "Reject", "edit": "Edit", "delete": "Delete", "submittedBy": "Submitted by: {{name}}"},
        "profile": {"user": "User", "admin": "Administrator", "logout": "Logout"},
        "confirmations": {"logout": "Do you want to logout?", "deleteStory": "Do you want to delete this story?", "deleteRenowned": "Do you want to delete this renowned person?", "rejectStory": "Do you want to reject this story?", "clearAllUsers": "Are you sure you want to delete all users?\n\nThis will remove all registered users, pending OTPs, and current session data.", "allUsersCleared": "All users have been deleted.\n\nYou can now add new users."},
        "dev": {"clearAllUsers": "🗑️ Clear All Users (Development)"},
        "searchResults": {"monks": "Monks", "villages": "Villages", "renowned": "Renowned People"}
    },
    pli: {
        "app": {"title": "Bangladesh Buddhānubhikkhū", "admin": "Pesaka"},
        "auth": {"welcome": "Svāgata", "loginSubtitle": "Apanakassa khaṭṭhe pavisatha", "loginButton": "Pavisatha", "newAccount": "Navaka Khaṭṭha", "createAccount": "Navakaṃ khaṭṭhaṃ nibbattetha", "registerButton": "Nibbattetha", "backToLogin": "← Pavisanaṃ otaratha", "goBack": "← Otaratha", "usernameEmailPhone": "Nāmadheyya, e-mail vā telephona-saṅkhyā", "usernameEmailPhonePlaceholder": "Nāmadheyya, e-mail vā telephona-saṅkhyā likhatha", "password": "Guḷa-pada", "passwordPlaceholder": "Guḷa-padaṃ likhatha", "newUser": "Navako bhāvaka?", "alreadyHaveAccount": "Pubbena khaṭṭhaṃ atthi?", "registrationMethod": "Nibbattanā-kāraṇa", "phoneNumber": "Telephona-saṅkhyā", "email": "E-mail", "emailAddress": "E-mail adhikāraṇa", "emailPlaceholder": "example@email.com", "name": "Nāma", "namePlaceholder": "Apanakaṃ nāmaṃ likhatha", "passwordMinLength": "Guḷa-padaṃ likhatha (sakim cha akkharāni)", "confirmPassword": "Guḷa-padaṃ paccakkhāti", "confirmPasswordPlaceholder": "Guḷa-padaṃ puna likhatha", "verificationCode": "Paccakkhāti-koḍa", "verificationSubtitle": "{{method}} ({{identifier}}) pesitaṃ koḍaṃ likhatha", "sixDigitCode": "Cha-saṅkhyā-paccakkhāti-koḍa", "verify": "Paccakkhāti", "resendCode": "Koḍaṃ puna pesetha", "resendTimer": "{{seconds}} vikāḷe puna yatetha", "demoMode": "Dīpana-parikkhā: Paccakkhāti-koḍa", "demoNote": "(Paṭilābhe idaṃ e-mail/SMS pesessati)"},
        "errors": {"userNotFound": "Bhāvako na vijjati. Sādhu saha sacca-paññattiṃ detha.", "wrongPassword": "Micchā guḷa-pada. Punapi yatetha.", "accountNotVerified": "Tava khaṭṭhaṃ na paccakkhātaṃ. Sādhu paccakkhāti-koḍena khaṭṭhaṃ sāmaggatthaṃ karotha.", "invalidOtp": "Micchā paccakkhāti-koḍa. Punapi yatetha.", "otpExpired": "Paccakkhāti-koḍa atītaṃ.", "invalidOtpFormat": "Sādhu cha-saṅkhyā-koḍaṃ detha.", "nameMinLength": "Nāma sakim dve akkharāni bhavitabbaṃ.", "invalidPhone": "Sādhu saha telephona-saṅkhyā detha (ekādasa saṅkhyā, eka-dve ārabhitvā)", "invalidEmail": "Sādhu saha e-mail adhikāraṇaṃ detha.", "passwordMinLength": "Guḷa-pada sakim cha akkharāni bhavitabbaṃ.", "passwordMismatch": "Guḷa-padāni na sameti. Punapi yatetha.", "emailExists": "Etaṃ e-mail pubbena nibbattitaṃ. Sādhu aññaṃ e-mail paribhuñjatha.", "phoneExists": "Esaṃ telephona-saṅkhyā pubbena nibbattitā. Sādhu aññaṃ telephona-saṅkhyā paribhuñjatha.", "emailPending": "Etaṃ e-mail nibbattitaṃ khaṭṭhaṃ, na tu paccakkhātaṃ. Sādhu paccakkhāti-koḍena khaṭṭhaṃ sāmaggatthaṃ karotha.", "phonePending": "Esaṃ telephona-saṅkhyā nibbattitaṃ khaṭṭhaṃ, na tu paccakkhātaṃ. Sādhu paccakkhāti-koḍena khaṭṭhaṃ sāmaggatthaṃ karotha.", "verificationDataMissing": "Paccakkhāti-paññatti na vijjati. Punapi nibbattetha.", "resendDataMissing": "Puna-pesanāya paññatti na vijjati."},
        "success": {"verificationSuccess": "Paccakkhāti sampanna! Tava khaṭṭhaṃ sāmaggatthaṃ kataṃ.", "codeResent": "Navaka paccakkhāti-koḍa pesitaṃ.", "registrationSubmitted": "Tava kathā pesitā! Pesaka-anuññāya idaṃ pubbeta."},
        "navigation": {"monks": "Bhikkhū", "villages": "Gāmā", "renowned": "Paṇḍitā", "admin": "Pesaka", "search": "Olanā", "profile": "Bhattika"},
        "search": {"searchMonks": "Bhikkhū olanā…", "searchVillages": "Gāmā olanā…", "searchRenowned": "Paṇḍitā olanā…", "globalSearch": "Olanā…", "noResults": "Phalaṃ na vijjati"},
        "emptyStates": {"noMonks": "Kathā na vijjati", "noMonksDesc": "Bangladesh garu-bhikkhussa jīvita-kathāya ārabhatha.", "noVillages": "Gāmā na vijjanti", "noVillagesDesc": "Buddha-gāmassa paññatti ārabhatha.", "noRenowned": "Paṇḍitā na vijjanti", "noRenownedDesc": "Buddha-itihāsa-paṇḍitassa paññatti ārabhatha.", "noStories": "Kathā na vijjanti"},
        "forms": {"addMonk": "Kathā pesetha", "addRenowned": "Paṇḍitaṃ samodhāneti", "editRenowned": "Saṃsodheti", "name": "Nāma", "occupation": "Upādhi/Bhūmikā", "birthDate": "Jāti-divasa", "deathDate": "Maraṇa-divasa", "imageUrl": "Chavi URL", "biography": "Jīvita-kathā", "biographyRequired": "Jīvita-kathā *", "achievements": "Sikkhā / Sampadā (ekaṃ ekassa rekhāya)", "achievementsPlaceholder": "Ekaṃ rekhāya ekaṃ sampadaṃ likhatha", "era": "Kāla / Era", "eraPlaceholder": "Seyyathidaṃ: 1800-1900", "region": "Deśa", "regionPlaceholder": "Seyyathidaṃ: Chittagong, Cox's Bazar, Ramu", "legacy": "Itihāsa-mahattara", "renownedAchievements": "Upakāra / Sampadā (ekaṃ ekassa rekhāya)", "save": "Rakkhatha", "submit": "Pesetha", "cancel": "Paccakkhāti"},
        "detail": {"biography": "Jīvita-kathā", "achievements": "Sampadā", "renownedAchievements": "Upakāra / Sampadā", "legacy": "Itihāsa-mahattara", "description": "Nidassana", "history": "Itihāsa ca Kammaṇḍa", "goBack": "← Otaratha", "edit": "Saṃsodheti", "delete": "Uddharatha"},
        "admin": {"pending": "Anuññāya pekkhamāna", "approved": "Anuññāta", "all": "Sabba", "approve": "Anuññāti", "reject": "Paccakkhāti", "edit": "Saṃsodheti", "delete": "Uddharatha", "submittedBy": "Pesita: {{name}}"},
        "profile": {"user": "Bhāvaka", "admin": "Pesaka", "logout": "Nikkhamatha"},
        "confirmations": {"logout": "Nikkhamituṃ icchasi?", "deleteStory": "Imā kathāṃ uddharituṃ icchasi?", "deleteRenowned": "Imaṃ paṇḍitaṃ uddharituṃ icchasi?", "rejectStory": "Imā kathāṃ paccakkhātituṃ icchasi?", "clearAllUsers": "Sabbe bhāvake uddharituṃ niyatosi?\n\nIdaṃ sabbe nibbattita-bhāvake, pekkhamāna OTP, ca paccuppanna-sessi-paññattiṃ uddhareti.", "allUsersCleared": "Sabbe bhāvakā uddharitā.\n\nIdāni navake bhāvake samodhānetuṃ sakkhosi."},
        "dev": {"clearAllUsers": "🗑️ Sabbe Bhāvake Uddharatha (Vikkhambhana)"},
        "searchResults": {"monks": "Bhikkhū", "villages": "Gāmā", "renowned": "Paṇḍitā"}
    }
};

// Language change listeners (callbacks that update UI)
const languageChangeListeners = [];

/**
 * Load translations for a specific language
 * Uses embedded translations first (works with file:// protocol), 
 * falls back to fetch if embedded not available (for HTTP servers)
 * @param {string} lang - Language code (bn, en, pli)
 * @returns {Promise<Object>} Translations object
 */
async function loadTranslations(lang) {
    // Map language codes to file names
    const langFileMap = {
        'bn': 'bangla.json',
        'en': 'english.json',
        'pli': 'pali.json'
    };
    const fileName = langFileMap[lang] || `${lang}.json`;
    
    // Try to load from JSON files first (works with HTTP/HTTPS servers)
    try {
        console.log(`Attempting to load translations from locales/${fileName} for language: ${lang}`);
        const response = await fetch(`locales/${fileName}`);
        if (response.ok) {
            const translations = await response.json();
            console.log(`Successfully loaded translations from JSON file for ${lang}:`, Object.keys(translations).length, 'top-level keys');
            return translations;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.warn(`Could not load translations from JSON file (${error.message}). This is normal when opening file:// directly. Using embedded translations as fallback.`);
        
        // Fallback to embedded translations (for file:// protocol)
        if (embeddedTranslations && embeddedTranslations[lang]) {
            console.log(`Loading embedded translations for language: ${lang}`);
            const embedded = embeddedTranslations[lang];
            console.log(`Successfully loaded embedded translations for ${lang}:`, Object.keys(embedded).length, 'top-level keys');
            return Promise.resolve(embedded);
        }
        
        // If embedded also not available, try default language
        if (lang !== DEFAULT_LANGUAGE) {
            console.warn(`Falling back to ${DEFAULT_LANGUAGE}`);
            return loadTranslations(DEFAULT_LANGUAGE);
        }
        
        // Last resort: return empty object
        console.error('Failed to load translations from any source');
        return {};
    }
}

/**
 * Initialize i18n system
 * Loads saved language preference or defaults to Bangla
 * 
 * CRITICAL: This function MUST complete before updateAllTranslations() is called
 * Otherwise, translation keys will show instead of actual text because translations
 * object will be empty when t() function tries to look up keys.
 */
async function initI18n() {
    try {
        // Load saved language from localStorage
        const savedLang = localStorage.getItem('app_language');
        const lang = savedLang && ['bn', 'en', 'pli'].includes(savedLang) 
            ? savedLang 
            : DEFAULT_LANGUAGE;
        
        // Load translations - THIS MUST COMPLETE FIRST
        // Without this, translations object is empty and t() returns keys
        translations = await loadTranslations(lang);
        currentLanguage = lang;
        
        // Verify translations loaded successfully
        if (!translations || Object.keys(translations).length === 0) {
            console.error('Failed to load translations, using fallback');
            // Try to load default language as fallback
            translations = await loadTranslations(DEFAULT_LANGUAGE);
        }
        
        // Apply language-specific font
        applyLanguageFont(lang);
        
        // Update all UI elements with translations
        // This must happen AFTER translations are loaded
        updateAllTranslations();
        
        // Trigger language change listeners
        notifyLanguageChange();
        
        console.log(`i18n initialized with language: ${lang}`, translations);
    } catch (error) {
        console.error('Error initializing i18n:', error);
        // Try to load default language as last resort
        try {
            translations = await loadTranslations(DEFAULT_LANGUAGE);
            currentLanguage = DEFAULT_LANGUAGE;
            updateAllTranslations();
        } catch (fallbackError) {
            console.error('Failed to load fallback translations:', fallbackError);
        }
    }
}

/**
 * Get translation for a key
 * Supports nested keys with dot notation (e.g., 'auth.welcome')
 * Supports interpolation with {{variable}} syntax
 * 
 * @param {string} key - Translation key (supports dot notation)
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated text
 * 
 * @example
 * t('auth.welcome') // Returns "স্বাগতম" in Bangla
 * t('auth.verificationSubtitle', {method: 'ইমেইল', identifier: 'test@email.com'})
 */
/**
 * Get translation for a key
 * 
 * CRITICAL FIX EXPLANATION:
 * Previously, this function was returning the key itself (e.g., "auth.welcome") 
 * when translations weren't loaded or when a key wasn't found. This caused 
 * translation keys to appear in the UI instead of actual text.
 * 
 * The fix:
 * 1. Return null if translations aren't loaded (caller should handle this)
 * 2. Return null if key is not found (so updateAllTranslations can skip it)
 * 3. Only return a string if we have a valid translation
 * 
 * This ensures updateAllTranslations() only updates elements when we have
 * valid translations, preserving the original HTML text as fallback.
 */
function t(key, params = {}) {
    // Safety check: If translations haven't loaded yet, return null
    // This allows updateAllTranslations to skip updating this element
    // and preserve the original HTML text content
    if (!translations || Object.keys(translations).length === 0) {
        console.warn(`Translation called but translations not loaded yet for key: ${key}`);
        return null; // Return null to indicate translation not available
    }
    
    // Navigate through nested object using dot notation
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Key not found in translations - return null
            // This prevents the key from being set as textContent
            console.warn(`Translation key not found: ${key}`);
            return null; // Return null so caller knows translation unavailable
        }
    }
    
    // If value is not a string, return null
    if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return null;
    }
    
    // Replace interpolation variables {{variable}}
    return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return params[varName] !== undefined ? params[varName] : match;
    });
}

/**
 * Set current language and update all UI
 * @param {string} lang - Language code (bn, en, pli)
 * 
 * CRITICAL: This function must load translations BEFORE updating UI
 * Otherwise, updateAllTranslations() will run with empty translations object
 * and show keys instead of translated text.
 */
async function setLanguage(lang) {
    if (!['bn', 'en', 'pli'].includes(lang)) {
        console.error(`Invalid language code: ${lang}`);
        return;
    }
    
    try {
        console.log(`setLanguage called with: ${lang}`);
        
        // Load translations for new language - MUST COMPLETE FIRST
        const loadedTranslations = await loadTranslations(lang);
        console.log(`Loaded translations:`, loadedTranslations ? Object.keys(loadedTranslations).length : 0, 'top-level keys');
        
        // Only update if translations loaded successfully
        if (loadedTranslations && Object.keys(loadedTranslations).length > 0) {
            translations = loadedTranslations;
            currentLanguage = lang;
            
            // Save to localStorage
            localStorage.setItem('app_language', lang);
            console.log(`Saved language preference: ${lang}`);
            
            // Apply language-specific font
            applyLanguageFont(lang);
            console.log(`Applied font for language: ${lang}`);
            
            // Update all UI elements with new translations
            // This must happen AFTER translations are loaded
            updateAllTranslations();
            console.log(`Updated all translations in UI`);
            
            // Notify all listeners (for dynamic content updates)
            notifyLanguageChange();
            console.log(`Notified language change listeners`);
            
            console.log(`Language switched to: ${lang} successfully`);
        } else {
            console.error(`Failed to load translations for ${lang} - translations object is empty or null`);
            throw new Error(`Failed to load translations for ${lang}`);
        }
    } catch (error) {
        console.error(`Error switching language to ${lang}:`, error);
        throw error; // Re-throw so caller can handle it
    }
}

/**
 * Get current language code
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Apply language-specific font styles
 * @param {string} lang - Language code
 */
function applyLanguageFont(lang) {
    const html = document.documentElement;
    
    // Remove previous language classes
    html.classList.remove('lang-bn', 'lang-en', 'lang-pli');
    
    // Add new language class
    html.classList.add(`lang-${lang}`);
    
    // Set font family based on language
    if (lang === 'pli') {
        // Pāli uses Roman script with diacritics
        document.body.style.fontFamily = "'Noto Serif', 'Times New Roman', serif";
    } else if (lang === 'bn') {
        // Bangla uses Bengali script
        document.body.style.fontFamily = "'Noto Sans Bengali', 'Segoe UI', sans-serif";
    } else {
        // English
        document.body.style.fontFamily = "'Segoe UI', 'Noto Sans Bengali', sans-serif";
    }
}

/**
 * Register a callback that will be called when language changes
 * Use this to update UI elements that need translation
 * 
 * @param {Function} callback - Function to call on language change
 */
function onLanguageChange(callback) {
    if (typeof callback === 'function') {
        languageChangeListeners.push(callback);
    }
}

/**
 * Notify all registered listeners that language has changed
 */
function notifyLanguageChange() {
    languageChangeListeners.forEach(callback => {
        try {
            callback(currentLanguage);
        } catch (error) {
            console.error('Error in language change listener:', error);
        }
    });
}

/**
 * Update element's text content with translation
 * Adds data-i18n attribute to track which key to use
 * 
 * @param {string} selector - CSS selector or element
 * @param {string} key - Translation key
 * @param {Object} params - Optional parameters for interpolation
 */
function updateElement(selector, key, params = {}) {
    const element = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
    
    if (element) {
        element.textContent = t(key, params);
        element.setAttribute('data-i18n', key);
    }
}

/**
 * Update element's placeholder with translation
 * @param {string} selector - CSS selector or element
 * @param {string} key - Translation key
 * @param {Object} params - Optional parameters for interpolation
 */
function updatePlaceholder(selector, key, params = {}) {
    const element = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
    
    if (element) {
        element.placeholder = t(key, params);
        element.setAttribute('data-i18n-placeholder', key);
    }
}

/**
 * Update element's value with translation
 * @param {string} selector - CSS selector or element
 * @param {string} key - Translation key
 * @param {Object} params - Optional parameters for interpolation
 */
function updateValue(selector, key, params = {}) {
    const element = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
    
    if (element) {
        element.value = t(key, params);
        element.setAttribute('data-i18n-value', key);
    }
}

/**
 * Update all elements with data-i18n attributes
 * Automatically updates textContent, placeholder, or value based on attribute
 * 
 * CRITICAL: This function must be called AFTER translations are loaded.
 * If translations object is empty, t() will return the key itself, causing
 * keys like "auth.welcome" to display instead of actual translated text.
 */
function updateAllTranslations() {
    // Check if translations are loaded
    if (!translations || Object.keys(translations).length === 0) {
        console.warn('updateAllTranslations called but translations not loaded yet');
        return;
    }
    
    // Update textContent for elements with data-i18n attribute
    // These are elements like <h1 data-i18n="auth.welcome">স্বাগতম</h1>
    // The initial text content gets replaced with translated text
    // CRITICAL: Only update if t() returns a non-null value (valid translation)
    // If t() returns null, we skip updating to preserve original HTML text
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Updating ${elements.length} elements with data-i18n attributes`);
    let updatedCount = 0;
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const translated = t(key);
            // Only update if we got a valid translation (non-null string)
            // This prevents keys from being set as textContent
            if (translated !== null && typeof translated === 'string') {
                el.textContent = translated;
                updatedCount++;
            }
            // If translated is null, we skip updating - this preserves the
            // original HTML text content as a fallback
        }
    });
    
    console.log(`Updated ${updatedCount} of ${elements.length} elements with translations`);
    
    // Update placeholder for input elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) {
            const translated = t(key);
            // Only update if we have a valid translation
            if (translated !== null && typeof translated === 'string') {
                el.placeholder = translated;
            }
        }
    });
    
    // Update value for input/button elements
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.getAttribute('data-i18n-value');
        if (key) {
            const translated = t(key);
            // Only update if we have a valid translation
            if (translated !== null && typeof translated === 'string') {
                el.value = translated;
            }
        }
    });
}

// Make functions available globally
window.i18n = {
    t,
    setLanguage,
    getCurrentLanguage,
    initI18n,
    onLanguageChange,
    updateElement,
    updatePlaceholder,
    updateValue,
    updateAllTranslations
};

/**
 * Initialize i18n system when DOM is ready
 * 
 * IMPORTANT: We use a flag to ensure initI18n completes before other scripts
 * try to use translations. The HTML file should wait for this to complete.
 */
let i18nInitialized = false;
const i18nReadyPromise = (async () => {
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }
    await initI18n();
    i18nInitialized = true;
})();

// Make ready promise available globally
window.i18nReady = i18nReadyPromise;

// Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    i18nReadyPromise.catch(err => console.error('i18n initialization error:', err));
}

