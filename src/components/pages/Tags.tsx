const Tags = ({ keywords }: { keywords: { id: string; tag: string }[] }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4 cursor-pointer">
      {keywords.map((keyword) => (
        <div
          className="opacity-70 w-fit px-4 py-1 text-white rounded div-gradient"
          key={keyword.id}
        >
          <p className="text-sm ">{keyword.tag}</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
