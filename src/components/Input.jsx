import { useUser } from "../context/userContext";
import { useState } from "react";
const Input = () => {
  const { setUser } = useUser();

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);

    const handleSubmit = () => {
    setUser({
        username: name,
        skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
        experience: Number(experience),
        resumeFile: resume,
    });
    };




  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 pt-20 p-8 font-sans">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-teal-300 drop-shadow-md">
          Interview<span className="text-teal-500">AI</span>
        </h1>
        <p className="text-slate-300 mt-2 text-lg font-medium">
          Your intelligent interview companion
        </p>
      </header>

      <main className="flex justify-center pt-8">
        <div className="bg-slate-700 rounded-xl shadow-xl p-10 w-full max-w-md text-white space-y-6">
          <h2 className="text-2xl font-semibold text-center text-teal-200">
            Enter details to start
          </h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600"
            placeholder="Your Name"
          />

          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600"
            placeholder="Skills (comma separated)"
          />

          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-teal-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600"
            placeholder="Years of Experience"
            min="0"
          />

          <div className="space-y-2">
            <label htmlFor="resume" className="text-teal-200 font-medium block">
              Upload your resume
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
            className="w-full mt-4 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-md shadow-md transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default Input;
