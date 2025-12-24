# Poetry Website - TODO & Future Improvements

## Current Status
- ✅ Side-by-side view (Hebrew left, English right)
- ✅ Interlinear view (stacked lines)
- ✅ Language toggle (Hebrew, English, Both)
- ✅ Line-by-line data structure
- ✅ Translation selection dropdown
- ✅ Basic stanza structure

---

## 1. Refrain Highlighting

### What to Add
Mark recurring refrain lines (like "עוד לא אבדה תקוותנו" in Tikvatenu) with special styling to show poem structure.

### Schema Changes
Add `refrainId` field to lines:

```json
{
  "id": "stanza1-line5",
  "hebrew": "עוֹד לֹא אָבְדָה תִקְוָתֵנוּ",
  "refrainId": "hope-refrain",
  "trans": {
    "default": "Our hope is not yet lost"
  }
}
```

### Implementation
```typescript
// Detect refrain
const isRefrain = !!line.refrainId;

// Apply CSS class
<div className={`line ${isRefrain ? 'refrain' : ''}`}>
```

### Styling Options (pick one)
- **Indent**: `padding-left: 2rem; font-style: italic;`
- **Border**: `border-left: 3px solid #3b82f6; padding-left: 1rem; background: rgba(59,130,246,0.05);`
- **Color**: `color: #1e40af;`
- **Subtle**: `font-size: 0.95em; opacity: 0.85; padding-left: 3rem;`

### Priority
**Medium** - Nice visual enhancement, especially for poems with clear refrains like Tikvatenu

---

## 2. Additional View Modes

### A. Full Poem View
**Description**: Show complete Hebrew poem, then complete English translation below (no interleaving).

**When to use**: For experiencing the poem as a whole work, maintaining rhythm and flow.

**Implementation**:
```typescript
// Render all Hebrew stanzas
{poem.content.map(stanza => (
  <div className="stanza-hebrew">
    {stanza.map(line => <div>{line.hebrew}</div>)}
  </div>
))}

// Then all English stanzas
{poem.content.map(stanza => (
  <div className="stanza-english">
    {stanza.map(line => <div>{line.trans.default}</div>)}
  </div>
))}
```

**Priority**: **High** - Major reading preference for poetry appreciation

---

### B. Stanza-Grouped Interlinear
**Description**: Like current interlinear, but group by stanza (all Hebrew lines, then all English lines for that stanza).

**When to use**: Balance between reference and flow.

**Implementation**:
```typescript
{poem.content.map(stanza => (
  <div className="stanza-group">
    {/* All Hebrew lines */}
    <div className="hebrew-stanza">
      {stanza.map(line => <div>{line.hebrew}</div>)}
    </div>
    
    {/* All English lines */}
    <div className="english-stanza">
      {stanza.map(line => <div>{line.trans.default}</div>)}
    </div>
  </div>
))}
```

**Priority**: **Medium** - Good middle ground option

---

## 3. Per-Poem Display Defaults

### What to Add
Let each poem specify its preferred default view and settings.

### Schema Addition
```json
{
  "metadata": {
    "title": "...",
    "displayConfig": {
      "defaultView": "side-by-side",
      "defaultNikkud": true,
      "showLineNumbers": true
    }
  }
}
```

### Suggested Defaults by Type
- **Medieval poetry** (Yehuda Halevi): `side-by-side`, nikkud ON (complex language, scholars)
- **Modern revival** (Bialik): `hebrew`, nikkud ON (readers likely know Hebrew)
- **National poems** (Tikvatenu): `side-by-side`, nikkud ON (educational interest)
- **Long narratives**: `interlinear`, nikkud optional

### Priority
**Medium** - Nice QOL improvement once you have multiple poems

---

## 4. Typography Improvements

### Hebrew Font
Use dedicated Hebrew poetry font with good nikkud support:
- **Frank Ruehl CLM** (traditional)
- **Taamey Frank CLM** (specifically for nikkud)
- **David Libre** (Google Fonts, good web font)

