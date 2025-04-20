// File: docs/theme/utils/readNotes.ts
import fs from 'fs'
import path from 'path'

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

/**
 * Load directory-level sidebar configuration from sidebar.config.json.
 * Returns an object with optional title and items mapping.
 */
function loadDirConfig(dir: string): { title?: string; items?: Record<string,string> } {
  const cfgPath = path.join(dir, 'sidebar.config.json')
  if (fs.existsSync(cfgPath)) {
    try {
      const raw = fs.readFileSync(cfgPath, 'utf-8')
      return JSON.parse(raw)
    } catch {
      // ignore invalid JSON
    }
  }
  return {}
}

/**
 * Recursively read a notes directory and build a sidebar structure.
 * - Reads sidebar.config.json in each directory for display overrides.
 * - Ignores any index.md files.
 * - Uses directory/file names for URL link paths.
 *
 * @param rootDir Absolute filesystem path to the notes directory
 * @param basePath URL prefix for generated links, e.g. '/notes' or '/cn/notes'
 */
export function readNotesDir(rootDir: string, basePath: string): SidebarItem[] {
  const items: SidebarItem[] = []
  const config = loadDirConfig(rootDir)
  const entries = fs.readdirSync(rootDir, { withFileTypes: true })

  // Directories first, then files, sorted alphabetically
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1
    if (!a.isDirectory() && b.isDirectory()) return 1
    return a.name.localeCompare(b.name)
  })

  for (const entry of entries) {
    const name = entry.name
    const fullPath = path.join(rootDir, name)

    if (entry.isDirectory()) {
      // Recurse into subfolder
      const link = path.posix.join(basePath, name)
      const children = readNotesDir(fullPath, link)
      if (children.length > 0) {
        // Use override title from config.items or default folder name
        const displayName = config.items?.[name] || name
        items.push({ text: displayName, link, items: children, collapsed: true })
      }
    } else if (entry.isFile() && name.endsWith('.md') && name.toLowerCase() !== 'index.md') {
      // Handle markdown files
      const raw = name.replace(/\.md$/, '')
      const link = path.posix.join(basePath, raw)
      // Config.items maps raw name (without extension) to display text
      const displayName = config.items?.[raw] || raw.replace(/^\d+-/, '')
      items.push({ text: displayName, link })
    }
  }

  return items
}
