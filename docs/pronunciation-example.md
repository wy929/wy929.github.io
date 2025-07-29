# Pronunciation Examples

This page demonstrates the pronunciation component functionality.

## Usage Examples

### English Words

| Word    | Pronunciation                               |
| ------- | ------------------------------------------- |
| missile | <Pron word="missile" phonetic="ˈmɪs.aɪl" lang="en-US" />       |
| hello   | <Pron word="hello" phonetic="həˈloʊ" lang="en-US" />           |
| world   | <Pron word="world" phonetic="wɜːrld" lang="en-US" />           |

### French Words

| Word      | Pronunciation                               |
| --------- | ------------------------------------------- |
| bonjour   | <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" />         |
| merci     | <Pron word="merci" phonetic="mɛʁ.si" lang="fr-FR" />           |
| au revoir | <Pron word="au revoir" phonetic="o ʁə.vwaʁ" lang="fr-FR" />  |

## Inline Usage

You can also use pronunciations inline: <Pron word="hello" phonetic="həˈloʊ" lang="en-US" /> and <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" />

## Phonetic-Only Mode

Sometimes you only want to show the phonetic notation without the word:

| Mode     | Example                                     |
| -------- | ------------------------------------------- |
| Normal   | <Pron word="hello" phonetic="həˈloʊ" lang="en-US" />           |
| Phonetic Only | <Pron word="hello" phonetic="həˈloʊ" lang="en-US" :phonetic-only="true" /> |

French examples:
- Normal: <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" />
- Phonetic Only: <Pron word="bonjour" phonetic="bɔ̃.ʒuʁ" lang="fr-FR" :phonetic-only="true" />

## Speaker Icon Options

| Option     | Example                                     |
| ---------- | ------------------------------------------- |
| Default (no icon) | <Pron word="hello" phonetic="həˈloʊ" lang="en-US" />           |
| With speaker icon | <Pron word="hello" phonetic="həˈloʊ" lang="en-US" :show-speaker="true" /> |

## Notes

- Click on the phonetic transcription (IPA notation) to hear the pronunciation
- The component uses the Web Speech API, so pronunciation quality depends on your browser and available voices
- Supported languages include English (en-US) and French (fr-FR)
- The pronunciation will be highlighted while playing

## Usage Syntax

Use direct HTML tags with or without brackets - the component will automatically format them:

```html
<!-- Basic usage - both work the same way -->
<Pron word="hello" phonetic="həˈloʊ" lang="en-US" />
<Pron word="bonjour" phonetic="[bɔ̃.ʒuʁ]" lang="fr-FR" />

<!-- Phonetic-only mode (hide the word) -->
<Pron word="hello" phonetic="həˈloʊ" lang="en-US" :phonetic-only="true" />

<!-- Show speaker icon -->
<Pron word="hello" phonetic="həˈloʊ" lang="en-US" :show-speaker="true" />
```

**Features:**
- The component automatically adds brackets around phonetic notation
- Use `:phonetic-only="true"` to show only the phonetic transcription
- Use `:show-speaker="true"` to display the speaker icon 🔊 (default: hidden)
- Both `phonetic="həˈloʊ"` and `phonetic="[həˈloʊ]"` display as `[həˈloʊ]`
- In phonetic-only mode, the tooltip shows which word will be pronounced