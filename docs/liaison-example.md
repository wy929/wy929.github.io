# Liaison Component Examples

This page demonstrates the Liaison component for French liaison arcs (连读符号).

## Basic Usage

### Simple Liaison Examples

| Sentence | With Liaison Arc |
|----------|-----------------|
| Il est chinois | <Liaison text="Il[~]est chinois" /> |
| Vous avez | <Liaison text="Vous[~]avez" /> |
| Comment allez-vous | <Liaison text="Comment[~]allez-vous" /> |

### Multiple Liaisons

| Example | Result |
|---------|--------|
| Il est un ami | <Liaison text="Il[~]est un[~]ami" /> |
| Vous êtes en avance | <Liaison text="Vous[~]êtes en[~]avance" /> |

## Custom Colors

You can specify colors for individual liaison arcs:

| Example | Code |
|---------|------|
| <Liaison text="Il[~,red]est chinois" /> | `<Liaison text="Il[~,red]est chinois" />` |
| <Liaison text="Vous[~,green]avez" /> | `<Liaison text="Vous[~,green]avez" />` |
| <Liaison text="Il[~,blue]est un[~,purple]ami" /> | `<Liaison text="Il[~,blue]est un[~,purple]ami" />` |

### Default Color

You can set a default color for all arcs in a sentence:

| Example | Code |
|---------|------|
| <Liaison text="Il[~]est un[~]ami" color="purple" /> | `<Liaison text="Il[~]est un[~]ami" color="purple" />` |

## Syntax

The syntax is: `[~]` or `[~,color]` where:
- `~` marks where the liaison arc should appear (between words)
- `color` (optional) is the arc color

```html
<!-- Basic liaison -->
<Liaison text="Il[~]est chinois" />

<!-- Custom color for specific liaison -->
<Liaison text="Il[~,red]est chinois" />

<!-- Default color for all liaisons -->
<Liaison text="Il[~]est un[~]ami" color="green" />
```

## French Learning Examples

### Common Liaison Patterns

#### Definite Articles
| Pattern | Example |
|---------|---------|
| les + vowel | <Liaison text="les[~]enfants" /> |
| des + vowel | <Liaison text="des[~]amis" /> |

#### Pronouns
| Pattern | Example |
|---------|---------|
| nous + vowel | <Liaison text="nous[~]avons" /> |
| vous + vowel | <Liaison text="vous[~]êtes" /> |
| ils/elles + vowel | <Liaison text="ils[~]ont" /> |

#### Adjectives
| Pattern | Example |
|---------|---------|
| petit + vowel | <Liaison text="petit[~]enfant" color="orange" /> |
| grand + vowel | <Liaison text="grand[~]homme" color="orange" /> |

### Color-Coded by Grammar

Use different colors for different types of liaisons:

| Type | Color | Example |
|------|-------|---------|
| Mandatory | Red | <Liaison text="les[~,red]enfants" /> |
| Optional | Blue | <Liaison text="petit[~,blue]ami" /> |
| Forbidden | Gray | <Liaison text="et[~,gray]elle" /> |

## Advanced Examples

### Complex Sentences

<Liaison text="Les[~]enfants et[~]elles sont[~]arrivés" />

```html
<Liaison text="Les[~]enfants et[~]elles sont[~]arrivés" />
```

### Mixed Colors for Different Types

<Liaison text="Mes[~,red]amis sont[~,blue]arrivés en[~,green]avance" />

```html
<Liaison text="Mes[~,red]amis sont[~,blue]arrivés en[~,green]avance" />
```

## Integration with Other Components

Combine with Pron and Word components for comprehensive language learning:

| Feature | Example |
|---------|---------|
| Liaison + Pronunciation | <Liaison text="Il [est]" /> <Pron word="Il est" phonetic="i.l‿ɛ" lang="fr-FR" /> |
| Liaison + Colored Words | <Liaison text="<Word text="<L,masculine>es" /> [enfants]" /> |

## Tips for Usage

1. **Mandatory vs Optional**: Use red for mandatory liaisons, blue for optional ones
2. **Teaching**: Different colors help students understand liaison rules
3. **Reading Practice**: Visual arcs help with pronunciation flow
4. **Note Taking**: Quick syntax `[word]` for fast liaison marking

## Color Suggestions

- **Red** (`#e74c3c`) - Mandatory liaisons
- **Blue** (`#3498db`) - Optional liaisons  
- **Green** (`#2ecc71`) - Correct liaisons in exercises
- **Orange** (`#f39c12`) - Adjective liaisons
- **Purple** (`#9b59b6`) - Verb liaisons
- **Gray** (`#95a5a6`) - Forbidden liaisons (for teaching)