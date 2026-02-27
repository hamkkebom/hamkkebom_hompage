const http = require('http');
const https = require('https');

const urls = [
    "https://blog.naver.com/tkkim25",
    "https://acepower.page24.app/",
    "http://acellcare.com",
    "https://smartstore.naver.com/jooankimchi",
    "https://www.samickexpress.co.kr/",
    "https://map.naver.com/v5/entry/place/1507967604",
    "https://www.hdef.co.kr/new/index.php",
    "https://daontm.kr/",
    "https://map.naver.com/v5/entry/place/1246434043"
];

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        const req = (url.startsWith('https') ? https : http).get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

async function run() {
    for (const url of urls) {
        try {
            const html = await fetchHTML(url);

            const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
            const og = ogMatch ? ogMatch[1] : null;

            // Look for any img with logo in src or class or id
            const logoMatch = html.match(/<img[^>]*src="([^"]*(?:logo|Logo)[^"]*)"/i);
            const logo = logoMatch ? logoMatch[1] : null;

            console.log(`URL: ${url}`);
            if (og) console.log(`  OG: ${og}`);
            if (logo) console.log(`  LOGO: ${logo}`);
            if (!og && !logo) console.log(`  No image found.`);
            console.log("---");
        } catch (error) {
            console.log(`URL: ${url}`);
            console.log(`  ERROR: ${error.message}`);
            console.log("---");
        }
    }
}

run();
