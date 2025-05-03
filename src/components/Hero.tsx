import bg from "../assets/bg.png?url";
import LoginBox from "./LoginBox";
const Hero = () => {
  return (
    <div className="relative w-full h-screen max-w-[1440px]">
      <div
        className="absolute bg-fit bg-no-repeat bg-bottom w-full h-screen z-9"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute bottom-0 h-40 w-full z-10 bg-gradient-to-b from-transparent to-mainbg" />
      <div className="absolute top-1/3 z-11 px-6">
        <div className="grid grid-cols-2 w-full">
          <div>
            <div className="w-fit">
              <h1 className="font-black text-8xl text-transparent bg-clip-text bg-[linear-gradient(45deg,_#EB2865,_#ED8C2B)]">
                MOTO MEETS
              </h1>
            </div>
            <div className="h-1 w-20 bg-gray50 rounded-full my-8" />
            <p className="text-gray50 max-w-[700px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea est
              ipsam eligendi obcaecati harum consequuntur suscipit ducimus id
              facere atque aperiam nostrum veritatis excepturi error nulla quod,
              blanditiis consectetur, quas delectus consequatur dolor iure quos
              repellat culpa? Quas consequuntur maxime molestiae amet ab
              cupiditate suscipit ipsa beatae vero debitis commodi laborum
              facere ullam, iure vitae ea cum quis perspiciatis numquam.
            </p>
          </div>
          <LoginBox />
        </div>
      </div>
    </div>
  );
};

export default Hero;
