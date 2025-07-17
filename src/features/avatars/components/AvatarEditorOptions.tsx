const AvatarEditorOptions = ({
  handleBorderColorChange,
  color,
}: {
  handleBorderColorChange: (borderColor: string) => void;
  color?: string;
}) => {
  return (
    <div className="flex gap-2">
      <p>Change border color:</p>
      <input
        value={color || "#000000"}
        type="color"
        onChange={(e) => handleBorderColorChange(e.target.value)}
      />
    </div>
  );
};

export default AvatarEditorOptions;
