// tests/run-readNotes-test.cjs
require('ts-node').register({
    transpileOnly: true,
    compilerOptions: {
      module: 'CommonJS'
    }
  });
  
  require('./readNotes.test.ts');
  