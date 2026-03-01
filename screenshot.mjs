import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

async function takeScreenshot(url, label = '') {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport for better screenshot
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Ensure the directory exists
  const dir = './temporary screenshots';
  try {
    mkdirSync(dir, { recursive: true });
  } catch (e) {}
  
  // Find next number
  const files = readdirSync(dir).filter(f => f.startsWith('screenshot-'));
  const max = files.reduce((acc, f) => {
    const num = parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0');
    return Math.max(acc, num);
  }, 0);
  
  const next = max + 1;
  const filename = join(dir, `screenshot-${next}${label ? '-' + label : ''}.png`);
  
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`Screenshot saved to ${filename}`);
  
  await browser.close();
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

takeScreenshot(url, label).catch(console.error);
