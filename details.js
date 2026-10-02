/* Faculty details page: reads ?id=... and shows that person from facultyData.js */
(function () {
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var FD = window.FACULTY_DATA, id = new URLSearchParams(location.search).get('id');
  var p = FD && FD.FACULTY[id];
  if (!p) { document.getElementById('notFound').hidden = false; return; }
  document.title = p.name + ' - Department of Physics, VDU';

  var ICON = 'width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" style="flex-shrink:0;"';
  var A = 'display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:14px;';
  var phone = p.phone ? '<p style="font-size:14px;margin:2px 0 8px;"><a href="tel:+91' + esc(p.phone) + '" style="' + A + '"><svg viewBox="0 0 24 24" ' + ICON + '><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.5 2.3.8 3.6.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1.3.3 2.5.8 3.6.2.3.1.7-.2 1L6.6 10.8z"></path></svg><span>+91-' + esc(p.phone) + '</span></a></p>' : '';
  var emails = (p.emails || []).map(function (e) { return '<a href="mailto:' + esc(e) + '" style="' + A + '"><svg viewBox="0 0 24 24" ' + ICON + '><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg><span>' + esc(e) + '</span></a>'; }).join('');
  var links = (p.links || []).map(function (l) {
    var icon = /scholar/i.test(l.label) ? '<svg viewBox="0 0 24 24" ' + ICON + '><path d="M12 4L3 9l9 5 7.5-4.2V15"></path><path d="M7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5"></path></svg>'
      : /researchgate/i.test(l.label) ? '<svg viewBox="0 0 24 24" ' + ICON + '><circle cx="6" cy="7" r="2.3"></circle><circle cx="18" cy="7" r="2.3"></circle><circle cx="12" cy="17" r="2.3"></circle><path d="M7.7 8.7L10.5 15M16.3 8.7L13.5 15M8.3 7h7.4"></path></svg>' : '';
    return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" style="' + A + '">' + icon + '<span>' + esc(l.label.replace(' profile', '').replace(' (personal website)', '')) + '</span></a>';
  }).join('');
  var avatar = p.avatarSrc
    ? '<img src="' + esc(p.avatarSrc) + '" alt="' + esc(p.name) + '" style="width:100%;height:100%;object-fit:cover;object-position:top;">'
    : '<span>' + esc(p.initials) + '</span>';

  var head = '<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;background:#fbf9f3;border:1px solid #ddd6c4;border-top:3px solid #b8862e;padding:24px;margin-bottom:32px;">' +
    '<div style="width:96px;height:96px;border-radius:50%;flex:0 0 auto;background:#d9ab5c;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Fraunces,Georgia,serif;font-size:32px;font-weight:600;overflow:hidden;">' + avatar + '</div>' +
    '<div><h1 style="font-size:26px;margin-bottom:4px;">' + esc(p.name) + '</h1>' +
    '<div style="color:#b8862e;font-weight:600;font-size:15px;margin-bottom:6px;">' + esc(p.role) + '</div>' +
    (p.spec ? '<p style="color:#5b6472;font-size:14.5px;margin:0 0 4px;">' + esc(p.spec) + '</p>' : '') +
    phone + '<div style="display:flex;flex-direction:column;gap:6px;">' + emails + links + '</div></div></div>';

  var secs = (p.sections || {});
  var open = {};
  function sections() {
    return FD.SECTION_ORDER.filter(function (s) { return secs[s[0]]; }).map(function (s) {
      var k = s[0], on = !!open[k];
      return '<div style="border-bottom:1px solid #ddd6c4;">' +
        '<button data-k="' + k + '" aria-expanded="' + on + '" style="width:100%;background:none;border:none;text-align:left;cursor:pointer;padding:16px 4px;display:flex;justify-content:space-between;align-items:center;font-family:Fraunces,Georgia,serif;font-size:18px;font-weight:600;color:#1c2430;">' +
        '<span>' + esc(s[1]) + '</span><span style="color:#b8862e;font-size:14px;transform:rotate(' + (on ? 180 : 0) + 'deg);transition:transform .2s ease;">\u25bc</span></button>' +
        '<div class="acc-body" style="max-height:' + (on ? '3000px' : '0') + ';padding:0 4px;font-size:15px;"><div style="padding-bottom:18px;">' + secs[k] + '</div></div></div>';
    }).join('');
  }
  var box = document.getElementById('person');
  function draw() { box.innerHTML = head + sections(); }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-k]'); if (!b) return;
    open[b.getAttribute('data-k')] = !open[b.getAttribute('data-k')]; draw();
  });
  draw();
})();
