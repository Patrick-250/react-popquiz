import React, { useReducer } from "react";
import Question from "./Question";
import data from "../data";

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
      };
    case "SELECT_ANSWER":
      const isCorrect = action.payload.isCorrect;
      return {
        ...state,
        selectedAnswer: action.payload.answer,
        isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };
    case "SUBMIT_QUIZ":
      return {
        ...state,
        isSubmitted: true,
      };
    default:
      return state;
  }
};

// Define the initial state using the imported data
const initialState = {
  questions: data,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isCorrect: null,
  score: 0,
  isSubmitted: false,
};

const Quiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentQuestion = state.questions[state.currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    dispatch({ type: "SELECT_ANSWER", payload: { answer, isCorrect } });
  };

  if (state.isSubmitted) {
    return (
      <div>
        Your score is {state.score} out of {state.questions.length}
      </div>
    );
  }

  const submitButtonStyle = {
    backgroundColor: "#4CAF50" /* Green background */,
    border: "none" /* Remove borders */,
    color: "white" /* White text */,
    padding: "15px 32px" /* Some padding */,
    textAlign: "center" /* Centered text */,
    textDecoration: "none" /* Remove underline */,

    fontSize: "16px" /* Increase font size */,

    cursor: "pointer" /* Pointer/hand icon */,
    borderRadius: "12px" /* Rounded corners */,
    transitionDuration: "0.4s" /* Transition effect */,
  };

  const submitButtonHoverStyle = {
    backgroundColor: "white" /* White background on hover */,
    color: "black" /* Black text on hover */,
    border: "2px solid #4CAF50" /* Green border on hover */,
  };

  return (
    <div className="quiz">
      <div>
        <div className="score">
          Question {state.currentQuestionIndex + 1}/{state.questions.length}
        </div>
        <Question
          question={currentQuestion}
          selectedAnswer={state.selectedAnswer}
          isCorrect={state.isCorrect}
          onAnswerClick={handleAnswerClick}
        />
        {state.currentQuestionIndex < state.questions.length - 1 ? (
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        ) : (
          <div
            className="submit-button"
            style={submitButtonStyle}
            onMouseOver={(e) =>
              Object.assign(e.target.style, submitButtonHoverStyle)
            }
            onMouseOut={(e) => Object.assign(e.target.style, submitButtonStyle)}
            onClick={() => dispatch({ type: "SUBMIT_QUIZ" })}
          >
            Submit
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
