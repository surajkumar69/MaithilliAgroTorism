import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');

const mapping = [
  { img: 'IMG_1239.jpeg', source: 'banquet-hall.jpeg' },
  { img: 'IMG_1240.jpeg', source: 'kids-playground.jpeg' },
  { img: 'IMG_1241.jpeg', source: 'gallery-whatsapp-2.jpeg' },
  { img: 'IMG_1242.jpeg', source: 'hero-resort.jpeg' },
  { img: 'IMG_1243.jpeg', source: 'swimming-pool.jpeg' },
  { img: 'IMG_1244.jpeg', source: 'mountain-balcony.jpeg' },
  { img: 'IMG_1245.jpeg', source: 'luxury-room.jpeg' },
  { img: 'IMG_1246.jpeg', source: 'dormitory-stay.jpeg' },
];

mapping.forEach((item) => {
  const srcPath = path.join(imagesDir, item.source);
  const destPath = path.join(imagesDir, item.img);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.source} -> ${item.img}`);
  }
});
