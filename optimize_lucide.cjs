const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walk(filepath, filelist);
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const srcDir = 'c:\\Users\\Francesco\\Desktop\\hero-test\\src';
const allFiles = walk(srcDir);

let count = 0;
for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  const regex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, (match, p1) => {
      const icons = p1.split(',').map(i => i.trim()).filter(i => i);
      let newImports = '';
      for (const icon of icons) {
        newImports += `import { ${icon} } from 'lucide-react';\n`;
      }
      return newImports.trim();
    });
    
    // We double sum to be absolutely sure
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
    count++;
  }
}

console.log(`\nSuccessfully updated ${count} files.`);
