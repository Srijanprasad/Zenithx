const fs = require('fs');
const path = require('path');

const SOURCE_FILE = process.argv[2];
const DEST_DIR = path.join(__dirname, '../public/frames');
const FRAME_COUNT = 120;

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

for (let i = 0; i < FRAME_COUNT; i++) {
    const paddedIndex = String(i).padStart(3, '0');
    const fileName = `frame_${paddedIndex}_delay-0.04s.webp`;
    fs.copyFileSync(SOURCE_FILE, path.join(DEST_DIR, fileName));
}

console.log(`Generated ${FRAME_COUNT} frames in ${DEST_DIR}`);
