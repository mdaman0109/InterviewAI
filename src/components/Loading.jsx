const Loading = () =>
{
return(<div className="fixed inset-0 flex flex-col justify-center items-center bg-slate-900 z-50">
        <div className="p-3 animate-spin drop-shadow-xl bg-gradient-to-tr from-teal-400 via-teal-500 to-slate-700 md:w-48 md:h-48 h-32 w-32 rounded-full">
          <div className="rounded-full h-full w-full bg-slate-900"></div>
        </div>
        <p className="text-white text-lg mt-6 animate-pulse">
          🧠 Generating quiz...
        </p>
      </div>
)
}

export default Loading;