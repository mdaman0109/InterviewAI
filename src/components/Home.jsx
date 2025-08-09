// Home.jsx
import Footer from "./Footer";
import Input from "./Input";
import ErrorMessage from "./Errormessage";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Input />
      <ErrorMessage/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
