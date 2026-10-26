# Additional logo coverage

Eleven more local logo assets were downloaded to fill the remaining publication/news gaps. Asset URLs, source pages, names, and any qualifications are recorded in `source/brands.json` and `source/asset-manifest.json`.

| Entry | Source | Treatment |
| --- | --- | --- |
| MICCAI | [MICCAI Society](https://www.miccai.org/) | Official society mark |
| IJCAI | [IJCAI](https://ijcai.org/) | Official reversed mark displayed in monochrome on the light background |
| IJCNN 2025 | [2025 conference](https://2025.ijcnn.org/) | Matching conference-edition logo |
| IJCNN 2022 | [INNS conference archive](https://www.inns.org/past-ijcnn-conferences) | Official co-organizer INNS mark, identified as such in its alt text and tooltip; the 2022 conference site blocks retrieval |
| ECCV 2024 | [Amazon Science conference page](https://www.amazon.science/conferences-and-events/eccv-2024) | Matching 2024 mark from a conference participant; the conference archive's current navigation serves a 2026 logo, which was rejected |
| CHI 2024 | [CHI 2024](https://chi2024.acm.org/) | Official conference icon, more legible at compact sizes than its panoramic banner |
| The Web Conference 2024 | [Conference site](https://www2024.thewebconf.org/) | Matching conference-edition logo |
| ECML-PKDD | [Conference series](https://ecmlpkdd.org/) | Official year-neutral conference-series mark |
| AdvML at ICML | [ICML 2022](https://icml.cc/Conferences/2022) | Official host-conference mark, identified as such |
| Data Mining and Knowledge Discovery | [Journal landing page](https://link.springer.com/journal/10618) | Official Springer publisher mark, identified as such; reversed asset displayed in monochrome |
| ISBI 2021 | [Conference site](https://biomedicalimaging.org/2021/) | Matching official header mark, displayed in monochrome for the light background |

All 23 publication entries, all 16 news entries, and all 14 grant entries now have matching venue, agency, publisher, or organizer marks. The four older papers formerly labelled “Journal / Conference” now identify IJCAI, DMKD, ISBI, and AAAI from their original citations. The build check now rejects entries missing a mark.

The same borderless 112 × 80 layout applies to every asset. Original imagery is preserved locally; no logo is AI-generated and no image is hotlinked at runtime.
