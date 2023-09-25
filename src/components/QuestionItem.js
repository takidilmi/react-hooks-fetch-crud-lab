import React from "react";
import { useState,useEffect } from "react";

function QuestionItem({ question, onDeleteItem }) {
  const { id, prompt, answers, correctIndex } = question;
  const [newCorrectIndex, setNewCorrectIndex] = useState(correctIndex);


  function handleChange(event) {
    const updatedCorrectIndex = event.target.value;
    setNewCorrectIndex(updatedCorrectIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
    .then((r) => r.json())
    .then(() => updatedCorrectIndex);

  }


  function hundleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(question));
  }
    
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={newCorrectIndex} onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={hundleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;