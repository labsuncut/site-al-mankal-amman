// AL MANKAL: every word and fact on the site lives here, in English (en) and Arabic (ar).
// Facts come from the restaurant's own MakanE store (almankal.com, read 28 October 2026) and nothing else.
// Lines marked CONFIRM wait for Saif Khuffash. Never replace a CONFIRM with a guess.
// The story chapter (st_*) is a DRAFT written without the family: it carries a visible "draft" tag until Saif tells it.

const BUSINESS = {
  name: 'Al Mankal Chicken Tikka',
  nameAr: 'المنقل تشكن تكا',
  phone: '+96265540555',             // both branches use the same number on the store
  phoneDisplay: '06 554 0555',
  facebook: 'https://www.facebook.com/ALMANKAL',
  // CONFIRM: no Instagram, WhatsApp or email is published anywhere; add them here when Saif sends them.
  instagram: '',
  whatsapp: '',
  email: '',
  branches: [
    { key: 'gardens', store: 'https://almankal.com/#_branch119268',
      map: 'https://www.google.com/maps/search/?api=1&query=Al+Mankal+Chicken+Tikka+Wasfi+Al+Tal+Street+Amman',
      embed: 'https://www.google.com/maps?q=Al+Mankal+Chicken+Tikka,+Wasfi+Al+Tal+Street,+Amman&output=embed' },
    { key: 'sweifieh', store: 'https://jordan.almankal.com/#_branch119270',
      map: 'https://www.google.com/maps/search/?api=1&query=Al+Mankal+Chicken+Tikka+Ali+Al+Sarayreh+Street+Sweifieh+Amman',
      embed: 'https://www.google.com/maps?q=Al+Mankal+Chicken+Tikka,+Ali+Al+Sarayreh+Street,+Sweifieh,+Amman&output=embed' }
  ],
  // The logo as the store serves it (a JPEG on white); the site multiplies it onto the yellow disc.
  // CONFIRM: replace with the original logo file from Saif.
  logo: 'https://cdn-v2.makane.com/cdn-cgi/image/width=360,quality=85,fit=scale-down,format=auto/20221102-store-arz3/branding/logo-91103401730.jpg'
};

// The six plates shown on the home page, by their MakanE ids (see menu-data.js).
const SIGNATURE = [23503084, 34818926, 23359340, 34818919, 23491157, 23506487];

