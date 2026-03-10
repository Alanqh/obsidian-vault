/**
 * prepare-docs.mjs
 * 将 Obsidian使用说明/ 下的 .md 文件复制到 docs/guide/，
 * 并将 Obsidian 特有语法转换为标准 Markdown。
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, basename } from 'path'

const SRC_DIR = 'Obsidian使用说明'
const DEST_DIR = join('docs', 'guide')

/**
 * 转换 Obsidian 语法为标准 Markdown
 */
function transformObsidian(content, allFiles) {
  let result = content

  // 移除 YAML frontmatter
  result = result.replace(/^---\n[\s\S]*?\n---\n*/, '')

  // 转换 [[path/file]] wikilink 为标准 markdown 链接
  // 匹配 [[Obsidian使用说明/xxx]] 或 [[xxx]]
  result = result.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (match, target, alias) => {
    const displayText = alias || target.split('/').pop()

    // 检查是否指向使用说明内的文件
    const targetName = target.split('/').pop().replace(/\.md$/, '')
    const matchedFile = allFiles.find(f => f.replace(/\.md$/, '') === targetName)

    if (matchedFile) {
      const encodedName = encodeURIComponent(matchedFile.replace(/\.md$/, ''))
      return `[${displayText}](./${encodedName}.md)`
    }

    // 外部链接保持文本显示
    return displayText
  })

  // 转换 ![[image]] 图片嵌入（如果有的话）
  result = result.replace(/!\[\[([^\]]+?)\]\]/g, (match, imgPath) => {
    return `![${imgPath}](${imgPath})`
  })

  return result
}

async function main() {
  // 确保目标目录存在
  await mkdir(DEST_DIR, { recursive: true })

  // 读取源目录中的 .md 文件
  const files = (await readdir(SRC_DIR)).filter(f => f.endsWith('.md'))

  console.log(`📄 Found ${files.length} markdown files in ${SRC_DIR}/`)

  for (const file of files) {
    const srcPath = join(SRC_DIR, file)
    const destPath = join(DEST_DIR, file)

    const content = await readFile(srcPath, 'utf-8')
    const transformed = transformObsidian(content, files)

    await writeFile(destPath, transformed, 'utf-8')
    console.log(`  ✅ ${file}`)
  }

  console.log(`\n🎉 Done! Files copied to ${DEST_DIR}/`)
}

main().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
