import { PollQuestion, Aspirant, Action } from "./CreateQuestions";

export const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

export const handleAddQuestion = (
  type:
    | "single-choice"
    | "multi-choice"
    | "open-ended"
    | "yes-no-notsure"
    | "competitor-choice"
    | "rating",
  dispatch: React.Dispatch<Action>,
  mainAspirants: Aspirant[],
  scale?: number
) => {
  const id = generateUniqueId();
  let newQuestion: PollQuestion;

  if (type === "single-choice") {
    newQuestion = { id, type: "single-choice", questionText: "", options: [{ text: "" }] };
  } else if (type === "multi-choice") {
    newQuestion = { id, type: "multi-choice", questionText: "", options: [{ text: "" }] };
  } else if (type === "rating") {
    newQuestion = { id, type: "rating", questionText: "", scale: scale || 10 };
  } else if (type === "open-ended") {
    newQuestion = { id, type: "open-ended", questionText: "" };
  } else if (type === "yes-no-notsure") {
    newQuestion = { id, type: "yes-no-notsure", questionText: "", fixedOptions: ["Yes", "No", "Not Sure"] };
  } else {
    newQuestion = {
      id,
      type: "single-choice",
      questionText: "",
      options: mainAspirants.map((comp) => ({ text: comp.name })),
      isCompetitorQuestion: true,
    };
  }

  dispatch({ type: "ADD_QUESTION", payload: newQuestion });
};
