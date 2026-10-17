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

## Using free Claude.ai (no subscription) for edits

### One-time setup: make Claude aware of the whole site
Do this once, in a fresh chat, before asking for any edit:
1. Go to claude.ai (free account, no subscription needed), start a new chat.
2. Attach (upload) these 8 files together using the paperclip/attach button: `index.html`, `data.js`, `facultyData.js`, `faculty-details.html`, `details.js`, `script.js`, `styles.css`, `HOW-TO-UPDATE.md`.
3. Paste this opening message along with the files:

> "These are all the files of the Physics Department website (Vikram Dev University), a static HTML/CSS/JS site hosted on GitHub Pages. Please read them so you understand the structure: index.html is the homepage, facultyData.js holds all faculty/staff info, data.js holds study resources and gallery slides, faculty-details.html + details.js render individual faculty detail pages, styles.css + script.js control look and behaviour. Don't change anything yet - just confirm you've understood the structure. I'll ask for specific small edits next, one file at a time."

4. Wait for Claude to confirm. Keep this chat open and reuse it for all edits in that session - Claude keeps the files in context, so you won't need to re-upload for later edits within the same chat.
5. If you start a NEW chat later (new day, chat too long, etc.), repeat steps 2-4 - re-upload the current files so Claude isn't working from stale info.

### For each small edit after setup
1. In the same chat, say what you want changed, e.g. "Add a new study resource: title X, link Y" or "Add Dr. X as new faculty, here are their details."
2. If it only touches one file, you can just say so - Claude already has it from setup. Paste ONLY the one file you need changed if you're in a fresh chat without the full upload.
   - Resources/gallery changes -> paste `data.js`
   - Faculty/staff changes -> paste `facultyData.js`
   - Homepage text (alerts, news, achievements, contact) -> paste `index.html`
   - Photos: just describe the filename: Claude can't receive images through text chat, but you can still tell it "I added assets/newphoto.jpg, use it for..."
4. Ask Claude to "return the complete updated file" (not just a snippet) - that avoids copy-paste mistakes.
5. Copy Claude's reply and replace the old file's content entirely (Ctrl+A, paste) in your editor. Save.
6. Open `index.html` locally in a browser to check it looks right.
7. Upload the changed file(s) to GitHub (web upload works - drag the file into the repo, it will ask to replace the existing one).

Keep each ask small and about one file at a time - this keeps free Claude accurate and fast, and keeps your costs at zero.
