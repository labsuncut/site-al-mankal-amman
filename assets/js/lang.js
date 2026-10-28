// Runs before the page paints: remembers the visitor's language so there is no flash of the wrong one.
// Arabic for Arabic browsers on the first visit (Amman first), English otherwise; the header button switches.
(function () {
  var l = null;
  try { l = localStorage.getItem('mankal-lang'); } catch (e) {}
  if (!l && /^ar\b/i.test(navigator.language || '')) l = 'ar';
  if (l === 'ar') { document.documentElement.lang = 'ar'; document.documentElement.dir = 'rtl'; }
})();
