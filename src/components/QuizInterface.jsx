import { useUser } from "../context/userContext";

const QuizInterface = ({
  questions,
  userAnswers,
  setUserAnswers,
  timeLeft,
  formatTime,
  handleSubmit,
}) => {
  const { user } = useUser();
  if (questions.length === 0) return null;

  return (
    <div className="h-screen overflow-y-auto bg-slate-950 text-white">
      <div className="sticky top-0 z-10 bg-slate-900 p-4 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl mx-auto gap-4 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold text-teal-400 text-center sm:text-left">
            Welcome {user.username}, All the best! 😀
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-red-400 font-semibold text-base sm:text-lg">
              ⏳ {formatTime(timeLeft)}
            </span>
            <button
              onClick={handleSubmit}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded shadow transition text-sm sm:text-base"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto">
        <ul className="space-y-6 w-full">
          {questions.map((q, index) => (
            <li
              key={index}
              className="bg-slate-800 p-4 rounded-md shadow hover:shadow-lg transition text-sm sm:text-base"
            >
              <p className="font-semibold text-teal-300 mb-3">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {Object.entries(q.options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`block p-2 rounded cursor-pointer border border-slate-700 hover:bg-slate-700 transition ${
                      userAnswers[index] === key ? "bg-teal-600 text-white" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="mr-2 accent-teal-500"
                      name={`q-${index}`}
                      value={key}
                      checked={userAnswers[index] === key}
                      onChange={(e) =>
                        setUserAnswers({ ...userAnswers, [index]: e.target.value })
                      }
                    />
                    <strong>{key}:</strong> {value}
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="pt-4 w-full text-center">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded shadow-md transition text-sm sm:text-base"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
