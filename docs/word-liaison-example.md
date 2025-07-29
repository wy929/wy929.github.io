# Word + Liaison Combined Usage

This page demonstrates different ways to combine Word and Liaison components for comprehensive French learning.

## Method 1: Nested Components

You can nest Word components inside Liaison components:

### Example 1: Gendered Articles
| Method | Result |
|--------|--------|
| Nested | <Liaison text="Le livre[~]est intéressant" /> |
| With colors | <Word text="<L,masculine>e livre" /> <Liaison text="[~]" /> <Word text="<e,feminine>st intéressant" /> |

### Example 2: Complex Sentence
```html
<Word text="<C,verb>omment" /> <Liaison text="[~]" /> <Word text="<a,verb>llez-vous" />
```

Result: <Word text="<C,verb>omment" /> <Liaison text="[~]" /> <Word text="<a,verb>llez-vous" />

## Method 2: WordLiaison Component (Recommended)

The new `WordLiaison` component combines both functionalities in a single syntax:

### Basic Syntax
```html
<WordLiaison text="om<e,blue>l<e,red>tte[~]est bon" />
```

### Examples

| Description | Code | Result |
|-------------|------|--------|
| Colored letters + liaison | `<WordLiaison text="<L,masculine>e livre[~]est bon" />` | <WordLiaison text="<L,masculine>e livre[~]est bon" /> |
| Multiple features | `<WordLiaison text="<I,verb>l[~]<e,feminine>st tr<è,red>s b<e,blue>au" />` | <WordLiaison text="<I,verb>l[~]<e,feminine>st tr<è,red>s b<e,blue>au" /> |
| Custom liaison color | `<WordLiaison text="<N,noun>ous[~,green]avons" />` | <WordLiaison text="<N,noun>ous[~,green]avons" liaisonColor="green" /> |

## French Learning Examples

### Masculine/Feminine Articles with Liaison

| Gender | Example |
|--------|---------|
| Masculine | <WordLiaison text="<L,masculine>e petit[~]<e,masculine>nfant" /> |
| Feminine | <WordLiaison text="<L,feminine>a petite[~]<a,feminine>mie" /> |

### Verb Forms with Liaison

| Person | Example |
|--------|---------|
| Il/Elle | <WordLiaison text="<I,verb>l[~]<a,verb>ime les fleurs" /> |
| Nous | <WordLiaison text="<N,noun>ous[~]<a,verb>vons" /> |
| Vous | <WordLiaison text="<V,noun>ous[~]<ê,verb>tes" /> |

### Color-Coded Grammar with Liaison

```html
<WordLiaison text="<L,feminine>es[~]<e,adjective>nfants sont[~]<a,verb>rrivés" />
```

Result: <WordLiaison text="<L,feminine>es[~]<e,adjective>nfants sont[~]<a,verb>rrivés" />

## Advanced Usage

### Multiple Liaisons with Different Colors

<WordLiaison text="<L,masculine>es[~,red]<a,noun>mis sont[~,blue]<a,verb>rrivés en[~,green]<a,adjective>vance" />

```html
<WordLiaison text="<L,masculine>es[~,red]<a,noun>mis sont[~,blue]<a,verb>rrivés en[~,green]<a,adjective>vance" />
```

### Teaching Different Liaison Types

| Type | Color | Example |
|------|-------|---------|
| Mandatory | Red | <WordLiaison text="les[~,red]<e,noun>nfants" /> |
| Optional | Blue | <WordLiaison text="petit[~,blue]<a,adjective>mi" /> |
| Forbidden | Gray | <WordLiaison text="et[~,gray]<e,noun>lle" /> |

## Comparison of Methods

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **Nested Components** | Flexible, can mix and match | More verbose syntax | Complex layouts |
| **WordLiaison Component** | Clean syntax, unified approach | Less flexible | Most use cases |

## Syntax Summary

### WordLiaison Syntax
- `<letter,color>` - Color individual letters
- `[~]` - Add liaison arc (default red)
- `[~,color]` - Add liaison arc with custom color
- `liaisonColor="color"` - Set default liaison color

### Example Template
```html
<WordLiaison 
  text="<L,masculine>e livre[~]est <t,adjective>rès b<e,blue>au" 
  liaisonColor="purple" 
/>
```

## Integration with Pronunciation

Combine with the Pron component for complete language learning:

| Feature | Example |
|---------|---------|
| Word + Liaison + Pronunciation | <WordLiaison text="<B,feminine>onjour[~,blue]<A,masculine>ntoine" /> <Pron word="Bonjour Antoine" phonetic="bɔ̃.ʒu.ʁ‿ɑ̃.twan" lang="fr-FR" /> |

```html
<WordLiaison text="<B,feminine>onjour[~,blue]<A,masculine>ntoine" />
<Pron word="Bonjour Antoine" phonetic="bɔ̃.ʒu.ʁ‿ɑ̃.twan" lang="fr-FR" />
```