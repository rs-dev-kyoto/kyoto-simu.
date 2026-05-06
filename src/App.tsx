// App.tsx
import { useState, useRef, useEffect } from 'react';
import ScoreInput from './components/ScoreInput';
import Result from './components/Result';
import type { CourseType, CTScores, NijiScores } from './types';



function App() {
  // --- 2. ジェネリクス < > を使ってStateの型を明示 ---
  const [course, setCourse] = useState<CourseType>('bunkei');
  const [ctScores, setCtScores] = useState<CTScores>({ koku: 0, math: 0, engR: 0, engL: 0, soc: 0, sci: 0, info: 0 });
  const [nijiScores, setNijiScores] = useState<NijiScores>({ koku: 0, math: 0, eng: 0, soc: 0, sci: 0 });
  const [showResult, setShowResult] = useState<boolean>(false);

  // --- 3. DOM要素の型を明示（ここは既に正しくできていましたね！素晴らしいです） ---
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResult]);

  // --- 4. イベントハンドラーの切り出し ---
  const handleShowResult = () => {
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#333] p-2 sm:p-5 font-sans">
      <div className="max-w-[750px] mx-auto bg-white p-5 sm:p-[30px] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h1 className="text-center text-[#0b2046] text-2xl font-bold mb-1">学部別 合否判定シミュレーター</h1>
        <div className="text-center text-[#d32f2f] text-sm font-bold mb-5">※令和8年度 最新版</div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-3 sm:px-4 text-[13px] text-[#555] leading-relaxed mb-6">
          <strong>【入力時の注意点】</strong><br />
          二次試験の点数は、<strong>素点（例：理系数学なら200点満点、英語なら150点満点）</strong>で入力してください。入力された得点率をもとに、各学部の独自配点（例：理学部数学なら300点満点）へ自動で換算して合否判定を行います。
        </div>

        <ScoreInput 
          course={course} setCourse={setCourse}
          ctScores={ctScores} setCtScores={setCtScores}
          nijiScores={nijiScores} setNijiScores={setNijiScores}
        />

        <button 
          className="block w-full p-4 bg-[#0b2046] text-white text-lg font-bold border-none rounded-lg cursor-pointer transition-opacity hover:opacity-90 mt-3"
          onClick={handleShowResult}
        >
          結果を見る
        </button>

        {/* スクロール先の目印 */}
        <div ref={resultRef}>
          {showResult && (
            <Result course={course} ctScores={ctScores} nijiScores={nijiScores} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;