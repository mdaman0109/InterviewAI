// Quiz Component
function Quiz({ questions, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = [...answers];
    if (selectedOption !== null) {
      finalAnswers.push(selectedOption);
    }
    onComplete(finalAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className="text-lg font-mono text-blue-600">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
          {currentQuestion.category}
        </span>
        <h3 className="text-lg font-medium mb-4">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label 
              key={index}
              className={`flex items-center p-3 border rounded cursor-pointer transition-colors ${
                selectedOption === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedOption === index}
                onChange={() => handleAnswerSelect(index)}
                className="mr-3"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          Progress: {currentQuestionIndex + 1}/{questions.length}
        </div>
        <button
          onClick={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNext}
          disabled={selectedOption === null}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;