# Word Component Examples

This page demonstrates the Word component for custom letter coloring.

## Basic Usage

### Simple Color Examples

| Word | Colored Version |
|------|----------------|
| omelette | <Word text="om<e,blue>l<e,red>tte" /> |
| bonjour | <Word text="<b,red>onj<o,blue>ur" /> |
| français | <Word text="fr<a,green>nç<a,yellow>is" /> |

### Language Learning Colors

For French learning, you can use semantic color names:

| Word | Example | Usage |
|------|---------|-------|
| le livre | <Word text="<l,masculine>e livre" /> | Blue for masculine articles |
| la maison | <Word text="<l,feminine>a maison" /> | Red for feminine articles |
| verb ending | <Word text="parl<er,verb>" /> | Purple for verb endings |

## Color Options

### Basic Colors
- `red`, `blue`, `green`, `yellow`, `orange`, `purple`, `pink`, `brown`, `gray`, `black`

### Extended Colors  
- `darkred`, `darkblue`, `darkgreen`, `lightblue`, `lightgreen`, `lightred`

### Language Learning Colors
- `masculine` (blue) - for masculine forms
- `feminine` (red) - for feminine forms  
- `neutral` (gray) - for neutral forms
- `verb` (purple) - for verbs
- `noun` (green) - for nouns
- `adjective` (orange) - for adjectives

### Custom CSS Colors
You can also use any CSS color value:

| Example | Code |
|---------|------|
| <Word text="cust<o,#ff6b6b>m color" /> | `<Word text="cust<o,#ff6b6b>m color" />` |
| <Word text="rgb col<o,rgb(255,107,107)>r" /> | `<Word text="rgb col<o,rgb(255,107,107)>r" />` |

## Syntax

The syntax is: `<letter,color>` where:
- `letter` is the character you want to color
- `color` is the color name or CSS color value

```html
<!-- Basic usage -->
<Word text="om<e,blue>l<e,red>tte" />

<!-- Multiple colored letters -->
<Word text="<b,red>onj<o,blue>ur" />

<!-- Semantic colors for language learning -->
<Word text="<l,masculine>e livre" />
```

## French Learning Examples

### Articles
| Masculine | Feminine |
|-----------|----------|
| <Word text="<l,masculine>e chat" /> | <Word text="<l,feminine>a chatte" /> |
| <Word text="<u,masculine>n livre" /> | <Word text="<u,feminine>ne maison" /> |

### Verb Conjugations
| Person | Example |
|--------|---------|
| je | <Word text="je parl<e,verb>" /> |
| tu | <Word text="tu parl<es,verb>" /> |
| il/elle | <Word text="il parl<e,verb>" /> |

### Adjective Agreements
| Masculine | Feminine |
|-----------|----------|
| <Word text="grand" /> | <Word text="grand<e,feminine>" /> |
| <Word text="petit" /> | <Word text="petit<e,feminine>" /> |

## Usage Tips

1. **Keep it simple**: The syntax is designed to be minimal for quick note-taking
2. **Consistent colors**: Use the same colors for the same grammatical concepts
3. **Readable**: Don't overuse colors - highlight only the important parts
4. **Semantic naming**: Use `masculine`, `feminine`, `verb` etc. for language learning

## Integration with Pronunciation

You can combine Word and Pron components:

| Word | Pronunciation | Colored Word |
|------|---------------|--------------|
| omelette | <Pron word="omelette" phonetic="ɔm.lɛt" lang="fr-FR" /> | <Word text="om<e,blue>l<e,red>tte" /> |
| bonjour | <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" /> | <Word text="<b,red>onj<o,blue>ur" /> |