```css
@import url('https://fonts.googleapis.com/css2?family=David+Libre:wght@400;700&display=swap');

.hebrew-text {
  font-family: 'David Libre', serif;
  line-height: 2.0; /* Extra space for nikkud */
}
```

### English Font
Complement Hebrew with classic serif:
- **Crimson Text**
- **Lora**
- **Merriweather**

### Line Height
- Hebrew with nikkud: `line-height: 1.8-2.0`
- English translation: `line-height: 1.6-1.8`
- Between stanzas: 2-3x normal spacing

### Priority
**High** - Major impact on readability and aesthetics

---

## 5. User Preferences

### What to Add
Save user's preferred viewing settings across sessions.

### Storage Structure
```typescript
interface UserPreferences {
  defaultView: 'hebrew' | 'side-by-side' | 'english' | 'interlinear' | 'full';
  defaultNikkud: boolean;
  fontSize: 'small' | 'medium' | 'large';
  showLineNumbers: boolean;
  theme?: 'light' | 'sepia' | 'dark';
}
```

### Implementation
```typescript
// Save to localStorage
localStorage.setItem('poetryPrefs', JSON.stringify(preferences));

// Load on mount
const saved = localStorage.getItem('poetryPrefs');
const prefs = saved ? JSON.parse(saved) : defaultPrefs;
```

### UI Element
Add checkbox: "Remember my preference for all poems"

### Priority
**Medium** - Nice feature once you have multiple poems and users

---

## 6. Interactive Features

### A. Click-to-Highlight Lines
**Description**: Click a line number to highlight that line in both Hebrew and English (useful for teaching/discussion).

**Implementation**:
```typescript
const [highlightedLine, setHighlightedLine] = useState(null);

<div 
  className={line.id === highlightedLine ? 'highlighted' : ''}
  onClick={() => setHighlightedLine(line.id)}
>
```

**CSS**:
```css
.highlighted {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 4px;
  padding: 0.25rem;
}
```

**Priority**: **Low** - Nice to have for educators

---

### B. Copyable Links to Specific Lines
**Description**: Generate shareable URLs to specific lines (e.g., `#line-5`).

**Implementation**:
```typescript
<div id={line.id}>
  {/* line content */}
</div>

// Scroll to line on page load
useEffect(() => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    document.getElementById(hash)?.scrollIntoView();
  }
}, []);
```

**Priority**: **Low** - Nice for sharing

---

## 7. Annotations & Glossary

### What to Add
Popup explanations for difficult Hebrew words, biblical allusions, or cultural context.

### Schema Addition
```json
{
  "id": "line1",
  "hebrew": "צִיּוֹן, הֲלֹא תִשְׁאֲלִי לִשְׁלוֹם אֲסִירַיִךְ",
  "annotations": [
    {
      "word": "אֲסִירַיִךְ",
      "definition": "Your captives - refers to Jews in exile",
      "type": "cultural"
    }
  ],
  "trans": { "default": "..." }
}
```

### UI Implementation
```typescript
<span 
  className="annotated-word"
  title={annotation.definition}
>
  {word}
</span>
```

Or use a tooltip library for better UX.

### Priority
**Medium** - Very valuable for medieval poetry (Yehuda Halevi), less needed for modern poetry

---

## 8. Audio Recordings

### What to Add
"Listen" button to hear the Hebrew read aloud. Critical for poetry (rhythm, pronunciation).

### Schema Addition
```json
{
  "metadata": {
    "audio": {
      "url": "/audio/tikvatenu.mp3",
      "author": "Reader name",
      "license": "CC-BY"
    }
  }
}
```

### Implementation
```typescript
<audio controls src={poem.metadata.audio.url}>
  Your browser doesn't support audio.
</audio>
```

### Advanced: Line-by-line timing
```json
{
  "audio": {
    "url": "/audio/tikvatenu.mp3",
    "timings": [
      { "lineId": "line1", "start": 0.5, "end": 3.2 },
      { "lineId": "line2", "start": 3.5, "end": 6.8 }
    ]
  }
}
```

