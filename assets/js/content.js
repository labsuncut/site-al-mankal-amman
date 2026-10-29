// AL MANKAL: every word and fact on the site, English and Arabic. Facts marked CONFIRM wait for the restaurant.
// Nothing here is invented: names, addresses, phone and menu come from the restaurant's own store and posts.

const BUSINESS = {
  name: 'Al Mankal Chicken Tikka',
  nameAr: 'المنقل تشكن تكا',
  // CONFIRM: the store and every Instagram post show 06 554 0555; the old site's banner shows 06 553 1886.
  phone: '+96265540555',
  phoneDisplay: '06 554 0555',
  facebook: 'https://www.facebook.com/ALMANKAL',
  // CONFIRM: the Instagram handle (the posts exist, the handle was not captured). "Follow" links fall back to Facebook.
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

// CONFIRM with Al Mankal before launch. Per branch, per weekday (0 = Sunday): [open, close] in minutes after midnight;
// close may pass midnight (e.g. [660, 1500] is 11:00 to 01:00). While null, the branch cards say the hours are to be confirmed.
const HOURS = { gardens: null, sweifieh: null };

// The restaurant's own photos (assets/img/s, AVIF and WebP at 480 and 960 px, cut from its Instagram posts), by MakanE dish id.
// Food only: the promo posters are not used as dish photos. A dish without a line here uses its store photo, or a logo tile.
const PHOTOS = {
  23503084: 'spread-marble',      // Family Meal
  23359335: 'chicken-tomato',     // 2 Pieces Chicken Tikka
  23359350: 'kebab-teal',         // Chicken Kebab
  34818924: 'chicken-lemon',      // Tikka Master
  23359364: 'puri',               // Bouri Bread
  34818926: 'sandwich',           // Tikka Sandwich
  34818919: 'tawook-teal',        // Shish Tawook
  23506487: 'spread-teal',        // Almankal Meal
  23513825: 'rice-legs',          // Double Meal
  23506593: 'tray-hands',         // Economic Meal
  23359368: 'kibbeh',             // Fried Kibbeh
  23359337: 'dip-hand',           // 1 Piece Breast
  34818917: 'chicken-board',      // Value Meal
  23598066: 'chicken-board-teal', // Giant Meal
  34818918: 'tikka-pieces',       // Chicken Carnival
  23506618: 'plate-rice',         // Employee Meal
  34818920: 'kebab-hand'          // Chicken Kebab (chicken meals)
};
// The same dish listed twice under two categories shares one photo.
const SAME_DISH = { 34818923: 23359340, 23359348: 34818919, 34815875: 34818926 };

// The signature plates: the first rail tab on the home page and the top row of the menu page, by MakanE id.
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
    title_home: 'Al Mankal Chicken Tikka | Order charcoal chicken in Amman',
    title_menu: 'Menu and ordering | Al Mankal Chicken Tikka',
    title_branches: 'Branches | Al Mankal Chicken Tikka',
    title_franchise: 'Franchising | Al Mankal Chicken Tikka',
    skip: 'Skip to the menu', skip_main: 'Skip to content',
    brand: 'Al Mankal', brand_sub: 'Chicken tikka · Amman',
    nav_menu: 'Menu', nav_branches: 'Branches', nav_franchise: 'Franchising', nav_story: 'Story', nav_basket: 'Basket',
    intro_still: 'Still on the coals', skip_intro: 'Skip', still_on: 'still on',

    hero_eyebrow: 'Gardens · Sweifieh · Amman',
    hero_title: 'On the coals since 1985',
    hero_alt: 'A table of Al Mankal chicken tikka, kebab skewers, puri bread, hummus and garlic dip, seen from above',
    lead: 'Chicken tikka, kebab and tawook over charcoal, with puri bread and garlic.',
    how: 'How do you want it?', mode_aria: 'Delivery or pickup',
    delivery: 'Delivery', pickup: 'Pickup', from: 'From',
    start: 'Start my order', call: 'Call',
    mode_note: "Address, phone and payment are confirmed on Al Mankal's own order page.",

    menu_eyebrow: 'The menu', menu_title: "What's on the coals today?",
    menu_for: '{m} from {b}', for_change: 'Change', for_hint: 'Check the branch before you order.', rail_aria: 'Menu categories', sig: 'Signature',
    full_menu: 'Full menu with search',
    photo_note: "Photos are Al Mankal's own. Dishes without one yet show the logo.",
    nophoto: 'Photo coming soon',
    add_btn: 'Add to basket', jd: 'JD', qty: 'Quantity', less: 'One less', more: 'One more',
    mn_spicy: 'Can be made spicy', mn_legend: 'can be made spicy, just ask.', mn_off: 'Not available now',
    again_title: 'Order again', again_p: 'Your last basket on this phone: {n} · {t} JD',
    again_btn: 'Add it all to my basket', again_hide: 'Not now', again_done: 'Added to your basket',

    film_eyebrow: 'The mankal', film_title: 'Charcoal, not gas',
    film_1_w: 'Coals', film_1_p: 'Live charcoal under every piece. Since 1985.',
    film_2_w: 'Chicken', film_2_p: 'Whole chicken, pressed on the grate. A quarter, a half, or a tray.',
    film_3_w: 'Puri', film_3_p: 'Puffed bread, fried to order. With every meal.',
    film_4_w: 'Sides', film_4_p: 'Garlic dip, hummus, salad and biryani rice.',

    reels_eyebrow: 'From the kitchen', reels_title: 'See it before you taste it',
    reels_lead: "The restaurant's own reels: the grill, the trays, the dining room.",
    reels_follow: 'Follow Al Mankal', reels_sound_on: 'Sound on', reels_sound_off: 'Sound off', reels_play: 'Play',

    br_eyebrow: 'Branches', br_title: 'Two grills in Amman',
    br_gardens: 'Gardens', br_gardens_addr: 'Wasfi Al Tal Street',
    br_sweifieh: 'Sweifieh', br_sweifieh_addr: 'Ali Al Sarayreh Street',
    br_dir: 'Directions', br_order: 'Order from here', br_all: 'All branch details', br_inside: 'Inside Al Mankal',
    hours_tbc: 'Opening hours: to confirm', open_now: 'Open now · until {t}', closed_now: 'Closed now · opens {t}',

    st_eyebrow: 'The story', st_title: 'It started with one grill',
    st_p1: 'In 1985 a charcoal grill was lit in Amman and the first chicken tikka went on it. The smoke drew a queue, and the queue never really left.',
    st_p2: 'Forty-one years later the coals are still lit the same way, in two branches, for the same city.',
    st_draft: 'Draft: the real story will be written with the family.',

    fr_eyebrow: 'Franchising', fr_title: 'Carry the fire',
    fr_lead: 'Al Mankal is looking for partners who want to bring charcoal tikka to their own corner of the map.',
    fr_cta: 'Talk to us about a franchise',

    sheet_title: 'Call Al Mankal', sheet_lead: 'One number for both branches. Say which branch when they answer.', close: 'Close', one_number: 'One number for both branches', ft_one: '· both branches',
    bk_title: 'Your basket', bk_empty: 'Your basket is empty.', bk_empty_p: 'Add a dish from the menu and it will wait for you here.',
    bk_browse: 'See the menu', bk_total: 'Total', bk_branch: 'Ordering from', bk_checkout: 'Checkout', bk_clear: 'Empty the basket',
    bk_note: 'Delivery or pickup. Cash on delivery.', bk_items: '{n} items', bk_item: '1 item',
    ho_title: 'One more step', ho_p: "Your order finishes on Al Mankal's secure order page, where you confirm your phone, address and delivery.",
    ho_mode: 'On the order page, choose {m} from {b}.',
    ho_list: 'Your list', ho_go: 'Continue to checkout', ho_back: 'Back to basket',
    ho_note: 'The order page opens with your first dish; add the rest from this list.',
    ho_copy: 'Copy the list', ho_copied: 'Copied',

    ft_order_note: "Checkout and payment run on the restaurant's own order page.",
    ft_made: 'Powered by FellowFlow', ft_preview: 'Preview, not yet public',
    bar_basket: 'Basket', bar_aria: 'Quick actions',

    mn_eyebrow: 'Order online', mn_title: 'The menu',
    mn_lead: "Everything on the grill, at the restaurant's own prices. Add to your basket, then checkout.",
    mn_search: 'Search the menu', mn_empty: 'Nothing matches. Try another word.', mn_count: '{n} dishes',
    mn_note: 'Prices in Jordanian dinars, as listed by the restaurant. Delivery or pickup, cash on delivery.',
    mn_top: 'Back to top',

    bp_eyebrow: 'Branches', bp_title: 'Find your grill',
    bp_lead: 'Two branches in Amman, both on charcoal.',
    bp_map: 'Open in Google Maps', bp_delivery: 'Delivery and pickup', bp_cash: 'Cash on delivery',
    bp_map_title: 'Map of the {b} branch',

    fp_eyebrow: 'Franchising', fp_title: 'Carry the fire',
    fp_lead: 'Forty-one years of charcoal tikka in Amman. The next grill could be yours.',
    fp_why_t: 'Why Al Mankal',
    fp_1_t: 'A name Amman knows', fp_1_p: 'Since 1985, two branches, one reputation built plate by plate.',
    fp_2_t: 'A simple menu', fp_2_p: 'Chicken tikka, sandwiches, meals and mezze. Easy to run, easy to love.',
    fp_3_t: 'Charcoal craft', fp_3_p: 'The grill is the brand, and it travels.',
    fp_talk_t: "Let's talk", fp_talk_p: "Tell us who you are and where you'd open. Everything else is a conversation.",
    fp_call: 'Call', fp_fb: 'Message us on Facebook',
    fp_note: 'Figures and terms are discussed in person.',

    nf_title: "This plate isn't on the menu.", nf_home: 'Back to Al Mankal'
  },
  ar: {
    lang_btn: 'English',
    title_home: 'المنقل تشكن تكا | اطلب دجاج على الفحم في عمّان',
    title_menu: 'القائمة والطلب | المنقل تشكن تكا',
    title_branches: 'الفروع | المنقل تشكن تكا',
    title_franchise: 'الامتياز التجاري | المنقل تشكن تكا',
    skip: 'روح للقائمة', skip_main: 'روح للمحتوى',
    brand: 'المنقل', brand_sub: 'تشكن تكا · عمّان',
    nav_menu: 'القائمة', nav_branches: 'الفروع', nav_franchise: 'الامتياز', nav_story: 'القصة', nav_basket: 'السلة',
    intro_still: 'لسا على الفحم', skip_intro: 'تخطّي', still_on: 'لليوم',

    hero_eyebrow: 'الجاردنز · الصويفية · عمّان',
    hero_title: 'على الفحم من سنة ١٩٨٥',
    hero_alt: 'سفرة من المنقل: تشكن تكا، أسياخ كباب، خبز بوري، حمص ومثومة، من فوق',
    lead: 'تكا وكباب وطاووق على الفحم، مع خبز البوري والمثومة.',
    how: 'كيف بدك طلبك؟', mode_aria: 'توصيل أو استلام',
    delivery: 'توصيل', pickup: 'استلام', from: 'من فرع',
    start: 'ابدأ طلبي', call: 'اتصل',
    mode_note: 'العنوان والرقم والدفع بتأكدهم على صفحة الطلب الخاصة بالمنقل.',

    menu_eyebrow: 'القائمة', menu_title: 'شو على المنقل اليوم؟',
    menu_for: '{m} من {b}', for_change: 'غيّر', for_hint: 'تأكد من الفرع قبل ما تطلب.', rail_aria: 'أقسام القائمة', sig: 'المميّزة',
    full_menu: 'القائمة كاملة مع البحث',
    photo_note: 'الصور من المنقل نفسه. الأطباق اللي لسا ما إلها صورة بيظهر مكانها الشعار.',
    nophoto: 'الصورة قريباً',
    add_btn: 'ضيف على السلة', jd: 'د.أ', qty: 'الكمية', less: 'أقل بواحد', more: 'أكثر بواحد',
    mn_spicy: 'بتقدر تطلبها حارّة', mn_legend: 'بتقدر تطلبها حارّة، بس اطلب.', mn_off: 'غير متوفر حالياً',
    again_title: 'اطلب مرة ثانية', again_p: 'آخر سلة على هاد الجهاز: {n} · {t} د.أ',
    again_btn: 'ضيفها كلها على سلتي', again_hide: 'مش هلأ', again_done: 'انضافت على سلتك',

    film_eyebrow: 'المنقل', film_title: 'فحم، مش غاز',
    film_1_w: 'فحم', film_1_p: 'فحم حيّ تحت كل قطعة. من سنة ١٩٨٥.',
    film_2_w: 'دجاج', film_2_p: 'دجاج كامل مفروش على الشبك. ربع، نص، أو صينية.',
    film_3_w: 'بوري', film_3_p: 'خبز منفوخ، مقلي عالطلب. مع كل وجبة.',
    film_4_w: 'مقبلات', film_4_p: 'مثومة، حمص، سلطة ورز برياني.',

    reels_eyebrow: 'من المطبخ', reels_title: 'شوفها قبل ما تدوقها',
    reels_lead: 'ريلز المطعم نفسه: المنقل، الصواني، والصالة.',
    reels_follow: 'تابع المنقل', reels_sound_on: 'الصوت شغّال', reels_sound_off: 'الصوت مسكّر', reels_play: 'شغّل',

    br_eyebrow: 'الفروع', br_title: 'منقلين في عمّان',
    br_gardens: 'الجاردنز', br_gardens_addr: 'شارع وصفي التل',
    br_sweifieh: 'الصويفية', br_sweifieh_addr: 'شارع علي الصرايرة',
    br_dir: 'الاتجاهات', br_order: 'اطلب من هون', br_all: 'تفاصيل الفروع', br_inside: 'جوّا المنقل',
    hours_tbc: 'مواعيد الدوام: قيد التأكيد', open_now: 'مفتوح هلأ · لحد {t}', closed_now: 'مسكّر هلأ · بيفتح {t}',

    st_eyebrow: 'القصة', st_title: 'بدأت بمنقل واحد',
    st_p1: 'سنة ١٩٨٥، ولّع منقل فحم في عمّان وانحطّ عليه أول تشكن تكا. الدخان جاب طابور، والطابور ما راح.',
    st_p2: 'بعد واحد وأربعين سنة، الفحم لسا بيتولّع بنفس الطريقة، في فرعين، لنفس المدينة.',
    st_draft: 'مسودة: القصة الحقيقية رح تنكتب مع العائلة.',

    fr_eyebrow: 'الامتياز التجاري', fr_title: 'احمل الشعلة',
    fr_lead: 'المنقل بدور على شركاء بدهم يوصّلوا تكا الفحم لزاويتهم على الخريطة.',
    fr_cta: 'احكي معنا عن الامتياز',

    sheet_title: 'اتصل بالمنقل', sheet_lead: 'رقم واحد للفرعين. قول لهم أي فرع لما يردّوا.', close: 'إغلاق', one_number: 'رقم واحد للفرعين', ft_one: '· للفرعين',
    bk_title: 'سلتك', bk_empty: 'سلتك فاضية.', bk_empty_p: 'ضيف طبق من القائمة وبيستناك هون.',
    bk_browse: 'شوف القائمة', bk_total: 'المجموع', bk_branch: 'الطلب من', bk_checkout: 'إتمام الطلب', bk_clear: 'فضّي السلة',
    bk_note: 'توصيل أو استلام. الدفع كاش عند الاستلام.', bk_items: '{n} أصناف', bk_item: 'صنف واحد',
    ho_title: 'خطوة وحدة كمان', ho_p: 'طلبك بيكمل على صفحة الطلب الآمنة للمنقل، وهناك بتأكد رقمك وعنوانك والتوصيل.',
    ho_mode: 'على صفحة الطلب، اختار {m} من فرع {b}.',
    ho_list: 'قائمتك', ho_go: 'كمّل لإتمام الطلب', ho_back: 'ارجع للسلة',
    ho_note: 'صفحة الطلب بتفتح على أول طبق؛ ضيف الباقي من هاي القائمة.',
    ho_copy: 'انسخ القائمة', ho_copied: 'انتسخت',

    ft_order_note: 'إتمام الطلب والدفع على صفحة الطلب الخاصة بالمطعم.',
    ft_made: 'Powered by FellowFlow', ft_preview: 'معاينة، غير منشور بعد',
    bar_basket: 'السلة', bar_aria: 'اختصارات',

    mn_eyebrow: 'اطلب أونلاين', mn_title: 'القائمة',
    mn_lead: 'كل اللي على المنقل بأسعار المطعم نفسها. ضيف على سلتك، وبعدين أتمّ الطلب.',
    mn_search: 'ابحث في القائمة', mn_empty: 'ما في نتائج. جرّب كلمة ثانية.', mn_count: '{n} طبق',
    mn_note: 'الأسعار بالدينار الأردني كما حدّدها المطعم. توصيل أو استلام، والدفع كاش عند الاستلام.',
    mn_top: 'لفوق',

    bp_eyebrow: 'الفروع', bp_title: 'لاقي منقلك',
    bp_lead: 'فرعين في عمّان، الاثنين على الفحم.',
    bp_map: 'افتح في خرائط جوجل', bp_delivery: 'توصيل واستلام', bp_cash: 'الدفع عند الاستلام',
    bp_map_title: 'خريطة فرع {b}',

    fp_eyebrow: 'الامتياز التجاري', fp_title: 'احمل الشعلة',
    fp_lead: 'واحد وأربعين سنة تكا فحم في عمّان. المنقل الجاي ممكن يكون إلك.',
    fp_why_t: 'ليش المنقل',
    fp_1_t: 'اسم عمّان بتعرفه', fp_1_p: 'منذ ١٩٨٥، فرعين، وسمعة انبنت طبق ورا طبق.',
    fp_2_t: 'قائمة بسيطة', fp_2_p: 'تشكن تكا، ساندويشات، وجبات ومقبلات. سهلة التشغيل، وسهل تنحب.',
    fp_3_t: 'صنعة الفحم', fp_3_p: 'المنقل هو العلامة، وبيسافر.',
    fp_talk_t: 'خلينا نحكي', fp_talk_p: 'احكيلنا مين إنت ووين بدك تفتح. الباقي حديث بيناتنا.',
    fp_call: 'اتصل', fp_fb: 'راسلنا على فيسبوك',
    fp_note: 'الأرقام والشروط بتنحكى بالمقابلة.',

    nf_title: 'هذا الطبق مش على القائمة.', nf_home: 'ارجع للمنقل'
  }
};
