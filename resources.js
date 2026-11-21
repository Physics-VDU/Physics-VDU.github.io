/* Shared by the Resources page and the faculty details page: turns a list of resource entries (from data.js) into HTML.
   Time Table rows are also shown in a viewer; entries with a "unit" go into the Lecture Notes / Slides / Model Q&A grid. */
(function () {
  var V = window.VDU = window.VDU || {};
  var esc = V.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? (+m[3]) + ' ' + MONTHS[+m[2] - 1] + ' ' + m[1] : ''; }
  function driveId(u) { var m = /\/file\/d\/([^\/?#]+)/.exec(u || ''); return m ? m[1] : ''; }

  /* styles for the unit grid and time-table viewer */
  if (!document.getElementById('unitCss')) {
    var st = document.createElement('style');
    st.id = 'unitCss';
    st.textContent =
      '.unit-grid{border:1px solid #ddd6c4;background:#fbf9f3;margin-bottom:10px;}' +
      '.unit-head,.unit-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);gap:8px 16px;align-items:start;padding:14px 18px;}' +
      '.unit-head{align-items:center;font-size:13px;font-weight:700;color:#5b6472;border-bottom:1.5px solid #1c2430;padding-top:10px;padding-bottom:10px;}' +
      '.unit-row{border-bottom:1px solid #ddd6c4;}' +
      '.unit-row:last-child{border-bottom:0;}' +
      '.unit-name{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:16.5px;line-height:1.3;padding-top:6px;}' +
      '.unit-cell-label{display:none;}' +
      '.tt-embed{border:1px solid #ddd6c4;background:#fbf9f3;margin:-2px 0 12px;padding:10px;}' +
      '.tt-embed iframe{display:block;width:100%;height:560px;border:0;background:#fff;}' +
      '.tt-embed p{margin:8px 2px 0;font-size:13.5px;color:#5b6472;}' +
      '@media (max-width:760px){.unit-head{display:none;}.unit-row{grid-template-columns:1fr 1fr;padding:14px;}.unit-name{grid-column:1/-1;padding-top:0;}' +
      '.unit-cell-label{display:block;font-size:12.5px;font-weight:600;color:#5b6472;margin-bottom:5px;}.tt-embed{padding:6px;}.tt-embed iframe{height:420px;}}';
    document.head.appendChild(st);
  }

  /* list = resource entries to show (each must carry _i, its position in data.js). Returns { html, groups, live } */
  V.groupsHtml = function (list, opts) {
    opts = opts || {};
    var now = Date.now(), groups = [], byName = {};
    list.forEach(function (r) {
      var isUnit = !!r.unit && (r.type === 'Lecture Notes' || r.type === 'Slides' || r.type === 'Model Q&A');
      if (!isUnit && !r.url) return;
      var name = r.course || 'General';
      if (!byName[name]) { byName[name] = { rows: [], units: {}, unitList: [], n: 0 }; groups.push(name); }
      var g = byName[name];
      if (r.url) g.n++;
      if (!isUnit) { g.rows.push(r); return; }
      var u = g.units[r.unit];
      if (!u) { u = g.units[r.unit] = { name: r.unit, title: '', notes: [], slides: [], qa: [], first: r._i }; g.unitList.push(u); }
      u.first = Math.min(u.first, r._i);
      if (!u.title && r.unitTitle) u.title = r.unitTitle;
      (r.type === 'Lecture Notes' ? u.notes : r.type === 'Slides' ? u.slides : u.qa).push(r);
    });
    groups.sort(function (a, b) { return (a === 'General' ? 0 : 1) - (b === 'General' ? 0 : 1); });   /* ungrouped items (Time Table) first */

    function isNewItem(r) { return r.added && (now - new Date(r.added).getTime()) < 30 * 86400000; }
    var NEWB = '<span style="font-weight:700;font-size:12px;color:#1c1404;background:#d9ab5c;padding:2px 9px;border-radius:2px;">New</span>';

    function rowHtml(r) {
      var meta = [r.programme, r.semester, r.year, r.deadline ? 'Deadline: ' + r.deadline : ''].filter(Boolean).join(' \u00b7 ');
      var did = r.type === 'Time Table' ? driveId(r.url) : '';
      var embed = did ? '<div class="tt-embed"><iframe src="https://drive.google.com/file/d/' + esc(did) + '/preview" title="' + esc(r.title) + '" loading="lazy" allow="autoplay"></iframe>' +
        '<p>Not loading, or too small to read? <a href="' + esc(r.url) + '" target="_blank" rel="noopener" style="color:#2f5d58;font-weight:600;text-decoration:none;">Open the time table in a new tab \u203a</a></p></div>' : '';
      return '<div class="res-row" style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 20px;align-items:center;padding:16px 18px;border:1px solid #ddd6c4;background:#fbf9f3;margin-bottom:10px;"><div>' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-weight:700;font-size:12px;color:#2f5d58;background:#e4eeec;padding:2px 9px;border-radius:2px;">' + esc(r.type) + '</span>' +
        (isNewItem(r) ? NEWB : '') + '</div>' +
        '<div style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:17px;line-height:1.3;">' + esc(r.title) + '</div>' +
        '<div style="color:#5b6472;font-size:14px;margin-top:3px;">' + esc(meta) + '</div></div>' +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="res-dl" style="background:#2f5d58;color:#fff;font-weight:600;font-size:14.5px;text-decoration:none;padding:10px 18px;white-space:nowrap;">Download \u203a</a></div>' + embed;
    }

    function cellHtml(label, items) {
      items = items.slice().sort(function (a, b) { return a._i - b._i; });   /* same unit + type: stacked in the order listed in data.js */
      var inner = !items.length ? '<span style="color:#9aa1ad;">\u2014</span>' : items.map(function (r) {
        if (!r.url) return '<div style="color:#7a8290;font-size:14px;padding-top:6px;">Coming soon</div>';
        return '<div style="margin-bottom:10px;">' + (items.length > 1 && r.version ? '<div style="font-size:12.5px;font-weight:600;color:#5b6472;margin-bottom:3px;">' + esc(r.version) + '</div>' : '') +
          '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="res-dl" style="display:inline-block;background:#2f5d58;color:#fff;font-weight:600;font-size:14px;text-decoration:none;padding:8px 16px;white-space:nowrap;">Download \u203a</a>' +
          (isNewItem(r) ? ' ' + NEWB : '') +
          (r.added ? '<div style="font-size:12px;color:#7a8290;margin-top:4px;">Added ' + esc(fmtDate(r.added)) + '</div>' : '') + '</div>';
      }).join('');
      return '<div><span class="unit-cell-label">' + label + '</span>' + inner + '</div>';
    }

    function gridHtml(g) {
      if (!g.unitList.length) return '';
      return '<div class="unit-grid"><div class="unit-head"><div>Unit</div><div>Lecture Notes</div><div>Slides</div><div>Model Q&amp;A for Practice</div></div>' +
        g.unitList.sort(function (a, b) { return a.first - b.first; }).map(function (u) {
          return '<div class="unit-row"><div class="unit-name">' + esc(u.name) + (u.title ? ' <span style="font-family:\'Source Sans 3\',sans-serif;font-weight:500;font-size:14.5px;color:#5b6472;">\u2013 ' + esc(u.title) + '</span>' : '') + '</div>' +
            cellHtml('Lecture Notes', u.notes) + cellHtml('Slides', u.slides) + cellHtml('Model Q&amp;A for Practice', u.qa) + '</div>';
        }).join('') + '</div>';
    }

    var live = 0;
    var html = groups.map(function (name) {
      var g = byName[name]; live += g.n;
      return '<details open style="margin-bottom:16px;">' +
        '<summary style="cursor:pointer;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:18px;color:#1c2430;padding:10px 2px;border-bottom:2px solid #b8862e;margin-bottom:12px;list-style:none;display:flex;align-items:center;gap:8px;">' +
        '<span>' + esc(name) + '</span><span style="font-family:inherit;font-weight:600;font-size:13px;color:#5b6472;">(' + g.n + ')</span></summary>' +
        g.rows.map(rowHtml).join('') + gridHtml(g) + '</details>';
    }).join('');
    return { html: html, groups: groups.length, live: live };
  };

  /* resource entries, numbered by their position in data.js */
  V.allResources = function () { var a = window.RESOURCES || []; a.forEach(function (r, i) { r._i = i; }); return a; };
})();
