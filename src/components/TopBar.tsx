const TopBar = () => {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-300">
      <div>
        <h1 className="text-2xl text-black font-bold p-4">Meet App</h1>
      </div>
      <div>
        <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
};

export default TopBar;
