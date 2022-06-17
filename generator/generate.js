const { generateTemplateFiles } = require('generate-template-files');


generateTemplateFiles([
  {
    option: 'GENERATE_MODULE',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './generator/module',
    },
    stringReplacers: [{ question: 'Insert Module Name', slot: '__name__' } ],
    output: {
      path: './src/components/',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: true,
    },
  },
  {
    option: 'GENERATE_ROUTE',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './generator/route',
    },
    stringReplacers: [{ question: 'Insert Route Name', slot: '__name__' } ],
    output: {
      path: './src/routes/',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: true,
    },
  }

]);