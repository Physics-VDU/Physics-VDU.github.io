/* Shared menu, alerts bar and footer for every page. To change the menu or footer, edit it here - once. */
(function () {
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var NAV = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['programmes.html', 'Programmes'],
    ['resources.html', 'Resources'],
    ['faculty.html', 'Faculty & Research'],
    ['student-life.html', 'Student Life'],
    ['news.html', 'News'],
    ['alumni-contact.html', 'Alumni & Contact']
  ];
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === 'faculty-details.html') page = 'faculty.html';

  var nav = NAV.map(function (n) {
    var on = n[0] === page;
    return '<a href="' + n[0] + '"' + (on ? ' aria-current="page"' : '') + ' style="color:' + (on ? '#fff' : '#c7cede') + ';text-decoration:none;font-size:14.5px;font-weight:600;padding:6px 2px;border-bottom:2px solid ' + (on ? '#d9ab5c' : 'transparent') + ';">' + esc(n[1]) + '</a>';
  }).join('');

  var header =
    '<header class="site-header" style="position:-webkit-sticky;position:sticky;top:0;z-index:1000;background:#141d33;color:#eef1f6;border-bottom:1px solid #33405e;box-shadow:0 2px 12px rgba(10,16,32,0.35);">' +
    '<div class="hdr-inner" style="max-width:1140px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;">' +
    '<a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;">' +
    '<span style="width:44px;height:44px;border-radius:50%;border:1.5px solid #d9ab5c;background:#fbf9f3;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;"><img src="assets/logo.jpg" alt="Vikram Dev University logo" style="width:100%;height:100%;object-fit:cover;"></span>' +
    '<span style="line-height:1.25;"><span style="display:block;font-size:12.5px;letter-spacing:0.02em;color:#b8c0d4;">Vikram Dev University, Jayapur</span>' +
    '<span style="display:block;font-family:Fraunces,Georgia,serif;font-size:18px;font-weight:600;">Department of Physics</span></span></a>' +
    '<nav class="site-nav" style="display:flex;gap:20px;flex-wrap:wrap;row-gap:6px;">' + nav + '</nav></div></header>';

  /* alerts bar: the list is ALERTS in data.js; shown twice in each half so the loop is seamless on wide screens */
  var AL = window.ALERTS || [];
  var ticker = '';
  if (AL.length) {
    var one = AL.map(function (a) {
      return '<span style="margin-right:60px;font-size:14.5px;"><a href="' + esc(a.url) + '"' + (a.external ? ' target="_blank" rel="noopener"' : '') + ' style="color:#fff;text-decoration:underline;text-underline-offset:3px;">' + esc(a.label) + '</a>' + esc(a.text || '') + '</span>';
    }).join('');
    var half = one + one;
    ticker =
      '<div style="background:#2f5d58;color:#eaf3f1;overflow:hidden;position:relative;border-bottom:1px solid #33405e;">' +
      '<div class="ticker-inner" style="max-width:1140px;margin:0 auto;padding:9px 24px;display:flex;align-items:center;gap:14px;">' +
      '<span style="flex-shrink:0;font-weight:700;font-size:12.5px;letter-spacing:0.02em;background:#b8862e;color:#1c1404;padding:3px 10px;border-radius:2px;">Alerts</span>' +
      '<div style="overflow:hidden;flex:1;min-width:0;white-space:nowrap;"><div style="display:inline-block;animation:marquee 60s linear infinite;">' + half + half + '</div></div></div></div>';
  }

  var ICON = 'width="18" height="18" aria-hidden="true"';
  var footer =
    '<footer style="background:#141d33;color:#c7cede;margin-top:0;"><div style="max-width:1140px;margin:0 auto;padding:44px 24px 24px;">' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:36px;margin-bottom:32px;">' +
    '<div><h4 style="color:#fff;font-size:17px;">Department of Physics</h4>' +
    '<p style="font-size:14.5px;margin:0 0 14px;">Vikram Dev University, Jayapur, Koraput, Odisha, India. Part of the university that carries forward Jeypore College, founded 1947.</p>' +
    '<p style="font-size:14px;margin:0;"><a href="mailto:vdu.physics@gmail.com" style="color:#d9ab5c;text-decoration:none;">vdu.physics@gmail.com</a></p></div>' +
    '<div><h4 style="color:#fff;font-size:15px;">Quick links</h4><ul style="list-style:none;padding:0;margin:0;font-size:14.5px;line-height:2;">' +
    '<li><a href="https://vikramdevuniversity.ac.in/#/home" target="_blank" rel="noopener" style="color:#c7cede;text-decoration:none;">University home</a></li>' +
    '<li><a href="programmes.html" style="color:#c7cede;text-decoration:none;">Programmes</a></li>' +
    '<li><a href="resources.html" style="color:#c7cede;text-decoration:none;">Student resources</a></li>' +
    '<li><a href="faculty.html" style="color:#c7cede;text-decoration:none;">Faculty &amp; Research</a></li>' +
    '<li><a href="news.html" style="color:#c7cede;text-decoration:none;">News &amp; Notices</a></li></ul></div>' +
    '<div><h4 style="color:#fff;font-size:15px;">Department</h4><ul style="list-style:none;padding:0;margin:0;font-size:14.5px;line-height:2;">' +
    '<li><a href="about.html" style="color:#c7cede;text-decoration:none;">About &amp; Facilities</a></li>' +
    '<li><a href="student-life.html" style="color:#c7cede;text-decoration:none;">Student Life</a></li>' +
    '<li><a href="student-life.html#achievements" style="color:#c7cede;text-decoration:none;">Achievements</a></li>' +
    '<li><a href="alumni-contact.html#alumni" style="color:#c7cede;text-decoration:none;">Alumni</a></li>' +
    '<li><a href="alumni-contact.html#contact" style="color:#c7cede;text-decoration:none;">Contact</a></li></ul></div></div>' +
    '<div style="border-top:1px solid #33405e;padding-top:18px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 20px;font-size:13.5px;color:#98a3bd;">' +
    '<span>© ' + new Date().getFullYear() + ' Department of Physics, Vikram Dev University.</span>' +
    '<span>तमसो मा ज्योतिर्गमय — From darkness, lead me to light.</span></div></div></footer>';

  /* the header goes in at once (this script sits right under the placeholder), so it is there before the rest of the page loads */
  var h = document.getElementById('site-header');
  if (h) h.outerHTML = header + ticker;
  function putFooter() { var f = document.getElementById('site-footer'); if (f) f.outerHTML = footer; }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', putFooter); else putFooter();
})();
