const fs = require('fs');
const path = require('path');

// Read the catalog file
const catalogPath = path.join(__dirname, 'src/data/catalog.js');
let catalogContent = fs.readFileSync(catalogPath, 'utf-8');

// Brand assignments - rotate through realistic brands for hardware
const brands = [
  'Zebra Technologies',
  'Honeywell',
  'Cryptware Infotech',
  'Symbol',
  'Motorola',
  'Datalogic',
  'Cognex',
  'SATO'
];

// Price range by subcategory
const priceRanges = {
  'printers': { min: 2500, max: 15000 },
  'scanners': { min: 800, max: 5000 },
  'pos': { min: 3000, max: 12000 },
  'computing': { min: 4000, max: 20000 },
  'rfid': { min: 2000, max: 8000 },
  'consumables': { min: 200, max: 2000 },
  'default': { min: 1000, max: 5000 }
};

// Split by objects and rebuild
const lines = catalogContent.split('\n');
const updatedLines = [];
let braceDepth = 0;
let currentObject = [];
let inObject = false;
let brandIndex = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('{') && !line.includes('icon')) {
    inObject = true;
    braceDepth++;
    currentObject = [line];
  } else if (inObject) {
    currentObject.push(line);
    
    if (line.includes('}') && !line.includes('icon')) {
      braceDepth--;
      
      if (braceDepth === 0) {
        // Check if this is a hardware object
        const objStr = currentObject.join('\n');
        if (objStr.includes('"type": "hardware"')) {
          // Extract subcategory
          const subcatMatch = objStr.match(/"subcategory": "([^"]*)"/);
          const subcategory = subcatMatch ? subcatMatch[1] : 'default';
          const priceRange = priceRanges[subcategory] || priceRanges['default'];
          const price = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1) + priceRange.min);
          const brand = brands[brandIndex % brands.length];
          brandIndex++;
          
          // Insert brand and price before type
          const updated = objStr.replace(
            /    "type": "hardware"/,
            `    "brand": "${brand}",\n    "price": ${price},\n    "type": "hardware"`
          );
          
          updatedLines.push(...updated.split('\n'));
        } else {
          updatedLines.push(...currentObject);
        }
        
        inObject = false;
        currentObject = [];
      }
    }
  } else {
    updatedLines.push(line);
  }
}

fs.writeFileSync(catalogPath, updatedLines.join('\n'));
console.log('✅ Catalog updated successfully with brand and price fields!');
