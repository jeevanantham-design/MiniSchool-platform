const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceStrings() {
  try {
    const dir = path.join(__dirname, 'src');
    walkDir(dir, function(filePath) {
      if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        content = content.replace(/LUMINA <span className="font-light">ACADEMY<\/span>/gi, 'MONISHA <span className="font-light">MATRICULATION SCHOOL RENDADI</span>');
        content = content.replace(/LUMINA ACADEMY/gi, 'Monisha Matriculation School Rendadi');
        content = content.replace(/Lumina Academy/gi, 'Monisha Matriculation School Rendadi');
        content = content.replace(/lumina_app_/g, 'monisha_app_');
        content = content.replace(/@lumina.edu/g, '@monishaschool.edu');
        content = content.replace(/lumina\.edu/g, 'monishaschool.edu');
        content = content.replace(/Lumina/g, 'Monisha Matriculation School Rendadi');
        content = content.replace(/LUMINA/g, 'MONISHA MATRICULATION');
        
        content = content.replace(/<span className="text-white font-bold text-xl leading-none">L<\/span>/g, '<span className="text-white font-bold text-xl leading-none">M</span>');
        content = content.replace(/LA-2026/g, 'MMS-2026');

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log('Updated', filePath);
        }
      }
    });
  } catch(e) {
    console.log("Error:", e);
  }
}

replaceStrings();
