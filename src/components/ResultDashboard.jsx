// ResultDashboard Component
function ResultDashboard({ questions, answers }) {
  const [showDetails, setShowDetails] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = () => {
    if (percentage >= 80) return 'Excellent performance! 🎉';
    if (percentage >= 60) return 'Good job! Room for improvement. 👍';
    return 'Keep practicing! You can do better. 💪';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Quiz Results
      </h2>

      <div className="text-center mb-8">
        <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </div>
        <div className="text-lg text-gray-600 mb-2">
          {score} out of {questions.length} correct
        </div>
        <div className="text-lg font-medium">
          {getPerformanceMessage()}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Detailed Results'}
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Question Breakdown:</h3>
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={index} className="border rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium">Q{index + 1}:</span>
                  <span className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                
                <p className="mb-3 text-gray-700">{question.question}</p>
                
                <div className="text-sm">
                  <div className="mb-1">
                    <span className="font-medium">Your answer: </span>
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {userAnswer !== undefined ? question.options[userAnswer] : 'No answer'}
                    </span>
                  </div>
                  
                  {!isCorrect && (
                    <div>
                      <span className="font-medium">Correct answer: </span>
                      <span className="text-green-600">
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
  
}
export default ResultDashboard;

