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
  - **Contact section ("We'd love to hear from you"):** the large faint circle and the ring become a faint copy of the bars in the top-right corner, also waving. On the dark background the colours are see-through greens, 12% for empty and 34% for full, so empty stays the fainter of the two.
  - **"At a glance" card and the services panel** (wide and narrow layouts): the faint circles become a faint, still copy of the bars.
  - **Advantages:** 01, 02 and 03 become the bars with one, two or three lit.
- **Client band (phone layout):** the dots between client names become squares of the same size: 3 px, 0.5 px radius, 50% opacity.
- **Reduced motion:** visitors whose system asks for less motion see the bars empty (pale green) and still.

## Not changed

- Layout, navigation, buttons, cards, icons and copy.
- The other pages. The TP Documentation headline still has a green word; changing it is a separate decision.

## Considered and not chosen

- Three larger directions built around the arm's length range: a range line, real benchmark ranges in the hero, and a full-width range band.
- Four other ways to mark the headline word: the bars as the full stop, an underline, a marker, and a bold word.
- Two other animations: fill and drain, and light up in turn.

## Checks

- **Headless checks** at desktop 1280 px, tablet 820 px, phone 375 px, and with reduced motion:
  - no script errors;
  - the headline ends in the green square, with no gradient;
  - two waving marks;
  - no circles left;
  - three numbered advantage marks;
  - square separators on the phone;
  - with reduced motion, the green layer is hidden.
- **Prerendered snapshot:** regenerated with `node tools/prerender.mjs`. With JavaScript off, the page shows the new design.
