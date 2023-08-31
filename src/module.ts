// Refer to: https://github.com/nuxt/content/issues/106#issuecomment-1002820342
import { defineNuxtModule } from '@nuxt/kit'

import fs from 'node:fs'
import path from 'node:path'

// clean the "article" folder (copy from the "content" folder) by default
const cleanContentFiles = (folderPathArr: string[] = []) => {
  folderPathArr.forEach((folderPath) => {
    const exists = fs.existsSync(folderPath)
    if (exists) {
      fs.rmSync(folderPath, { recursive: true })
    }
  })
}

// then copy all other type of files except .md from "content" folder to public folder
// so all the assets can link to inside the markdown file by relative path
const copyContentFiles = (src: string, destFolderName: string, ignore: string[] = []) => {
  // url isn't case-sensitive but folder name is case-sensitive
  // so we can change all the folders name to lowercase when copy them to public
  // and then access all the resource through url with lower-case
  const dest = destFolderName.toLowerCase()

  // check the if the src is a directory
  const srcExisted = fs.existsSync(src) // fist ensure the item exist
  if (srcExisted) {
    const stats = fs.statSync(src)
    const isDirectory = stats.isDirectory()

    if (isDirectory) {
      // if the src is a directory
      // copy all the files inside this directory recursion to the destination folder

      if (!fs.existsSync(dest)) {
        // if the dest don't contain the directory as the source path
        // create this directory
        fs.mkdirSync(dest)
      }

      fs.readdirSync(src).forEach((childItemName: string) => {
        copyContentFiles(
          path.join(src, childItemName),
          path.join(dest, childItemName),
          ignore
        )
      })
    } else {
      // if the src is a file
      // copy it to the dest
      // const fileName = path.basename(src) as string
      const ext = path.extname(src) as string
      if (!ignore.includes(ext)) {
        // console.log(src)
        fs.copyFileSync(src, dest)
      }
    }
  }
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  cleanFolders?: string[];
  sourceFolder?: string;
  destFolder?: string;
  ignoreTypes?: string[];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'bloginote-copy-files-module',
    configKey: 'bloginoteCopyFiles'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (options, nuxt) {
    nuxt.hook('build:before', async () => {

      // clean some folders (copied from the "content" folder at the previous build time) first
      // the value should be ['public/article'] for BlogiNote (this folder is container for all articles)
      const cleanFolders = options.cleanFolders ? options.cleanFolders : []
      cleanContentFiles(cleanFolders)

      // copy all files within the source folder (preserve the file system hierarchy)
      // to the dest folder
      // but ignore some types of file, the default value is ['.md', '.json', '.csv']
      // because these types can handle by Nuxt Content module
      const sourceFolder = options.sourceFolder ? options.sourceFolder : 'content'
      const destFolder = options.destFolder ? options.destFolder : 'public'
      const ignoreTypes = options.ignoreTypes ? options.ignoreTypes : ['.md', '.json', '.csv']

      // first check the source folder existed or not
      const srcExisted = fs.existsSync(sourceFolder)
      if (srcExisted) {
        copyContentFiles(sourceFolder, destFolder, ignoreTypes)
      }

    })
  }
})
