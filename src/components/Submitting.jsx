const Submitting = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-slate-900 z-50 px-4">
      <div className="p-3 animate-spin drop-shadow-xl bg-gradient-to-tr from-green-400 via-teal-500 to-slate-700 rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48">
        <div className="rounded-full h-full w-full bg-slate-900"></div>
      </div>
      <p className="text-white text-base sm:text-lg md:text-xl mt-6 animate-pulse text-center">
        📤 Submitting your quiz...
      </p>
    </div>
  );
};

export default Submitting;
