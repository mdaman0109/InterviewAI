// components/ResumeWatcher.js
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { readResumeText } from "../utils/pdfReader";
import { extractSkills } from "../utils/skillExtractor";

const ResumeWatcher = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const analyzeResume = async () => {
      if (!user.resumeFile) return;

      try {
        const resumeText = await readResumeText(user.resumeFile);

        const matchedSkills = await extractSkills(resumeText);

        const combinedSkills = Array.from(
          new Set([...user.skills, ...matchedSkills])
        );

        setUser((prev) => ({
          ...prev,
          skills: combinedSkills,
        }));
        console.log("✅ combined:", combinedSkills);

      } catch (error) {
        console.error("Resume analysis failed:", error);
      }
    };

    analyzeResume();
  }, [user.resumeFile]);

  return null;
};

export default ResumeWatcher;
