import { HelpCircle, Radio, Type, Users, List, CheckSquare, Star, User } from "lucide-react";

const FixedQuestionBar: React.FC<{
  handleAddQuestion: (
    type:
      | "single-choice"
      | "multi-choice"
      | "open-ended"
      | "yes-no-notsure"
      | "competitor-choice"
      | "rating"
      | "ranking"
  ) => void;
  submitting?: boolean;
}> = ({ handleAddQuestion }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start gap-3">
      
      {/* Ranking Question */}
      <button
        type="button"
        onClick={() => handleAddQuestion("ranking")}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition transform hover:scale-105 text-sm"
      >
        <List className="w-4 h-4 mr-2" /> Rank Choice
      </button>

      {/* Multi Choice */}
      <button
        type="button"
        onClick={() => handleAddQuestion("multi-choice")}
        className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105 text-sm"
      >
        <CheckSquare className="w-4 h-4 mr-2" /> Multi Choice
      </button>

      {/* Single Choice */}
      <button
        type="button"
        onClick={() => handleAddQuestion("single-choice")}
        className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105 text-sm"
      >
        <Radio className="w-4 h-4 mr-2" /> Single Choice
      </button>

      {/* Open-Ended */}
      <button
        type="button"
        onClick={() => handleAddQuestion("open-ended")}
        className="flex items-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition transform hover:scale-105 text-sm"
      >
        <Type className="w-4 h-4 mr-2" /> Open-Ended
      </button>

      {/* Yes/No/Not Sure */}
      <button
        type="button"
        onClick={() => handleAddQuestion("yes-no-notsure")}
        className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition transform hover:scale-105 text-sm"
      >
        <HelpCircle className="w-4 h-4 mr-2" /> Yes/No/Not Sure
      </button>

      {/* Competitor Choice */}
      <button
        type="button"
        onClick={() => handleAddQuestion("competitor-choice")}
        className="flex items-center px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition transform hover:scale-105 text-sm"
      >
        <User className="w-4 h-4 mr-2" /> Competitor Question
      </button>

      {/* Rating */}
      <button
        type="button"
        onClick={() => handleAddQuestion("rating")}
        className="flex items-center px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg shadow hover:bg-rose-600 transition transform hover:scale-105 text-sm"
      >
        <Star className="w-4 h-4 mr-2" /> Rating
      </button>

    </div>
  </div>
);

export default FixedQuestionBar;
