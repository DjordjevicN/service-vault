const Hero = () => {
  return (
    <div className="relative w-full h-screen max-w-[1440px]">
      <div className="absolute top-1/3 z-11 px-6">
        <div className="grid grid-cols-2 w-full">
          <div>
            <div className="w-fit">
              <h1 className="font-black text-8xl text-transparent text-gradient ">
                MOTO MEETS
              </h1>
            </div>
            <div className="h-1 w-20 rounded-full my-8" />
            <p className="">Organize Rides. Meet Riders.</p>
            <p className="max-w-[700px]">
              Whether you're organizing a quick weekend ride or a multi-day
              group trip, our platform makes it easy to create events, invite
              riders, track who's joining, and keep everything organized — so
              you can focus on the ride, not the logistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
