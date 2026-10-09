import { Noto_Serif_KR } from "next/font/google";

/* 슬레이트 제목·1장 문장·마무리 눈썹 문구에만 쓰는 세리프 (한 가지 굵기만).
   preload:false — 한글 글리프 조각은 unicode-range로 쓰는 글자만 내려받는다. */
export const serifKr = Noto_Serif_KR({
  weight: "600",
  display: "swap",
  preload: false,
  variable: "--font-serif-kr",
});
