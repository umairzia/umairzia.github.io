# umairzia.github.io

The portfolio website of Umair Zia, served free by GitHub Pages at https://umairzia.github.io

## How the site works

The site is plain HTML, CSS and JavaScript. There is no build step. GitHub Pages serves the files exactly as they are in this repository. Every word a visitor reads lives in one file, `data/content.js`, and the pages fill themselves in from it.

## How to change any text on the site

1. Open this repository on github.com and click the file `data/content.js`.
2. Click the pencil icon (Edit this file).
3. Change the text between the quotation marks. The comments inside the file explain every field.
4. Scroll down, write a short note about what you changed, and click "Commit changes" to the `main` branch.
5. Wait about one minute. Refresh the live site and the change is there.

Things to keep in mind while editing:

- Keep the quotation marks around each piece of text.
- Keep the commas at the ends of lines.
- Do not change the field names to the left of each colon.

## How to replace the resume PDF

1. On github.com, open the folder `assets/resume/`.
2. Click "Add file", then "Upload files".
3. Upload your new PDF. It must be named exactly `Umair_Zia_Resume.pdf` so the download button keeps working.
4. Commit the upload to the `main` branch. The old file is replaced.

## How to add a new project

1. Open `data/content.js` and copy one whole project block, from its `{` to its `},`.
2. Paste it below the last project and edit the text. Give it a new `slug` made of lowercase words and hyphens.
3. For the case-study page, copy any file in `projects/`, rename the copy to `<your-new-slug>.html`, and change three things inside it: the `<title>`, the `content=` text of the two description tags, and the `data-slug="..."` value, which must match the new slug exactly.

## Files

- `index.html` is the home page.
- `projects/` holds one case-study page per project.
- `data/content.js` holds all the words. This is the file to edit.
- `assets/css/style.css` holds the design. The site's accent color is the `--accent` variable at the top.
- `assets/js/main.js` reads `content.js` and fills the pages in.
- `assets/resume/Umair_Zia_Resume.pdf` is the downloadable resume.
- `404.html` is shown for links that do not exist.
