import { CARD_OPTIONS } from '../constants/Letter.constants';

export default function LetterTypeStep({ selected, onSelect }: { selected: number; onSelect: (idx: number) => void }) {
  return (
    <div>
      <h3 className="text-blue-400 font-semibold mb-1">Step 1.</h3>
      <h2 className="text-xl font-bold mb-6 text-white">Letter Type</h2>
      <div className="grid grid-cols-3 gap-4">
        {CARD_OPTIONS.map((label, idx) => (
          <button
            key={label}
            className={`border-2 rounded-lg pl-5 pr-3 py-[2px] h-[78px] text-left text-[#A2A2A2] transition-all ${
              selected === idx ? 'border-[#41A5DB] bg-black/40' : 'border-gray-600 bg-black/20'
            } flex items-center justify-between`}
            onClick={() => onSelect(idx)}
          >
            <span>
              {label.split(' Fee')[0]}
              <br />
              <span className="text-sm text-gray-400">Fee Letter</span>
            </span>
            <span
              className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white ${
                selected === idx ? 'border-blue-400' : 'border-gray-600'
              }`}
            >
              {selected === idx && <span className="w-3 h-3 bg-blue-400 rounded-full block" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
