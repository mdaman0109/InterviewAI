const Footer = () => {
  return (
    <footer className="w-full text-center py-6 px-4 sm:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight sm:leading-snug pt-4">
        Developed by{" "}
        <span className="text-teal-300 drop-shadow-md font-bold hover:text-red-400 transition-colors duration-200">
          Md Aman
        </span>{" "}
        <span className="text-base sm:text-lg">🙏</span>
      </div>

      <div className="mt-3 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
        <span className="block sm:inline">Powered by </span>
        <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
          <span className="text-blue-400">React</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-violet-400">Tailwind</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-cyan-400">GPT</span>
        </span>
      </div>

      <div className="mt-2 text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} InterviewerAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
