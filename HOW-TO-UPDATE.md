# Department of Physics website - how to update (no AI, no subscription)

Edit files with any free editor (Notepad++ or VS Code). Open `index.html` in a browser to check.
The site has several pages. Each page is its own file, and the menu, alerts bar and footer are shared by all pages.

## Files
| File | What it holds |
|---|---|
| `index.html` | Home page (quick links, short About, contact strip) |
| `about.html` | About the department, Head of Department message, Laboratories & facilities |
| `programmes.html` | Programmes and syllabus links |
| `resources.html` | Study resources page (class time table, question papers, etc.) |
| `faculty.html` | Faculty & staff cards and Research Expertise |
| `student-life.html` | Activities (seminars, SPECTRUM) and Achievements |
| `gallery.html` | Photo gallery (photos are listed in `data.js`) |
| `news.html` | News & notices page (filled from `data.js`) |
| `alumni-contact.html` | Alumni form and contact details |
| `faculty-details.html`, `details.js` | One person's details page (no need to edit) |
| `data.js` | Alerts bar, notices, achievements, study resources, gallery slides, seminar form link |
| `facultyData.js` | All faculty/staff: contacts, photo, details-page sections |
| `layout.js` | Menu, alerts bar and footer shared by every page |
| `resources.js`, `script.js`, `styles.css` | Look and behaviour (no need to edit) |
| `assets/` | Photos. Keep your existing `assets/` and `cv/` folders |

## Most common updates (all in `data.js`)
Open `data.js` and find the heading comment for the part you want. Copy one line, change the text, keep the commas between lines.

**Alerts bar (scrolling)** - `window.ALERTS`. One line per alert. Delete the line when its deadline is over.

**News & notices page** - `window.NOTICES`. `group` is `"exam"` or `"opportunity"`. Delete a line when it is no longer relevant.

**Achievements** - `window.ACHIEVEMENTS`. Newest group first. Put the certificate photos in `assets/` and list them under `images`; each result is one line under `rows` as `["Name", "Category / batch", "Result", "Date"]`. The newest group is also shown on the Home page.

**Add a study resource** - `window.RESOURCES`. Copy one line, change the text, link and date. Set the Drive file to "Anyone with the link can view".

**Class Time Table** - it is shown in full on the Resources page (inside a viewer) and can be downloaded. To change it, replace the `url` of the Time Table line.

**IKS (P105) materials** - these lines carry `"faculty": "bikash-chandra-swain"`, so they are shown on Dr. Bikash's Details page under **Teaching** (the Resources page shows a pointer to it). They appear as a grid: one row per unit, with Lecture Notes, Slides and Model Q&A columns.
To add a file, find the unit's line with `"url": ""` (it shows "Coming soon"), paste the Drive link between the quotes and set `"added"` to the date. Two versions of the same unit and type are stacked in one cell, labelled by the `"version"` field.
To give another teacher's course the same treatment, add `"faculty": "<that person's id>"` to its lines.

**Seminar form** - at the bottom of `data.js`, `window.SEMINAR_FORM = "..."`. The "Register to give a talk" button shows on the Home page and under Student Seminars. Leave it empty to hide the button.

**Add a gallery photo** - put the image in `assets/`, add a line in `window.SLIDES`.

## Other updates
**Change a faculty photo** - save the new photo in `assets/` (about 400 x 400 px, JPG), and make sure `avatarSrc` in `facultyData.js` has that file name.
Face too small or off-centre on the card? Inside that person's `card: { ... }` add `"objectPosition": "center 25%", "zoom": "1.4"` (change numbers until it looks right).

**Add a person** - copy an existing entry in `facultyData.js`, give it a new id, and add the id to `ORDER` at the bottom.

**Change the menu or footer** - `layout.js` (menu list at the top). Changing it once changes every page.

**Past seminars / SPECTRUM text** - `student-life.html`.

**Home page text, About, Programmes, Contact, Alumni form** - the matching page file. For the alumni form, search for `alumni-frame` in `alumni-contact.html`.

## If a change does not show on the site
The pages load the scripts with a version number, e.g. `data.js?v=20261122`. After a big update, if visitors still see the old version, change that number (any new number) in the `.html` files, or just press Ctrl+F5.

## Publishing (free)
GitHub Pages, Netlify or Cloudflare Pages: upload the whole folder (all the `.html` and `.js` files, `styles.css`, `assets`, `cv`).
Old links such as `.../#resources` still work: the Home page sends them to the right page.

## Using free Claude.ai (no subscription) for edits
Because each page is a small separate file, you only need to paste the one file you want changed.

1. Go to claude.ai, start a new chat and attach (or paste) only the file you want changed. For most updates that is `data.js`.
   - Alerts, notices, achievements, resources, gallery, seminar form -> `data.js`
   - Faculty/staff changes -> `facultyData.js`
   - Page text -> that page's `.html` file
2. Say what you want changed, e.g. "Add a new study resource: title X, link Y" or "Remove the alerts whose deadline is over (today is ...)".
3. Ask Claude to "return the complete updated file" (not just a snippet).
4. Replace the old file's content entirely (Ctrl+A, paste) in your editor, or save Claude's file over it. Save.
5. Open `index.html` in a browser to check it.
6. Upload the changed file(s) to GitHub (drag the file into the repository; it will ask to replace the existing one). Wait a minute, then refresh the site with Ctrl+F5.

Keep each ask small and about one file at a time.
