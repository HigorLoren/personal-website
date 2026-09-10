/**
 * Fired on `window` after <ScrollHashObserver> rewrites the URL hash with
 * `history.replaceState` (which emits no native `hashchange`). <SiteNav>
 * listens to it to keep the active-link marker in sync with the section the
 * reader is actually looking at.
 */
export const SECTION_HASH_EVENT = "sectionhashchange";
