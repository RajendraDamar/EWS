// Usage: node scripts/fetch-figma-assets.mjs <fileKey> <nodeId[,nodeId2,...]> <outDir> [outName]
// If outName is provided and there's only one nodeId, the file will be saved with that name.
const [, , fileKey = 'AmqqSvBAueyNwzP8YkUe4P', nodeArg = '536:81536', outDir = 'src/assets', outName] = process.argv

if (!process.env.FIGMA_TOKEN) {
  console.error('FIGMA_TOKEN env var not set. Create a Figma personal access token and export FIGMA_TOKEN.')
  process.exit(1)
}

const fs = await import('node:fs/promises')
const path = await import('node:path')

await fs.mkdir(outDir, { recursive: true })

async function getImageUrl(nodeId) {
  const url = new URL(`https://api.figma.com/v1/images/${fileKey}`)
  url.searchParams.set('ids', nodeId)
  url.searchParams.set('format', 'png')
  url.searchParams.set('scale', '2')
  const resp = await fetch(url, { headers: { 'X-Figma-Token': process.env.FIGMA_TOKEN } })
  if (!resp.ok) throw new Error(`Figma API error: ${resp.status}`)
  const data = await resp.json()
  const u = data.images?.[nodeId]
  if (u) return u
  // try hyphen variant
  if (nodeId.includes(':')) {
    const hy = nodeId.replace(':', '-')
    const url2 = new URL(`https://api.figma.com/v1/images/${fileKey}`)
    url2.searchParams.set('ids', hy)
    url2.searchParams.set('format', 'png')
    url2.searchParams.set('scale', '2')
    const resp2 = await fetch(url2, { headers: { 'X-Figma-Token': process.env.FIGMA_TOKEN } })
    if (!resp2.ok) throw new Error(`Figma API error (hyphen): ${resp2.status}`)
    const data2 = await resp2.json()
    return data2.images?.[hy]
  }
  return null
}

const ids = nodeArg.split(',')
for (const nodeId of ids) {
  const imgUrl = await getImageUrl(nodeId)
  if (!imgUrl) {
    console.warn('No image URL for node', nodeId)
    continue
  }
  const res = await fetch(imgUrl)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const name = (outName && ids.length === 1) ? outName : (nodeId.replace(':', '-') + '.png')
  const dest = path.join(outDir, name)
  await fs.writeFile(dest, buf)
  console.log('Saved', dest)
}
