export const Footer = () => {
  return (
    <footer className="flex overflow-hidden flex-col justify-center items-center px-20 py-14 w-full bg-zinc-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-[1206px]">
        <button className="gap-2.5 self-center px-5 py-2 text-base leading-7 bg-yellow-400 rounded-xl shadow-sm min-h-[44px] text-neutral-900">
          Sign in for great experience
        </button>
        <div className="flex flex-wrap gap-10 mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col justify-between w-64 min-w-[240px]">
            <div className="flex gap-7 justify-between items-center w-64 max-w-full">
              {/* Social media icons */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};