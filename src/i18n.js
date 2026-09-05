export const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

const SPEECH_LANG = {
  en: 'en-IN',
  ta: 'ta-IN',
  hi: 'hi-IN',
  ml: 'ml-IN',
};

export const COPY = {
  en: {
    welcome: 'Welcome',
    enterDetails: 'Please enter your details to continue.',
    language: 'Language',
    iAmA: 'I am a',
    patient: 'Patient',
    caretaker: 'Caretaker',
    name: 'Name',
    namePlaceholder: 'e.g. John Doe',
    age: 'Age',
    agePlaceholder: 'e.g. 75',
    emergency: 'Emergency Contact',
    emergencyPlaceholder: 'e.g. 555-0192',
    continue: 'Save & Continue',
    caretakerContinue: 'Open Caretaker Tools',
    aiTitle: 'AI Guide',
    aiSubtitle: 'I am speaking to help you.',
    speakDefault: 'Hello. Do you need help?',
    speakSelected: 'You selected English. I will speak in English.',
    speakLogin: 'Please choose your language, enter your details, then press Save and Continue.',
    speakTest: 'This is a memory game. Please tap the squares to find matching pictures.',
    speakTasks: 'These are your tasks for today. Tap the circle next to a task when you have completed it.',
    speakGames: 'Here you can play some games. Tap one of the large buttons to start playing.',
    tasksTab: 'Tasks',
    gamesTab: 'Games',
    emergencyTab: 'SOS',
    emergencyTitle: 'Emergency Call',
    emergencyDesc: 'Tap the button below to call your emergency contact.',
    callNow: 'Call Now',
    speakEmergency: 'This is the emergency page. Tap the button to call for help.',
    verifyOtp: 'Verify OTP',
    enterOtp: 'Enter the 4-digit code sent to your emergency contact number.',
    otpSent: 'OTP sent to',
    verifyAndContinue: 'Verify & Continue',
    otpInvalid: 'Please enter a valid 4-digit code.',
    resendOtp: 'Resend OTP',
    goBack: 'Go Back',
  },
  ta: {
    welcome: 'வரவேற்பு',
    enterDetails: 'தொடர உங்கள் விவரங்களை உள்ளிடவும்.',
    language: 'மொழி',
    iAmA: 'நான்',
    patient: 'நோயாளி',
    caretaker: 'பராமரிப்பாளர்',
    name: 'பெயர்',
    namePlaceholder: 'எ.கா. ராஜன்',
    age: 'வயது',
    agePlaceholder: 'எ.கா. 75',
    emergency: 'அவசர தொடர்பு',
    emergencyPlaceholder: 'எ.கா. 555-0192',
    continue: 'சேமித்து தொடரவும்',
    caretakerContinue: 'பராமரிப்பாளர் கருவிகளைத் திறக்க',
    aiTitle: 'AI வழிகாட்டி',
    aiSubtitle: 'உதவ நான் பேசுகிறேன்.',
    speakDefault: 'வணக்கம். உங்களுக்கு உதவி வேண்டுமா?',
    speakSelected: 'நீங்கள் தமிழைத் தேர்ந்தெடுத்தீர்கள். நான் தமிழில் பேசுவேன்.',
    speakLogin: 'தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுத்து, விவரங்களை நிரப்பி, சேமித்து தொடரவும் என்பதை அழுத்தவும்.',
    speakTest: 'இது ஒரு நினைவாற்றல் விளையாட்டு. பொருந்தும் படங்களைக் கண்டுபிடிக்க சதுரங்களைத் தொடவும்.',
    speakTasks: 'இவை இன்றைய உங்கள் பணிகள். ஒரு பணியை முடித்ததும் அதன் அருகிலுள்ள வட்டத்தைத் தொடவும்.',
    speakGames: 'இங்கே நீங்கள் விளையாட்டுகளை விளையாடலாம். விளையாட பெரிய பொத்தானைத் தொடவும்.',
    tasksTab: 'பணிகள்',
    gamesTab: 'விளையாட்டுகள்',
    emergencyTab: 'அவசரம்',
    emergencyTitle: 'அவசர அழைப்பு',
    emergencyDesc: 'உங்கள் அவசர தொடர்பை அழைக்க கீழே உள்ள பொத்தானைத் தொடவும்.',
    callNow: 'இப்போதே அழைக்கவும்',
    speakEmergency: 'இது அவசர உதவிப் பக்கம். உதவிக்கு அழைக்க பொத்தானைத் தொடவும்.',
    verifyOtp: 'OTP சரிபார்க்கவும்',
    enterOtp: 'உங்கள் அவசர தொடர்பு எண்ணுக்கு அனுப்பப்பட்ட 4 இலக்கக் குறியீட்டை உள்ளிடவும்.',
    otpSent: 'OTP அனுப்பப்பட்டது',
    verifyAndContinue: 'சரிபார்த்து தொடரவும்',
    otpInvalid: 'சரியான 4 இலக்கக் குறியீட்டை உள்ளிடவும்.',
    resendOtp: 'OTP மீண்டும் அனுப்பு',
    goBack: 'பின் செல்',
  },
  hi: {
    welcome: 'स्वागत है',
    enterDetails: 'जारी रखने के लिए अपनी जानकारी भरें।',
    language: 'भाषा',
    iAmA: 'मैं हूँ',
    patient: 'मरीज',
    caretaker: 'देखभालकर्ता',
    name: 'नाम',
    namePlaceholder: 'जैसे राम',
    age: 'आयु',
    agePlaceholder: 'जैसे 75',
    emergency: 'आपातकालीन संपर्क',
    emergencyPlaceholder: 'जैसे 555-0192',
    continue: 'सहेजें और जारी रखें',
    caretakerContinue: 'देखभालकर्ता टूल खोलें',
    aiTitle: 'AI गाइड',
    aiSubtitle: 'मैं आपकी मदद के लिए बोल रहा हूँ।',
    speakDefault: 'नमस्ते। क्या आपको मदद चाहिए?',
    speakSelected: 'आपने हिंदी चुनी है। मैं हिंदी में बोलूँगी।',
    speakLogin: 'कृपया अपनी भाषा चुनें, अपनी जानकारी भरें, फिर सहेजें और जारी रखें दबाएँ।',
    speakTest: 'यह एक स्मृति खेल है। मिलती-जुलती तस्वीरें खोजने के लिए वर्गों पर टैप करें।',
    speakTasks: 'ये आपके आज के काम हैं। काम पूरा होने पर उसके पास वाले गोले पर टैप करें।',
    speakGames: 'यहाँ आप कुछ खेल खेल सकते हैं। खेल शुरू करने के लिए बड़े बटन पर टैप करें।',
    tasksTab: 'कार्य',
    gamesTab: 'खेल',
    emergencyTab: 'आपातकाल',
    emergencyTitle: 'आपातकालीन कॉल',
    emergencyDesc: 'अपने आपातकालीन संपर्क को कॉल करने के लिए नीचे दिए गए बटन पर टैप करें।',
    callNow: 'अभी कॉल करें',
    speakEmergency: 'यह आपातकालीन पृष्ठ है। मदद के लिए कॉल करने के लिए बटन पर टैप करें।',
    verifyOtp: 'OTP सत्यापित करें',
    enterOtp: 'आपके आपातकालीन संपर्क नंबर पर भेजा गया 4 अंकों का कोड दर्ज करें।',
    otpSent: 'OTP भेजा गया',
    verifyAndContinue: 'सत्यापित करें और जारी रखें',
    otpInvalid: 'कृपया एक मान्य 4 अंकों का कोड दर्ज करें।',
    resendOtp: 'OTP पुनः भेजें',
    goBack: 'वापस जाएँ',
  },
  ml: {
    welcome: 'സ്വാഗതം',
    enterDetails: 'തുടരാൻ നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക.',
    language: 'ഭാഷ',
    iAmA: 'ഞാൻ ഒരു',
    patient: 'രോഗി',
    caretaker: 'പരിചാരകൻ',
    name: 'പേര്',
    namePlaceholder: 'ഉദാ. രാജൻ',
    age: 'വയസ്സ്',
    agePlaceholder: 'ഉദാ. 75',
    emergency: 'അടിയന്തര ബന്ധം',
    emergencyPlaceholder: 'ഉദാ. 555-0192',
    continue: 'സേവ് ചെയ്ത് തുടരുക',
    caretakerContinue: 'പരിചാരക ഉപകരണങ്ങൾ തുറക്കുക',
    aiTitle: 'AI ഗൈഡ്',
    aiSubtitle: 'സഹായിക്കാൻ ഞാൻ സംസാരിക്കുന്നു.',
    speakDefault: 'നമസ്കാരം. നിങ്ങൾക്ക് സഹായം വേണോ?',
    speakSelected: 'നിങ്ങൾ മലയാളം തിരഞ്ഞെടുത്തു. ഞാൻ മലയാളത്തിൽ സംസാരിക്കും.',
    speakLogin: 'ദയവായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക, വിവരങ്ങൾ നൽകുക, എന്നിട്ട് സേവ് ആൻഡ് കണ്ടിന്യൂ അമർത്തുക.',
    speakTest: 'ഇതൊരു മെമ്മറി ഗെയിമാണ്. ഒത്തുപോകുന്ന ചിത്രങ്ങൾ കണ്ടെത്താൻ ചതുരങ്ങൾ ടാപ്പ് ചെയ്യുക.',
    speakTasks: 'ഇവയാണ് ഇന്നത്തെ നിങ്ങളുടെ ജോലികൾ. ഒരു ജോലി പൂർത്തിയാക്കിയാൽ അതിനടുത്തുള്ള വൃത്തം ടാപ്പ് ചെയ്യുക.',
    speakGames: 'ഇവിടെ നിങ്ങൾക്ക് ചില ഗെയിമുകൾ കളിക്കാം. കളി തുടങ്ങാൻ വലിയ ബട്ടൺ ടാപ്പ് ചെയ്യുക.',
    tasksTab: 'ജോലികൾ',
    gamesTab: 'ഗെയിമുകൾ',
    emergencyTab: 'അടിയന്തരം',
    emergencyTitle: 'അടിയന്തര കോൾ',
    emergencyDesc: 'നിങ്ങളുടെ അടിയന്തര ബന്ധത്തെ വിളിക്കാൻ താഴെയുള്ള ബട്ടൺ ടാപ്പ് ചെയ്യുക.',
    callNow: 'ഇപ്പോൾ വിളിക്കുക',
    speakEmergency: 'ഇതൊരു അടിയന്തര പേജാണ്. സഹായത്തിനായി വിളിക്കാൻ ബട്ടൺ ടാപ്പ് ചെയ്യുക.',
    verifyOtp: 'OTP പരിശോധിക്കുക',
    enterOtp: 'നിങ്ങളുടെ അടിയന്തര ബന്ധ നമ്പറിലേക്ക് അയച്ച 4 അക്ക കോഡ് നൽകുക.',
    otpSent: 'OTP അയച്ചു',
    verifyAndContinue: 'പരിശോധിച്ച് തുടരുക',
    otpInvalid: 'ദയവായി സാധുവായ 4 അക്ക കോഡ് നൽകുക.',
    resendOtp: 'OTP വീണ്ടും അയയ്ക്കുക',
    goBack: 'തിരികെ പോകുക',
  },
};

export function t(language, key) {
  return COPY[language]?.[key] || COPY.en[key] || key;
}

let currentAudio = null;

export function stopSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

export function speakKey(language, key) {
  stopSpeech();
  const src = `/voices/${language}/${key}.mp3`;
  const audio = new Audio(src);
  currentAudio = audio;
  audio.play().catch(() => {
    speakInLanguage(t(language, key), language);
  });
}

function pickVoice(langCode) {
  const voices = window.speechSynthesis.getVoices();
  const prefix = langCode.toLowerCase().split('-')[0];
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith(langCode.toLowerCase())) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix))
  );
}

export function speakInLanguage(text, language) {
  if (!window.speechSynthesis) return;
  const langCode = SPEECH_LANG[language] || 'en-IN';

  const speakNow = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.85;
    utterance.pitch = 1;
    const voice = pickVoice(langCode);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (!window.speechSynthesis.getVoices().length) {
    window.speechSynthesis.addEventListener('voiceschanged', speakNow, { once: true });
  }
  speakNow();
}
