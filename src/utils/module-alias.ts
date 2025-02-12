import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import moduleAlias from 'module-alias';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseDir = resolve(__dirname, '../');

moduleAlias.addAliases({
  '@': baseDir,
  '@lib': resolve(baseDir, 'lib'),
  '@middleware': resolve(baseDir, 'middleware'),
  '@services': resolve(baseDir, 'services'),
  '@config': resolve(baseDir, 'config'),
  '@types': resolve(baseDir, 'types')
});

export default moduleAlias; 