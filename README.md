# Portfolio: Ashwin Joseph Manthara

A plain HTML/CSS/JS site with no build step. Double-click `index.html` to open it.

## Pages
- `index.html`: home page with the projects section, latest posts and contact
- `about.html`: about, experience, toolkit and principles
- `blog.html`: all Medium posts (title and cover image; each card opens Medium)

## Updating content (no HTML editing needed)
| What | File |
|---|---|
| Name, email, LinkedIn, GitHub, **Medium handle**, photo, résumé | `assets/js/config.js` |
| Projects (add, remove or reorder; add `repo`, `metrics`, `posts`, `featured`) | `assets/js/projects.js` |
| "Currently building" card (project, milestones, what you're learning) | `now` in `assets/js/config.js` |
| Styling (colours, fonts) | `assets/css/style.css` (the `:root` variables at the top) |

### Blog
Set `mediumHandle` in `config.js` (without the `@`). The blog pulls your latest posts from Medium's RSS feed through the free rss2json.com service. New Medium posts show up on the site automatically. If the feed can't be reached, the site shows the posts in `manualPosts` instead.

### Photo / résumé
Put `ashwin.jpg` or `resume.pdf` inside `assets/`, then set `photo: "assets/img/ashwin.jpg"` or `resume: "assets/resume.pdf"` in `config.js`.

## Deploying (free)
- **GitHub Pages:** push this folder to a repo named `<username>.github.io` → Settings → Pages → deploy from `main`.
- **Vercel / Netlify:** drag and drop this folder, or import the repo. No build command is needed.

## Weekly routine (keeps the site alive)
1. Update `now.milestones` in `config.js` (`next` → `active` → `done`) and change `now.updated`.
2. Publish on Medium with 3–5 tags. The tags become filter chips on the Writing page.
3. When a project ships, move it from `now` into `projects.js`. Add `repo`, `metrics` (real numbers) and links to your write-ups in `posts`, and set `featured: true` for your best 2–3.
