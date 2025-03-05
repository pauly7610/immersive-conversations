export const scenarios = [
    {
        id: 1,
        category: 'Travel',
        title: 'Ordering Food in Spanish',
        cefrLevel: 'A1',
        duration: '5-7 min',
        illustration: 'travel-food.png',
        language: 'Spanish',
        keywords: ['restaurant', 'menu', 'ordering', 'basic communication'],
        prompt: 'You are at a Spanish restaurant. Order a meal and ask about the daily special.',
        description: 'Practice ordering food in a Spanish restaurant, learning essential vocabulary and phrases for dining out.',
        learningObjectives: [
            'Learn restaurant-related vocabulary',
            'Practice polite requests',
            'Understand menu items',
            'Improve conversational Spanish skills'
        ],
        keyVocabulary: [
            { word: 'Hola', translation: 'Hello', context: 'Greeting the waiter' },
            { word: 'Por favor', translation: 'Please', context: 'Being polite' },
            { word: 'Menú', translation: 'Menu', context: 'Asking for the menu' },
            { word: 'Especial del día', translation: 'Daily special', context: 'Asking about today\'s special' },
            { word: 'Quisiera', translation: 'I would like', context: 'Ordering food' },
            { word: 'Gracias', translation: 'Thank you', context: 'Showing appreciation' }
        ],
        difficulty: 'Easy',
        suggestedResponses: [
            "I'd like to order the paella, please.",
            "Could you tell me about today's special?",
            "I'll have a glass of red wine."
        ],
        type: 'food'
    },
    {
        id: 2,
        category: 'Work',
        title: 'Job Interview (French)',
        cefrLevel: 'B1',
        duration: '8-10 min',
        illustration: 'work-interview.png',
        language: 'French',
        keywords: ['professional', 'interview', 'career', 'self-introduction'],
        prompt: 'You are in a job interview for a marketing position. Introduce yourself and discuss your professional experience.',
        description: 'Practice professional communication and self-presentation in a job interview setting.',
        learningObjectives: [
            'Develop professional vocabulary',
            'Practice interview skills',
            'Improve self-presentation',
            'Enhance professional French communication'
        ],
        keyVocabulary: [
            { word: 'Bonjour', translation: 'Hello', context: 'Greeting the interviewer' },
            { word: 'Enchanté(e)', translation: 'Nice to meet you', context: 'Initial introduction' },
            { word: 'Expérience', translation: 'Experience', context: 'Discussing work history' },
            { word: 'Compétences', translation: 'Skills', context: 'Describing professional abilities' },
            { word: 'Motivation', translation: 'Motivation', context: 'Explaining interest in the job' },
            { word: 'Merci', translation: 'Thank you', context: 'Showing gratitude' }
        ],
        difficulty: 'Medium',
        type: 'job'
    },
    {
        id: 3,
        category: 'Social',
        title: 'Making Friends in German',
        cefrLevel: 'A2',
        duration: '6-8 min',
        illustration: 'social-friends.png',
        language: 'German',
        keywords: ['small talk', 'introductions', 'hobbies', 'socializing'],
        prompt: 'You are at a social gathering. Start a conversation, introduce yourself, and discuss your hobbies.',
        description: 'Practice social interaction and small talk in German, focusing on personal introductions and interests.',
        learningObjectives: [
            'Learn conversational German',
            'Practice personal introductions',
            'Discuss hobbies and interests',
            'Improve social communication skills'
        ],
        keyVocabulary: [
            { word: 'Hallo', translation: 'Hello', context: 'Greeting new people' },
            { word: 'Wie geht es dir?', translation: 'How are you?', context: 'Asking about someone\'s well-being' },
            { word: 'Ich heiße', translation: 'My name is', context: 'Introducing yourself' },
            { word: 'Hobby', translation: 'Hobby', context: 'Talking about interests' },
            { word: 'Gern', translation: 'Like', context: 'Expressing preferences' },
            { word: 'Auf Wiedersehen', translation: 'Goodbye', context: 'Ending the conversation' }
        ],
        difficulty: 'Hard',
        type: 'social'
    },
    {
        id: 4,
        category: 'Travel',
        title: 'Asking Directions in Italian',
        cefrLevel: 'A1',
        duration: '5-7 min',
        illustration: 'travel-directions.png',
        language: 'Italian',
        keywords: ['navigation', 'city', 'transportation', 'basic questions'],
        prompt: 'You are lost in an Italian city. Ask for directions to a specific landmark or location.',
        description: 'Practice asking for and understanding directions in Italian, focusing on basic navigation vocabulary.',
        learningObjectives: [
            'Learn navigation-related vocabulary',
            'Practice asking for directions',
            'Understand basic Italian instructions',
            'Improve travel communication skills'
        ],
        keyVocabulary: [
            { word: 'Scusi', translation: 'Excuse me', context: 'Getting someone\'s attention' },
            { word: 'Dove', translation: 'Where', context: 'Asking for location' },
            { word: 'Destra', translation: 'Right', context: 'Giving or following directions' },
            { word: 'Sinistra', translation: 'Left', context: 'Giving or following directions' },
            { word: 'Dritto', translation: 'Straight', context: 'Describing direction' },
            { word: 'Grazie', translation: 'Thank you', context: 'Showing appreciation' }
        ],
        difficulty: 'Easy',
        type: 'travel'
    },
    {
        id: 5,
        category: 'Work',
        title: 'Business Presentation in English',
        cefrLevel: 'B2',
        duration: '10-12 min',
        illustration: 'work-presentation.png',
        language: 'English',
        keywords: ['professional', 'presentation', 'business', 'communication'],
        prompt: 'Prepare and deliver a short business presentation about a new product or service.',
        description: 'Practice professional presentation skills in English, focusing on clear communication and persuasive techniques.',
        learningObjectives: [
            'Develop presentation vocabulary',
            'Practice public speaking',
            'Improve business communication',
            'Enhance professional English skills'
        ],
        keyVocabulary: [
            { word: 'Introduction', translation: 'Introduction', context: 'Starting the presentation' },
            { word: 'Key features', translation: 'Key features', context: 'Describing product attributes' },
            { word: 'Benefit', translation: 'Benefit', context: 'Explaining advantages' },
            { word: 'Target market', translation: 'Target market', context: 'Discussing potential customers' },
            { word: 'Innovative', translation: 'Innovative', context: 'Describing unique aspects' },
            { word: 'Conclusion', translation: 'Conclusion', context: 'Summarizing the presentation' }
        ],
        difficulty: 'Medium',
        type: 'work'
    },
    {
        id: 6,
        category: 'Social',
        title: 'Dating Conversation in Portuguese',
        cefrLevel: 'B1',
        duration: '7-9 min',
        illustration: 'social-dating.png',
        language: 'Portuguese',
        keywords: ['dating', 'personal', 'interests', 'romantic conversation'],
        prompt: 'You are on a first date at a café. Introduce yourself and ask questions to get to know the other person better.',
        description: 'Practice romantic conversation in Portuguese, focusing on personal introductions and getting to know someone.',
        learningObjectives: [
            'Learn dating-related vocabulary',
            'Practice personal questions',
            'Discuss interests and hobbies',
            'Improve conversational Portuguese'
        ],
        keyVocabulary: [
            { word: 'Olá', translation: 'Hello', context: 'Greeting your date' },
            { word: 'Prazer em conhecê-lo/la', translation: 'Nice to meet you', context: 'Initial introduction' },
            { word: 'Interesses', translation: 'Interests', context: 'Discussing hobbies' },
            { word: 'Gosto de', translation: 'I like', context: 'Expressing preferences' },
            { word: 'Trabalho', translation: 'Work', context: 'Discussing profession' }
        ],
        difficulty: 'Medium',
        type: 'social'
    },
    {
        id: 7,
        category: 'Travel',
        title: 'Hotel Check-in in Japanese',
        cefrLevel: 'A2',
        duration: '6-8 min',
        illustration: 'travel-hotel.png',
        language: 'Japanese',
        keywords: ['accommodation', 'booking', 'travel', 'polite requests'],
        type: 'travel'
    },
    {
        id: 8,
        category: 'Work',
        title: 'Technical Support Call in Korean',
        cefrLevel: 'B2',
        duration: '9-11 min',
        illustration: 'work-support.png',
        language: 'Korean',
        keywords: ['technical', 'problem-solving', 'customer service', 'professional communication'],
        type: 'work'
    },
    {
        id: 9,
        category: 'Social',
        title: 'Discussing Hobbies in Russian',
        cefrLevel: 'A2',
        duration: '7-9 min',
        illustration: 'social-hobbies.png',
        language: 'Russian',
        keywords: ['personal interests', 'leisure', 'conversation', 'getting to know someone'],
        type: 'social'
    },
    {
        id: 10,
        category: 'Travel',
        title: 'Shopping at a Market in Arabic',
        cefrLevel: 'A1',
        duration: '5-7 min',
        illustration: 'travel-market.png',
        language: 'Arabic',
        keywords: ['shopping', 'bargaining', 'market', 'basic transactions'],
        type: 'travel'
    },
    {
        id: 11,
        category: 'Travel',
        title: 'Airport Check-in in Spanish',
        cefrLevel: 'A2',
        duration: '6-8 min',
        illustration: 'travel-airport.png',
        language: 'Spanish',
        keywords: ['airport', 'check-in', 'luggage', 'boarding pass'],
        prompt: 'You are at the airport check-in counter. Check in for your flight and ask about luggage policies.',
        description: 'Practice airport check-in procedures in Spanish, focusing on essential travel vocabulary.',
        learningObjectives: [
            'Learn airport-related vocabulary',
            'Practice check-in procedures',
            'Understand luggage policies',
            'Improve travel communication skills'
        ],
        keyVocabulary: [
            { word: 'Billete', translation: 'Ticket', context: 'Checking flight details' },
            { word: 'Equipaje', translation: 'Luggage', context: 'Discussing baggage' },
            { word: 'Pasaporte', translation: 'Passport', context: 'Providing identification' },
            { word: 'Puerta de embarque', translation: 'Boarding gate', context: 'Finding your gate' },
            { word: 'Gracias', translation: 'Thank you', context: 'Showing appreciation' }
        ],
        difficulty: 'Medium',
        type: 'travel'
    },
    {
        id: 12,
        category: 'Work',
        title: 'Team Meeting in English',
        cefrLevel: 'B2',
        duration: '10-12 min',
        illustration: 'work-meeting.png',
        language: 'English',
        keywords: ['meeting', 'discussion', 'agenda', 'collaboration'],
        prompt: 'Participate in a team meeting to discuss project updates and next steps.',
        description: 'Practice effective communication and collaboration in a professional meeting setting.',
        learningObjectives: [
            'Develop meeting-related vocabulary',
            'Practice collaborative discussion',
            'Improve professional communication',
            'Enhance teamwork skills'
        ],
        keyVocabulary: [
            { word: 'Agenda', translation: 'Agenda', context: 'Setting the meeting agenda' },
            { word: 'Update', translation: 'Update', context: 'Providing project updates' },
            { word: 'Feedback', translation: 'Feedback', context: 'Giving and receiving feedback' },
            { word: 'Deadline', translation: 'Deadline', context: 'Discussing project timelines' },
            { word: 'Action items', translation: 'Action items', context: 'Assigning tasks' }
        ],
        difficulty: 'Medium',
        type: 'work'
    },
    {
        id: 13,
        category: 'Social',
        title: 'Birthday Party in French',
        cefrLevel: 'A1',
        duration: '5-7 min',
        illustration: 'social-birthday.png',
        language: 'French',
        keywords: ['party', 'celebration', 'friends', 'gifts'],
        prompt: 'You are at a friend\'s birthday party. Engage in small talk and discuss gift ideas.',
        description: 'Practice socializing at a party in French, focusing on casual conversation and gift-giving.',
        learningObjectives: [
            'Learn party-related vocabulary',
            'Practice casual conversation',
            'Discuss gift ideas',
            'Improve social interaction skills'
        ],
        keyVocabulary: [
            { word: 'Cadeau', translation: 'Gift', context: 'Discussing gift ideas' },
            { word: 'Fête', translation: 'Party', context: 'Talking about the celebration' },
            { word: 'Ami', translation: 'Friend', context: 'Referring to friends' },
            { word: 'Joyeux anniversaire', translation: 'Happy birthday', context: 'Wishing someone a happy birthday' },
            { word: 'Merci', translation: 'Thank you', context: 'Showing gratitude' }
        ],
        difficulty: 'Easy',
        type: 'social'
    },
    {
        id: 14,
        category: 'Food',
        title: 'Cooking Class in Italian',
        cefrLevel: 'B1',
        duration: '8-10 min',
        illustration: 'food-cooking.png',
        language: 'Italian',
        keywords: ['cooking', 'ingredients', 'recipe', 'kitchen'],
        prompt: 'Participate in a cooking class to learn how to make a traditional Italian dish.',
        description: 'Practice cooking-related vocabulary and instructions in Italian, focusing on recipes and ingredients.',
        learningObjectives: [
            'Learn cooking-related vocabulary',
            'Follow recipe instructions',
            'Understand ingredient lists',
            'Improve culinary communication skills'
        ],
        keyVocabulary: [
            { word: 'Ingrediente', translation: 'Ingredient', context: 'Discussing recipe components' },
            { word: 'Ricetta', translation: 'Recipe', context: 'Following cooking instructions' },
            { word: 'Cucina', translation: 'Kitchen', context: 'Referring to the cooking area' },
            { word: 'Cuocere', translation: 'Cook', context: 'Describing cooking actions' },
            { word: 'Buon appetito', translation: 'Enjoy your meal', context: 'Wishing someone a good meal' }
        ],
        difficulty: 'Medium',
        type: 'food'
    }
];