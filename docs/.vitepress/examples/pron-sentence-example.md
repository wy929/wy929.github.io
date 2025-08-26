# Pron Component - Sentence Mode

This demonstrates the new sentence pronunciation mode of the Pron component.

## Basic Sentence Pronunciation

| Language | Example | Usage |
|----------|---------|-------|
| French | J'habite à Paris en France. <Pron sentence="J'habite à Paris en France." lang="fr-FR" :show-speaker="true" /> | `<Pron sentence="J'habite à Paris en France." lang="fr-FR" :show-speaker="true" />` |
| English | Hello, how are you today? <Pron sentence="Hello, how are you today?" lang="en-US" :show-speaker="true" /> | `<Pron sentence="Hello, how are you today?" lang="en-US" :show-speaker="true" />` |

## Simple Speaker Icon Mode

For sentence pronunciation, use the `sentence` prop:

```html
<Pron sentence="J'habite à Paris en France." lang="fr-FR" :show-speaker="true" />
```

## Examples

### French Sentences
| Sentence | Pronunciation |
|----------|--------------|
| Bonjour, comment allez-vous ? | <Pron sentence="Bonjour, comment allez-vous ?" lang="fr-FR" :show-speaker="true" /> |
| Je suis étudiant à l'université. | <Pron sentence="Je suis étudiant à l'université." lang="fr-FR" :show-speaker="true" /> |
| Où est la gare, s'il vous plaît ? | <Pron sentence="Où est la gare, s'il vous plaît ?" lang="fr-FR" :show-speaker="true" /> |

### English Sentences
| Sentence | Pronunciation |
|----------|--------------|
| Welcome to our website! | <Pron sentence="Welcome to our website!" lang="en-US" :show-speaker="true" /> |
| The weather is beautiful today. | <Pron sentence="The weather is beautiful today." lang="en-US" :show-speaker="true" /> |
| Can you help me with this problem? | <Pron sentence="Can you help me with this problem?" lang="en-US" :show-speaker="true" /> |

## Comparison: Word vs Sentence Mode

| Mode | Example | Usage |
|------|---------|-------|
| **Word Mode** | <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" :show-speaker="true" /> | `<Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" :show-speaker="true" />` |
| **Sentence Mode** | <Pron sentence="Bonjour tout le monde!" lang="fr-FR" :show-speaker="true" /> | `<Pron sentence="Bonjour tout le monde!" lang="fr-FR" :show-speaker="true" />` |

## Features

### Sentence Mode
- ✅ Only shows speaker icon
- ✅ Pronounces entire sentence
- ✅ Hover effects and animations
- ✅ Language-specific voices
- ✅ Clean, minimal appearance

### Usage Notes
1. **Required Props**: `sentence` and optionally `lang`
2. **Speaker Icon**: Use `:show-speaker="true"` to display the icon
3. **Language**: Specify language with `lang` prop (e.g., "fr-FR", "en-US")
4. **Click to Play**: Click the 🔊 icon to hear the sentence

## Advanced Examples

### Educational Content
Create interactive reading exercises:

> **Lecture du jour**  
> 
> Aujourd'hui, nous allons apprendre le français. <Pron sentence="Aujourd'hui, nous allons apprendre le français." lang="fr-FR" :show-speaker="true" />
> 
> C'est une belle langue avec une riche histoire. <Pron sentence="C'est une belle langue avec une riche histoire." lang="fr-FR" :show-speaker="true" />

### Mixed Content
Combine with other components:

| French | English | Audio |
|--------|---------|-------|
| Je mange une pomme. | I eat an apple. | <Pron sentence="Je mange une pomme." lang="fr-FR" :show-speaker="true" /> |
| Il fait beau aujourd'hui. | The weather is nice today. | <Pron sentence="Il fait beau aujourd'hui." lang="fr-FR" :show-speaker="true" /> |

## Integration with Other Components

You can combine sentence pronunciation with other language learning components:

**Word coloring + Sentence pronunciation:**
```html
<WordLiaison text="<J,pronoun>e[~]<a,verb>ime <l,feminine>a <F,noun>rance" />
<Pron sentence="J'aime la France." lang="fr-FR" :show-speaker="true" />
```

Result: <WordLiaison text="<J,blue>e[~]<a,red>ime <l,pink>a <F,green>rance" /> <Pron sentence="J'aime la France." lang="fr-FR" :show-speaker="true" />