const TEXT = {
  en: {
    lang_btn: 'عربي',
    wm: 'Al Mankal', wm_sub: 'Chicken tikka · since 1985',
    title_home: 'Al Mankal Chicken Tikka | On charcoal since 1985, Amman',
    title_menu: 'Menu and ordering | Al Mankal Chicken Tikka',
    title_branches: 'Branches | Al Mankal Chicken Tikka',
    title_franchise: 'Franchising | Al Mankal Chicken Tikka',
    nav_menu: 'Menu', nav_branches: 'Branches', nav_franchise: 'Franchising', nav_story: 'Story', nav_order: 'Order now', nav_call: 'Call',
    menu_open: 'Menu', menu_close: 'Close',
    preview_tag: 'Preview',

    hero_eyebrow: 'Al Mankal Chicken Tikka · Amman',
    hero_title: 'On charcoal since 1985',
    hero_lead: 'Chicken tikka grilled over real coals, the way Amman has eaten it for four decades.',
    hero_order: 'Order now', hero_call: 'Call Gardens',
    hero_hint: 'Scroll',
    tag_1: 'Healthy', tag_2: 'Charcoal', tag_3: 'Since 1985',

    sig_eyebrow: 'From the grill',
    sig_title: "What's on the fire",
    sig_lead: 'The plates people cross Amman for. Tap one to order it from your branch.',
    sig_all: 'See the full menu',
    order_btn: 'Order', jd: 'JD',

    fire_word: 'CHARCOAL',
    fire_title: 'Real coals. Real smoke. No shortcuts.',
    fire_p: 'Every piece is grilled over charcoal, and that is where the colour and the smoke of Al Mankal tikka come from.',
    pil_1_t: 'Healthy', pil_1_p: 'Grilled, not fried. Chicken, spice and fire.',
    pil_2_t: 'On charcoal', pil_2_p: 'Every piece, over real coals.',
    pil_3_t: 'Since 1985', pil_3_p: 'Four decades in Amman.',

    how_eyebrow: 'Ordering',
    how_title: "Three taps and it's on the fire",
    step_1_t: 'Pick your branch', step_1_p: 'Gardens or Sweifieh. Delivery or pickup.',
    step_2_t: 'Choose your plate', step_2_p: 'The full menu with photos and prices.',
    step_3_t: 'Confirm and pay cash', step_3_p: 'Your order goes straight to the branch. Pay cash when it arrives.',
    how_cta: 'Start an order',

    br_eyebrow: 'Branches',
    br_title: 'Two grills in Amman',
    br_gardens: 'Gardens', br_gardens_addr: 'Wasfi Al Tal Street',
    br_sweifieh: 'Sweifieh', br_sweifieh_addr: 'Ali Al Sarayreh Street',
    br_call: 'Call', br_dir: 'Directions', br_order: 'Order from here', br_all: 'All branch details',

    st_eyebrow: 'The story',
    st_title: 'It started with one grill',
    st_p1: 'In 1985 a charcoal grill was lit in Amman and the first chicken tikka went on it. The smoke drew a queue, and the queue never really left.',
    st_p2: 'Forty-one years later the coals are still lit the same way, in two branches, for the same city.',
    st_draft: 'Draft: the real story will be written with the family.',

    fr_eyebrow: 'Franchising',
    fr_title: 'Carry the fire',
    fr_lead: 'Al Mankal is looking for partners who want to bring charcoal tikka to their own corner of the map.',
    fr_cta: 'Talk to us about a franchise',

    ft_order_note: "Orders and payment run on the restaurant's MakanE store.",
    ft_made: 'Website by FellowFlow',
    ft_preview: 'Preview, not yet public',
    bar_order: 'Order now', bar_call: 'Call',

    mn_eyebrow: 'Order online',
    mn_title: 'The menu',
    mn_lead: "Everything on the grill, at the restaurant's own prices. Order opens the dish on your branch's store.",
    mn_search: 'Search the menu', mn_branch: 'Your branch',
    mn_spicy: 'Spicy option', mn_off: 'Not available now',
    mn_empty: 'Nothing matches. Try another word.',
    mn_count: '{n} dishes',
    mn_note: 'Prices in Jordanian dinars, as listed on the store. Delivery or pickup, cash on delivery.',
    mn_sweifieh_note: 'Sweifieh orders open the Sweifieh store; pick the dish there.',
    mn_top: 'Back to top',

    bp_eyebrow: 'Branches',
    bp_title: 'Find your grill',
    bp_lead: 'Two branches in Amman, both on charcoal.',
    bp_phone: 'Phone', bp_map: 'Open in Google Maps', bp_delivery: 'Delivery and pickup', bp_cash: 'Cash on delivery',
    bp_hours: 'Opening hours: call the branch',
    bp_map_title: 'Map of the {b} branch',

    fp_eyebrow: 'Franchising',
    fp_title: 'Carry the fire',
    fp_lead: 'Forty-one years of charcoal tikka in Amman. The next grill could be yours.',
    fp_why_t: 'Why Al Mankal',
    fp_1_t: 'A name Amman knows', fp_1_p: 'Since 1985, two branches, one reputation built plate by plate.',
    fp_2_t: 'A simple menu', fp_2_p: 'Chicken tikka, sandwiches, meals and mezze. Easy to run, easy to love.',
    fp_3_t: 'Charcoal craft', fp_3_p: 'The grill is the brand, and it travels.',
    fp_steps_t: 'How it goes',
    fp_s1: 'Enquire', fp_s2: 'Meet', fp_s3: 'Taste', fp_s4: 'Open',
    fp_talk_t: "Let's talk",
    fp_talk_p: "Tell us who you are and where you'd open. Everything else is a conversation.",
    fp_call: 'Call 06 554 0555', fp_fb: 'Message us on Facebook',
    fp_note: 'Figures and terms are discussed in person.',

    nf_title: "This plate isn't on the menu.", nf_home: 'Back to Al Mankal'
  },
  ar: {
    lang_btn: 'English',
    wm: 'المنقل', wm_sub: 'تشكن تكا · منذ ١٩٨٥',
    title_home: 'المنقل تشكن تكا | عالفحم منذ ١٩٨٥، عمّان',
    title_menu: 'القائمة والطلب | المنقل تشكن تكا',
    title_branches: 'الفروع | المنقل تشكن تكا',
    title_franchise: 'الامتياز التجاري | المنقل تشكن تكا',
    nav_menu: 'القائمة', nav_branches: 'الفروع', nav_franchise: 'الامتياز', nav_story: 'القصة', nav_order: 'اطلب الآن', nav_call: 'اتصل',
    menu_open: 'القائمة', menu_close: 'إغلاق',
    preview_tag: 'معاينة',

    hero_eyebrow: 'المنقل تشكن تكا · عمّان',
    hero_title: 'عالفحم منذ ١٩٨٥',
    hero_lead: 'تشكن تكا على فحم حقيقي، بنفس الطعم اللي عمّان بتعرفه من أربعين سنة.',
    hero_order: 'اطلب الآن', hero_call: 'اتصل بالجاردنز',
    hero_hint: 'انزل',
    tag_1: 'صحي', tag_2: 'فحم', tag_3: 'منذ ١٩٨٥',

    sig_eyebrow: 'من على المنقل',
    sig_title: 'شو على النار',
    sig_lead: 'الأطباق اللي الناس بتقطع عمّان عشانها. اضغط على أي طبق لتطلبه من فرعك.',
    sig_all: 'القائمة كاملة',
    order_btn: 'اطلب', jd: 'د.أ',

    fire_word: 'عالفحم',
    fire_title: 'فحم حقيقي. دخان حقيقي. بلا اختصارات.',
    fire_p: 'كل قطعة بتنشوي على الفحم، ومن هون بيجي لون ودخان تكا المنقل.',
    pil_1_t: 'صحي', pil_1_p: 'مشوي مش مقلي. دجاج وبهار ونار.',
    pil_2_t: 'على الفحم', pil_2_p: 'كل قطعة، على فحم حقيقي.',
    pil_3_t: 'منذ ١٩٨٥', pil_3_p: 'أربعة عقود في عمّان.',

    how_eyebrow: 'الطلب',
    how_title: 'ثلاث كبسات وبتكون على النار',
    step_1_t: 'اختار فرعك', step_1_p: 'الجاردنز أو الصويفية. توصيل أو استلام.',
    step_2_t: 'اختار طبقك', step_2_p: 'القائمة كاملة بالصور والأسعار.',
    step_3_t: 'أكّد وادفع كاش', step_3_p: 'طلبك بيوصل الفرع مباشرة. ادفع كاش عند الاستلام.',
    how_cta: 'ابدأ طلبك',

    br_eyebrow: 'الفروع',
    br_title: 'منقلين في عمّان',
    br_gardens: 'الجاردنز', br_gardens_addr: 'شارع وصفي التل',
    br_sweifieh: 'الصويفية', br_sweifieh_addr: 'شارع علي الصرايرة',
    br_call: 'اتصل', br_dir: 'الاتجاهات', br_order: 'اطلب من هون', br_all: 'تفاصيل الفروع',

    st_eyebrow: 'القصة',
    st_title: 'بدأت بمنقل واحد',
    st_p1: 'سنة ١٩٨٥، ولّع منقل فحم في عمّان وانحطّ عليه أول تشكن تكا. الدخان جاب طابور، والطابور ما راح.',
    st_p2: 'بعد واحد وأربعين سنة، الفحم لسا بيتولّع بنفس الطريقة، في فرعين، لنفس المدينة.',
    st_draft: 'مسودة: القصة الحقيقية رح تنكتب مع العائلة.',

    fr_eyebrow: 'الامتياز التجاري',
    fr_title: 'احمل الشعلة',
    fr_lead: 'المنقل بدور على شركاء بدهم يوصّلوا تكا الفحم لزاويتهم على الخريطة.',
    fr_cta: 'احكي معنا عن الامتياز',

    ft_order_note: 'الطلبات والدفع عبر متجر المطعم على مكاني.',
    ft_made: 'الموقع من FellowFlow',
    ft_preview: 'معاينة، غير منشور بعد',
    bar_order: 'اطلب الآن', bar_call: 'اتصل',

    mn_eyebrow: 'اطلب أونلاين',
    mn_title: 'القائمة',
    mn_lead: 'كل اللي على المنقل بأسعار المطعم نفسها. «اطلب» بفتح الطبق على متجر فرعك.',
    mn_search: 'ابحث في القائمة', mn_branch: 'فرعك',
    mn_spicy: 'خيار حار', mn_off: 'غير متوفر حالياً',
    mn_empty: 'ما في نتائج. جرّب كلمة ثانية.',
    mn_count: '{n} طبق',
    mn_note: 'الأسعار بالدينار الأردني كما هي على المتجر. توصيل أو استلام، والدفع كاش عند الاستلام.',
    mn_sweifieh_note: 'طلبات الصويفية بتفتح متجر الصويفية؛ اختار الطبق هناك.',
    mn_top: 'لفوق',

    bp_eyebrow: 'الفروع',
    bp_title: 'لاقي منقلك',
    bp_lead: 'فرعين في عمّان، والاثنين على الفحم.',
    bp_phone: 'الهاتف', bp_map: 'افتح في خرائط جوجل', bp_delivery: 'توصيل واستلام', bp_cash: 'الدفع عند الاستلام',
    bp_hours: 'ساعات العمل: اتصل بالفرع',
    bp_map_title: 'خريطة فرع {b}',

    fp_eyebrow: 'الامتياز التجاري',
    fp_title: 'احمل الشعلة',
    fp_lead: 'واحد وأربعين سنة تكا فحم في عمّان. المنقل الجاي ممكن يكون إلك.',
    fp_why_t: 'ليش المنقل',
    fp_1_t: 'اسم عمّان بتعرفه', fp_1_p: 'منذ ١٩٨٥، فرعين، وسمعة انبنت طبق ورا طبق.',
    fp_2_t: 'قائمة بسيطة', fp_2_p: 'تشكن تكا، ساندويشات، وجبات ومقبلات. سهلة التشغيل، وسهل تنحب.',
    fp_3_t: 'صنعة الفحم', fp_3_p: 'المنقل هو العلامة، وبيسافر.',
    fp_steps_t: 'كيف بتمشي',
    fp_s1: 'استفسر', fp_s2: 'نلتقي', fp_s3: 'تذوّق', fp_s4: 'افتح',
    fp_talk_t: 'خلينا نحكي',
    fp_talk_p: 'احكيلنا مين إنت ووين بدك تفتح. الباقي حديث بيناتنا.',
    fp_call: 'اتصل 06 554 0555', fp_fb: 'راسلنا على فيسبوك',
    fp_note: 'الأرقام والشروط بتنحكى بالمقابلة.',

    nf_title: 'هذا الطبق مش على القائمة.', nf_home: 'ارجع للمنقل'
  }
};
