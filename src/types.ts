// types.ts

export type CourseType = 'bunkei' | 'rikei';

export type CTScores ={
  koku: number;
  math: number;
  engR: number;
  engL: number;
  soc: number;
  sci: number;
  info: number;
}

export type NijiScores ={
  koku: number;
  math: number;
  eng: number;
  soc: number;
  sci: number;
}

export type FacultyData ={
  name: string;
  min: number;
  ct: {
    koku: number;
    math: number;
    eng?: number;
    engR?: number;
    engL?: number;
    soc: number;
    sci: number;
    info: number;
  };
  ctScale?: number;
  niji: {
    koku: number;
    math: number;
    eng: number;
    soc: number;
    sci: number;
  };
}