import { copyFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const NEXT_DIR = join('.next');
const source = join(NEXT_DIR, 'sprite.svg');
const destination = join('public', 'sprite.svg');

if (!existsSync(source)) {
  console.warn('⚠️ sprite.svg not found. Retrying full rebuild...');
  rmSync(NEXT_DIR, { recursive: true, force: true });

  execSync('next build', { stdio: 'inherit' });

  if (!existsSync(source)) {
    console.error('❌ sprite.svg still missing after rebuild. Check Webpack config or imports.');
    process.exit(1);
  }
}

copyFileSync(source, destination);
console.log('✅ sprite.svg copied to /public/');
