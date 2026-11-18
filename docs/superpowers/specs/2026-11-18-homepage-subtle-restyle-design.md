# Homepage: subtle restyle with the logo's bars (design)

Date: 18 November 2026. Agreed with Aleks in conversation, after local mock-ups.

## Goal

Make the homepage more recognisably inRange's own by changing details only. The font, layout, copy, colours and the other pages stay as they are. Generic decorations are replaced by the logo's three bars.

## Changes (variations/V2_Modern.jsx)

- **Headline:** "partner" is plain navy like the rest of the line. The full stop becomes a small green square: 0.15em, slightly rounded, like one of the logo bars. The gradient on the word is gone.
- **Logo bars:** a `LogoBars` helper draws the logo's three bars, with the same geometry as `Logo` in components/Brand.jsx.
  - **Before "Transfer pricing · Amsterdam":** the bars replace the pulsing dot and move as a wave.
    - Each bar keeps a pale copy (brand green 100).
    - Its green level rises and falls between 25% and 100% of the bar, over 1.8 s.
    - Each bar runs 0.3 s after its left neighbour.
  - **Advantages:** 01, 02 and 03 become the bars with one, two or three lit.
- **Dark panels:** none has decoration any more; the faint circles and the ring are gone.
  - **"At a glance" card and the contact section:** unchanged otherwise, but with 8 px corners (were 20 px and 28 px).
  - **Services, "navy, simpler":**
    - no card or shadow around the list, and no icon tiles;
    - a small square marks each service, filled green for the selected one;
    - the selected service's description sits in a navy panel with 8 px corners and a sentence-case label above the title;
    - on phone and tablet the fold-out list keeps working, restyled the same way.
- **Client band (phone layout):** the dots between client names become squares of the same size: 3 px, 0.5 px radius, 50% opacity.
- **Reduced motion:** visitors whose system asks for less motion see the bars empty (pale green) and still.

## Also changed

- **Services panel label:** the small label above the selected service's title is back in green capitals, as on the other dark sections.
- **Top bar:** it no longer runs off the screen. It used to overflow at 768–881 px and at 1024–1146 px.
  - **768–1023 px:** the links move into the menu, as on phones. The bar shows the logo, the Capability deck button and the menu button.
  - **1024–1199 px:** the links are slightly tighter, and "Let's connect" is left out.
- **TP Documentation page:** the headline words are navy, and only the full stop is green (the same square).
- **Capability deck** (assets/inRange_Capability_Deck.pdf). The slides are built locally from deck/web; the folder is not in git. A copy of the previous version is in deck/_backup-2026-11-18. Both versions were updated the same way, the standard one and the one with Aleks's photo:
  - no green glows or decorative circles;
  - the logo's bars before "Transfer pricing · Amsterdam" on the cover;
  - the cover and contact headlines end in the green square instead of a green word;
  - the services cards get a small green square instead of numbered circles, and straighter (2 mm) corners;
  - the "At a glance" card has straighter corners;
  - the advantages are numbered with one, two or three lit bars;
  - the photo keeps its circle and thin green ring, without the soft halo;
  - the website's logo (three green bars and "inRange") sits top right on the cover and the closing slide, and small in the footers of the other slides. The old logo with the arrow is not used.

## Not changed

- Layout, navigation, buttons, cards, icons and copy.
- The other pages, apart from the TP Documentation headline.
- In the deck: the "How we work" circles, the projects slide (except its glows), and the short green line under each slide heading.

## Considered and not chosen

- Three larger directions built around the arm's length range: a range line, real benchmark ranges in the hero, and a full-width range band.
- Four other ways to mark the headline word: the bars as the full stop, an underline, a marker, and a bold word.
- Two other animations: fill and drain, and light up in turn.
- A faint copy of the bars in the corners of the dark panels, waving on the contact section. It was built, then dropped.
- For the dark panels:
  - light (pale grey) versions;
  - an open layout: no box at the top, all six services shown at once, and a full-width navy band for contact.

## Checks

- **Headless checks** at desktop 1280 px, tablet 820 px, phone 375 px, and with reduced motion:
  - no script errors;
  - the headline ends in the green square, with no gradient;
  - one waving mark, above the headline;
  - no decoration on the dark panels, and 8 px corners on all three;
  - the services list has six squares and no icon tiles; hovering a service (desktop) or tapping it (phone) shows its description;
  - three numbered advantage marks;
  - square separators on the phone;
  - with reduced motion, the bars stay empty.
- **Prerendered snapshot:** regenerated with `node tools/prerender.mjs`. With JavaScript off, the page shows the new design.
