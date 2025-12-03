"use client";
import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/config/baseUrl";
import { Megaphone, Loader2, ArrowLeft } from "lucide-react";
import {  initialState, reducer } from "../../CreateQuestions";
import FixedQuestionBar from "../../fixedbarButtons";
import { handleAddQuestion } from "../../handlebutton";
import { DynamicQuestionSection } from "../../DynamicQuestions";

interface BackendOption {
  id: number;
  optionText: string;
}

interface BackendQuestion {
  id: number;
  type: string;
  questionText: string;
  isCompetitorQuestion?: boolean;
  options?: BackendOption[];
}

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: pollId } = React.use(params);
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!pollId) {
    router.push("/Admin/OpinionResponse");
    return;
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`${baseURL}/api/polls/${pollId}`);
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "SET_MESSAGE", payload: "❌ Failed to load poll." });
        return;
      }
      dispatch({ type: "SET_POLL_ID", payload: pollId });
      const questions = (data.questions || []).map((q: BackendQuestion) => {
        const optionsArray =
          Array.isArray(q.options) && (q.type !== "open-ended")
            ? q.options.map((opt) => ({
                id: String(opt.id),
                optionText: opt.optionText || "",
              }))
            : [];

        return {
          id: String(q.id),
          type: q.type,
          questionText: q.questionText || "",
          isCompetitorQuestion: !!q.isCompetitorQuestion,
          options: optionsArray,
        };
      });

      dispatch({ type: "LOAD_QUESTIONS", payload: questions });
     } catch (err) {
      console.error(err);
      dispatch({
        type: "SET_MESSAGE",
        payload: "❌ Error loading poll. Check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [pollId]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTING", payload: true });

    const formData = new FormData();
    formData.append("pollId", pollId!);
    formData.append("PollQuestions", JSON.stringify(state.dynamicQuestions));

    try {
      const res = await fetch(`${baseURL}/api/polls/updateQuiz/${pollId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "SET_MESSAGE", payload: "❌ Failed to update poll." });
        return;
      }

      dispatch({ type: "SET_MESSAGE", payload: "✅ Poll updated successfully!" });
      setTimeout(() => router.push("/Admin/OpinionResponse"), 1200);
    } catch (err) {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Network error. Try again." });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
       <div></div>  <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-2 py-2 
             rounded-xl bg-blue-400 border border-gray-200 
             font-medium shadow-sm 
             hover:bg-blue-500 mb-4
             transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <h2 className="text-3xl font-bold mb-6 flex justify-center">
        <Megaphone className="mr-3 text-blue-600" /> Edit Poll Questions
      </h2>

      <div className="bg-white p-6 shadow-xl rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6 pb-24">
          {state.dynamicQuestions.map((question, index) => (
            <DynamicQuestionSection
              key={question.id}
              question={question}
              index={index}
              dispatch={dispatch}
              mainAspirants={state.mainAspirants}
            />
          ))}

          <div className="flex justify-center mt-6">
<FixedQuestionBar
  handleAddQuestion={(type) => handleAddQuestion(type, dispatch, state.mainAspirants)}
  submitting={state.submitting}
/>
            <button
              type="submit"
              disabled={state.submitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              {state.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>

        {state.message && (
          <p
            className={`text-center mt-4 font-medium ${
              state.message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
}
