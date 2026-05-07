// ScoreInput.tsx
import React from 'react';
// App.tsxで定義した型をインポート（実際は types.ts など別ファイルに分けるのが主流です）
import type { CourseType, CTScores, NijiScores } from '../types';

interface Props {
  course: CourseType;
  setCourse: (val: CourseType) => void;
  ctScores: CTScores;
  setCtScores: (val: CTScores) => void;
  nijiScores: NijiScores;
  setNijiScores: (val: NijiScores) => void;
}

// --- 改善点1: 内部コンポーネントを外に切り出す ---
// React.FC は省略し、引数で直接型を定義する書き方が現代的です
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[18px] text-[#0b2046] border-b-2 border-[#0b2046] pb-2 mt-0 mb-4 font-bold">
    {children}
  </h2>
);

const InputRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#ddd]">
    <div className="font-bold text-[#444] text-[15px]">{label}</div>
    <div className="flex items-center text-[14px]">
      {children}
    </div>
  </div>
);

// クラス名も外に出しておくと、再レンダリング時に毎回評価されずクリーンです
const numInputClass = "w-[70px] p-1.5 text-[16px] border border-[#ccc] rounded text-right mr-1.5";


export default function ScoreInput({ course, setCourse, ctScores, setCtScores, nijiScores, setNijiScores }: Props) {
  
  // --- 改善点3: keyof を使った型安全な更新関数 ---
  const handleCtChange = (subject: keyof CTScores, value: string) => {
    // 空文字の場合は 0 として扱うなどの安全対策を入れておくとベターです
    const numValue = value === '' ? 0 : Number(value);
    setCtScores({ ...ctScores, [subject]: numValue });
  };

  const handleNijiChange = (subject: keyof NijiScores, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setNijiScores({ ...nijiScores, [subject]: numValue });
  };

  return (
    <>
      <div className="border border-[#e0e0e0] rounded-lg p-5 mb-6 bg-[#fafafa]">
        <SectionTitle>① 志望区分</SectionTitle>
        <div className="flex justify-between items-center">
          <div className="font-bold text-[#444] text-[15px] w-[100px]">文理選択</div>
          <div className="flex-grow">
            {/* 改善点2: valueの型がCourseTypeで制限されているため安全 */}
            <select 
              className="p-2 text-[16px] border border-[#ccc] rounded w-full"
              value={course} 
              onChange={(e) => setCourse(e.target.value as CourseType)}
            >
              <option value="rikei">理系</option>
              <option value="bunkei">文系</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border border-[#e0e0e0] rounded-lg p-5 mb-6 bg-[#fafafa]">
        <SectionTitle>② 共通テスト（素点）</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-[10px]">
          {/* 改善点4: value={ctScores.koku || ''} を追加してControlled Component化 */}
          <InputRow label="国語">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="200" value={ctScores.koku || ''} onChange={(e) => handleCtChange('koku', e.target.value)} /> / 200
          </InputRow>
          <InputRow label="数学 (ⅠA・ⅡBC合計)">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="200" value={ctScores.math || ''} onChange={(e) => handleCtChange('math', e.target.value)} /> / 200
          </InputRow>
          <InputRow label="英語 (リーディング)">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="100" value={ctScores.engR || ''} onChange={(e) => handleCtChange('engR', e.target.value)} /> / 100
          </InputRow>
          <InputRow label="英語 (リスニング)">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="100" value={ctScores.engL || ''} onChange={(e) => handleCtChange('engL', e.target.value)} /> / 100
          </InputRow>
          <InputRow label="社会">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="200" value={ctScores.soc || ''} onChange={(e) => handleCtChange('soc', e.target.value)} /> / {course === 'bunkei' ? 200 : 100}
          </InputRow>
          <InputRow label="理科">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="200" value={ctScores.sci || ''} onChange={(e) => handleCtChange('sci', e.target.value)} /> / {course === 'bunkei' ? 100 : 200}
          </InputRow>
          <InputRow label="情報">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="100" value={ctScores.info || ''} onChange={(e) => handleCtChange('info', e.target.value)} /> / 100
          </InputRow>
        </div>
      </div>

      <div className="border border-[#e0e0e0] rounded-lg p-5 mb-6 bg-[#fafafa]">
        <SectionTitle>③ 二次試験（素点）</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-[10px]">
          <InputRow label="国語">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="150" value={nijiScores.koku || ''} onChange={(e) => handleNijiChange('koku', e.target.value)} /> / {course === 'bunkei' ? 150 : 100}
          </InputRow>
          <InputRow label="数学">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="300" value={nijiScores.math || ''} onChange={(e) => handleNijiChange('math', e.target.value)} /> / {course === 'bunkei' ? 150 : 200}
          </InputRow>
          <InputRow label="外国語 (英語)">
            <input type="number" className={numInputClass} placeholder="0" min="0" max="250" value={nijiScores.eng || ''} onChange={(e) => handleNijiChange('eng', e.target.value)} /> / 150
          </InputRow>
          {course === 'bunkei' ? (
            <InputRow label="社会">
              <input type="number" className={numInputClass} placeholder="0" min="0" max="100" value={nijiScores.soc || ''} onChange={(e) => handleNijiChange('soc', e.target.value)} /> / 100
            </InputRow>
          ) : (
            <InputRow label="理科 (2科目)">
              <input type="number" className={numInputClass} placeholder="0" min="0" max="350" value={nijiScores.sci || ''} onChange={(e) => handleNijiChange('sci', e.target.value)} /> / 200
            </InputRow>
          )}
        </div>
      </div>
    </>
  );
}