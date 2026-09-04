import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const targetDir = path.join(rootDir, 'public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map files to accurate web-friendly names based on actual photo content
const imageMap = [
  { source: 'DSC_6379.JPG.jpeg', dest: 'hero-resort.jpeg', alt: 'Maithili Agro Tourism Mountain View Balcony' },
  { source: 'DSC_6422.JPG.jpeg', dest: 'swimming-pool.jpeg', alt: 'Resort Swimming Pool illuminated at night' },
  { source: 'DSC_6379.JPG.jpeg', dest: 'mountain-balcony.jpeg', alt: 'Room Balcony with Mountain View' },
  { source: 'DSC_6433.JPG.jpeg', dest: 'banquet-hall.jpeg', alt: 'Spacious Event and Dining Hall' },
  { source: 'DSC_6445.JPG.jpeg', dest: 'kids-playground.jpeg', alt: 'Children Play Area with Swings and Slide' },
  { source: 'DSC_6389.JPG.jpeg', dest: 'luxury-room.jpeg', alt: 'Comfortable Deluxe Room Interior' },
  { source: 'DSC_6415.JPG.jpeg', dest: 'private-cottage-night.jpeg', alt: 'Premium Cottage Stay Night View' },
  { source: 'DSC_6415.JPG.jpeg', dest: 'dormitory-stay.jpeg', alt: 'Resort Cottage Exterior' },
  { source: 'DSC_6459.JPG.jpeg', dest: 'dining-area.jpeg', alt: 'Indoor Dining Hall' },
  { source: 'DSC_6452.JPG.jpeg', dest: 'washroom.jpeg', alt: 'Comfortable Washroom Facilities' },
  { source: 'DSC_6439.JPG.jpeg', dest: 'night-resort.jpeg', alt: 'Night Resort Ambience' },
];

let copied = 0;

for (const item of imageMap) {
  const sourcePath = path.join(rootDir, item.source);
  const destPath = path.join(targetDir, item.dest);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${item.source} -> ${item.dest}`);
    copied++;
  } else {
    // Fallback: check if file exists with different case
    const files = fs.readdirSync(rootDir);
    const found = files.find(f => f.toLowerCase() === item.source.toLowerCase());
    if (found) {
      fs.copyFileSync(path.join(rootDir, found), destPath);
      console.log(`Copied ${found} -> ${item.dest}`);
      copied++;
    }
  }
}

// Copy WhatsApp images as fallback/additional gallery
const whatsappFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('WhatsApp Image'));
whatsappFiles.forEach((file, index) => {
  const destName = `gallery-whatsapp-${index + 1}.jpeg`;
  fs.copyFileSync(path.join(rootDir, file), path.join(targetDir, destName));
  console.log(`Copied ${file} -> ${destName}`);
  copied++;
});

console.log(`Total ${copied} images organized into public/images!`);
