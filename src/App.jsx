import React, { useState, useEffect } from "react";
import { questions as allQuestions } from "./config";

const QUESTIONS_PER_PAGE = 18;
const TOTAL_PAGES = 6; // 5 pages of 18, last page 20

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    // shuffle once on load
    setQuestions(shuffle(allQuestions));
  }, []);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const start = page * QUESTIONS_PER_PAGE;
  // for last page, slice to end
  const end = page === TOTAL_PAGES - 1 ? questions.length : start + QUESTIONS_PER_PAGE;
  const pageQuestions = questions.slice(start, end);

  const calculateScoreForPage = () => {
    let score = 0;
    pageQuestions.forEach((q, idx) => {
      if (answers[start + idx] === q.correct) score++;
    });
    return score;
  };

  const calculateTotalScore = () => {
    return questions.reduce(
      (acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0),
      0
    );
  };

  // Final result page
  if (page === TOTAL_PAGES) {
    const totalScore = calculateTotalScore();
    return (
      <div className="min-h-screen flex justify-center items-center bg-soft">
        <div className="bg-secondary p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
          <p className="text-lg mb-6">
            Final Score: {totalScore} out of {questions.length}
          </p>
          <button
            className="px-4 py-2 bg-secondary text-primaryDark rounded-xl hover:bg-primary"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-secondary rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Articoli Italiani quiz
        </h1>

        {pageQuestions.map((q, idx) => (
          <div
            key={start + idx}
            className="mb-4 p-4 border rounded-xl bg-accent"
          >
            <p className="font-medium mb-2">
              {start + idx + 1}. {q.word}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q-${start + idx}`}
                    value={option}
                    checked={answers[start + idx] === option}
                    onChange={(e) =>
                      handleChange(start + idx, e.target.value)
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-xl bg-secondary text-primaryDark hover:bg-primary disabled:opacity-40"
          >
            Precedente
          </button>

          <div className="text-lg font-semibold">
            Risultato per pagina {page + 1}: {calculateScoreForPage()} su {" "}
            {pageQuestions.length}
          </div>

          <button
            disabled={questions.length === 0}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-xl bg-secondary text-primaryDark hover:bg-primary disabled:opacity-40"
          >
            {page === TOTAL_PAGES - 1 ? "Finish" : "Prossimo"}
          </button>
        </div>
      </div>
    </div>
  );
}