**Priority**: **Low-Medium** - High value but requires recording/sourcing audio

---

## 9. Multiple Translation Comparison

### What to Add
Show two translations side-by-side to compare different interpretations.

### Current State
You have dropdown for translation selection - good foundation.

### Enhancement
Add "Compare translations" mode:

```typescript
const [compareMode, setCompareMode] = useState(false);
const [translation1, setTranslation1] = useState('default');
const [translation2, setTranslation2] = useState('other');

// In render:
{compareMode && (
  <div className="grid grid-cols-3 gap-4">
    <div>{line.hebrew}</div>
    <div>{line.trans[translation1]}</div>
    <div>{line.trans[translation2]}</div>
  </div>
)}
```

**Priority**: **Low** - Only valuable once you have multiple translations per poem

---

## 10. Mobile Optimizations

### Side-by-side → Stack on Mobile
```css
@media (max-width: 768px) {
  .side-by-side {
    flex-direction: column;
  }
}
```

### Swipe Gestures
Use library like `react-swipeable` to switch between Hebrew/English:
```typescript
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => setView('english'),
  onSwipedRight: () => setView('hebrew')
});
```

### Pinch to Zoom
Allow pinch-zoom on Hebrew text for easier nikkud reading:
```css
.hebrew-text {
  touch-action: pinch-zoom;
}
```

**Priority**: **Medium** - Important if you expect mobile users

---

## 11. Keyboard Shortcuts

### Suggested Shortcuts
- `1` = Hebrew only
- `2` = Side-by-side
- `3` = English only
- `4` = Interlinear
- `F` = Full poem view
- `N` = Toggle nikkud
- `L` = Toggle line numbers
- `H` = Show help/shortcuts overlay

