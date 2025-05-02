import chokidar from 'chokidar';
import { exec } from 'child_process';
import { join } from 'path';

const ICONS_DIR = join('src', 'assets', 'icons');

console.log('👀 Watching icons directory for changes...');

const watcher = chokidar.watch(ICONS_DIR, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('add', regenerate).on('change', regenerate).on('unlink', regenerate);

function regenerate() {
  console.log('🔄 Icon change detected. Regenerating dev-sprite...');
  exec('npm run generate-dev-sprite', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Failed to regenerate dev-sprite:', err);
      return;
    }
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  });
}
