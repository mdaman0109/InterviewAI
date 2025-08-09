const SubmitSuccess = ({setShowAnalysis}) =>
{
    return(
<div className="flex flex-col justify-center items-center h-screen bg-slate-900 text-white">
        <h2 className="text-2xl font-bold text-teal-400 mb-4">
          ✅ Quiz Submitted!
        </h2>
        <p className="text-gray-300 mb-6">Your responses have been recorded.</p>
        <button
          onClick={() => setShowAnalysis(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded shadow-md transition"
        >
          Analyse Your Test
        </button>
      </div>)

}

export default SubmitSuccess