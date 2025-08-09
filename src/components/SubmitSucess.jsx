const SubmitSuccess = ({ setShowAnalysis }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 bg-slate-900 text-white text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-4">
        ✅ Quiz Submitted!
      </h2>
      <p className="text-gray-300 mb-6 text-sm sm:text-base">
        Your responses have been recorded.
      </p>
      <button
        onClick={() => setShowAnalysis(true)}
        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded shadow-md transition text-sm sm:text-base"
      >
        Analyse Your Test
      </button>
    </div>
  );
};

export default SubmitSuccess;
