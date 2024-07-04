import BackgroundBeams from "./ui/background-beams";
const Landing = () => {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-xl md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-200 text-center font-bold">
          Welcome! 🚀 Select a Room
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Blah Blah ABOUT THE APP
        </p>
        {/* <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        /> */}
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Landing;
