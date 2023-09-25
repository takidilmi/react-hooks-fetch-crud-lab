import React from "react";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  function hundleDelete(deletedQuiz) {
    const updatedQuiz = questions.filter((question) => question.id !== deletedQuiz.id);
    setQuestions(updatedQuiz);
  }

  useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then((res)=> res.json())
  .then((data)=>setQuestions(data))
  
  }, []);

  const quiz = questions.map((question) =>(
    <QuestionItem key={question.id} question={question} onDeleteItem={hundleDelete}/>
  ))
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quiz}</ul>
    </section>
  );
}

export default QuestionList;