import fs from 'fs';
import path from 'path';

// Print metadata or check file descriptions if any
const files = fs.readdirSync(process.cwd()).filter(f => f.startsWith('DSC_'));

console.log('Found camera photos:', files);
