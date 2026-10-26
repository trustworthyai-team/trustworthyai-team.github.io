# Trustworthy AI Lab — Wayne State University

A minimal, responsive, static lab website for GitHub Pages. Content was migrated from [the lab's Google Site](https://sites.google.com/view/mlpa/mainpage) on October 26, 2026.

## Preview and edit

Requires Node.js 22 or later.

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173. The generated HTML also works when opened directly from disk.

```sh
npm run build          # Regenerate HTML from the content snapshot and page templates
npm run check          # Check every local link, anchor, image variant, and page heading
npm run check:external # Request every distinct external URL and save the results
npm run package        # Prepare the clean deployment artifact in _site/
```

- `scripts/build.mjs`: page structure, home copy, contact details, navigation, link corrections, and HTML generation.
- `source/content.json`: editable snapshot of the original lab content, including biographies, research, publications, news, and photo captions.
- `source/news.json`: concise news entries with verified dates, event types, and source evidence. Update this file to maintain the news feed.
- `source/research-summaries.json`: concise descriptions displayed on the Research page; the original longer descriptions remain in the source snapshot.
- `source/brands.json`: grant agency, university, journal, and conference logo assets used in news, publication, and funding entries.
- `assets/style.css`: typography, colors, layout, image treatment, and responsive breakpoints.
- `assets/site.js`: mobile navigation, publication filters, and accessible photo dialogs.
- `assets/originals/`: original-site image downloads and additional agency/venue marks, retained with their source provenance in the asset manifest.
- `assets/images/`: local WebP versions in two sizes. Photographs use appropriate crops; research diagrams and gallery images preserve their complete composition.
- `source/asset-manifest.json`: source-to-local image provenance, dimensions, and original file paths.

Regenerate with `npm run build` after changing the content or template. The website requires no runtime framework or external image host.

## Pages

Home, Research, People, Publications, News, and Join & Contact form the primary site. People links to Life in the Lab, which preserves all seven activity albums. A separate 2023 awards gallery preserves the linked historical page. A 404 page handles unavailable addresses.

The migration includes 17 profiles, 11 research directions, 23 publications, 14 funding entries with the duplicated R33 entry consolidated, and all lab photographs and research figures from the relevant content sections. Agency and venue logos identify related news, publications, and grants. Decorative stock images remain in the source archive.

## GitHub Pages

The workflow at `.github/workflows/pages.yml` builds, checks, and deploys `_site/` on pushes to `main` or a manual workflow run. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The expected destination is https://ninjutsoo.github.io/trustworthyai-team/.

The deployment artifact includes only website pages and optimized assets. Source snapshots, reports, original image archives, scripts, and dependencies are excluded. The repository is `ninjutsoo/trustworthyai-team`. The build accepts `SITE_URL` (set from GitHub Pages in CI) and defaults to the address above. The 404 page uses this base URL so navigation and assets work for missing nested paths.

## Verification and remaining limits

See `reports/verification.md`, the raw external-link audit, responsive checks, and desktop/mobile screenshots in `reports/`.

External destinations remain controlled by their owners. LinkedIn and ACM may require a browser session or block automated requests; a response from those sites is not proof that the target content can be read. Source biography wording and historical grant descriptions are preserved and may warrant an editorial update by the lab.
