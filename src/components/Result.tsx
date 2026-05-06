// Result.tsx
import { useState, useRef, useMemo } from 'react';
import { toPng } from 'html-to-image';
import { BUNKEI_DATA, RIKEI_DATA } from '../constants';
import type { CourseType, CTScores, NijiScores, FacultyData } from '../types'; // 型をインポート

interface Props {
  course: CourseType;
  ctScores: CTScores;
  nijiScores: NijiScores;
}

// --- 1. ロジックを完全に外に切り出す（テスト可能にする） ---
const truncateToTwo = (num: number) => Math.floor(num * 100 + 0.0000001) / 100;
// Result.tsx 内の calculateTotalScore 関数を以下のように差し替えてください

const calculateTotalScore = (
  faculty: FacultyData,
  ctScores: CTScores,
  nijiScores: NijiScores,
  course: CourseType
) => {
  const ctBase = { 
    koku: 200, math: 200, engR: 100, engL: 100, info: 100, 
    soc: course === 'bunkei' ? 200 : 100, 
    sci: course === 'bunkei' ? 100 : 200 
  };

  let ctTotal = 0;
  ctTotal += truncateToTwo((ctScores.koku / ctBase.koku) * faculty.ct.koku);
  ctTotal += truncateToTwo((ctScores.math / ctBase.math) * faculty.ct.math);
  ctTotal += truncateToTwo((ctScores.soc / ctBase.soc) * faculty.ct.soc);
  ctTotal += truncateToTwo((ctScores.sci / ctBase.sci) * faculty.ct.sci);
  ctTotal += truncateToTwo((ctScores.info / ctBase.info) * faculty.ct.info);
  
  // --- 英語の判定ロジック ---
  if (faculty.ct.eng !== undefined) {
    // eng(合計)配点がある場合 (例: 総人、工学部など)
    ctTotal += truncateToTwo(((ctScores.engR + ctScores.engL) / 200) * faculty.ct.eng);
  } else if (faculty.ct.engR !== undefined && faculty.ct.engL !== undefined) {
    // engR / engL 別々に配点がある場合 (例: 文、法、農など)
    ctTotal += truncateToTwo((ctScores.engR / 100) * faculty.ct.engR);
    ctTotal += truncateToTwo((ctScores.engL / 100) * faculty.ct.engL);
  }
  
  // --- ctScale の適用 (存在しない場合は 1 倍) ---
  const scale = faculty.ctScale ?? 1;
  ctTotal = truncateToTwo(ctTotal * scale);

  // 二次試験の計算はそのまま
  const nijiBase = { 
    koku: course === 'bunkei' ? 150 : 100, 
    math: course === 'bunkei' ? 150 : 200,
    eng: 150, soc: 100, sci: 200
  };

  let nijiTotal = 0;
  nijiTotal += truncateToTwo((nijiScores.koku / nijiBase.koku) * faculty.niji.koku);
  nijiTotal += truncateToTwo((nijiScores.math / nijiBase.math) * faculty.niji.math);
  nijiTotal += truncateToTwo((nijiScores.eng / nijiBase.eng) * faculty.niji.eng);
  nijiTotal += truncateToTwo((nijiScores.soc / nijiBase.soc) * faculty.niji.soc);
  nijiTotal += truncateToTwo((nijiScores.sci / nijiBase.sci) * faculty.niji.sci);

  const total = truncateToTwo(ctTotal + nijiTotal);
  const diff = total - faculty.min;
  
  return { total, diff, isPass: diff >= 0 };
};


export default function Result({ course, ctScores, nijiScores }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  // --- 2. 計算結果をメモ化する（パフォーマンスと可読性） ---
  const results = useMemo(() => {
    const data = course === 'bunkei' ? BUNKEI_DATA : RIKEI_DATA;
    return data.map(faculty => ({
      name: faculty.name,
      ...calculateTotalScore(faculty, ctScores, nijiScores, course)
    }));
  }, [course, ctScores, nijiScores]);

 const downloadImage = async () => {
    if (!captureRef.current) return;
    
    setIsGenerating(true);
    try {
      // ⭕️ html2canvas を toPng に書き換え
      // scale ではなく pixelRatio: 2 にすることで高画質を維持します
      const imgData = await toPng(captureRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff"
      });
      
      setModalImgSrc(imgData);
    } catch (err) {
      console.error("画像化エラーの詳細:", err);
      alert('画像の作成に失敗しました。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-5 pt-1">
      <div className="text-[22px] text-[#333] mb-5 border-b-2 border-[#ccc] pb-2.5 font-bold">
        ④ 判定結果（令和8年度）
      </div>
      
      <div ref={captureRef} className="bg-white p-[15px] sm:p-4 rounded-lg">
        <div className="text-[14px] text-[#333] mb-2.5">(https://rs-dev-kyoto.github.io/kyoto-simu/)</div>
        
        <div className="text-[14px] sm:text-[20px] leading-[1.6] text-[#333] tracking-tighter sm:tracking-normal">
          {results.map((res) => (
            <div key={res.name} className="mb-1">
              {res.name}に{res.diff >= 0 ? '+' : ''}{res.diff.toFixed(2)}点で
              <span className={res.isPass ? "text-red-600 font-bold" : "text-gray-600"}>
                {res.isPass ? '合格💮' : '不合格❌'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="block w-full p-4 text-white text-lg font-bold rounded-lg transition-opacity hover:opacity-90 mt-5 bg-[#1a73e8] disabled:bg-[#ccc]"
        onClick={downloadImage}
        disabled={isGenerating}
      >
        {isGenerating ? '画像を作成中...⏳' : '判定結果を画像として保存📸'}
      </button>

      {/* モーダル部分は元の実装を維持（CSSの調整は適宜） */}
      {modalImgSrc && (
        <div className="fixed inset-0 bg-black/85 z-[9999] flex flex-col items-center justify-center p-4">
           {/* ...省略... */}
           <img src={modalImgSrc} alt="判定結果" className="max-w-full max-h-[70vh] rounded-lg" />
           <button onClick={() => setModalImgSrc(null)} className="mt-6 px-8 py-3 bg-white text-black rounded-full">閉じる</button>
        </div>
      )}
    </div>
  );
}