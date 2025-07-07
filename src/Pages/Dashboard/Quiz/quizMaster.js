import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { mcqsData } from "./mcqsData";
import { useAuthContext } from "../../../context/AuthContext";

export default function QuizMaster() {
  const { subject: routeSubject } = useParams();
  const subject = decodeURIComponent(routeSubject || "");
  const questions = mcqsData[subject] || [];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const { ThemeToggle } = useAuthContext();

  const handleOptionClick = (opt) => setSelected(opt);

  const handleNext = () => {
    const isCorrect = selected === questions[currentQ].correctAnswer;
    setUserAnswers([...userAnswers, { question: questions[currentQ].question, selected, correctAnswer: questions[currentQ].correctAnswer }]);
    if (isCorrect) setScore(score + 1);
    setSelected(null);
    setCurrentQ(currentQ + 1);
  };

  const handleSubmit = () => {
    const isCorrect = selected === questions[currentQ].correctAnswer;
    setUserAnswers([...userAnswers, { question: questions[currentQ].question, selected, correctAnswer: questions[currentQ].correctAnswer }]);
    if (isCorrect) setScore(score + 1);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setSubmitted(false);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl card-bg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center w-full">
            {subject} Quiz
          </h1>
          <div className="absolute top-6 right-6 hidden">
            <ThemeToggle />
          </div>
        </div>

        {questions.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No MCQs found for this subject.
          </p>
        ) : !submitted ? (
          <>
            <div>
              <h2 className="text-lg font-semibold heading-color mb-4">
                Q{currentQ + 1}: {questions[currentQ].question}
              </h2>
              <ul className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                  <li
                    key={idx}
                    className={`p-3 rounded-lg border border-blue-600 cursor-pointer transition ${selected === opt
                      ? "bg-green-600 text-white border "
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                      }`}
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right">
              {currentQ < questions.length - 1 ? (
                <button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
                  onClick={handleNext}
                  disabled={!selected}
                >
                  Next
                </button>
              ) : (
                <button
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
                  onClick={handleSubmit}
                  disabled={!selected}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
              🎉 Quiz Completed!
            </h2>
            <p className="text-lg text-gray-800 dark:text-white mb-4">
              Your Score: <span className="font-semibold">{score}</span> / {questions.length}
            </p>
            <div className="text-left space-y-4">
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-white dark:bg-gray-800"
                >
                  <p className="font-medium">Q{index + 1}: {answer.question}</p>
                  <p className={`${answer.selected === answer.correctAnswer ? "text-green-600" : "text-red-500"}`}>
                    Your Answer: {answer.selected}
                  </p>
                  {answer.selected !== answer.correctAnswer && (
                    <p className="text-green-600">Correct Answer: {answer.correctAnswer}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
              onClick={resetQuiz}
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
