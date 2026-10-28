// AL MANKAL: every word and fact on the site lives here, in English (en) and Arabic (ar).
// Facts come from the restaurant's own MakanE store (almankal.com, read 28 October 2026) and its public Instagram posts.
// Lines marked CONFIRM wait for Saif Khuffash. Never replace a CONFIRM with a guess.
// The story chapter (st_*) is a DRAFT written without the family: it carries a visible "draft" tag until Saif tells it.

const BUSINESS = {
  name: 'Al Mankal Chicken Tikka',
  nameAr: 'المنقل تشكن تكا',
  phone: '+96265540555',             // both branches use the same number on the store and on every Instagram post
  phoneDisplay: '06 554 0555',
  facebook: 'https://www.facebook.com/ALMANKAL',
  // CONFIRM: the Instagram handle (the posts exist, the handle was not captured). Until then "Instagram" links fall back to Facebook.
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
  ]
};

// Photos from the restaurant's own Instagram posts, cut to fit, keyed by the MakanE id of the dish they show.
// A dish without a line here uses its store photo (menu-data.js) or a coal plate with its name.
const PHOTOS = {
  23503084: 'spread-marble',    // Family Meal
  23359335: 'chicken-tomato',   // 2 Pieces Chicken Tikka
  23359350: 'kebab-teal',       // Chicken Kebab
  34818924: 'chicken-lemon',    // Tikka Master
  23359364: 'puri',             // Bouri Bread
  34818926: 'sandwich',         // Tikka Sandwich
  34818919: 'tawook-teal',      // Shish Tawook
  23506487: 'spread-teal',      // Almankal Meal
  23504857: 'chicken-fries',    // Single meal
  23513825: 'rice-legs',        // Double Meal
  23506593: 'tray-hands',       // Economic Meal
  23359368: 'kibbeh',           // Fried Kibbeh
  23359337: 'dip-hand',         // 1 Piece Breast
  34818917: 'chicken-board',    // Value Meal
  23598066: 'chicken-board-teal', // Giant Meal
  34818918: 'tikka-pieces',     // Chicken Carnival
  23491157: 'poster-5jd',       // Ala Keefak Meal: the restaurant's own poster for it
  34802921: 'poster-combo',     // Chicken & Fries Combo: its own poster
  23598066: 'poster-sufra',     // Giant Meal
  23506618: 'plate-rice',       // Employee Meal
  34818920: 'kebab-hand',       // Chicken Kebab (chicken meals)
  23505187: 'poster-mashawi'    // Rashmi Meal (kebab, puri, sumac garlic)
};
// The same dish listed twice under two categories shares one photo.
const SAME_DISH = { 34818923: 23359340, 23359348: 34818919, 34815875: 34818926 };

// The six plates on the home page and at the top of the menu, by MakanE id.
const SIGNATURE = [23503084, 23359335, 23359350, 34818924, 23359364, 34818926];

// The reels: the restaurant's own Instagram videos (assets/video). Sound is off until the visitor taps.
const REELS = [
  { file: 'reel-1', en: 'The grill', ar: 'المنقل' },
  { file: 'reel-2', en: 'Out the door', ar: 'من المطعم' },
  { file: 'reel-3', en: 'A full tray', ar: 'صينية كاملة' },
  { file: 'reel-4', en: 'The dining room', ar: 'صالة المطعم' },
  { file: 'reel-5', en: 'On air', ar: 'على الهوا' }
];

