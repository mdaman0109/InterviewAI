const Error = ()=>
{
return(<div className="bg-slate-900 h-screen flex flex-col justify-center items-center text-center px-6">
      <p className="text-teal-400 text-xl font-semibold mb-4">
        {error}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded shadow-md transition duration-300"
      >
        🔄 Retry
      </button>
    </div>
)
}

export default Error;