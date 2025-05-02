import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const ICONS_DIR = join('src', 'assets', 'icons');
const OUTPUT_FILE = join('src', 'assets', 'iconNames.ts');

const files = readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));

const names = files.map(file => `  | 'icon-${file.replace('.svg', '')}'`).join('\n');

const output = `// Auto-generated icon name types
export type IconName =
${names};
`;

writeFileSync(OUTPUT_FILE, output);
console.log('✅ iconNames.ts generated.');
