import { X, Plus } from "lucide-react";
import { Action, Aspirant, AspirantSection, MultiChoiceQuestion, PollQuestion, RankingQuestion, SingleChoiceQuestion, YesNoNotSureQuestion } from "./CreateQuestions";

export const DynamicQuestionSection: React.FC<{
  question: PollQuestion;
  index: number;
  dispatch: React.Dispatch<Action>;
  mainAspirants: Aspirant[];
}> = ({ question, index, dispatch, mainAspirants }) => (
  <div className="relative p-6 border rounded-xl shadow-lg bg-white mb-6">
    <button
      type="button"
      onClick={() =>
        dispatch({ type: "REMOVE_QUESTION", payload: question.id })
      }
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2 rounded-full bg-white shadow-sm"
      title="Remove question"
    >
      <X className="w-6 h-6" />
    </button>
    <h4 className="text-lg font-bold text-gray-800 mb-4">
      {`Additional Question ${index + 1}: `}
      <span className="text-blue-600 capitalize">
        {question.type === "single-choice" &&
        (question as SingleChoiceQuestion).isCompetitorQuestion
          ? "Competitor Choice"
          : question.type.replace("-", " ")}
      </span>
    </h4>
    <div className="mb-4">
      <label
        htmlFor={`dynamic-question-text-${question.id}`}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Question Text <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id={`dynamic-question-text-${question.id}`}
        value={question.questionText}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_QUESTION_TEXT",
            payload: { id: question.id, newText: e.target.value },
          })
        }
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
        placeholder={`Enter your ${question.type.replace(
          "-",
          " "
        )} question here`}
        required
      />
    </div>

    {question.type === "single-choice" &&
      ((question as SingleChoiceQuestion).isCompetitorQuestion ? (
        <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
          <AspirantSection aspirants={mainAspirants} dispatch={dispatch} />
        </div>
      ) : (
        <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
          {(question as SingleChoiceQuestion).options.map((option, oIndex) => (
            <div
              key={oIndex}
              className="relative p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              {(question as SingleChoiceQuestion).options.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_OPTION",
                      payload: { questionId: question.id, optionIndex: oIndex },
                    })
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 rounded-full bg-white shadow-sm"
                  title="Remove option"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <h6 className="text-sm font-medium text-gray-600 mb-2">
                Option {oIndex + 1}
              </h6>
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_OPTION",
                    payload: {
                      questionId: question.id,
                      optionIndex: oIndex,
                      newText: e.target.value,
                    },
                  })
                }
                placeholder="Enter option text"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "ADD_OPTION", payload: question.id })
            }
            className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Option
          </button>
        </div>
      ))}
{question.type === "rating" && (
  <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Rating Scale (1–5)
    </label>

 
  </div>
)}


    {question.type === "multi-choice" && (
      <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
        {(question as MultiChoiceQuestion).options.map((option, oIndex) => (
          <div
            key={oIndex}
            className="relative p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            {(question as MultiChoiceQuestion).options.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_OPTION",
                    payload: { questionId: question.id, optionIndex: oIndex },
                  })
                }
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 rounded-full bg-white shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <h6 className="text-sm font-medium text-gray-600 mb-2">
              Option {oIndex + 1}
            </h6>
            <input
              type="text"
              value={option.text}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_OPTION",
                  payload: {
                    questionId: question.id,
                    optionIndex: oIndex,
                    newText: e.target.value,
                  },
                })
              }
              placeholder="Enter option text"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_OPTION", payload: question.id })}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Option
        </button>
      </div>
    )}

    {question.type === "yes-no-notsure" && (
      <div className="space-y-3 border-t pt-4 mt-4 border-gray-100">
        <div className="flex flex-wrap gap-3">
          {((question as YesNoNotSureQuestion).fixedOptions || []).map(
            (optionText, oIndex) => (
              <span
                key={oIndex}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm text-sm font-medium"
              >
                {optionText}
              </span>
            )
          )}
        </div>
      </div>
    )}


    {question.type === "ranking" && (
  <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
    <p className="text-sm text-gray-600 mb-3">
      Users will drag to rank these items.
    </p>

    {(question as RankingQuestion).options.map((option, oIndex) => (
      <div
        key={oIndex}
        className="relative p-4 border rounded-lg bg-gray-50 shadow-sm"
      >
        <h6 className="text-sm font-medium text-gray-600 mb-2">
          Rank Option {oIndex + 1}
        </h6>
        <input
          type="text"
          value={option.text}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_OPTION",
              payload: {
                questionId: question.id,
                optionIndex: oIndex,
                newText: e.target.value,
              },
            })
          }
          placeholder="Enter option text"
          className="w-full p-2 border rounded-md"
        />
      </div>
    ))}

    <button
      type="button"
      onClick={() =>
        dispatch({ type: "ADD_OPTION", payload: question.id })
      }
      className="flex items-center px-4 py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600"
    >
      <Plus className="w-4 h-4 mr-2" /> Add Rank Item
    </button>
  </div>
)}

  </div>
);