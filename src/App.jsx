import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ResumeWatcher from "./components/ResumeWatcher";
import QuestionGenerator from "./components/QuestionGenerator";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuestionGenerator />} />
          </Routes>
          <ResumeWatcher />
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
