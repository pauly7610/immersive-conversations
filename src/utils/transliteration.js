/**
 * Provides romanized transliterations for non-Latin script languages
 * @param {string} text - The text to transliterate
 * @param {string} language - The source language
 * @returns {string} - Romanized/transliterated text
 */
export const getTransliteration = (text, language) => {
  // Simple transliteration mappings
  // Note: In a production app, you would use a proper transliteration library
  
  const simpleMappings = {
    // Japanese (very simplified)
    'こんにちは': 'Konnichiwa',
    '会話の練習へようこそ': 'Kaiwa no renshū e yōkoso',
    '寿司を注文したいです': 'Sushi o chūmon shitai desu',
    '今日のおすすめは何ですか': 'Kyō no osusume wa nan desu ka',
    'お会計をお願いします': 'O-kaikei o onegaishimasu',
    '駅はどこですか': 'Eki wa doko desu ka',
    'ホテルを探しています': 'Hoteru o sagashite imasu',
    '東京までの切符はいくらですか': 'Tōkyō made no kippu wa ikura desu ka',
    '10時に会議があります': 'Jū-ji ni kaigi ga arimasu',
    'プロジェクトについて話し合えますか': 'Purojekuto ni tsuite hanashiaemasu ka',
    'メールを送る必要があります': 'Mēru o okuru hitsuyō ga arimasu',
    'お名前は何ですか': 'O-namae wa nan desu ka',
    'そのシャツが好きです': 'Sono shatsu ga suki desu',
    'どこから来ましたか': 'Doko kara kimashita ka',
    
    // Korean (very simplified)
    '안녕하세요': 'Annyeonghaseyo',
    '대화 연습에 오신 것을 환영합니다': 'Daehwa yeonseub-e osin geos-eul hwanyeonghamnida',
    '비빔밥을 주문하고 싶습니다': 'Bibimbap-eul jumunhago sipseumnida',
    '오늘의 특선 요리는 무엇인가요': 'Oneul-ui teukson yori-neun mueos-ingayo',
    '계산서 부탁드립니다': 'Gyesanseo butakdeurimnida',
    '역이 어디에 있나요': 'Yeog-i eodie issnayo',
    '호텔을 찾고 있습니다': 'Hotel-eul chatgo isseumnida',
    '서울까지 티켓은 얼마인가요': 'Seoul-kkaji tiket-eun eolma-ingayo',
    '10시에 회의가 있습니다': 'Yeol-si-e hoeuiga isseumnida',
    '프로젝트에 대해 논의할 수 있을까요': 'Peurojekteu-e daehae nonuihal su isseulkkayo',
    '이메일을 보내야 합니다': 'Imeil-eul bonaeyahabnida',
    '이름이 뭐예요': 'Ireum-i mwoyeyo',
    '셔츠가 마음에 들어요': 'Syeocheugan ma-eum-e deul-eoyo',
    '어디에서 왔어요': 'Eodie-seo wass-eoyo',
    
    // Russian (very simplified)
    'Здравствуйте': 'Zdravstvuyte',
    'Добро пожаловать на разговорную практику': 'Dobro pozhalovat\' na razgovornuyu praktiku',
    'Я хотел бы заказать борщ, пожалуйста': 'Ya khotel by zakazat\' borshch, pozhaluysta',
    'Какое у вас фирменное блюдо': 'Kakoye u vas firmennoye blyudo',
    'Счет, пожалуйста': 'Schet, pozhaluysta',
    'Где находится вокзал': 'Gde nakhoditsya vokzal',
    'Я ищу гостиницу': 'Ya ishchu gostinitsu',
    'Сколько стоит билет до Москвы': 'Skol\'ko stoit bilet do Moskvy',
    'У меня встреча в 10 часов': 'U menya vstrecha v 10 chasov',
    'Можем ли мы обсудить проект': 'Mozhem li my obsudit\' proyekt',
    'Мне нужно отправить электронное письмо': 'Mne nuzhno otpravit\' elektronnoye pis\'mo',
    'Как вас зовут': 'Kak vas zovut',
    'Мне нравится ваша рубашка': 'Mne nravitsya vasha rubashka',
    'Откуда вы': 'Otkuda vy',
    
    // Arabic (very simplified)
    'مرحباً': 'Marhaban',
    'أهلاً بك في تدريب المحادثة': 'Ahlan bika fi tadrib almuhadatha',
    'أود أن أطلب الكسكس من فضلك': 'Awadu an atluba alkuskus min fadlik',
    'ما هو طبق اليوم': 'Ma huwa tabaq alyawm',
    'الحساب من فضلك': 'Alhisab min fadlik',
    'أين المحطة': 'Ayna almahatta',
    'أبحث عن فندق': 'Abhath ean funduq',
    'كم تكلفة تذكرة إلى القاهرة': 'Kam taklifa tadhkira \'iilaa alqahira',
    'لدي اجتماع في الساعة 10': 'Ladaya ajtimae fi alsaea 10',
    'هل يمكننا مناقشة المشروع': 'Hal yumkinuna munaqashat almashrua',
    'أحتاج إلى إرسال بريد إلكتروني': 'Ahtaj \'iilaa \'iirsal barid \'iiliktruni',
    'ما هو اسمك': 'Ma huwa asmuk',
    'أحب قميصك': 'Ahib qamisak',
    'من أين أنت': 'Min \'ayn \'ant'
  };
  
  // Check if we have a direct mapping
  if (simpleMappings[text]) {
    return simpleMappings[text];
  }
  
  // For text we don't have mappings for, return a message
  switch (language.toLowerCase()) {
    case 'japanese':
      return '[Japanese pronunciation guide not available]';
    case 'korean':
      return '[Korean pronunciation guide not available]';
    case 'russian':
      return '[Russian pronunciation guide not available]';
    case 'arabic':
      return '[Arabic pronunciation guide not available]';
    default:
      return ''; // No transliteration needed for Latin-script languages
  }
};

/**
 * Checks if a language uses non-Latin script
 * @param {string} language - The language to check
 * @returns {boolean} - True if the language uses non-Latin script
 */
export const needsTransliteration = (language) => {
  const nonLatinLanguages = ['japanese', 'korean', 'russian', 'arabic', 'chinese', 'thai'];
  return nonLatinLanguages.includes(language.toLowerCase());
}; 