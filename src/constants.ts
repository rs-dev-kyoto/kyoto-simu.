import type{ FacultyData } from './types';

export const BUNKEI_DATA: FacultyData[] = [
  { name: "総人(文)", min: 530.50, ct: { koku: 0, math: 0, eng: 0, soc: 50, sci: 100, info: 25 }, niji: { koku: 150, math: 200, eng: 200, soc: 100, sci: 0 } },
  { name: "文", min: 488.25, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 15 }, ctScale: 250 / 265, niji: { koku: 150, math: 100, eng: 150, soc: 100, sci: 0 } },
  { name: "教育(文)", min: 564.66, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 15 }, niji: { koku: 200, math: 150, eng: 200, soc: 100, sci: 0 } },
  { name: "法", min: 558.08, ct: { koku: 200, math: 200, engR: 150, engL: 50, soc: 200, sci: 100, info: 50 }, ctScale: 285 / 950, niji: { koku: 150, math: 150, eng: 200, soc: 100, sci: 0 } },
  { name: "経済(文)", min: 555.75, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 50 }, niji: { koku: 150, math: 150, eng: 150, soc: 100, sci: 0 } }
];

export const RIKEI_DATA: FacultyData[] = [
  { name: "総人(理)", min: 454.00, ct: { koku: 0, math: 0, eng: 0, soc: 100, sci: 0, info: 25 }, niji: { koku: 150, math: 200, eng: 150, soc: 0, sci: 200 } },
  { name: "教育(理)", min: 523.18, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 15 }, niji: { koku: 150, math: 200, eng: 200, soc: 0, sci: 100 } },
  { name: "経済(理)", min: 555.62, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 50 }, niji: { koku: 150, math: 300, eng: 200, soc: 0, sci: 0 } },
  { name: "理", min: 730.25, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 25, sci: 50, info: 25 }, niji: { koku: 150, math: 300, eng: 225, soc: 0, sci: 300 } },
  { name: "医医", min: 876.62, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 25 }, niji: { koku: 150, math: 250, eng: 300, soc: 0, sci: 300 } },
  { name: "人健", min: 518.50, ct: { koku: 50, math: 50, engR: 37.5, engL: 12.5, soc: 50, sci: 50, info: 25 }, niji: { koku: 150, math: 200, eng: 200, soc: 0, sci: 200 } },
  { name: "薬", min: 512.06, ct: { koku: 40, math: 40, engR: 30, engL: 10, soc: 40, sci: 40, info: 20 }, niji: { koku: 100, math: 200, eng: 200, soc: 0, sci: 200 } },
  { name: "地工", min: 581.20, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "建築", min: 596.32, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "物工", min: 615.33, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "電電", min: 602.15, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "情報", min: 645.49, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "工化", min: 581.15, ct: { koku: 25, math: 25, eng: 50, soc: 50, sci: 25, info: 50 }, niji: { koku: 100, math: 250, eng: 200, soc: 0, sci: 250 } },
  { name: "農", min: 629.98, ct: { koku: 70, math: 50, engR: 37.5, engL: 12.5, soc: 100, sci: 50, info: 30 }, niji: { koku: 100, math: 200, eng: 200, soc: 0, sci: 200 } }
];