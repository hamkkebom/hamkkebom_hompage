const fs = require('fs');

const w = 1200;
const h = 600;
let lines = [];
lines.push('<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">');
lines.push('<path d="M50,300 Q150,50 600,100 T1150,300 Q1050,550 600,500 T50,300 Z" fill="black" />');

// Adding some dry brush streaks along the edges
for (let i = 0; i < 80; i++) {
    let startX = Math.random() * w;
    let startY = (Math.random() < 0.5) ? (Math.random() * 150) : (h - Math.random() * 150);
    let len = 50 + Math.random() * 200;
    let thickness = 3 + Math.random() * 20;
    let endX = startX + len * (Math.random() > 0.5 ? 1 : -1);
    let endY = startY + (Math.random() * 40 - 20);
    lines.push('<path d="M' + startX + ',' + startY + ' Q' + (startX + len / 2) + ',' + (startY - 20) + ' ' + endX + ',' + endY + ' L' + endX + ',' + (endY + thickness) + ' Q' + (startX + len / 2) + ',' + (startY - 20 + thickness) + ' ' + startX + ',' + (startY + thickness) + ' Z" fill="black" />');
}

// Random ink splatters
for (let i = 0; i < 150; i++) {
    let cx = Math.random() * w;
    let cy = Math.random() * h;
    let r = 2 + Math.random() * 10;
    // only keep splatters near the boundaries
    if (cy < 200 || cy > h - 200 || cx < 200 || cx > w - 200) {
        lines.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="black" />');
    }
}

lines.push('</svg>');
fs.writeFileSync('public/images/brush-mask.svg', lines.join('\\n'));
console.log('Brush mask generated.');
