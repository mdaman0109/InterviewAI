// Home.jsx
import Footer from "./Footer";
import Input from "./Input";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Input />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
