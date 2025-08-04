// QuestionGenerator Component
function QuestionGenerator({ resumeText, onGenerated }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateQuestions = () => {
    setIsGenerating(true);
    setError('');

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Extract key skills and experience from resume text
        const skills = extractSkills(resumeText);
        const experience = extractExperience(resumeText);
        
        const questions = generateMockQuestions(skills, experience);
        
        if (questions.length === 0) {
          setError('Could not generate questions from the resume content.');
        } else {
          onGenerated(questions);
        }
      } catch (err) {
        setError('Failed to generate questions. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }, 2000);
  };

  const extractSkills = (text) => {
    const skillKeywords = ['javascript', 'react', 'python', 'java', 'sql', 'html', 'css', 'node', 'mongodb', 'aws', 'docker', 'git'];
    const foundSkills = skillKeywords.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );
    return foundSkills.slice(0, 5); // Limit to 5 skills
  };

  const extractExperience = (text) => {
    const experienceKeywords = ['developer', 'engineer', 'manager', 'analyst', 'designer', 'consultant'];
    const foundRoles = experienceKeywords.filter(role => 
      text.toLowerCase().includes(role.toLowerCase())
    );
    return foundRoles.slice(0, 3); // Limit to 3 roles
  };

  const generateMockQuestions = (skills, experience) => {
    const questionPool = [
      {
        question: "What is the difference between let, const, and var in JavaScript?",
        options: ["Scope and hoisting behavior", "Memory allocation", "Execution speed", "Browser compatibility"],
        correctAnswer: 0,
        category: "Technical"
      },
      {
        question: "Which React hook is used for managing component state?",
        options: ["useEffect", "useState", "useContext", "useCallback"],
        correctAnswer: 1,
        category: "Technical"
      },
      {
        question: "What is the primary purpose of version control systems like Git?",
        options: ["Code compilation", "Track changes and collaboration", "Bug fixing", "Performance optimization"],
        correctAnswer: 1,
        category: "Technical"
      },
      {
        question: "How do you handle conflicts in a team environment?",
        options: ["Avoid them completely", "Listen to all perspectives and find common ground", "Always agree with the senior member", "Let the manager decide"],
        correctAnswer: 1,
        category: "Behavioral"
      },
      {
        question: "Describe your approach to learning new technologies.",
        options: ["Wait for formal training", "Self-study through documentation and practice", "Ask colleagues only", "Avoid new technologies"],
        correctAnswer: 1,
        category: "Behavioral"
      }
    ];

    // Select questions based on skills found in resume
    return questionPool.slice(0, Math.min(5, questionPool.length));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Generate Interview Questions
      </h2>
      
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Resume Summary:</h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {resumeText.substring(0, 200)}...
        </p>
      </div>

      {!isGenerating && (
        <button
          onClick={generateQuestions}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Generate Questions
        </button>
      )}

      {isGenerating && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
          <span>Generating personalized questions...</span>
        </div>
      )}

      {error && (
        <p className="mt-2 text-red-600 text-sm">⚠ {error}</p>
      )}
    </div>
  );
}
export default QuestionGenerator;
