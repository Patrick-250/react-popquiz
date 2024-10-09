import React from "react";
import Answer from "./Answer";

const Question = ({ question, selectedAnswer, isCorrect, onAnswerClick }) => {
  if (!question) {
    return <div>Loading...</div>;
  }

  const letters = ["A", "B", "C", "D"];
  const answers = question.incorrectAnswers.concat(question.correctAnswer);

  return (
    <div>
      <div className="question">{question.question}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <Answer
            key={index}
            letter={letters[index]}
            answer={answer}
            isSelected={selectedAnswer === answer}
            isCorrect={answer === question.correctAnswer}
            onClick={() => onAnswerClick(answer)}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
