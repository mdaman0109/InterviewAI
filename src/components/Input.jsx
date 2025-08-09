import { useUser } from "../context/userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Input = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = () => {
    setLoading(true)
    setUser({
      username: name,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      experience: Number(experience),
      resumeFile: resume,
    });
    
    navigate("/generate");
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 pt-16 pb-20 font-sans px-4 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-300 drop-shadow-md">
          Interview<span className="text-teal-500">AI</span>
        </h1>
        <p className="text-slate-300 mt-2 text-base sm:text-lg font-medium">
          Your intelligent interview companion
        </p>
      </header>

      <main className="flex justify-center pt-8">
        <div className="bg-slate-700 rounded-xl shadow-sm shadow-gray-200 p-6 sm:p-10 w-full max-w-md text-white space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-teal-200">
            Enter details to start
          </h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600 text-sm sm:text-base"
            placeholder="Your Name*"
          />

          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600 text-sm sm:text-base"
            placeholder="Skills (comma separated)"
          />

          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600 text-sm sm:text-base"
            placeholder="Years of Experience*"
            min="0"
          />

          <div className="space-y-2">
            <label htmlFor="resume" className="text-teal-200 font-medium block text-left text-sm sm:text-base">
              Upload your resume*
            </label>
            <input
              id="resume"
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full cursor-pointer text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                         file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-md shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default Input;
