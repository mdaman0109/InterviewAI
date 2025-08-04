// Footer.jsx
const Footer = () => {
  return (
    <footer className="w-full text-center py-4 px-3 sm:py-6 sm:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-lg leading-tight sm:text-xl sm:leading-normal md:text-2xl lg:text-3xl pt-6 font-semibold tracking-tight">
        Developed by{" "}
        <span className="text-teal-300 drop-shadow-md font-bold hover:text-red-400 transition-colors duration-200">
          Md Aman
        </span>{" "}
        <span className="text-base sm:text-lg">🙏</span>
      </div>

      <div className="mt-2 text-xs leading-relaxed sm:text-sm sm:mt-3 md:text-base text-gray-300">
        <span className="block sm:inline">Powered by </span>
        <span className="inline-flex flex-wrap justify-center gap-1 sm:gap-2">
          <span className="text-blue-400">React</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-violet-400">Tailwind</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-cyan-400">GPT</span>
        </span>
      </div>

      <div className="mt-1 text-xs sm:mt-2 sm:text-xs text-gray-400">
        © {new Date().getFullYear()} InterviewerAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
