// 홈 스크롤 스토리(1장 「함께 보다」)용 파생 이미지 생성 스크립트
// 실행: node scripts/make-ch1-thumbs.mjs
// - public/renewal/ch1/thumbs/*.webp : 1장 마지막 「모여드는 사람들」 인화 사진 (480x320, attention crop)
// - public/renewal/ch1/800/*.webp    : 장면 사진·3장 팀 사진의 800w 파생본 (srcset 용)
// - public/renewal/ch1/600/*.webp    : 위성 사진(작게 놓이는 사진)의 600w 파생본 (srcset 용)
// - public/renewal/grain.png         : 160px 그레인 타일 (결정적 시드, 4단계 팔레트)
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public", "renewal");

/* 인화 사진: 1장에서 본 사람들 + 함께봄 사람들. 3장의 팀 사진 세 장은 3장에서 처음 크게 보이도록
   여기서는 다른 순간(-b 크롭)만 쓴다. GATHER_BASE(storyData.ts) 와 순서를 맞춘다.
   { src, out?, crop? } — crop 은 원본 픽셀 기준으로 먼저 잘라 낸 뒤 480x320 으로 맞춘다
   (같은 사진의 다른 순간을 밀착 인화처럼 한 장 더 뽑을 때). */
const THUMBS = [
  { src: "team-video.webp" },
  { src: "ch1/archive/joseon-19-janggi.webp" },
  { src: "ch1/platforms/arirang-entry-maskdance-crowd.webp" },
  { src: "team-planning.webp", out: "team-planning-b.webp", crop: { left: 880, top: 120, width: 720, height: 480 } },
  // 자막을 피해 오른쪽 사람의 얼굴 쪽으로 자른다
  { src: "ch1/works/works-juan-kimchi.webp", crop: { left: 690, top: 0, width: 480, height: 320 } },
  { src: "ch1/archive/hulbert-portrait.webp", crop: { left: 0, top: 60, width: 750, height: 500 } },
  { src: "ch1/archive/hulbert-frame-09-crowd.webp" },
  { src: "team-marketing.webp", out: "team-marketing-b.webp", crop: { left: 700, top: 250, width: 840, height: 560 } },
  { src: "ch1/archive/joseon-40-children.webp" },
  // 환호하는 사람(왼쪽 아래)을 남기고 위쪽 큰 글자는 덜어 낸다
  { src: "ch1/works/works-daon-patent.webp", crop: { left: 70, top: 244, width: 648, height: 432 } },
  { src: "ch1/works/still-kkumkkum-family.webp" },
  { src: "ch1/platforms/arirang-entry-azalea-children.webp" },
];

const W800 = [
  "ch1/archive/joseon-19-janggi.webp",
  "ch1/platforms/arirang-entry-maskdance-crowd.webp",
  "ch1/works/works-ace-insa.webp",
  "team-video.webp",
  "team-marketing.webp",
  "team-education.webp",
  "team-planning.webp",
  // 정적 문서(움직임 줄이기)용
  "ch1/platforms/arirang-entry-azalea-children.webp",
  "ch1/works/still-kkumkkum-family.webp",
];

/* 위성 사진은 화면에서 150–330px 폭이라 600w 면 DPR 2 까지 충분하다 */
const W600 = [
  "ch1/archive/hulbert-portrait.webp",
  "ch1/archive/arirang-exhibition-poster.webp",
  "ch1/archive/joseon-40-children.webp",
  "ch1/platforms/arirang-award-kkumgyeol.webp",
  "ch1/platforms/arirang-entry-azalea-children.webp",
  "ch1/works/works-juan-kimchi.webp",
  "ch1/works/works-daon-patent.webp",
  "ch1/works/still-kkumkkum-family.webp",
];

const kb = async (f) => ((await stat(f)).size / 1024).toFixed(1) + "KB";

async function main() {
  const thumbDir = path.join(PUB, "ch1", "thumbs");
  const w800Dir = path.join(PUB, "ch1", "800");
  const w600Dir = path.join(PUB, "ch1", "600");
  await mkdir(thumbDir, { recursive: true });
  await mkdir(w800Dir, { recursive: true });
  await mkdir(w600Dir, { recursive: true });

  for (const t of THUMBS) {
    const out = path.join(thumbDir, t.out ?? path.basename(t.src));
    let img = sharp(path.join(PUB, t.src));
    if (t.crop) img = img.extract(t.crop);
    await img
      .resize(480, 320, { fit: "cover", position: t.crop ? "centre" : sharp.strategy.attention })
      .webp({ quality: 70 })
      .toFile(out);
    console.log("thumb", path.basename(out), await kb(out));
  }

  for (const rel of W800) {
    const out = path.join(w800Dir, path.basename(rel));
    await sharp(path.join(PUB, rel)).resize({ width: 800 }).webp({ quality: 72 }).toFile(out);
    console.log("800w ", path.basename(rel), await kb(out));
  }

  for (const rel of W600) {
    const out = path.join(w600Dir, path.basename(rel));
    await sharp(path.join(PUB, rel)).resize({ width: 600 }).webp({ quality: 72 }).toFile(out);
    console.log("600w ", path.basename(rel), await kb(out));
  }

  // 그레인: Park–Miller 시드 난수 → 4단계 회색. 결과가 항상 같다.
  const S = 160;
  let seed = 20261008;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const buf = Buffer.alloc(S * S);
  const levels = [64, 112, 160, 208];
  for (let i = 0; i < buf.length; i++) buf[i] = levels[Math.floor(rand() * levels.length)];
  const grain = path.join(PUB, "grain.png");
  await sharp(buf, { raw: { width: S, height: S, channels: 1 } })
    .png({ palette: true, colours: 4, compressionLevel: 9 })
    .toFile(grain);
  console.log("grain", await kb(grain));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
