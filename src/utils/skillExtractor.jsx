import { useUser } from "../context/userContext";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_KEY;

export const extractSkills = async (text) => {
  
  try {
    
    const prompt = `
Extract only programming and tech-related skills from the following resume text. 
Return them as a clean array of unique skill names. Don't include soft skills or duplicates.

Resume Text:
${text}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    const skills = content
      ?.match(/"([^"]+)"|'([^']+)'|`([^`]+)`|(\b[\w.+#-]+\b)/g)
      ?.map((s) => s.replace(/^["'`]|["'`]$/g, ""))
      ?.filter((s, i, arr) => arr.indexOf(s) === i);

    return skills; 
  } catch (err) {
    console.error("AI skill extraction failed, using fallback:", err);
    const { user, setUser } = useUser();
     setUser((prev) => ({
    ...prev,
    error: "AI Resume Extraction Failed! Try again🫡",
  }));
  }
};