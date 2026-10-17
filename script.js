/* Home page logic: faculty cards, study resources filter, gallery slideshow. Data lives in facultyData.js and data.js. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- footer year ---------- */
  if ($('year')) $('year').textContent = new Date().getFullYear();

  /* ---------- faculty & support cards ---------- */
  var SVG_PHONE = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" style="flex-shrink:0;"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.5 2.3.8 3.6.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1.3.3 2.5.8 3.6.2.3.1.7-.2 1L6.6 10.8z"></path></svg>';
  var SVG_MAIL = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" style="flex-shrink:0;"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg>';
  var SVG_SCHOLAR = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" style="flex-shrink:0;"><path d="M12 4L3 9l9 5 7.5-4.2V15"></path><path d="M7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5"></path></svg>';
  var SVG_RG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" style="flex-shrink:0;"><circle cx="6" cy="7" r="2.3"></circle><circle cx="18" cy="7" r="2.3"></circle><circle cx="12" cy="17" r="2.3"></circle><path d="M7.7 8.7L10.5 15M16.3 8.7L13.5 15M8.3 7h7.4"></path></svg>';
  var LINK = 'display:inline-flex;align-items:center;gap:6px;color:#2f5d58;text-decoration:none;font-size:13px;';

  function cardHtml(id, p) {
    var c = Object.assign({}, p, p.card || {});
    var name = c.personName || p.name;
    var pos = c.objectPosition || 'top';
    var avatar = c.avatarSrc
      ? '<img src="' + esc(c.avatarSrc) + '" alt="' + esc(name) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:' + esc(pos) + ';transform:scale(' + esc(c.zoom || 1) + ');transform-origin:' + esc(pos) + ';">'
      : '<span>' + esc(c.initials || '') + '</span>';
    var emails = (c.emails || []).map(function (e) { return '<a href="mailto:' + esc(e) + '" style="' + LINK + '">' + SVG_MAIL + '<span>' + esc(e) + '</span></a>'; }).join('');
    var links = (c.links || []).map(function (l) {
      var icon = /scholar/i.test(l.label) ? SVG_SCHOLAR : (/researchgate/i.test(l.label) ? SVG_RG : '');
      var label = l.label.replace(' profile', '').replace(' (personal website)', '');
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" style="' + LINK + '">' + icon + '<span>' + esc(label) + '</span></a>';
    }).join('');
    return '<div style="border-top:2px solid #b8862e;padding-top:20px;display:flex;flex-direction:column;">' +
      '<div style="width:140px;height:140px;border-radius:50%;background:#141d33;color:#d9ab5c;display:flex;align-items:center;justify-content:center;font-family:Fraunces,Georgia,serif;font-size:40px;margin-bottom:18px;overflow:hidden;border:1.5px solid #d9ab5c;flex-shrink:0;">' + avatar + '</div>' +
      '<h3 style="font-family:Fraunces,Georgia,serif;font-size:17px;font-weight:600;margin:0 0 2px;color:#1c2430;">' + esc(name) + '</h3>' +
      '<div style="color:#b8862e;font-size:13.5px;font-weight:600;margin-bottom:8px;">' + esc(c.role) + '</div>' +
      (c.spec ? '<p style="color:#5b6472;font-size:14.5px;margin:0 0 6px;">' + esc(c.spec) + '</p>' : '') +
      (c.researchFocus ? '<p style="color:#5b6472;font-size:14.5px;margin:0 0 6px;"><strong style="color:#1c2430;">Research focus:</strong> ' + esc(c.researchFocus) + '</p>' : '') +
      (c.phone ? '<p style="color:#5b6472;font-size:13.5px;margin:0 0 6px;"><a href="tel:+91' + esc(c.phone) + '" style="display:inline-flex;align-items:center;gap:6px;color:#2f5d58;text-decoration:none;">' + SVG_PHONE + '<span>+91-' + esc(c.phone) + '</span></a></p>' : '') +
      '<div style="display:flex;flex-direction:column;gap:6px;margin-top:2px;">' + emails + links + '</div>' +
      '<div style="display:flex;gap:14px;margin-top:8px;">' +
      (c.cv ? '<a href="' + esc(c.cv) + '" target="_blank" rel="noopener" style="color:#2f5d58;font-size:13.5px;font-weight:600;text-decoration:none;">View CV</a>' : '') +
      '<a href="faculty-details.html?id=' + esc(id) + '" style="color:#b8862e;font-size:13.5px;font-weight:600;text-decoration:none;">Details &#8250;</a>' +
      '</div></div>';
  }

  var FD = window.FACULTY_DATA;
  if (FD) {
    ['faculty:facultyGrid', 'support:supportGrid'].forEach(function (pair) {
      var parts = pair.split(':'), box = $(parts[1]);
      if (!box) return;
      box.innerHTML = FD.ORDER[parts[0]].map(function (id) { return cardHtml(id, FD.FACULTY[id]); }).join('');
    });
  }

  /* ---------- study resources ---------- */
  var ALL = window.RESOURCES || [];
  ALL.forEach(function (r, i) { r._i = i; });
  var LIVE = ALL.filter(function (r) { return r.url; });   /* entries with a link; empty url = "Coming soon" placeholder */
  var TYPES = ['All', 'Syllabus', 'Time Table', 'Question Papers', 'Lecture Notes', 'Slides', 'Assignments & Labs'];
  var PROGS = ['All', 'B.Sc. (Hons)', 'M.Sc.'];
  var state = { type: 'All', prog: 'All', q: '' };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    return m ? (+m[3]) + ' ' + MONTHS[+m[2] - 1] + ' ' + m[1] : '';
  }

  /* styles for the unit grid (kept here so only script.js needs replacing) */
  if ($('resRows') && !$('unitCss')) {
    var st = document.createElement('style');
    st.id = 'unitCss';
    st.textContent =
      '.unit-grid{border:1px solid #ddd6c4;background:#fbf9f3;margin-bottom:10px;}' +
      '.unit-head,.unit-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:8px 16px;align-items:start;padding:14px 18px;}' +
      '.unit-head{align-items:center;font-size:13px;font-weight:700;color:#5b6472;border-bottom:1.5px solid #1c2430;padding-top:10px;padding-bottom:10px;}' +
      '.unit-row{border-bottom:1px solid #ddd6c4;}' +
      '.unit-row:last-child{border-bottom:0;}' +
      '.unit-name{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:16.5px;line-height:1.3;padding-top:6px;}' +
      '.unit-cell-label{display:none;}' +
      '@media (max-width:760px){.unit-head{display:none;}.unit-row{grid-template-columns:1fr 1fr;padding:14px;}.unit-name{grid-column:1/-1;padding-top:0;}' +
      '.unit-cell-label{display:block;font-size:12.5px;font-weight:600;color:#5b6472;margin-bottom:5px;}}';
    document.head.appendChild(st);
  }

  function chip(label, active, size, pad, key, val) {
    return '<button data-k="' + key + '" data-v="' + esc(val) + '" style="font:inherit;font-size:' + size + 'px;font-weight:600;cursor:pointer;padding:' + pad + ';border-radius:999px;border:1.5px solid ' + (active ? '#141d33' : '#c9c1ab') + ';background:' + (active ? '#141d33' : 'transparent') + ';color:' + (active ? '#fff' : '#1c2430') + ';">' + esc(label) + '</button>';
  }

  function renderResources() {
    if (!$('resRows')) return;
    $('resTypeChips').innerHTML = TYPES.map(function (x) {
      var n = x === 'All' ? LIVE.length : LIVE.filter(function (r) { return r.type === x; }).length;
      return chip(x + ' (' + n + ')', state.type === x, 14, '7px 14px', 'type', x);
    }).join('');
    $('resProgChips').innerHTML = PROGS.map(function (x) { return chip(x, state.prog === x, 13.5, '5px 12px', 'prog', x); }).join('');
    var q = state.q.trim().toLowerCase(), now = Date.now();
    var shown = ALL.filter(function (r) {
      return (state.type === 'All' || r.type === state.type) && (state.prog === 'All' || r.programme === state.prog) &&
        (!q || [r.title, r.course, r.unit, r.unitTitle, r.type, r.programme, r.semester, r.year].join(' ').toLowerCase().indexOf(q) > -1);
    }).sort(function (a, b) { return (b.added || '').localeCompare(a.added || ''); });

    /* group by course; entries with a "unit" go into that course's Unit grid, the rest are normal rows */
    var groups = [], byName = {};
    shown.forEach(function (r) {
      var isUnit = !!r.unit && (r.type === 'Lecture Notes' || r.type === 'Slides');
      if (!isUnit && !r.url) return;
      var name = r.course || 'General';
      if (!byName[name]) { byName[name] = { rows: [], units: {}, unitList: [], n: 0 }; groups.push(name); }
      var g = byName[name];
      if (r.url) g.n++;
      if (!isUnit) { g.rows.push(r); return; }
      var u = g.units[r.unit];
      if (!u) { u = g.units[r.unit] = { name: r.unit, title: '', notes: [], slides: [], first: r._i }; g.unitList.push(u); }
      u.first = Math.min(u.first, r._i);
      if (!u.title && r.unitTitle) u.title = r.unitTitle;
      (r.type === 'Lecture Notes' ? u.notes : u.slides).push(r);
    });

    /* ungrouped items (e.g. the Class Time Table) always come first */
    groups.sort(function (a, b) { return (a === 'General' ? 0 : 1) - (b === 'General' ? 0 : 1); });

    function isNewItem(r) { return r.added && (now - new Date(r.added).getTime()) < 30 * 86400000; }
    var NEWB = '<span style="font-weight:700;font-size:12px;color:#1c1404;background:#d9ab5c;padding:2px 9px;border-radius:2px;">New</span>';

    function rowHtml(r) {
      var meta = [r.programme, r.semester, r.year, r.deadline ? 'Deadline: ' + r.deadline : ''].filter(Boolean).join(' \u00b7 ');
      return '<div class="res-row" style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 20px;align-items:center;padding:16px 18px;border:1px solid #ddd6c4;background:#fbf9f3;margin-bottom:10px;"><div>' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-weight:700;font-size:12px;color:#2f5d58;background:#e4eeec;padding:2px 9px;border-radius:2px;">' + esc(r.type) + '</span>' +
        (isNewItem(r) ? NEWB : '') + '</div>' +
        '<div style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:17px;line-height:1.3;">' + esc(r.title) + '</div>' +
        '<div style="color:#5b6472;font-size:14px;margin-top:3px;">' + esc(meta) + '</div></div>' +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="res-dl" style="background:#2f5d58;color:#fff;font-weight:600;font-size:14.5px;text-decoration:none;padding:10px 18px;white-space:nowrap;">Download \u203a</a></div>';
    }

    function cellHtml(label, list) {
      list = list.slice().sort(function (a, b) { return a._i - b._i; });   /* same unit + type: stack in the order listed in data.js */
      var inner = !list.length ? '<span style="color:#9aa1ad;">\u2014</span>' : list.map(function (r) {
        if (!r.url) return '<div style="color:#7a8290;font-size:14px;padding-top:6px;">Coming soon</div>';
        return '<div style="margin-bottom:10px;">' + (list.length > 1 && r.version ? '<div style="font-size:12.5px;font-weight:600;color:#5b6472;margin-bottom:3px;">' + esc(r.version) + '</div>' : '') + '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="res-dl" style="display:inline-block;background:#2f5d58;color:#fff;font-weight:600;font-size:14px;text-decoration:none;padding:8px 16px;white-space:nowrap;">Download \u203a</a>' +
          (isNewItem(r) ? ' ' + NEWB : '') +
          (r.added ? '<div style="font-size:12px;color:#7a8290;margin-top:4px;">Added ' + esc(fmtDate(r.added)) + '</div>' : '') + '</div>';
      }).join('');
      return '<div><span class="unit-cell-label">' + label + '</span>' + inner + '</div>';
    }

    function gridHtml(g) {
      if (!g.unitList.length) return '';
      return '<div class="unit-grid"><div class="unit-head"><div>Unit</div><div>Lecture Notes</div><div>Slides</div></div>' +
        g.unitList.sort(function (a, b) { return a.first - b.first; }).map(function (u) {
          return '<div class="unit-row"><div class="unit-name">' + esc(u.name) + (u.title ? ' <span style="font-family:\'Source Sans 3\',sans-serif;font-weight:500;font-size:14.5px;color:#5b6472;">\u2013 ' + esc(u.title) + '</span>' : '') + '</div>' + cellHtml('Lecture Notes', u.notes) + cellHtml('Slides', u.slides) + '</div>';
        }).join('') + '</div>';
    }

    $('resRows').innerHTML = groups.map(function (name) {
      var g = byName[name];
      return '<details open style="margin-bottom:16px;">' +
        '<summary style="cursor:pointer;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:18px;color:#1c2430;padding:10px 2px;border-bottom:2px solid #b8862e;margin-bottom:12px;list-style:none;display:flex;align-items:center;gap:8px;">' +
        '<span>' + esc(name) + '</span><span style="font-family:inherit;font-weight:600;font-size:13px;color:#5b6472;">(' + g.n + ')</span></summary>' +
        g.rows.map(rowHtml).join('') + gridHtml(g) + '</details>';
    }).join('');
    $('resEmpty').hidden = groups.length > 0;
    $('resCount').textContent = 'Showing ' + shown.filter(function (r) { return r.url; }).length + ' of ' + LIVE.length + ' resources';
  }
  if ($('resRows')) {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-k]');
      if (!b) return;
      state[b.getAttribute('data-k')] = b.getAttribute('data-v');
      renderResources();
    });
    $('resQuery').addEventListener('input', function (e) { state.q = e.target.value; renderResources(); });
    renderResources();
  }

  /* ---------- gallery slideshow ---------- */
  var SL = window.SLIDES || [], idx = 0;
  if ($('slideItems') && SL.length) {
    $('slideItems').innerHTML = SL.map(function (s) {
      return '<div style="flex:0 0 100%;"><img src="' + esc(s.img) + '" alt="' + esc(s.caption) + '" loading="lazy" style="width:100%;height:460px;object-fit:contain;' + (s.objectPosition ? 'object-position:' + esc(s.objectPosition) + ';' : '') + 'background:#fbf9f3;display:block;">' +
        '<div style="padding:12px 16px;font-size:14.5px;color:#5b6472;border-top:1px solid #ddd6c4;">' + esc(s.caption) + '</div></div>';
    }).join('');
    $('slideDots').innerHTML = SL.map(function (s, i) {
      return '<button data-slide="' + i + '" aria-label="Go to slide ' + (i + 1) + '" style="width:9px;height:9px;border-radius:50%;border:none;padding:0;cursor:pointer;"></button>';
    }).join('');
    var show = function (i) {
      idx = (i + SL.length) % SL.length;
      $('slideStrip').style.transform = 'translateX(-' + (idx * 100) + '%)';
      Array.prototype.forEach.call($('slideDots').children, function (d, n) { d.style.background = n === idx ? '#b8862e' : '#ddd6c4'; });
    };
    $('prevSlide').addEventListener('click', function () { show(idx - 1); });
    $('nextSlide').addEventListener('click', function () { show(idx + 1); });
    $('slideDots').addEventListener('click', function (e) { var b = e.target.closest('button[data-slide]'); if (b) show(+b.getAttribute('data-slide')); });
    show(0);
  }
})();
