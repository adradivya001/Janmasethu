const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client/src');
const ignoreFiles = ['SakhiTry.tsx', 'sakhi-web', 'clinic'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        if (ignoreFiles.some(ignore => fullPath.includes(ignore))) return;

        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk(srcDir);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Header background is white/80
    content = content.replace(/bg-white\/80/g, 'bg-[#FFE6EE]/90');
    content = content.replace(/bg-white\/50/g, 'bg-[#FFE6EE]/50');
    content = content.replace(/bg-white\/30/g, 'bg-[#FFE6EE]/30');
    content = content.replace(/'bg-white'/g, "'bg-[#FFE6EE]'");
    content = content.replace(/"bg-white"/g, '"bg-[#FFE6EE]"');
    content = content.replace(/bg-white\b/g, 'bg-[#FFE6EE]');

    content = content.replace(/bg-purple-50\b/g, 'bg-[#FFDBE9]');
    content = content.replace(/bg-pink-50\b/g, 'bg-[#FFDBE9]');
    content = content.replace(/bg-gray-50\b/g, 'bg-[#FFDBE9]');

    content = content.replace(/border-gray-100\b/g, 'border-[#FFB6C1]');
    content = content.replace(/border-gray-200\b/g, 'border-[#FFB6C1]');
    content = content.replace(/border-purple-100\b/g, 'border-[#FFB6C1]');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
    }
});
console.log('Done.');
