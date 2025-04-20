// // File: tests/readNotes.test.ts
// import path from 'path';
// import { readNotesDir } from '../docs/.vitepress/theme/utils/readNotes';

// (async () => {
//   const notesDir = path.resolve(__dirname, '../docs/notes');
//   const sidebarList = readNotesDir(notesDir);
//   console.log('Generated sidebar list:');
//   console.log(JSON.stringify(sidebarList, null, 2));
// })();

// File: tests/readNotes.test.ts
import path from 'path'
import { readNotesDir } from '../docs/.vitepress/theme/utils/readNotes'

;(async () => {
  // English notes folder
  const enDir = path.resolve(__dirname, '../docs/notes')
  console.log('EN sidebar:')
  console.log(JSON.stringify(readNotesDir(enDir, '/notes'), null, 2))

  // Chinese notes folder (separate config under /cn)
  const zhDir = path.resolve(__dirname, '../docs/cn/notes')
  console.log('CN sidebar:')
  console.log(JSON.stringify(readNotesDir(zhDir, '/cn/notes'), null, 2))
})()