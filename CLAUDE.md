# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
pnpm docs:dev
```
Starts the VitePress development server for local development.

### Build
```bash
pnpm docs:build
```
Builds the static site for production deployment.

### Preview
```bash
pnpm docs:preview
```
Previews the built site locally.

### Testing
```bash
pnpm test:readnotes
```
Runs the readNotes utility test to verify note structure generation.

## Project Architecture

This is a VitePress-based bilingual blog site with the following key architectural patterns:

### Content Structure
- **Bilingual Support**: Content exists in both English (`docs/`) and Chinese (`docs/cn/`) versions
- **Posts**: Blog articles located in `docs/posts/` (English) and `docs/cn/posts/` (Chinese), organized by year/month
- **Notes**: Learning notes in `docs/notes/` (English) and `docs/cn/notes/` (Chinese), organized by subject

### VitePress Configuration
- **Theme Location**: Custom theme and components in `docs/.vitepress/theme/`
- **Sidebar Generation**: Dynamic sidebar creation using `readNotesDir` utility in `docs/.vitepress/theme/utils/readNotes.ts`
- **Manual Sidebar**: Hardcoded sidebar configuration in `docs/.vitepress/theme/utils/createSideBar.ts`

### Key Utilities
- **readNotes.ts**: Dynamically reads note directories and generates sidebar configuration
- **RSS Generation**: RSS feed creation utilities in `docs/.vitepress/theme/utils/rss.ts`
- **Metadata Handling**: SEO and social meta tag utilities in `docs/.vitepress/theme/utils/handleHeadMeta.ts`

### Custom Components
The site includes several Vue components:
- **Comment.vue**: Giscus-based commenting system
- **QuestionBlock.vue/QuestionTag.vue/ToggleAnswer.vue**: Interactive learning components for notes
- **ImageViewer.vue**: High-resolution image preview functionality
- **Pron.vue**: Pronunciation display component with TTS support
- **Word.vue**: Custom letter coloring for language learning
- **Liaison.vue**: French liaison arcs for pronunciation teaching
- **TDesignDark.vue**: Dark mode integration with TDesign components

### Dependencies
- **VitePress 2.0.0-alpha.2**: Static site generator
- **Vue 3**: Framework for components
- **TDesign Vue Next**: UI component library
- **@giscus/vue**: Commenting system
- **@phosphor-icons/vue**: Icon system

### Development Notes
- The site supports both light and dark themes
- RSS feeds are generated for both languages
- SEO optimization includes sitemap generation and Open Graph/Twitter Card support
- Custom fonts are included in `docs/assets/fonts/`
- The sidebar can be generated dynamically from file structure or configured manually
- Test utilities exist to verify the note reading functionality works correctly