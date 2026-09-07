import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { UniversalEdgeTTS } from 'edge-tts-universal';

const VOICES = {
  en: 'en-IN-NeerjaNeural',
  ta: 'ta-IN-PallaviNeural',
  hi: 'hi-IN-SwaraNeural',
  ml: 'ml-IN-SobhanaNeural',
};

const LINES = {
  en: {
    speakSelected: 'You selected English. I will speak in English.',
    speakDefault: 'Hello. Do you need help?',
    speakLogin: 'Please choose your language, enter your details, then press Save and Continue.',
    speakTest: 'This is a memory game. Please tap the squares to find matching pictures.',
    speakTasks: 'These are your tasks for today. Tap the circle next to a task when you have completed it.',
    speakGames: 'Here you can play some games. Tap one of the large buttons to start playing.',
    speakEmergency: 'This is the emergency page. Tap the button to call for help.',
  },
  ta: {
    speakSelected: 'நீங்கள் தமிழைத் தேர்ந்தெடுத்தீர்கள். நான் தமிழில் பேசுவேன்.',
    speakDefault: 'வணக்கம். உங்களுக்கு உதவி வேண்டுமா?',
    speakLogin: 'தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுத்து, விவரங்களை நிரப்பி, சேமித்து தொடரவும் என்பதை அழுத்தவும்.',
    speakTest: 'இது ஒரு நினைவாற்றல் விளையாட்டு. பொருந்தும் படங்களைக் கண்டுபிடிக்க சதுரங்களைத் தொடவும்.',
    speakTasks: 'இவை இன்றைய உங்கள் பணிகள். ஒரு பணியை முடித்ததும் அதன் அருகிலுள்ள வட்டத்தைத் தொடவும்.',
    speakGames: 'இங்கே நீங்கள் விளையாட்டுகளை விளையாடலாம். விளையாட பெரிய பொத்தானைத் தொடவும்.',
    speakEmergency: 'இது அவசர உதவிப் பக்கம். உதவிக்கு அழைக்க பொத்தானைத் தொடவும்.',
  },
  hi: {
    speakSelected: 'आपने हिंदी चुनी है। मैं हिंदी में बोलूँगी।',
    speakDefault: 'नमस्ते। क्या आपको मदद चाहिए?',
    speakLogin: 'कृपया अपनी भाषा चुनें, अपनी जानकारी भरें, फिर सहेजें और जारी रखें दबाएँ।',
    speakTest: 'यह एक स्मृति खेल है। मिलती-जुलती तस्वीरें खोजने के लिए वर्गों पर टैप करें।',
    speakTasks: 'ये आपके आज के काम हैं। काम पूरा होने पर उसके पास वाले गोले पर टैप करें।',
    speakGames: 'यहाँ आप कुछ खेल खेल सकते हैं। खेल शुरू करने के लिए बड़े बटन पर टैप करें।',
    speakEmergency: 'यह आपातकालीन पृष्ठ है। मदद के लिए कॉल करने के लिए बटन पर टैप करें।',
  },
  ml: {
    speakSelected: 'നിങ്ങൾ മലയാളം തിരഞ്ഞെടുത്തു. ഞാൻ മലയാളത്തിൽ സംസാരിക്കും.',
    speakDefault: 'നമസ്കാരം. നിങ്ങൾക്ക് സഹായം വേണോ?',
    speakLogin: 'ദയവായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക, വിവരങ്ങൾ നൽകുക, എന്നിട്ട് സേവ് ആൻഡ് കണ്ടിന്യൂ അമർത്തുക.',
    speakTest: 'ഇതൊരു മെമ്മറി ഗെയിമാണ്. ഒത്തുപോകുന്ന ചിത്രങ്ങൾ കണ്ടെത്താൻ ചതുരങ്ങൾ ടാപ്പ് ചെയ്യുക.',
    speakTasks: 'ഇവയാണ് ഇന്നത്തെ നിങ്ങളുടെ ജോലികൾ. ഒരു ജോലി പൂർത്തിയാക്കിയാൽ അതിനടുത്തുള്ള വൃത്തം ടാപ്പ് ചെയ്യുക.',
    speakGames: 'ഇവിടെ നിങ്ങൾക്ക് ചില ഗെയിമുകൾ കളിക്കാം. കളി തുടങ്ങാൻ വലിയ ബട്ടൺ ടാപ്പ് ചെയ്യുക.',
    speakEmergency: 'ഇതൊരു അടിയന്തര പേജാണ്. സഹായത്തിനായി വിളിക്കാൻ ബട്ടൺ ടാപ്പ് ചെയ്യുക.',
  },
};

const outRoot = join(process.cwd(), 'public', 'voices');

async function main() {
  for (const [lang, phrases] of Object.entries(LINES)) {
    const dir = join(outRoot, lang);
    mkdirSync(dir, { recursive: true });
    for (const [key, text] of Object.entries(phrases)) {
      const tts = new UniversalEdgeTTS(text, VOICES[lang]);
      const result = await tts.synthesize();
      const file = join(dir, `${key}.mp3`);
      const bytes = result.audio instanceof Blob
        ? Buffer.from(await result.audio.arrayBuffer())
        : Buffer.from(result.audio);
      writeFileSync(file, bytes);
      console.log('Wrote', file);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
