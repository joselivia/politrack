"use client";

import React, { useReducer, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  X,
  Upload,
  Megaphone,
  Send,

} from "lucide-react";
import { baseURL } from "@/config/baseUrl";
import FixedQuestionBar from "./fixedbarButtons";
import {handleAddQuestion } from "./handlebutton";
import { DynamicQuestionSection } from "./DynamicQuestions";
export interface Aspirant {
  name: string;
  party: string;
  profileFile: File | null;
}

interface GenericOption {
  id?: string | number;
  text: string;
}
export interface RatingQuestion {
  id: string | number;
  type: "rating";
  questionText: string;
  scale: number;
}

export interface SingleChoiceQuestion {
  id: string | number;
  type: "single-choice";
  questionText: string;
  options: GenericOption[];
  isCompetitorQuestion?: boolean;
}

export interface OpenEndedQuestion {
  id: string | number;
  type: "open-ended";
  questionText: string;
}

export interface YesNoNotSureQuestion {
  id: string | number;
  type: "yes-no-notsure";
  questionText: string;
  fixedOptions: string[];
}
export interface MultiChoiceQuestion {
  id: string | number;
  type: "multi-choice";
  questionText: string;
  options: GenericOption[];
}
export interface RankingQuestion {
  id: string | number;
  type: "ranking";
  questionText: string;
  options: { id?: number; text: string }[];
}


export type PollQuestion =
  | SingleChoiceQuestion
  | OpenEndedQuestion
  | YesNoNotSureQuestion
  | MultiChoiceQuestion
  | RankingQuestion
  | RatingQuestion;

type State = {
  pollId: string | null;
  mainAspirants: Aspirant[];
  dynamicQuestions: PollQuestion[];
  message: string;
  submitting: boolean;
};

export type Action =
  | { type: "SET_POLL_ID"; payload: string | null }
  | { type: "ADD_ASPIRANT" }
  | { type: "LOAD_QUESTIONS"; payload: any[] }
  | { type: "REMOVE_ASPIRANT"; payload: number }
  | {
      type: "UPDATE_ASPIRANT";
      payload: {
        index: number;
        field: keyof Aspirant;
        value: string | File | null;
      };
    }
  | { type: "ADD_QUESTION"; payload: PollQuestion }
  | { type: "REMOVE_QUESTION"; payload: string }
  | { type: "UPDATE_QUESTION_TEXT"; payload: { id: string; newText: string } }
  | { type: "ADD_OPTION"; payload: string }
  | {
      type: "REMOVE_OPTION";
      payload: { questionId: string; optionIndex: number };
    }
  | {
      type: "UPDATE_OPTION";
      payload: { questionId: string; optionIndex: number; newText: string };
    }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" }
  | { type: "ADD_ASPIRANT_TO_QUESTION"; payload: { questionId: string } }
  | {
      type: "REMOVE_ASPIRANT_FROM_QUESTION";
      payload: { questionId: string; index: number };
    }
  | {
      type: "UPDATE_ASPIRANT_IN_QUESTION";
      payload: {
        questionId: string;
        index: number;
        field: keyof Aspirant;
        value: string | File | null;
      };
    }
  | { type: "UPDATE_RATING_SCALE"; payload: { id: string; scale: number } };

// --- Reducer Function ---
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_POLL_ID":
      return { ...state, pollId: action.payload };

    case "ADD_ASPIRANT":
      return {
        ...state,
        mainAspirants: [
          ...state.mainAspirants,
          { name: "", party: "", profileFile: null },
        ],
        message: "",
      };
