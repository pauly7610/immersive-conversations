/**
 * Speaks the provided text using the browser's text-to-speech API
 * @param {string} text - The text to speak
 * @param {string} language - The language code
 */
export const speakText = (text, language) => {
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-speech not supported in this browser');
    return;
  }
  
  // Map language names to BCP 47 language tags
  const languageMap = {
    'Spanish': 'es-ES',
    'French': 'fr-FR',
    'German': 'de-DE',
    'Italian': 'it-IT',
    'Portuguese': 'pt-PT',
    'Japanese': 'ja-JP',
    'Korean': 'ko-KR',
    'Russian': 'ru-RU',
    'Arabic': 'ar-SA',
    'English': 'en-US'
  };
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageMap[language] || 'en-US';
  
  // Optional: adjust speech rate for better comprehension
  utterance.rate = 0.9;
  
  window.speechSynthesis.speak(utterance);
}; 