import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

const ICONS_DIR = join('src', 'assets', 'icons');
const OUTPUT_FILE = join('src', 'assets', 'dev-sprite.svg');

// 아이콘 폴더가 없으면 에러
if (!existsSync(ICONS_DIR)) {
  console.error(`❌ Icons directory not found: ${ICONS_DIR}`);
  process.exit(1);
}

const files = readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));

if (files.length === 0) {
  console.error('❌ No SVG icons found in icons directory.');
  process.exit(1);
}

// symbol 묶기
const symbols = files
  .map(file => {
    const filePath = join(ICONS_DIR, file);
    const svgContent = readFileSync(filePath, 'utf-8');

    // viewBox 추출
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // path 추출
    const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"[^>]*>/g);
    const paths = pathMatch ? pathMatch.join('\n') : '';

    const symbolId = `icon-${basename(file, '.svg')}`;

    return `<symbol id="${symbolId}" viewBox="${viewBox}" fill="none">
${paths}
</symbol>`;
  })
  .join('\n');

const outputContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols}
</svg>`;

writeFileSync(OUTPUT_FILE, outputContent);
console.log(`✅ Dev sprite generated: ${OUTPUT_FILE}`);
