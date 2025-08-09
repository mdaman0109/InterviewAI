const Error = ({ error }) => {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6">
      <p className="text-teal-400 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        {error}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-teal-500 hover:bg-teal-600 text-white font-medium sm:font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded shadow-md transition duration-300 text-sm sm:text-base"
      >
        🔄 Retry
      </button>
    </div>
  );
};

export default Error;
