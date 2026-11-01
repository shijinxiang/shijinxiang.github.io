# Current design · 2026-11-02

Primary visual style: Cinematic Video Hero (StyleKit, v1.0.0), from the user-provided `cinematic-video-hero-style-pack`.

- Near black `#05060A`, raised surface `#141821`, warm gold `#E4C063`, muted steel `#9AA6B8`.
- Full-width, short silent background loop with a WebP poster and readable text scrims.
- Local Space Grotesk and Noto Sans SC, rounded media frames, pill controls and restrained shadows.
- Motion and Save-Data preferences prevent automatic background loading; explicit playback remains available.

Project selector geometry: Card Stack (StyleKit, v1.0.0), from the user-provided `card-stack-style-pack`. This reference applies only to the project deck, not the global palette.

- At most three visible cards, progressive depth, scale and opacity.
- The front card lifts; the two rear cards fan in opposite directions on hover/focus.
- Previous/next controls and left/right keys switch cards. No timed rotation or complex mobile gestures.
- Selecting a card follows a stable anchor to its detail row below. Detail rows retain the reference's left-image/right-copy structure on desktop and stack on mobile.

Real screenshot previews: RAG, VoiceOps and the local question library. Other projects use typographic covers, labelled as project covers. Project claims and demo limitations remain in `config.js`.

The 8-second background is an original Remotion composition of the same real project screenshots. Its editable source is maintained in the sibling private/local `portfolio-film` project (`src/HeroLoop.tsx`). The existing 30-second project film remains available through an explicit play button.

Previous `.hallmark` notes and `styles.css` document the earlier design and are not the active stylesheet.
