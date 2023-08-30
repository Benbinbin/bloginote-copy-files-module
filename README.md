# bloginote-copy-files-module

copy files to public folder for Nuxt 3 (extract the module from [Bloginote](https://github.com/Benbinbin/BlogiNote) which is a Nuxt Content 2 template)

## Quick Setup

1. Add `bloginote-copy-files-module` dependency to your project

```bash
# Using pnpm
pnpm add -D bloginote-copy-files-module

# Using yarn
yarn add --dev bloginote-copy-files-module

# Using npm
npm install --save-dev bloginote-copy-files-module
```

2. Add `bloginote-copy-files-module` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'bloginote-copy-files-module'
  ]
})
```

3. Setting some options for this Module

```ts
export default defineNuxtConfig({
  modules: [
    'bloginote-copy-files-module'
  ],
  // set the following (optional) properties for the module
  bloginoteCopyFiles: {
    // the array contain the folder to clean before copy the files
    // the default value is empty array []
    cleanFolders: ['public/article'];
    // set the source folder to copy (it will copy all the files inside this folder to the destination folder)
    // the default value is 'content'
    sourceFolder: 'content';
    // set the destination folder
    // the default value is 'public'
    destFolder: 'public';
    // set the ignore types of file, they won't be copied
    // the default value is ['.md', '.json', '.csv']
    ignoreTypes: ['.md', '.json', '.csv'];
  }
})
```

or using the inline syntax

```ts
export default defineNuxtConfig({
  modules: [
    ['bloginote-copy-files-module', { cleanFolders: ['public/article'] }]
  ]
})
```

That's it! You can now use bloginote-copy-files-module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
