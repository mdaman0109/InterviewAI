import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ResumeWatcher from "./components/ResumeWatcher";
import QuestionGenerator from "./components/QuestionGenerator";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<QuestionGenerator />} />
        </Routes>
      </Router>
      <ResumeWatcher />
    </UserProvider>
  );
}

export default App;
