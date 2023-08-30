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

```js
export default defineNuxtConfig({
  modules: [
    'bloginote-copy-files-module'
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
