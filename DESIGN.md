# Design Proposals for Eretz Shira

This document outlines proposed design improvements for the bilingual Hebrew-English poetry site.

---

## 1. Navigation & Information Architecture

### Current State
- No persistent navigation or header across pages
- No breadcrumbs on poem/author pages
- No way to return home except browser back button

### Proposed Changes
- **Add a global header** with site logo/title that links home
- **Add breadcrumb navigation** on poem pages: `Home → Author → Poem Title`
- **Add a footer** with navigation links (About, All Poems, All Authors)
- Consider a **"Random Poem"** button in navigation for discovery

---

## 2. Discovery & Browsing

### Current State
- Homepage shows flat list of "Featured Poems"
- No filtering, sorting, or search
- No dedicated "All Authors" page

### Proposed Changes
- **Add search functionality** with Hebrew + English support
- **Create an Authors index page** (`/authors`) showing all poets with poem counts
- **Add filtering on homepage**: by author, era, theme/tags
- **Add sorting options**: alphabetical, by author, recently added
- Consider **poem tags/categories** (love poetry, religious, nature, etc.)

---

## 3. Poem Page Improvements

### Current State
- Excellent reading controls (view mode, layout, nikkudot toggle)
- No sharing functionality
- No "next/previous poem" navigation
- No keyboard shortcuts for controls

### Proposed Changes
- **Add share buttons** (copy link, social media)
- **Add prev/next poem navigation** within same author or collection
- **Keyboard shortcuts**: `h` = Hebrew only, `e` = English only, `b` = both, `n` = toggle nikkudot
- **Print stylesheet** optimized for poetry formatting
- **Text size controls** for accessibility
- Add **"View original source"** link if applicable

---

## 4. Typography & Reading Experience

### Current State
- Good font choices (Cormorant Garamond, Spectral, Frank Ruhl Libre)
- Fixed font sizes that may be small on large displays

### Proposed Changes
- **Implement fluid typography** with `clamp()` for body text
- **Dark mode support** - many poetry readers prefer reading at night
- **Reading width control** - let users adjust the max-width of text
- Consider **adjustable line spacing** for the poem content
- Add **RTL language attribute** to Hebrew sections for better screen reader support

---

## 5. Mobile Experience

### Current State
- Responsive layouts exist but controls bar gets cramped
- Layout switches to interlinear on mobile automatically

### Proposed Changes
- **Improve controls for touch** - larger tap targets, gesture support
- **Bottom navigation bar** on mobile for easier thumb reach
- **Swipe gestures** for next/previous poem
- **Save reading position** in localStorage for long poems

---

## 6. Performance & SEO

### Current State
- Static site (good!)
- Basic meta tags

### Proposed Changes
- **Add Open Graph / Twitter Card meta tags** for social sharing previews
- **Add structured data** (JSON-LD) for poems - helps search engines understand content
- **Generate sitemap.xml** automatically from poem data
- **Add RSS feed** for new poems
- Consider **image OG previews** generated with poem title/author

---

## 7. Accessibility

### Current State
- Some ARIA labels on buttons
- No skip links or landmarks

### Proposed Changes
- **Add skip link** to jump to poem content
- **Use proper landmark roles** (`main`, `nav`, `article` for poems)
- **Improve focus indicators** - current are subtle
- **Add aria-live regions** for dynamic content changes (translation switches)
- **Test with screen readers** for RTL/LTR mixed content

---

## 8. Data Architecture

### Current State
- Poems stored as individual JSON files
- `all-poems.json` duplicates some data

### Proposed Changes
- **Add poem metadata**: year written, original publication, themes/tags
- **Add translator metadata** to translation entries
- **Consider markdown support** for poem descriptions
- **Validate JSON schema** in CI to catch data errors early

---

## 9. Future Features to Consider

- **Audio recordings** of poems being read
- **User bookmarks/favorites** (localStorage or account-based)
- **Comparison view** showing multiple translations side-by-side
- **Annotation/commentary mode** for scholarly notes
- **Print anthology** feature - select poems to generate PDF

---

## Priority Recommendations

| Priority | Change | Effort |
|----------|--------|--------|
| High | Global navigation header | Low |
| High | Dark mode support | Medium |
| High | Better mobile controls | Medium |
| Medium | Search functionality | Medium |
| Medium | Authors index page | Low |
| Medium | Keyboard shortcuts | Low |
| Medium | SEO improvements (OG tags, structured data) | Low |
| Low | Audio recordings | High |
| Low | User favorites | Medium |

---

## Design System Notes

The current visual design is elegant and well-suited for poetry:
- Warm, scholarly color palette (blues, golds, terracotta)
- Appropriate use of ornamental elements (✦, ❖)
- Good visual hierarchy with title treatments

Preserve these elements while implementing changes. The Middle Eastern-inspired decorative accents complement the Hebrew content well.