### Implementation
```typescript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === '1') setView('hebrew');
    if (e.key === '2') setView('side-by-side');
    // etc...
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

**Priority**: **Low** - Nice for power users

---

## 12. Print Stylesheet

### What to Add
Optimized layout for printing poems.

### Implementation
```css
@media print {
  /* Hide UI controls */
  .controls, .header, .footer {
    display: none;
  }
  
  /* Optimize spacing */
  .poem-line {
    break-inside: avoid;
  }
  
  /* Ensure good contrast */
  body {
    background: white;
    color: black;
  }
  
  /* Keep stanzas together */
  .stanza {
    break-inside: avoid;
  }
}
```

**Priority**: **Low** - Nice for educators/students

---

## 13. Accessibility Improvements

### Language Attributes
```html
<div lang="he" dir="rtl">{hebrewText}</div>
<div lang="en">{englishText}</div>
```

### ARIA Labels
```html
<button aria-label="Switch to Hebrew only view">א</button>
<button aria-label="Switch to side-by-side view">א·A</button>
```

### Keyboard Navigation
Ensure all buttons and interactive elements are keyboard accessible (tab through, enter to activate).

### Color Contrast
Ensure line numbers, secondary text meet WCAG AA standards (4.5:1 ratio).

**Priority**: **Medium-High** - Important for inclusive design

---

## 14. Visual Enhancements

### Stanza Separators
Make the ✦ symbol more prominent:
```css
.stanza-separator {
  font-size: 1.5rem;
  color: rgba(59, 130, 246, 0.3);
  text-align: center;
  margin: 2rem 0;
}
```

### Alternate Stanza Backgrounds (Interlinear)
```css
.stanza:nth-child(even) {
  background: rgba(0, 0, 0, 0.02);
  padding: 1rem;
  border-radius: 8px;
}
```

### Smooth Transitions
```css
.poem-content {
  transition: all 0.3s ease;
}
```

**Priority**: **Low-Medium** - Polish touches

---

## 15. Advanced Features (Future)

### A. Rhyme Scheme Visualization
For poems with clear rhyme schemes (common in medieval Hebrew poetry):

```json
{
  "id": "line1",
  "hebrew": "...",
  "rhymeScheme": "A",
  "trans": { "default": "..." }
}
```

Display rhyme scheme markers (A, B, A, B) next to lines.

---

### B. Meter/Rhythm Analysis
For poems with specific meter:

```json
{
  "metadata": {
    "meter": "iambic pentameter"
  }
}
```

---

### C. Acrostic Highlighting
Many Hebrew poems (especially medieval) are acrostics. Highlight first letters:

```json
{
  "id": "line1",
  "hebrew": "אֱלֹהִים...",
  "acrosticLetter": "א",
  "trans": { "default": "..." }
}
```

---

### D. Historical Context Panel
Collapsible sidebar with historical/biographical context about the poem.

---

### E. Search Within Poem
For longer poems, allow searching Hebrew or English text.

---

## 16. Schema Extensions

### Complete Enhanced Schema

```json
{
  "metadata": {
    "title": "Title goes here",
    "hebrewTitle": "Title, in Hebrew without nikkud",
    "description": "Description of the poem",
    "author": {
      "id": "author-id",
      "en": "English name",
      "he": "Hebrew name",
      "description": "Author bio",
      "infoUrl": "Wikipedia/source URL"
    },
    "displayConfig": {
      "defaultView": "side-by-side",
      "defaultNikkud": true,
      "showLineNumbers": true,
      "highlightRefrains": true,
      "stanzaSeparator": "✦"
    },
    "audio": {
      "url": "/audio/poem.mp3",
      "author": "Reader name",
      "license": "CC-BY",
      "timings": [
        { "lineId": "line1", "start": 0, "end": 3 }
      ]
    },
    "context": {
      "yearWritten": "1878",
      "historicalContext": "Written during the early Zionist movement...",
      "culturalSignificance": "First stanza became Israel's national anthem..."
    }
  },
  "translations": [
    {
      "id": "default",
      "name": "Nina Salaman (1924)",
      "author": "Nina Salaman",
      "copyright": "Public domain",
      "infoUrl": "https://..."
    }
  ],
  "content": [
    [
      {
        "id": "line1",
        "hebrew": "כָּל עוֹד בַּלֵּבָב פְּנִימָה",
        "refrainId": null,
        "rhymeScheme": "A",
        "acrosticLetter": null,
        "annotations": [
          {
            "word": "בַּלֵּבָב",
            "definition": "In the heart",
            "type": "translation"
          }
        ],
        "trans": {
          "default": "As long as in the heart, within",
          "alternative": "Another translation if available"
        }
      }
    ]
  ]
}
```

---

## Implementation Priority

### Phase 1: Foundation (Ship First)
- ✅ Current features working
- ✅ Basic schema
- Clean up existing typography
- Add Tikvatenu and a few more poems

### Phase 2: Core UX (Post-Launch)
1. **Typography improvements** (Hebrew font, line height)
2. **Full poem view mode**
3. **Refrain highlighting**
4. **Per-poem display defaults**

### Phase 3: Enhanced Reading
1. User preferences (save settings)
2. Stanza-grouped interlinear
3. Mobile optimizations
4. Accessibility improvements

### Phase 4: Advanced Features
1. Annotations/glossary
2. Audio recordings
3. Multiple translation comparison
4. Interactive features (click-to-highlight)
5. Keyboard shortcuts

### Phase 5: Polish & Power Features
1. Print stylesheet
2. Rhyme scheme visualization
3. Historical context panels
4. Search within poems
5. Advanced structural markup

---

## Notes

- Keep the core reading experience simple and beautiful
- Each feature should serve the poetry, not overwhelm it
- Test with actual poems of different types (medieval vs. modern, short vs. long)
- Get feedback from Hebrew readers and poetry enthusiasts
- Remember: the goal is to host poetry, not confine it

---

## Quick Wins (Easy, High Impact)

1. **Better Hebrew font** - 30 minutes, huge visual improvement
2. **Increase line height** - 5 minutes, much better readability with nikkud
3. **Full poem view mode** - 1-2 hours, major reading preference
4. **Refrain highlighting for Tikvatenu** - 30 minutes, shows poem structure

Start with these four after launch!