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

The 9-second background uses the carousel-3d recipe to rotate all nine projects, combining three real screenshots with six typographic covers. The 48-second full film shares the same near-black/warm-gold palette and fonts across its opening, enlarged project stages, catalog orbit and closing. Editable source is maintained in the sibling local `portfolio-film` project (`src/HeroLoop.tsx`, `src/Carousel.tsx`, `src/catalog.ts`). The full film loads through an explicit play button.

Previous `.hallmark` notes and `styles.css` document the earlier design and are not the active stylesheet.
