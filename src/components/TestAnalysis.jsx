const TestAnalysis = ({ skillPerformance, questions, userAnswers }) => {

  const totalQuestions = questions.length;
  const correctAnswers = questions.reduce((acc, q, i) => {
    return acc + (userAnswers[i] === q.answer ? 1 : 0);
  }, 0);
  const percentageScore = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <div className="p-4 sm:p-6 bg-slate-900 text-white min-h-screen flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-teal-400 text-center sm:text-left">
        📊 Test Analysis
      </h2>

      <div className="text-center sm:text-left mb-6 text-sm sm:text-base text-gray-300">
        <p>
          🧮 Total Marks: <span className="text-teal-300 font-semibold">{correctAnswers} / {totalQuestions}</span>
        </p>
        <p>
          📈 Percentage: <span className="text-teal-300 font-semibold">{percentageScore}%</span>
        </p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-slate-700 text-sm">
          <thead>
            <tr className="bg-slate-800 text-teal-300">
              <th className="p-2 border border-slate-700">Skill</th>
              <th className="p-2 border border-slate-700">Score</th>
              <th className="p-2 border border-slate-700">Strength</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(skillPerformance).map(([skill, data], i) => {
              const percentage = ((data.correct / data.total) * 100).toFixed(0);
              return (
                <tr key={i} className="hover:bg-slate-800">
                  <td className="p-2 border border-slate-700">{skill}</td>
                  <td className="p-2 border border-slate-700">{percentage}%</td>
                  <td className="p-2 border border-slate-700">
                    {percentage >= 70 ? "💪 Strong" : "⚠️ Weak"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="space-y-4 flex-1">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.answer;
          return (
            <li key={index} className="bg-slate-800 p-4 rounded-md shadow text-sm sm:text-base">
              <p className="font-semibold text-teal-300">
                {index + 1}. {q.question}
              </p>
              <p className="mt-1 text-green-400">
                ✅ Correct Answer: {q.answer} - {q.options[q.answer]}
              </p>
              <p
                className={`mt-1 ${isCorrect ? "text-green-300" : "text-red-400"}`}
              >
                🙋 Your Answer: {userAnswer ? `${userAnswer} - ${q.options[userAnswer]}` : "No answer selected"}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                🧩 Skill: {q.skills.join(", ")}
              </p>
             
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => window.location.href = "/"}
        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded shadow-md transition block text-center mt-6 text-sm sm:text-base"
      >
        ⬅ Go to Home
      </button>
    </div>
  );
};

export default TestAnalysis;
