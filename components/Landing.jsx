"use client";
import BackgroundBeams from "./ui/background-beams";
const Landing = () => {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-xl md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-200 text-center font-bold">
          Welcome! 🚀 Select a Room
        </h1>

        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center relative z-10">
          A chat application built with Socket.io, Next.js, and TailwindCSS. You
          can create a new room or join an existing one to start chatting.
        </p>
        <br />

        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center relative z-10">
          There are two rooms available: <strong>Public</strong> and{" "}
          <strong>Anonymous</strong>. <strong>Both</strong> rooms are open to
          everyone, as long as they have the room code.
        </p>
        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center relative z-10">
          <strong>Public</strong> room is a general chat room which requires you
          to SignUp, and the messages are stored in the database.
          <br />
          <br />
          While <strong>Anonymous</strong> room is a room where you can chat
          anonymously without signing up, and the messages and rooms are deleted
          after undisclosed hours.
        </p>

        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center relative z-10">
          Authenticated users can create/ join <strong>both</strong> rooms,
          while unauthenticated/ anonymous users can only join/ create the
          <strong> Anonymous</strong> room.
        </p>

        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center relative z-10">
          Anonymous/ Guest/ Unauthenticated accounts are randomnly generated and
          cant be re-used once logged out.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Landing;
