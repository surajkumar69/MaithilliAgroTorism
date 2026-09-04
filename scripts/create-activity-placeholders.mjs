import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');

// 1. Tractor Ride SVG
const tractorSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15" />
      <stop offset="50%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#2d6a4f" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d4a373" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#081c15" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)" />
  <circle cx="400" cy="280" r="260" fill="url(#glow)" />

  <!-- Farmland & Tractor Silhouette -->
  <path d="M 0 450 Q 200 400 400 450 T 800 420 L 800 600 L 0 600 Z" fill="#112d22" />
  
  <!-- Tractor Body -->
  <rect x="320" y="320" width="160" height="70" rx="10" fill="#c97c5d" stroke="#d4a373" stroke-width="4" />
  <rect x="410" y="270" width="70" height="60" rx="8" fill="#1b4332" stroke="#d4a373" stroke-width="3" />
  <rect x="300" y="310" width="30" height="40" rx="4" fill="#d4a373" />
  <circle cx="340" cy="400" r="35" fill="#081c15" stroke="#d4a373" stroke-width="6" />
  <circle cx="450" cy="390" r="50" fill="#081c15" stroke="#d4a373" stroke-width="8" />

  <!-- Badge Text -->
  <rect x="220" y="60" width="360" height="40" rx="20" fill="#081c15" stroke="#d4a373" stroke-width="2" />
  <text x="400" y="85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d4a373" text-anchor="middle" letter-spacing="3">MAITHILI AGRO TOURISM</text>

  <text x="400" y="510" font-family="serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Traditional Tractor Ride</text>
  <text x="400" y="545" font-family="sans-serif" font-size="15" fill="#74c69d" text-anchor="middle">Authentic Countryside Farm Experience</text>
</svg>`;

// 2. Bullock Cart Ride SVG
const bullockSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15" />
      <stop offset="50%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#3a5a40" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)" />

  <!-- Wooden Cart Wheel -->
  <circle cx="400" cy="320" r="110" fill="none" stroke="#d4a373" stroke-width="12" />
  <circle cx="400" cy="320" r="25" fill="#d4a373" />
  <path d="M 400 210 L 400 430 M 290 320 L 510 320 M 322 242 L 478 398 M 322 398 L 478 242" stroke="#d4a373" stroke-width="6" />

  <!-- Badge Text -->
  <rect x="220" y="60" width="360" height="40" rx="20" fill="#081c15" stroke="#d4a373" stroke-width="2" />
  <text x="400" y="85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d4a373" text-anchor="middle" letter-spacing="3">MAITHILI AGRO TOURISM</text>

  <text x="400" y="500" font-family="serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Bullock Cart Ride</text>
  <text x="400" y="535" font-family="sans-serif" font-size="15" fill="#74c69d" text-anchor="middle">Timeless Rural Maharashtrian Culture</text>
</svg>`;

// 3. Nature Trekking Trail SVG
const trekkingSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15" />
      <stop offset="50%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#2d6a4f" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)" />

  <!-- Mountain Silhouette -->
  <path d="M 100 450 L 300 200 L 480 380 L 650 180 L 800 450 Z" fill="#112d22" stroke="#74c69d" stroke-width="4" />
  <path d="M 300 200 L 260 250 L 340 250 Z" fill="#ffffff" opacity="0.8" />
  <path d="M 650 180 L 610 230 L 690 230 Z" fill="#ffffff" opacity="0.8" />

  <!-- Sun -->
  <circle cx="650" cy="120" r="45" fill="#faedcd" opacity="0.9" />

  <!-- Badge Text -->
  <rect x="220" y="50" width="360" height="40" rx="20" fill="#081c15" stroke="#d4a373" stroke-width="2" />
  <text x="400" y="75" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d4a373" text-anchor="middle" letter-spacing="3">MAITHILI AGRO TOURISM</text>

  <text x="400" y="500" font-family="serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Nature Trail &amp; Mountain Trekking</text>
  <text x="400" y="535" font-family="sans-serif" font-size="15" fill="#74c69d" text-anchor="middle">Sahyadri Mountain Scenic Exploration</text>
</svg>`;

// 4. Sports Turf Ground SVG
const turfSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15" />
      <stop offset="50%" stop-color="#1b4332" />
      <stop offset="100%" stop-color="#2d6a4f" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)" />

  <!-- Turf Lines & Pitch -->
  <rect x="150" y="180" width="500" height="260" rx="20" fill="#1b4332" stroke="#52b788" stroke-width="6" />
  <line x1="400" y1="180" x2="400" y2="440" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 6" />
  <circle cx="400" cy="310" r="50" fill="none" stroke="#ffffff" stroke-width="4" />
  
  <!-- Cricket Wickets Icon -->
  <rect x="230" y="270" width="8" height="70" fill="#d4a373" />
  <rect x="250" y="270" width="8" height="70" fill="#d4a373" />
  <rect x="270" y="270" width="8" height="70" fill="#d4a373" />
  <rect x="225" y="262" width="58" height="8" rx="2" fill="#d4a373" />

  <!-- Badge Text -->
  <rect x="220" y="50" width="360" height="40" rx="20" fill="#081c15" stroke="#d4a373" stroke-width="2" />
  <text x="400" y="75" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d4a373" text-anchor="middle" letter-spacing="3">MAITHILI AGRO TOURISM</text>

  <text x="400" y="495" font-family="serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Sports Turf Ground</text>
  <text x="400" y="530" font-family="sans-serif" font-size="15" fill="#74c69d" text-anchor="middle">Cricket, Football &amp; Multi-Sports Arena</text>
</svg>`;

// 5. Pickle Ball Court SVG
const pickleSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081c15" />
      <stop offset="50%" stop-color="#2d6a4f" />
      <stop offset="100%" stop-color="#40916c" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)" />

  <!-- Pickleball Paddle & Ball -->
  <ellipse cx="360" cy="280" rx="70" ry="90" fill="#d4a373" stroke="#ffffff" stroke-width="6" />
  <rect x="345" y="370" width="30" height="70" rx="8" fill="#1b4332" stroke="#ffffff" stroke-width="3" />
  
  <!-- Perforated Ball -->
  <circle cx="480" cy="250" r="35" fill="#faedcd" stroke="#d4a373" stroke-width="4" />
  <circle cx="470" cy="240" r="4" fill="#081c15" />
  <circle cx="490" cy="240" r="4" fill="#081c15" />
  <circle cx="480" cy="260" r="4" fill="#081c15" />

  <!-- Badge Text -->
  <rect x="220" y="50" width="360" height="40" rx="20" fill="#081c15" stroke="#d4a373" stroke-width="2" />
  <text x="400" y="75" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d4a373" text-anchor="middle" letter-spacing="3">MAITHILI AGRO TOURISM</text>

  <text x="400" y="495" font-family="serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Pickle Ball Court</text>
  <text x="400" y="530" font-family="sans-serif" font-size="15" fill="#74c69d" text-anchor="middle">Outdoor Sports &amp; Recreation Court</text>
</svg>`;

fs.writeFileSync(path.join(imagesDir, 'tractor-ride.svg'), tractorSvg);
fs.writeFileSync(path.join(imagesDir, 'bullock-cart.svg'), bullockSvg);
fs.writeFileSync(path.join(imagesDir, 'mountain-trekking.svg'), trekkingSvg);
fs.writeFileSync(path.join(imagesDir, 'sports-turf.svg'), turfSvg);
fs.writeFileSync(path.join(imagesDir, 'pickle-ball.svg'), pickleSvg);

console.log('All activity SVG placeholders created successfully!');
