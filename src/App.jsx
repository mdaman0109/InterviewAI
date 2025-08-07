import Home from "./components/Home"
import ResumeWatcher from "./components/ResumeWatcher";
import { UserProvider } from "./context/userContext";
function App() {
  return(

    <UserProvider>
      <Home/>
      <ResumeWatcher />
    </UserProvider>
)
}

export default App;