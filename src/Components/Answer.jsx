import React from "react";

const Answer = ({ letter, answer, isSelected, isCorrect, onClick }) => {
  let className = "answer";
  let style = {};

  if (isSelected) {
    className += isCorrect ? " correct" : " incorrect";
    style = isCorrect
      ? { backgroundColor: "green" }
      : { backgroundColor: "red" };
  }

  const handleClick = () => {
    if (!isSelected) {
      alert(isCorrect ? "Correct!" : "Incorrect!");
      onClick();
    }
  };

  return (
    <div className={className} onClick={handleClick} style={style}>
      <div className="answer-letter">{letter}</div>
      <div className="answer-text">{answer}</div>
    </div>
  );
};

export default Answer;
