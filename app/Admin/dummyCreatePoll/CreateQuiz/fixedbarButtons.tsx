import { HelpCircle, Radio, Type, Users } from "lucide-react";

const FixedQuestionBar: React.FC<{
  handleAddQuestion: (type: "single-choice" | "multi-choice" | "open-ended" | "yes-no-notsure" | "competitor-choice" | "rating") => void;
  submitting: boolean;
}> = ({ handleAddQuestion}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 w-full sm:w-auto">
        
        <button
  type="button"
  onClick={() => handleAddQuestion("multi-choice")}
  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105 text-sm"
>
  <Radio className="w-4 h-4 mr-2" /> Multi Choice
</button>

        
        <button
          type="button"
          onClick={() => handleAddQuestion("single-choice")}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 text-sm"
        >
          <Radio className="w-4 h-4 mr-2" /> Single Choice
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("open-ended")}
          className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition transform hover:scale-105 text-sm"
        >
          <Type className="w-4 h-4 mr-2" /> Open-Ended
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("yes-no-notsure")}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105 text-sm"
        >
          <HelpCircle className="w-4 h-4 mr-2" /> Yes/No/Not Sure
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("competitor-choice")}
          className="flex items-center justify-center px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition transform hover:scale-105 text-sm"
        >
          <Users className="w-4 h-4 mr-2" /> Competitor Question
        </button>
<button
  type="button"
  onClick={() => handleAddQuestion("rating")}
  className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
>
  ⭐ Add Rating Question
</button>

      </div>

 
    </div>
  </div>
);
export default FixedQuestionBar;