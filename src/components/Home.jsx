import Footer from "./Footer";
import Input from "./Input";
import ErrorMessage from "./Errormessage";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <main className="flex-grow px-4 sm:px-6 py-6 flex flex-col items-center justify-center text-center">
        <Input />
        <div className="mt-4 w-full max-w-md">
          <ErrorMessage />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
