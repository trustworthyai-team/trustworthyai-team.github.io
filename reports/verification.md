# Migration verification — October 26, 2026

- Read all seven original content pages: Home, Research Area, Members, Papers, News, Activities, and the nested 2023 awards gallery.
- Downloaded 82 source images. Retained the available source files and generated 164 local responsive WebP variants. This archive includes stock art and agency/conference marks; these decorative images are not used in the redesigned primary pages.
- Included every member portrait, the 13 research-content figures, all 15 activity photographs, and the four photographs from the linked awards gallery. The awards gallery includes alternate exports of some activity photos.
- Built nine HTML pages: eight content pages and the 404 page.
- Checked 238 local links/resources plus responsive image variants and fragment destinations: no missing files or anchors.
- Ran 27 browser layout checks across all nine pages at 320, 768, and 1440 CSS pixels: no horizontal overflow or broken loaded images. Unloaded offscreen images are covered by the local file checks.
- Visually inspected the home and people layouts and saved home screenshots at desktop and mobile widths.
- Tested mobile menu navigation, publication title search, year selection, combined empty results, and photo-dialog opening and closing.
- Audited 74 distinct external URLs: 60 returned HTTP 200; one JMIR page returned HTTP 202; two ACM links returned HTTP 403; eleven LinkedIn links returned HTTP 999. The 13 blocked links are retained as original authoritative destinations and cannot be certified by automated checks. The JMIR 202 response also does not establish readable article content.

## Link repairs

- Replaced the broken AAPM conference explorer link in Rafi's biography with the author's matching [NA-UNETR project](https://github.com/rafiibnsultan/NA_UNETR). The original returned 502; the replacement returned 200.
- Corrected Xiangyu's generic GitHub homepage link to [xzhou98](https://github.com/xzhou98), verified from his personal website.
- Replaced direct OpenReview PDF links with their matching forum pages, which returned 200 in the final audit.
- Removed the Outlook Safe Links wrapper around the NAIRR project URL and linked directly to the project.
- Rewrote old Google Sites navigation links to local HTML pages and replaced the empty Resources destination with a concrete resources list under Join & Contact.

## Scope and deployment

The site is ready for review in the local repository. GitHub Pages deployment configuration is supplied. No changes were pushed or published, and the original Google Site was not edited.

## Readability and news-date revision

Body text now uses 19px, research summaries 18–19px, news summaries 18px, publication titles 22–23px, and publication metadata 17px. Navigation, profile links, controls, and footer text have also been increased. Narrow phones show one person per row, and text contrast has been increased.

Home, research, and news copy has been shortened. All 16 news entries now have explicit, sourced dates, with the newest first. Seven missing or conference-year-derived dates were researched; see [news-date-sources.md](news-date-sources.md). The original full biographies, photographs, and research figures remain available.

Rebuilt and packaged the revision. All 242 local links/resources and responsive image variants passed. Repeated the 27 phone/tablet/desktop layout checks with the larger type: no overflow or broken loaded images. Mobile navigation and publication search also passed. Updated screenshots are saved alongside this report.

## Agency and venue logo revision

Added local logos for NSF, NIH, HRSA, MIDL, CVPR, AAAI, ICLR, ECAI, JMIR AI, WACV, and Wayne State University to their matching news, publication, and funding entries. The existing agency and venue logos are now used in the design, superseding their initial exclusion described above. HRSA's additional logo was downloaded from the image source declared by its [official homepage](https://www.hrsa.gov/), with provenance added to the asset manifest.

Logos use `object-fit: contain`, preserving their colors and proportions. Conference-year-specific images appear only with matching conference editions. The 14 funding entries have matching NSF, NIH, or HRSA marks. The new layout passed 12 checks across the four affected pages at 320, 768, and 1440 pixels, with no horizontal overflow or broken loaded logos. All 289 local links/resources passed. The deployment package was rebuilt.

## Uniform logo sizing correction

Removed the competing context-specific logo dimensions. All news, publication, and grant logos now share one fixed 96 × 72 CSS-pixel frame with an 80 × 56 image box, centered with `object-fit: contain`. Their HTML dimensions are also bounded at 80 × 56, so the original source dimensions cannot reserve oversized image boxes before CSS loads. Frames cannot grow, shrink, or allow an image to escape.

Checked all nine pages at 320, 375, 390, 540, 768, 900, 901, 1024, 1440, and 1920 pixels: 90 page checks and 470 rendered logo instances. Every logo frame measured exactly 96 × 72 and every image box measured 80 × 56. No image escaped its frame, no image exceeded the horizontal viewport, and no page had horizontal overflow. No loaded image was broken. Local resources were checked separately, including offscreen lazy images. Raw measurements are in `logo-fit-checks.json`.

## Embedded logo treatment

Replaced the visible white frames with unboxed, transparent logo containers. Removed all container borders and padding. Increased the shared image area to 112 × 80 CSS pixels while preserving each logo's proportions. A subtle contrast adjustment and multiply blending integrate the source images' light backgrounds into the page. Original asset files remain unchanged. Narrow-phone funding entries stack the logo above the description so the larger mark does not squeeze the text.

Repeated all 90 page/viewport checks, including verifying the actual browser viewport matches the requested width. All logo containers and image boxes measured 112 × 80, all containers had zero padding and border and a transparent background, and all images used proportional containment. No logo escaped its container, no image extended horizontally outside the viewport, and no page had horizontal overflow. Raw results and desktop/mobile screenshots are in `embedded-logo-checks.json` and `embedded-logos-*.jpg`.

## Completing missing logos

Added eleven sourced assets covering the remaining publication venues and MICCAI news. Every one of the 23 publications, 16 news entries, and 14 funding entries now has an agency, venue, publisher, or organizer mark. Three qualified substitutions are documented in [additional-logo-sources.md](additional-logo-sources.md): the INNS co-organizer for IJCNN 2022, the Springer publisher for DMKD, and the ICML host-conference logo for the AdvML workshop. Their accessible labels identify the organization accurately.

Corrected generic venue labels on the four 2021 entries from their original citations. Added coverage validation to the local checker so a missing mark fails verification. All 303 local links/resources passed. The 90 page/viewport checks covered 610 logo instances with no missing marks, size mismatches, escaped images, loaded-image failures, or horizontal overflow. See `complete-logo-checks.json`. Reversed official marks were visually checked in monochrome for visibility on the light theme. The current ECCV archive serves a 2026 logo even on its 2024 page, so the matching 2024 mark was obtained from the conference participant Amazon Science instead.