case "LOAD_QUESTIONS":
  const mappedQuestions = action.payload.map((q: any) => {
     const optionsMapped = q.options?.map((opt: any) => {
      return { 
        id: opt.id,
        text: opt.optionText || opt.text || "" 
      };
    }) || [];

    // Keep ID as number for proper backend comparison
    return {
      id: q.id,
      questionText: q.questionText,
      type: q.type,
      isCompetitorQuestion: !!q.isCompetitorQuestion,
      options: optionsMapped,
      scale: q.type === 'rating' ? (optionsMapped[0]?.text ? parseInt(optionsMapped[0].text) : 5) : undefined,
      fixedOptions: q.type === 'yes-no-notsure' ? optionsMapped.map((o: any) => o.text) : undefined
    };
  });

  return {
    ...state,
    dynamicQuestions: mappedQuestions,
  };

    case "REMOVE_ASPIRANT":
      if (state.mainAspirants.length <= 1) {
        return {
          ...state,
          message: "⚠️ You must have at least one aspirant.",
        };
      }
      const newAspirants = state.mainAspirants.filter(
        (_, i) => i !== action.payload
      );
      return { ...state, mainAspirants: newAspirants, message: "" };

    case "UPDATE_ASPIRANT":
      const updatedAspirants = state.mainAspirants.map((asp, i) =>
        i === action.payload.index
          ? { ...asp, [action.payload.field]: action.payload.value }
          : asp
      );

      // Also update competitor-choice questions
      const updatedQuestionsForAspirantChange = state.dynamicQuestions.map(
        (q) => {
          if (q.type === "single-choice" && q.isCompetitorQuestion) {
            const newOptions = updatedAspirants.map((asp) => ({
              text: asp.name,
            }));
            return { ...q, options: newOptions };
          }
          return q;
        }
      );

      return {
        ...state,
        mainAspirants: updatedAspirants,
        dynamicQuestions: updatedQuestionsForAspirantChange,
      };

    case "ADD_QUESTION":
      return {
        ...state,
        dynamicQuestions: [...state.dynamicQuestions, action.payload],
        message: "",
      };

    case "REMOVE_QUESTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.filter(
          (q) => q.id !== action.payload
        ),
      };

    case "UPDATE_QUESTION_TEXT":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) =>
          q.id === action.payload.id
            ? { ...q, questionText: action.payload.newText }
            : q
        ),
      };

    case "ADD_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (
            (q.id === action.payload &&
              q.type === "single-choice" &&
              !q.isCompetitorQuestion) ||
            (q.id === action.payload && q.type === "multi-choice") ||
            (q.id === action.payload && q.type === "ranking")
          ) {
            return {
              ...q,
              options: [...q.options, { text: "" }],
            };
          }
          return q;
        }) as PollQuestion[],
      };

    case "REMOVE_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (
            (q.id === action.payload.questionId &&
              q.type === "single-choice" &&
              !q.isCompetitorQuestion) ||
            (q.id === action.payload.questionId && q.type === "multi-choice") ||
            (q.id === action.payload.questionId && q.type === "ranking")
          ) {
            if (q.options.length <= 1) {
              return q;
            }
            return {
              ...q,
              options: q.options.filter(
                (_, i) => i !== action.payload.optionIndex
              ),
            };
          }
          return q;
        }) as PollQuestion[],
      };

    case "UPDATE_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (
            (q.id === action.payload.questionId &&
              q.type === "single-choice" &&
              !q.isCompetitorQuestion) ||
            (q.id === action.payload.questionId && q.type === "multi-choice") ||
            (q.id === action.payload.questionId && q.type === "ranking")
          ) {
            const updatedOptions = [...q.options];
            const existingOption = updatedOptions[action.payload.optionIndex];
            updatedOptions[action.payload.optionIndex] = {
              ...existingOption,
              text: action.payload.newText,
            };
            return { ...q, options: updatedOptions };
          }
          return q;
        }) as PollQuestion[],
      };
    case "UPDATE_RATING_SCALE":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) =>
          q.id === action.payload.id ? { ...q, scale: action.payload.scale } : q
        ),
      };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "SET_SUBMITTING":
      return { ...state, submitting: action.payload };

    case "RESET_FORM":
      return {
        ...state,
        mainAspirants: [{ name: "", party: "", profileFile: null }],
        dynamicQuestions: [],
        message: "",
      };

    default:
      return state;
  }
};

