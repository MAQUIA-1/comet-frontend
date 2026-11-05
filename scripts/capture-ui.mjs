import { chromium } from 'playwright'
import { createServer } from 'vite'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

// Edit this small list when the review set changes. No production UI hooks needed.
const viewports = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Mobile', width: 390, height: 844 },
]
const scenarios = [
  { name: 'Library', expanded: false, empty: false },
  { name: 'Now Playing', expanded: true, empty: false },
  { name: 'Empty', expanded: true, empty: true },
]
const timestamp = new Date().toISOString().replaceAll(':', '-')
const output = resolve('artifacts/ui-board', timestamp)
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
const server = await createServer({ server: { host: '127.0.0.1', port: 0, open: false } })
let browser
try {
  await mkdir(output, { recursive: true })
  await server.listen()
  const url = server.resolvedUrls.local[0]
  browser = await chromium.launch({ executablePath })
  const frames = []
  for (const viewport of viewports) {
    for (const scenario of scenarios) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      if (scenario.empty) {
        await page.locator('.dev-tools summary').click()
        await page.locator('#dev-scenario').selectOption('empty')
        await page.locator('.dev-tools summary').click()
      }
      if (scenario.expanded) {
        await page.getByRole('button', { name: 'Open Now Playing' }).click()
        await page.getByRole('dialog').waitFor()
      }
      // Hide the development launcher only for the artifact, after scenario setup.
      await page.addStyleTag({ content: '.dev-tools { visibility: hidden !important; }' })
      await page.mouse.move(0, 0)
      if (errors.length) throw new Error(errors.join('\n'))
      const filename = `${viewport.name.toLowerCase()}-${scenario.name.toLowerCase().replaceAll(' ', '-')}.png`
      await page.screenshot({ path: join(output, filename), animations: 'disabled' })
      frames.push({ title: `${viewport.name} / ${scenario.name}`, filename, width: viewport.width, height: viewport.height })
      await page.close()
    }
  }
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Comet UI review board</title>
<style>
*{box-sizing:border-box}body{margin:0;padding:48px;background:#e7e8eb;color:#242528;font-family:system-ui,sans-serif}h1{font-size:28px;margin:0 0 8px}p{color:#61636a;margin:0 0 32px;font-size:14px}.frames{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}.frame{margin:0;min-width:0}figcaption{font-size:14px;font-weight:600;margin-bottom:12px}small{display:block;font-weight:400;color:#61636a;margin-top:4px}.canvas{min-height:450px;display:flex;align-items:flex-start;justify-content:center}img{display:block;max-width:100%;height:auto}img.mobile{width:260px}a{color:inherit}
</style><h1>COMET / UI review board</h1><p>${timestamp} · Mock data · Open a frame for its original resolution. Mobile frames show the visible viewport; scroll content is not expanded.</p><div class="frames">${frames.map(frame => `<figure class="frame"><figcaption>${frame.title}<small>${frame.width} × ${frame.height}</small></figcaption><div class="canvas"><a href="${frame.filename}"><img class="${frame.width < 768 ? 'mobile' : ''}" src="${frame.filename}" alt="${frame.title}"></a></div></figure>`).join('')}</div></html>`
  const board = join(output, 'index.html')
  await writeFile(board, html)
  await writeFile(join(output, 'manifest.json'), JSON.stringify({ capturedAt: timestamp, frames }, null, 2))
  const page = await browser.newPage({ viewport: { width: 2400, height: 1000 }, deviceScaleFactor: 1 })
  await page.goto(pathToFileURL(board).href)
  await page.evaluate(() => Promise.all([...document.images].map(img => img.decode())))
  await page.screenshot({ path: join(output, 'board.png'), fullPage: true })
  console.log(`UI board: ${output}\n  board.png / index.html / manifest.json / ${frames.length} original PNGs`)
} finally {
  await browser?.close()
  await server.close()
}