const TEXT = {
  en: {
    lang_btn: 'عربي',
    wm: 'Al Mankal', wm_sub: 'Chicken tikka · since 1985',
    title_home: 'Al Mankal Chicken Tikka | On the coals since 1985, Amman',
    title_menu: 'Menu and ordering | Al Mankal Chicken Tikka',
    title_branches: 'Branches | Al Mankal Chicken Tikka',
    title_franchise: 'Franchising | Al Mankal Chicken Tikka',
    nav_menu: 'Menu', nav_branches: 'Branches', nav_franchise: 'Franchising', nav_story: 'Story', nav_order: 'Order now', nav_call: 'Call',
    nav_basket: 'Basket',
    menu_open: 'Menu', menu_close: 'Close',
    preview_tag: 'Preview',
    intro_line: 'On the coals since 1985',

    hero_eyebrow: 'Gardens · Sweifieh · Amman',
    hero_title: 'On the coals since 1985',
    hero_lead: 'Whole chickens, tikka pieces and kebab over real charcoal, with puffed puri bread and garlic. Two branches in Amman.',
    hero_order: 'Order now', hero_call: 'Call a branch',
    hero_hint: 'Scroll',
    tag_1: 'Healthy', tag_2: 'Charcoal', tag_3: 'Since 1985',

    sig_eyebrow: 'Off the grill',
    sig_title: 'The plates Amman comes back for',
    sig_lead: 'Add what you want to your basket. Checkout is one tap away.',
    sig_all: 'See the full menu',
    add_btn: 'Add to basket', added: 'Added', jd: 'JD', qty: 'Quantity', less: 'One less', more: 'One more',

    film_eyebrow: 'The mankal', film_title: 'Four things that never change',
    film_1_w: 'Coals', film_1_t: 'Charcoal, not gas', film_1_p: 'Every piece of chicken at Al Mankal goes over live charcoal. The smoke is the seasoning, and it has been since 1985.',
    film_2_w: 'Chicken', film_2_t: 'Split flat, grilled until it chars', film_2_p: 'Whole chickens cut and pressed on the grate, sold by the piece: a quarter, a half, or a tray for the family.',
    film_3_w: 'Puri', film_3_t: 'Bread that puffs in hot oil', film_3_p: 'A thin dough dropped in the fryer until it balloons. Every sandwich is wrapped in it and every meal comes with it.',
    film_4_w: 'Sides', film_4_t: 'Garlic, pickles, rice', film_4_p: 'Garlic dip, hummus, Turkish salad and biryani rice with curry sauce. The table is not complete without them.',

    reels_eyebrow: 'From the kitchen',
    reels_title: 'See it before you taste it',
    reels_lead: "The restaurant's own reels: the grill, the trays, the dining room.",
    reels_follow: 'Follow Al Mankal', reels_sound_on: 'Sound on', reels_sound_off: 'Sound off', reels_play: 'Play',

    how_eyebrow: 'Ordering',
    how_title: 'Basket, checkout, done',
    step_1_t: 'Pick your branch', step_1_p: 'Gardens or Sweifieh. Delivery or pickup.',
    step_2_t: 'Fill your basket', step_2_p: 'Every dish with its photo and price, right here.',
    step_3_t: 'Checkout and pay cash', step_3_p: "Checkout opens the restaurant's secure order page. Pay cash when it arrives.",
    how_cta: 'Start an order',

    br_eyebrow: 'Branches',
    br_title: 'Two grills in Amman',
    br_gardens: 'Gardens', br_gardens_addr: 'Wasfi Al Tal Street',
    br_sweifieh: 'Sweifieh', br_sweifieh_addr: 'Ali Al Sarayreh Street',
    br_call: 'Call', br_dir: 'Directions', br_order: 'Order from here', br_all: 'All branch details',
    br_inside: 'Inside Al Mankal',

    sheet_title: 'Which branch?', sheet_lead: 'Both branches answer on the same number.', sheet_close: 'Close',
    sheet_call: 'Call 06 554 0555',

    bk_title: 'Your basket', bk_empty: 'Your basket is empty.', bk_empty_p: 'Add a dish from the menu and it will wait for you here.',
    bk_browse: 'See the menu', bk_total: 'Total', bk_branch: 'Ordering from', bk_checkout: 'Checkout', bk_clear: 'Empty the basket',
    bk_note: 'Delivery or pickup. Cash on delivery.', bk_remove: 'Remove',
    bk_items: '{n} items', bk_item: '1 item',
    ho_title: 'One more step', ho_p: "Your order finishes on Al Mankal's secure order page, where you confirm your phone, address and delivery.",
    ho_list: 'Your list', ho_go: 'Continue to checkout', ho_back: 'Back to basket',
    ho_note: 'The order page opens with your first dish; add the rest from this list.',
    ho_copy: 'Copy the list', ho_copied: 'Copied',

    st_eyebrow: 'The story',
    st_title: 'It started with one grill',
    st_p1: 'In 1985 a charcoal grill was lit in Amman and the first chicken tikka went on it. The smoke drew a queue, and the queue never really left.',
    st_p2: 'Forty-one years later the coals are still lit the same way, in two branches, for the same city.',
    st_draft: 'Draft: the real story will be written with the family.',

    fr_eyebrow: 'Franchising',
    fr_title: 'Carry the fire',
    fr_lead: 'Al Mankal is looking for partners who want to bring charcoal tikka to their own corner of the map.',
    fr_cta: 'Talk to us about a franchise',

    ft_order_note: "Checkout and payment run on the restaurant's own order page.",
    ft_made: 'Website by FellowFlow',
    ft_preview: 'Preview, not yet public',
    bar_order: 'Order now', bar_call: 'Call', bar_basket: 'Basket',

    mn_eyebrow: 'Order online',
    mn_title: 'The menu',
    mn_lead: "Everything on the grill, at the restaurant's own prices. Add to your basket, then checkout.",
    mn_search: 'Search the menu', mn_branch: 'Your branch',
    mn_spicy: 'Spicy option', mn_off: 'Not available now',
    mn_empty: 'Nothing matches. Try another word.',
    mn_count: '{n} dishes',
    mn_note: 'Prices in Jordanian dinars, as listed by the restaurant. Delivery or pickup, cash on delivery.',
    mn_sweifieh_note: 'Sweifieh orders finish on the Sweifieh order page.',
    mn_top: 'Back to top',
    mn_sig: 'Signature',

    bp_eyebrow: 'Branches',
    bp_title: 'Find your grill',
    bp_lead: 'Two branches in Amman, both on charcoal, one phone number.',
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
    title_home: 'المنقل تشكن تكا | على الفحم من سنة ١٩٨٥، عمّان',
    title_menu: 'القائمة والطلب | المنقل تشكن تكا',
    title_branches: 'الفروع | المنقل تشكن تكا',
    title_franchise: 'الامتياز التجاري | المنقل تشكن تكا',
    nav_menu: 'القائمة', nav_branches: 'الفروع', nav_franchise: 'الامتياز', nav_story: 'القصة', nav_order: 'اطلب الآن', nav_call: 'اتصل',
    nav_basket: 'السلة',
    menu_open: 'القائمة', menu_close: 'إغلاق',
    preview_tag: 'معاينة',
    intro_line: 'على الفحم من سنة ١٩٨٥',

    hero_eyebrow: 'الجاردنز · الصويفية · عمّان',
    hero_title: 'على الفحم من سنة ١٩٨٥',
    hero_lead: 'دجاج كامل وقطع تكا وكباب على فحم حقيقي، مع خبز بوري منفوخ ومثومة. فرعين في عمّان.',
    hero_order: 'اطلب الآن', hero_call: 'اتصل بفرع',
    hero_hint: 'انزل',
    tag_1: 'صحي', tag_2: 'فحم', tag_3: 'منذ ١٩٨٥',

    sig_eyebrow: 'من على المنقل',
    sig_title: 'الأطباق اللي عمّان بترجعلها',
    sig_lead: 'ضيف اللي بدك ياه على السلة. إتمام الطلب كبسة وحدة.',
    sig_all: 'القائمة كاملة',
    add_btn: 'ضيف على السلة', added: 'انضاف', jd: 'د.أ', qty: 'الكمية', less: 'أقل بواحد', more: 'أكثر بواحد',

    film_eyebrow: 'المنقل', film_title: 'أربع أشياء ما بتتغير',
    film_1_w: 'فحم', film_1_t: 'فحم، مش غاز', film_1_p: 'كل قطعة دجاج في المنقل بتمرّ على فحم حيّ. الدخان هو البهار، ومن سنة ١٩٨٥.',
    film_2_w: 'دجاج', film_2_t: 'مفروش على الشبك لحد ما يتحمّر', film_2_p: 'دجاج كامل مقطّع ومفروش على الشبك، بينباع بالقطعة: ربع، نص، أو صينية للعيلة.',
    film_3_w: 'بوري', film_3_t: 'خبز بينفخ بالزيت الحامي', film_3_p: 'عجينة رقيقة بتنزل عالقلاية لحد ما تنفخ. كل ساندويش ملفوف فيها وكل وجبة بتيجي معها.',
    film_4_w: 'مقبلات', film_4_t: 'مثومة، مخلل، رز', film_4_p: 'مثومة، حمص، سلطة تركية ورز برياني مع صوص كاري. السفرة ما بتكمل بدونهم.',

    reels_eyebrow: 'من المطبخ',
    reels_title: 'شوفها قبل ما تدوقها',
    reels_lead: 'ريلز المطعم نفسه: المنقل، الصواني، والصالة.',
    reels_follow: 'تابع المنقل', reels_sound_on: 'الصوت شغّال', reels_sound_off: 'الصوت مسكّر', reels_play: 'شغّل',

    how_eyebrow: 'الطلب',
    how_title: 'سلة، إتمام، خلص',
    step_1_t: 'اختار فرعك', step_1_p: 'الجاردنز أو الصويفية. توصيل أو استلام.',
    step_2_t: 'عبّي سلتك', step_2_p: 'كل طبق بصورته وسعره، هون.',
    step_3_t: 'أتمّ الطلب وادفع كاش', step_3_p: 'إتمام الطلب بفتح صفحة الطلب الآمنة للمطعم. ادفع كاش عند الاستلام.',
    how_cta: 'ابدأ طلبك',

    br_eyebrow: 'الفروع',
    br_title: 'منقلين في عمّان',
    br_gardens: 'الجاردنز', br_gardens_addr: 'شارع وصفي التل',
    br_sweifieh: 'الصويفية', br_sweifieh_addr: 'شارع علي الصرايرة',
    br_call: 'اتصل', br_dir: 'الاتجاهات', br_order: 'اطلب من هون', br_all: 'تفاصيل الفروع',
    br_inside: 'جوّا المنقل',

    sheet_title: 'أي فرع؟', sheet_lead: 'الفرعين بيردّوا على نفس الرقم.', sheet_close: 'إغلاق',
    sheet_call: 'اتصل 06 554 0555',

    bk_title: 'سلتك', bk_empty: 'سلتك فاضية.', bk_empty_p: 'ضيف طبق من القائمة وبيستناك هون.',
    bk_browse: 'شوف القائمة', bk_total: 'المجموع', bk_branch: 'الطلب من', bk_checkout: 'إتمام الطلب', bk_clear: 'فضّي السلة',
    bk_note: 'توصيل أو استلام. الدفع كاش عند الاستلام.', bk_remove: 'شيل',
    bk_items: '{n} أصناف', bk_item: 'صنف واحد',
    ho_title: 'خطوة وحدة كمان', ho_p: 'طلبك بيكمل على صفحة الطلب الآمنة للمنقل، وهناك بتأكد رقمك وعنوانك والتوصيل.',
    ho_list: 'قائمتك', ho_go: 'كمّل لإتمام الطلب', ho_back: 'ارجع للسلة',
    ho_note: 'صفحة الطلب بتفتح على أول طبق؛ ضيف الباقي من هاي القائمة.',
    ho_copy: 'انسخ القائمة', ho_copied: 'انتسخت',

    st_eyebrow: 'القصة',
    st_title: 'بدأت بمنقل واحد',
    st_p1: 'سنة ١٩٨٥، ولّع منقل فحم في عمّان وانحطّ عليه أول تشكن تكا. الدخان جاب طابور، والطابور ما راح.',
    st_p2: 'بعد واحد وأربعين سنة، الفحم لسا بيتولّع بنفس الطريقة، في فرعين، لنفس المدينة.',
    st_draft: 'مسودة: القصة الحقيقية رح تنكتب مع العائلة.',

    fr_eyebrow: 'الامتياز التجاري',
    fr_title: 'احمل الشعلة',
    fr_lead: 'المنقل بدور على شركاء بدهم يوصّلوا تكا الفحم لزاويتهم على الخريطة.',
    fr_cta: 'احكي معنا عن الامتياز',

    ft_order_note: 'إتمام الطلب والدفع على صفحة الطلب الخاصة بالمطعم.',
    ft_made: 'الموقع من FellowFlow',
    ft_preview: 'معاينة، غير منشور بعد',
    bar_order: 'اطلب الآن', bar_call: 'اتصل', bar_basket: 'السلة',

    mn_eyebrow: 'اطلب أونلاين',
    mn_title: 'القائمة',
    mn_lead: 'كل اللي على المنقل بأسعار المطعم نفسها. ضيف على سلتك، وبعدين أتمّ الطلب.',
    mn_search: 'ابحث في القائمة', mn_branch: 'فرعك',
    mn_spicy: 'خيار حار', mn_off: 'غير متوفر حالياً',
    mn_empty: 'ما في نتائج. جرّب كلمة ثانية.',
    mn_count: '{n} طبق',
    mn_note: 'الأسعار بالدينار الأردني كما حدّدها المطعم. توصيل أو استلام، والدفع كاش عند الاستلام.',
    mn_sweifieh_note: 'طلبات الصويفية بتكمل على صفحة طلب الصويفية.',
    mn_top: 'لفوق',
    mn_sig: 'أطباق المنقل',

    bp_eyebrow: 'الفروع',
    bp_title: 'لاقي منقلك',
    bp_lead: 'فرعين في عمّان، الاثنين على الفحم، ورقم واحد.',
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
