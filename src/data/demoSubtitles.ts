export interface SubtitleWord {
  word: string;
  start: number;
  end: number;
}

export interface SubtitleItem {
  id: string;
  startTime: number;
  endTime: number;
  start?: number;
  end?: number;
  text: string;
  words?: SubtitleWord[];
}

export const DEMO_PRELOADED_SUBTITLES: Record<string, SubtitleItem[]> = {
  hi: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "AAJ HUM KARENGE KUCH",
      words: [
        { word: "AAJ", start: 0.45, end: 0.74 },
        { word: "HUM", start: 0.74, end: 1.02 },
        { word: "KARENGE", start: 1.02, end: 1.56 },
        { word: "KUCH", start: 1.56, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "NAYA VIRAL TRY",
      words: [
        { word: "NAYA", start: 1.82, end: 2.22 },
        { word: "VIRAL", start: 2.22, end: 2.72 },
        { word: "TRY", start: 2.72, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "INSTAGRAM REELS MEIN",
      words: [
        { word: "INSTAGRAM", start: 3.70, end: 4.50 },
        { word: "REELS", start: 4.50, end: 4.90 },
        { word: "MEIN", start: 4.90, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "KAISE GROW KAREIN",
      words: [
        { word: "KAISE", start: 5.06, end: 5.48 },
        { word: "GROW", start: 5.48, end: 5.72 },
        { word: "KAREIN", start: 5.72, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "FOLLOW KARO ABHI AUR VIEWS PAO",
      words: [
        { word: "FOLLOW", start: 6.90, end: 7.28 },
        { word: "KARO", start: 7.28, end: 7.66 },
        { word: "ABHI", start: 7.66, end: 8.04 },
        { word: "AUR", start: 8.04, end: 8.30 },
        { word: "VIEWS", start: 8.30, end: 8.62 },
        { word: "PAO", start: 8.62, end: 9.10 }
      ]
    }
  ],
  "hi-in": [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "आज हम करेंगे कुछ",
      words: [
        { word: "आज", start: 0.45, end: 0.74 },
        { word: "हम", start: 0.74, end: 1.02 },
        { word: "करेंगे", start: 1.02, end: 1.56 },
        { word: "कुछ", start: 1.56, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "नया वायरल ट्राई",
      words: [
        { word: "नया", start: 1.82, end: 2.22 },
        { word: "वायरल", start: 2.22, end: 2.72 },
        { word: "ट्राई", start: 2.72, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "इंस्टाग्राम रील्स में",
      words: [
        { word: "इंस्टाग्राम", start: 3.70, end: 4.50 },
        { word: "रील्स", start: 4.50, end: 4.90 },
        { word: "में", start: 4.90, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "कैसे ग्रो करें",
      words: [
        { word: "कैसे", start: 5.06, end: 5.48 },
        { word: "ग्रो", start: 5.48, end: 5.72 },
        { word: "करें", start: 5.72, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "फॉलो करो अभी और व्यूज पाओ",
      words: [
        { word: "फॉलो", start: 6.90, end: 7.28 },
        { word: "करो", start: 7.28, end: 7.66 },
        { word: "अभी", start: 7.66, end: 8.04 },
        { word: "और", start: 8.04, end: 8.30 },
        { word: "व्यूज", start: 8.30, end: 8.62 },
        { word: "पाओ", start: 8.62, end: 9.10 }
      ]
    }
  ],
  en: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "TODAY WE WILL TRY",
      words: [
        { word: "TODAY", start: 0.45, end: 0.80 },
        { word: "WE", start: 0.80, end: 1.10 },
        { word: "WILL", start: 1.10, end: 1.45 },
        { word: "TRY", start: 1.45, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "SOMETHING TOTALLY NEW",
      words: [
        { word: "SOMETHING", start: 1.82, end: 2.30 },
        { word: "TOTALLY", start: 2.30, end: 2.80 },
        { word: "NEW", start: 2.80, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "ON INSTAGRAM REELS",
      words: [
        { word: "ON", start: 3.70, end: 4.10 },
        { word: "INSTAGRAM", start: 4.10, end: 4.65 },
        { word: "REELS", start: 4.65, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "HOW TO GROW FAST",
      words: [
        { word: "HOW", start: 5.06, end: 5.35 },
        { word: "TO", start: 5.35, end: 5.60 },
        { word: "GROW", start: 5.60, end: 5.90 },
        { word: "FAST", start: 5.90, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "FOLLOW NOW FOR MORE VIEWS",
      words: [
        { word: "FOLLOW", start: 6.90, end: 7.30 },
        { word: "NOW", start: 7.30, end: 7.70 },
        { word: "FOR", start: 7.70, end: 8.00 },
        { word: "MORE", start: 8.00, end: 8.40 },
        { word: "VIEWS", start: 8.40, end: 9.10 }
      ]
    }
  ],
  ar: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "اليوم سوف نجرب",
      words: [
        { word: "اليوم", start: 0.45, end: 0.90 },
        { word: "سوف", start: 0.90, end: 1.35 },
        { word: "نجرب", start: 1.35, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "شيئاً جديداً تماماً",
      words: [
        { word: "شيئاً", start: 1.82, end: 2.25 },
        { word: "جديداً", start: 2.25, end: 2.70 },
        { word: "تماماً", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "كيف تصبح مشهوراً",
      words: [
        { word: "كيف", start: 3.70, end: 4.10 },
        { word: "تصبح", start: 4.10, end: 4.55 },
        { word: "مشهوراً", start: 4.55, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "على ريلز وتيك توك",
      words: [
        { word: "على", start: 5.06, end: 5.35 },
        { word: "ريلز", start: 5.35, end: 5.75 },
        { word: "وتيك", start: 5.75, end: 6.00 },
        { word: "توك", start: 6.00, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "تابع الآن للمزيد من المشاهدات",
      words: [
        { word: "تابع", start: 6.90, end: 7.35 },
        { word: "الآن", start: 7.35, end: 7.80 },
        { word: "للمزيد", start: 7.80, end: 8.30 },
        { word: "من", start: 8.30, end: 8.60 },
        { word: "المشاهدات", start: 8.60, end: 9.10 }
      ]
    }
  ],
  ur: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "آج ہم کریں گے کچھ",
      words: [
        { word: "آج", start: 0.45, end: 0.90 },
        { word: "ہم", start: 0.90, end: 1.30 },
        { word: "کریں گے", start: 1.30, end: 1.65 },
        { word: "کچھ", start: 1.65, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "نیا وائرل طریقہ",
      words: [
        { word: "نیا", start: 1.82, end: 2.25 },
        { word: "وائرل", start: 2.25, end: 2.70 },
        { word: "طریقہ", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "انسٹاگرام ریلز میں",
      words: [
        { word: "انسٹاگرام", start: 3.70, end: 4.35 },
        { word: "ریلز", start: 4.35, end: 4.80 },
        { word: "میں", start: 4.80, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "تیزی سے کیسے بڑھیں",
      words: [
        { word: "تیزی", start: 5.06, end: 5.40 },
        { word: "سے", start: 5.40, end: 5.65 },
        { word: "کیسے", start: 5.65, end: 5.95 },
        { word: "بڑھیں", start: 5.95, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "ابھی فالو کریں زیادہ ویوز کے لئے",
      words: [
        { word: "ابھی", start: 6.90, end: 7.30 },
        { word: "فالو", start: 7.30, end: 7.75 },
        { word: "کریں", start: 7.75, end: 8.20 },
        { word: "زیادہ", start: 8.20, end: 8.60 },
        { word: "ویوز", start: 8.60, end: 9.10 }
      ]
    }
  ],
  es: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "HOY VAMOS A PROBAR",
      words: [
        { word: "HOY", start: 0.45, end: 0.85 },
        { word: "VAMOS", start: 0.85, end: 1.25 },
        { word: "A", start: 1.25, end: 1.45 },
        { word: "PROBAR", start: 1.45, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "ALGO TOTALMENTE NUEVO",
      words: [
        { word: "ALGO", start: 1.82, end: 2.25 },
        { word: "TOTALMENTE", start: 2.25, end: 2.75 },
        { word: "NUEVO", start: 2.75, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "CÓMO CRECER RÁPIDO",
      words: [
        { word: "CÓMO", start: 3.70, end: 4.15 },
        { word: "CRECER", start: 4.15, end: 4.60 },
        { word: "RÁPIDO", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "EN REELS Y TIKTOK",
      words: [
        { word: "EN", start: 5.06, end: 5.30 },
        { word: "REELS", start: 5.30, end: 5.70 },
        { word: "Y", start: 5.70, end: 5.85 },
        { word: "TIKTOK", start: 5.85, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "SÍGUEME AHORA PARA MÁS VISTAS",
      words: [
        { word: "SÍGUEME", start: 6.90, end: 7.35 },
        { word: "AHORA", start: 7.35, end: 7.80 },
        { word: "PARA", start: 7.80, end: 8.15 },
        { word: "MÁS", start: 8.15, end: 8.55 },
        { word: "VISTAS", start: 8.55, end: 9.10 }
      ]
    }
  ],
  fr: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "AUJOURD'HUI NOUS TESTONS",
      words: [
        { word: "AUJOURD'HUI", start: 0.45, end: 0.95 },
        { word: "NOUS", start: 0.95, end: 1.35 },
        { word: "TESTONS", start: 1.35, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "QUELQUE CHOSE DE NOUVEAU",
      words: [
        { word: "QUELQUE", start: 1.82, end: 2.20 },
        { word: "CHOSE", start: 2.20, end: 2.65 },
        { word: "DE", start: 2.65, end: 2.85 },
        { word: "NOUVEAU", start: 2.85, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "COMMENT DEVENIR VIRAL",
      words: [
        { word: "COMMENT", start: 3.70, end: 4.15 },
        { word: "DEVENIR", start: 4.15, end: 4.60 },
        { word: "VIRAL", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "SUR LES RÉSEAUX SOCIAUX",
      words: [
        { word: "SUR", start: 5.06, end: 5.30 },
        { word: "LES", start: 5.30, end: 5.60 },
        { word: "RÉSEAUX", start: 5.60, end: 6.00 },
        { word: "SOCIAUX", start: 6.00, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "ABONNEZ-VOUS POUR PLUS DE VUES",
      words: [
        { word: "ABONNEZ", start: 6.90, end: 7.35 },
        { word: "VOUS", start: 7.35, end: 7.70 },
        { word: "POUR", start: 7.70, end: 8.05 },
        { word: "PLUS", start: 8.05, end: 8.40 },
        { word: "DE", start: 8.40, end: 8.65 },
        { word: "VUES", start: 8.65, end: 9.10 }
      ]
    }
  ],
  de: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "HEUTE PROBIEREN WIR",
      words: [
        { word: "HEUTE", start: 0.45, end: 0.90 },
        { word: "PROBIEREN", start: 0.90, end: 1.45 },
        { word: "WIR", start: 1.45, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "ETWAS GANZ NEUES",
      words: [
        { word: "ETWAS", start: 1.82, end: 2.25 },
        { word: "GANZ", start: 2.25, end: 2.70 },
        { word: "NEUES", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "WIE MAN SCHNELL WÄCHST",
      words: [
        { word: "WIE", start: 3.70, end: 4.00 },
        { word: "MAN", start: 4.00, end: 4.30 },
        { word: "SCHNELL", start: 4.30, end: 4.70 },
        { word: "WÄCHST", start: 4.70, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "AUF SOCIAL MEDIA",
      words: [
        { word: "AUF", start: 5.06, end: 5.40 },
        { word: "SOCIAL", start: 5.40, end: 5.80 },
        { word: "MEDIA", start: 5.80, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "FOLGE JETZT FÜR MEHR VIEWS",
      words: [
        { word: "FOLGE", start: 6.90, end: 7.30 },
        { word: "JETZT", start: 7.30, end: 7.75 },
        { word: "FÜR", start: 7.75, end: 8.10 },
        { word: "MEHR", start: 8.10, end: 8.50 },
        { word: "VIEWS", start: 8.50, end: 9.10 }
      ]
    }
  ],
  ru: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "СЕГОДНЯ МЫ ПОПРОБУЕМ",
      words: [
        { word: "СЕГОДНЯ", start: 0.45, end: 0.95 },
        { word: "МЫ", start: 0.95, end: 1.30 },
        { word: "ПОПРОБУЕМ", start: 1.30, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "ЧТО-ТО СОВЕРШЕННО НОВОЕ",
      words: [
        { word: "ЧТО-ТО", start: 1.82, end: 2.25 },
        { word: "СОВЕРШЕННО", start: 2.25, end: 2.75 },
        { word: "НОВОЕ", start: 2.75, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "КАК БЫСТРО РАСТИ",
      words: [
        { word: "КАК", start: 3.70, end: 4.10 },
        { word: "БЫСТРО", start: 4.10, end: 4.55 },
        { word: "РАСТИ", start: 4.55, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "В INSTAGRAM И TIKTOK",
      words: [
        { word: "В", start: 5.06, end: 5.25 },
        { word: "INSTAGRAM", start: 5.25, end: 5.75 },
        { word: "И", start: 5.75, end: 5.90 },
        { word: "TIKTOK", start: 5.90, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "ПОДПИШИСЬ ДЛЯ БОЛЬШИХ ПРОСМОТРОВ",
      words: [
        { word: "ПОДПИШИСЬ", start: 6.90, end: 7.45 },
        { word: "ДЛЯ", start: 7.45, end: 7.85 },
        { word: "БОЛЬШИХ", start: 7.85, end: 8.40 },
        { word: "ПРОСМОТРОВ", start: 8.40, end: 9.10 }
      ]
    }
  ],
  ja: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "今日は新しいことに",
      words: [
        { word: "今日は", start: 0.45, end: 0.90 },
        { word: "新しい", start: 0.90, end: 1.40 },
        { word: "ことに", start: 1.40, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "挑戦してみます",
      words: [
        { word: "挑戦", start: 1.82, end: 2.30 },
        { word: "して", start: 2.30, end: 2.70 },
        { word: "みます", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "SNSでバズる方法",
      words: [
        { word: "SNSで", start: 3.70, end: 4.15 },
        { word: "バズる", start: 4.15, end: 4.60 },
        { word: "方法", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "今すぐチェック",
      words: [
        { word: "今すぐ", start: 5.06, end: 5.60 },
        { word: "チェック", start: 5.60, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "フォローして再生数を増やそう",
      words: [
        { word: "フォロー", start: 6.90, end: 7.40 },
        { word: "して", start: 7.40, end: 7.80 },
        { word: "再生数を", start: 7.80, end: 8.40 },
        { word: "増やそう", start: 8.40, end: 9.10 }
      ]
    }
  ],
  bn: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "আজ আমরা চেষ্টা করব",
      words: [
        { word: "আজ", start: 0.45, end: 0.90 },
        { word: "আমরা", start: 0.90, end: 1.35 },
        { word: "চেষ্টা করব", start: 1.35, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "নতুন ভাইরাল কিছু",
      words: [
        { word: "নতুন", start: 1.82, end: 2.25 },
        { word: "ভাইরাল", start: 2.25, end: 2.75 },
        { word: "কিছু", start: 2.75, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "ইনস্টাগ্রাম রিলসে",
      words: [
        { word: "ইনস্টাগ্রাম", start: 3.70, end: 4.40 },
        { word: "রিলসে", start: 4.40, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "কীভাবে দ্রুত গ্রো করবেন",
      words: [
        { word: "কীভাবে", start: 5.06, end: 5.50 },
        { word: "দ্রুত", start: 5.50, end: 5.85 },
        { word: "গ্রো করবেন", start: 5.85, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "বেশি ভিউয়ের জন্য ফলো করুন",
      words: [
        { word: "বেশি", start: 6.90, end: 7.30 },
        { word: "ভিউয়ের", start: 7.30, end: 7.80 },
        { word: "জন্য", start: 7.80, end: 8.20 },
        { word: "ফলো করুন", start: 8.20, end: 9.10 }
      ]
    }
  ],
  pt: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "HOJE VAMOS TENTAR",
      words: [
        { word: "HOJE", start: 0.45, end: 0.85 },
        { word: "VAMOS", start: 0.85, end: 1.30 },
        { word: "TENTAR", start: 1.30, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "ALGO TOTALMENTE NOVO",
      words: [
        { word: "ALGO", start: 1.82, end: 2.25 },
        { word: "TOTALMENTE", start: 2.25, end: 2.75 },
        { word: "NOVO", start: 2.75, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "COMO CRESCER RÁPIDO",
      words: [
        { word: "COMO", start: 3.70, end: 4.15 },
        { word: "CRESCER", start: 4.15, end: 4.60 },
        { word: "RÁPIDO", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "NO INSTAGRAM E TIKTOK",
      words: [
        { word: "NO", start: 5.06, end: 5.30 },
        { word: "INSTAGRAM", start: 5.30, end: 5.75 },
        { word: "E", start: 5.75, end: 5.90 },
        { word: "TIKTOK", start: 5.90, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "SIGA AGORA PARA MAIS VIEWS",
      words: [
        { word: "SIGA", start: 6.90, end: 7.35 },
        { word: "AGORA", start: 7.35, end: 7.80 },
        { word: "PARA", start: 7.80, end: 8.20 },
        { word: "MAIS", start: 8.20, end: 8.60 },
        { word: "VIEWS", start: 8.60, end: 9.10 }
      ]
    }
  ],
  it: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "OGGI PROVEREMO",
      words: [
        { word: "OGGI", start: 0.45, end: 0.95 },
        { word: "PROVEREMO", start: 0.95, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "QUALCOSA DI NUOVO",
      words: [
        { word: "QUALCOSA", start: 1.82, end: 2.30 },
        { word: "DI", start: 2.30, end: 2.65 },
        { word: "NUOVO", start: 2.65, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "COME CRESCERE SUBITO",
      words: [
        { word: "COME", start: 3.70, end: 4.15 },
        { word: "CRESCERE", start: 4.15, end: 4.60 },
        { word: "SUBITO", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "SU REELS E TIKTOK",
      words: [
        { word: "SU", start: 5.06, end: 5.35 },
        { word: "REELS", start: 5.35, end: 5.75 },
        { word: "E", start: 5.75, end: 5.90 },
        { word: "TIKTOK", start: 5.90, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "SEGUI ORA PER PIÙ VISUALIZZAZIONI",
      words: [
        { word: "SEGUI", start: 6.90, end: 7.35 },
        { word: "ORA", start: 7.35, end: 7.75 },
        { word: "PER", start: 7.75, end: 8.10 },
        { word: "PIÙ", start: 8.10, end: 8.40 },
        { word: "VISUALIZZAZIONI", start: 8.40, end: 9.10 }
      ]
    }
  ],
  tr: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "BUGÜN YENİ BİR ŞEY",
      words: [
        { word: "BUGÜN", start: 0.45, end: 0.85 },
        { word: "YENİ", start: 0.85, end: 1.25 },
        { word: "BİR", start: 1.25, end: 1.50 },
        { word: "ŞEY", start: 1.50, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "DENEYECEĞİZ REELS İÇİN",
      words: [
        { word: "DENEYECEĞİZ", start: 1.82, end: 2.45 },
        { word: "REELS", start: 2.45, end: 2.85 },
        { word: "İÇİN", start: 2.85, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "NASIL HIZLA BÜYÜNÜR",
      words: [
        { word: "NASIL", start: 3.70, end: 4.15 },
        { word: "HIZLA", start: 4.15, end: 4.60 },
        { word: "BÜYÜNÜR", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "TIKTOK VE REELS'DE",
      words: [
        { word: "TIKTOK", start: 5.06, end: 5.50 },
        { word: "VE", start: 5.50, end: 5.75 },
        { word: "REELS'DE", start: 5.75, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "DAHA FAZLA İZLENME İÇİN TAKİP ET",
      words: [
        { word: "DAHA", start: 6.90, end: 7.25 },
        { word: "FAZLA", start: 7.25, end: 7.65 },
        { word: "İZLENME", start: 7.65, end: 8.15 },
        { word: "İÇİN", start: 8.15, end: 8.50 },
        { word: "TAKİP ET", start: 8.50, end: 9.10 }
      ]
    }
  ],
  id: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "HARI INI KITA COBA",
      words: [
        { word: "HARI", start: 0.45, end: 0.80 },
        { word: "INI", start: 0.80, end: 1.15 },
        { word: "KITA", start: 1.15, end: 1.45 },
        { word: "COBA", start: 1.45, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "SESUATU YANG BARU",
      words: [
        { word: "SESUATU", start: 1.82, end: 2.25 },
        { word: "YANG", start: 2.25, end: 2.65 },
        { word: "BARU", start: 2.65, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "CARA CEPAT BERKEMBANG",
      words: [
        { word: "CARA", start: 3.70, end: 4.10 },
        { word: "CEPAT", start: 4.10, end: 4.55 },
        { word: "BERKEMBANG", start: 4.55, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "DI REELS DAN TIKTOK",
      words: [
        { word: "DI", start: 5.06, end: 5.30 },
        { word: "REELS", start: 5.30, end: 5.75 },
        { word: "DAN", start: 5.75, end: 5.90 },
        { word: "TIKTOK", start: 5.90, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "FOLLOW SEKARANG UNTUK VIEWS",
      words: [
        { word: "FOLLOW", start: 6.90, end: 7.35 },
        { word: "SEKARANG", start: 7.35, end: 7.90 },
        { word: "UNTUK", start: 7.90, end: 8.35 },
        { word: "VIEWS", start: 8.35, end: 9.10 }
      ]
    }
  ],
  zh: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "今天我们要尝试",
      words: [
        { word: "今天", start: 0.45, end: 0.85 },
        { word: "我们要", start: 0.85, end: 1.35 },
        { word: "尝试", start: 1.35, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "全新爆款内容",
      words: [
        { word: "全新", start: 1.82, end: 2.25 },
        { word: "爆款", start: 2.25, end: 2.70 },
        { word: "内容", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "如何在短视频爆火",
      words: [
        { word: "如何", start: 3.70, end: 4.10 },
        { word: "在短视频", start: 4.10, end: 4.60 },
        { word: "爆火", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "创作者必备秘密",
      words: [
        { word: "创作者", start: 5.06, end: 5.65 },
        { word: "必备秘密", start: 5.65, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "立即关注获取更多播放量",
      words: [
        { word: "立即", start: 6.90, end: 7.30 },
        { word: "关注", start: 7.30, end: 7.75 },
        { word: "获取更多", start: 7.75, end: 8.35 },
        { word: "播放量", start: 8.35, end: 9.10 }
      ]
    }
  ],
  ko: [
    {
      id: "sub-1",
      startTime: 0.45,
      endTime: 1.82,
      start: 0.45,
      end: 1.82,
      text: "오늘 우리는 새로운 것을",
      words: [
        { word: "오늘", start: 0.45, end: 0.85 },
        { word: "우리는", start: 0.85, end: 1.30 },
        { word: "새로운", start: 1.30, end: 1.60 },
        { word: "것을", start: 1.60, end: 1.82 }
      ]
    },
    {
      id: "sub-2",
      startTime: 1.82,
      endTime: 3.20,
      start: 1.82,
      end: 3.20,
      text: "시도해 볼 것입니다",
      words: [
        { word: "시도해", start: 1.82, end: 2.30 },
        { word: "볼", start: 2.30, end: 2.70 },
        { word: "것입니다", start: 2.70, end: 3.20 }
      ]
    },
    {
      id: "sub-3",
      startTime: 3.70,
      endTime: 5.06,
      start: 3.70,
      end: 5.06,
      text: "빠르게 성장하는 비결",
      words: [
        { word: "빠르게", start: 3.70, end: 4.15 },
        { word: "성장하는", start: 4.15, end: 4.60 },
        { word: "비결", start: 4.60, end: 5.06 }
      ]
    },
    {
      id: "sub-4",
      startTime: 5.06,
      endTime: 6.20,
      start: 5.06,
      end: 6.20,
      text: "릴스와 틱톡에서",
      words: [
        { word: "릴스와", start: 5.06, end: 5.60 },
        { word: "틱톡에서", start: 5.60, end: 6.20 }
      ]
    },
    {
      id: "sub-5",
      startTime: 6.90,
      endTime: 9.10,
      start: 6.90,
      end: 9.10,
      text: "더 많은 조회수를 위해 팔로우하세요",
      words: [
        { word: "더 많은", start: 6.90, end: 7.45 },
        { word: "조회수를 위해", start: 7.45, end: 8.25 },
        { word: "팔로우하세요", start: 8.25, end: 9.10 }
      ]
    }
  ]
};

// Map auto to default Hinglish track
DEMO_PRELOADED_SUBTITLES.auto = DEMO_PRELOADED_SUBTITLES.hi;
