# Department of Physics website - how to update (no AI, no subscription)

Edit files with any free editor (Notepad++ or VS Code). Open `index.html` in a browser to check.

## Files
| File | What it holds |
|---|---|
| `index.html` | Home page text (alerts, news, achievements, programmes, contact) |
| `data.js` | Study resources list + gallery slides |
| `facultyData.js` | All faculty/staff: contacts, photo, details-page sections |
| `faculty-details.html`, `details.js` | Details page (no need to edit) |
| `styles.css`, `script.js` | Look and behaviour (no need to edit) |
| `assets/` | Photos. Keep your existing `assets/` and `cv/` folders; copy these photos into them |

## Common updates
**Add a study resource** - open `data.js`, copy one line inside `window.RESOURCES = [ ... ]`, change the text, link and date. Keep the comma between lines. Set the Drive file to "Anyone with the link can view".

**Add a gallery photo** - put the image in `assets/`, add a line in `window.SLIDES` in `data.js`.

**Change a faculty photo** - save the new photo in `assets/` (about 400 x 400 px, JPG), and make sure `avatarSrc` in `facultyData.js` has that file name.
Face too small or off-centre on the card? Inside that person's `card: { ... }` add `"objectPosition": "center 25%", "zoom": "1.4"` (change numbers until it looks right).

**Add a person** - copy an existing entry in `facultyData.js`, give it a new id, and add the id to `ORDER` at the bottom.

**Alerts bar (scrolling)** - in `index.html` search for `Alerts`; each item is one `<span>...</span>`. The list appears twice (for the smooth loop) - change both copies.

**News / notices** - in `index.html` search for `id="notices"`; copy one `<li>...</li>` block.

**Achievements** - in `index.html` search for `id="achievements"`; copy a card block.

**Alumni form** - search for `alumni-frame` in `index.html` and change the link.

## Publishing (free)
GitHub Pages, Netlify or Cloudflare Pages: upload the whole folder (index.html, other files, assets, cv).

## Tip if you ever ask an AI for help
Do not send the whole folder. Send only the file you want changed (`data.js` is tiny), or paste just the section you need.
