import { useEffect, useState } from "react";
import Submitting from "./Submitting";
import { useUser } from "../context/userContext";
import SubmitSuccess from "./SubmitSucess";
import Error from "./Error";
import { useLocation } from "react-router-dom";

import Loading from "./Loading";
import TestAnalysis from "./TestAnalysis";
import QuizInterface from "./QuizInterface";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_KEY;

const QuestionGenerator = ({ skills }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const {user}=useUser()
  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };





  useEffect(() => {
    if (questions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, questions]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

//qstns
  useEffect(() => {
    const generateQuestions = async () => {
      if (!skills || skills.length === 0) return;

      const combinedSkills = skills.join(", ");
      const prompt = `
You are a question generation engine.
Generate exactly 30 multiple-choice questions (MCQs) of total year of experience ${user.experience}that test knowledge of the following skills: ${combinedSkills}.
Only include Hard and very Hard level questions.
Each question must have:
- "question": The question string
- "options": An object with keys A, B, C, D
- "answer": The correct option letter (A-D)
- "difficulty": Either "Medium" or "Hard"
- "skills": An array of skills the question relates to
Return the response as a valid JSON array of exactly 30 objects.
      `;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
          }),
        });

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) throw new Error("No content returned from OpenAI");

        const cleaned = content.replace(/```json|```/g, "").trim();
        let parsed;
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          throw new Error("Invalid JSON format from OpenAI");
        }

        if (!Array.isArray(parsed)) {
          throw new Error("Expected a JSON array of questions");
        }

        setQuestions(parsed.slice(0, 25));
      } catch (err) {
        setError("Failed to generate questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    generateQuestions();
  }, [skills]);

 
useEffect(() => {
    if (location.pathname !== "/generate") {
      setShowAnalysis(false);
      setSubmitted(false);
      setQuestions([])
    }
  }, [location]);

  if (error) {
  return (<Error error={error}/>
  );
}



  if (loading) {
    return (
      <Loading/>
    );
  }

 
  if (submitting) {
    return (<Submitting/>
    );
  }

  if (submitted && !showAnalysis) {
    return <SubmitSuccess setShowAnalysis={setShowAnalysis} />;
    
  }


if (showAnalysis) {
  const skillPerformance = {};
  questions.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.answer;
    q.skills.forEach((skill) => {
      if (!skillPerformance[skill]) skillPerformance[skill] = { correct: 0, total: 0 };
      if (isCorrect) skillPerformance[skill].correct += 1;
      skillPerformance[skill].total += 1;
    });
    
  });

  return (
     <TestAnalysis
      skillPerformance={skillPerformance}
      questions={questions}
      userAnswers={userAnswers}
    />
  );
}


return (
  <QuizInterface
      questions={questions}
      userAnswers={userAnswers}
      setUserAnswers={setUserAnswers}
      timeLeft={timeLeft}
      formatTime={formatTime}
      handleSubmit={handleSubmit}
    />
    
);
};

export default QuestionGenerator;