export const initialState: State = {
  pollId: null,
  mainAspirants: [{ name: "", party: "", profileFile: null }],
  dynamicQuestions: [],
  message: "",
  submitting: false,
};

const CreateQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const hasCompetitorQuestion = state.dynamicQuestions.some(
    (q) =>
      q.type === "single-choice" &&
      (q as SingleChoiceQuestion).isCompetitorQuestion
  );

  useEffect(() => {
    const id = searchParams.get("pollId");
    if (id) {
      dispatch({ type: "SET_POLL_ID", payload: id });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload: "❌ No poll ID provided. Redirecting...",
      });
      setTimeout(() => router.push("/Admin/create-poll"), 1500);
    }
  }, [searchParams, router]);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTING", payload: true });
    dispatch({ type: "SET_MESSAGE", payload: "" });

    // Validation
    if (!state.pollId) {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Poll ID is missing." });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    if (
      hasCompetitorQuestion &&
      state.mainAspirants.some((comp) => !comp.name.trim())
    ) {
      dispatch({
        type: "SET_MESSAGE",
        payload:
          "❌ Please fill in all aspirant names for competitor questions.",
      });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    const dynamicQuestionsValid = state.dynamicQuestions.every((q) => {
      if (!q.questionText.trim()) return false;
      if (
        q.type === "single-choice" &&
        !q.isCompetitorQuestion &&
        q.options.some((opt) => !opt.text.trim())
      )
        return false;
      return true;
    });

    if (!dynamicQuestionsValid) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "❌ Please ensure all questions and options are filled out.",
      });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    const formData = new FormData();
    formData.append("pollId", state.pollId);
    formData.append(
      "mainCompetitors",
      JSON.stringify(
        state.mainAspirants.map(({ name, party }) => ({ name, party }))
      )
    );

    state.mainAspirants.forEach((aspirant, index) => {
      if (aspirant.profileFile) {
        formData.append(`mainProfile-${index}`, aspirant.profileFile);
      }
    });

    const dynamicQuestionsForBackend = state.dynamicQuestions.map((q) => {
      // Parse ID as number if it exists and is a string
      const numericId = q.id ? (typeof q.id === 'string' ? parseInt(q.id, 10) : q.id) : undefined;
      
      if (q.type === "single-choice" || q.type === "multi-choice") {
        return {
          id: numericId,
          type: q.type,
          questionText: q.questionText,
          options: q.options.map((opt) => opt.text),
          isCompetitorQuestion:
            q.type === "single-choice" &&
            (q as SingleChoiceQuestion).isCompetitorQuestion
              ? true
              : false,
        };
      } else if (q.type === "rating") {
        return {
          id: numericId,
          type: q.type,
          questionText: q.questionText,
          scale: q.scale,
        };
      } else if (q.type === "yes-no-notsure") {
        return {
          id: numericId,
          type: q.type,
          questionText: q.questionText,
          options: q.fixedOptions,
        };
      } else if (q.type === "ranking") {
        return {
          id: numericId,
          type: q.type,
          questionText: q.questionText,
          options: q.options.map((opt) => opt.text),
        };
      }
      return { ...q, id: numericId };
    });

    formData.append(
      "dynamicPollQuestions",
      JSON.stringify(dynamicQuestionsForBackend)
    );

    try {
      const response = await fetch(`${baseURL}/api/polls/createQuiz`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        dispatch({
          type: "SET_MESSAGE",
          payload: "✅ Poll questions and aspirants saved successfully!",
        });
        setTimeout(() => router.push(`/Admin/OpinionResponse`), 1000);
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SET_MESSAGE",
          payload: `❌ Failed to save quiz data: ${
            errorData.message || response.statusText
          }`,
        });
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      dispatch({
        type: "SET_MESSAGE",
        payload: "❌ Network or server error. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  // --- JSX Rendering ---
  if (!state.pollId && !state.message.includes("No poll ID provided")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-xl text-gray-700">Loading poll details...</p>
      </div>
    );
  }
  
const isFormValid = () => {
  // Check if there are questions
  if (state.dynamicQuestions.length === 0) return false;

  // Check all questions have text
  for (const q of state.dynamicQuestions) {
    if (!q.questionText.trim()) return false;

    if (
      (q.type === "single-choice" || q.type === "multi-choice") &&
      !(q as SingleChoiceQuestion).isCompetitorQuestion &&
      q.options.some((opt) => !opt.text.trim())
    ) {
      return false;
    }
  }

  // Check all competitor names are filled if needed
  const hasCompetitorQuestion = state.dynamicQuestions.some(
    (q) =>
      q.type === "single-choice" &&
      (q as SingleChoiceQuestion).isCompetitorQuestion
  );

  if (hasCompetitorQuestion && state.mainAspirants.some((asp) => !asp.name.trim())) {
    return false;
  }

  return true;
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex justify-center">
        <Megaphone className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />
        Add Your Question of Choice
      </h2>
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        {state.message.includes("No poll ID provided") ? (
          <p className="text-center mt-6 font-medium text-red-600">
            {state.message}
          </p>
        ) : (
   <form onSubmit={handleSubmit} className="space-y-6 pb-28">
  {state.dynamicQuestions.map((question, index) => (
    <DynamicQuestionSection
      key={question.id}
      question={question}
      index={index}
      dispatch={dispatch}
      mainAspirants={state.mainAspirants}
    />
  ))}

  <div className="flex justify-center items-center bottom-0">
    <button
      type="submit"
      disabled={state.submitting || !isFormValid()}
      className={`flex items-center justify-center px-6 py-3 text-lg font-bold rounded-lg shadow-xl transition transform hover:scale-105 w-full sm:w-auto ${
        state.submitting
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
      }`}
    >
      {state.submitting ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Submitting Poll...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 " /> Submit Survey
        </div>
      )}
    </button>
  </div>
</form>

        )}

           
        <FixedQuestionBar
  handleAddQuestion={(type) => handleAddQuestion(type, dispatch, state.mainAspirants)}
  submitting={state.submitting}
/>
        {state.message && (
          <p
            className={`text-center mt-6 font-medium ${
              state.message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
};

export const AspirantSection: React.FC<{
  aspirants: Aspirant[];
  dispatch: React.Dispatch<Action>;
}> = ({ aspirants, dispatch }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
      Aspirants for Main Poll
    </h3>
    <div className="space-y-4">
      {aspirants.map((comp, index) => (
        <div
          key={index}
          className="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50"
        >
          {aspirants.length > 1 && (
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "REMOVE_ASPIRANT", payload: index })
              }
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full bg-white shadow-sm"
              title="Remove aspirant"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Aspirant {index + 1}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor={`main-comp-name-${index}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`main-comp-name-${index}`}
                value={comp.name}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ASPIRANT",
                    payload: { index, field: "name", value: e.target.value },
                  })
                }
                placeholder="Aspirant Name"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`main-comp-party-${index}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Party
              </label>
              <input
                type="text"
                id={`main-comp-party-${index}`}
                value={comp.party}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ASPIRANT",
                    payload: { index, field: "party", value: e.target.value },
                  })
                }
                placeholder="Party Affiliation/Independent"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor={`main-profile-file-${index}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Profile Image
              </label>
              <label
                htmlFor={`main-profile-file-${index}`}
                className="flex items-center justify-center w-full p-2 border rounded-md bg-white cursor-pointer hover:bg-gray-100 transition text-gray-700 text-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                {comp.profileFile ? comp.profileFile.name : "Choose File"}
              </label>
              <input
                type="file"
                id={`main-profile-file-${index}`}
                accept="image/*"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ASPIRANT",
                    payload: {
                      index,
                      field: "profileFile",
                      value: e.target.files ? e.target.files[0] : null,
                    },
                  })
                }
                className="hidden"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-4">
      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ASPIRANT" })}
        className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" /> Add Aspirant
      </button>
    </div>
  </div>
);



export default CreateQuiz;
