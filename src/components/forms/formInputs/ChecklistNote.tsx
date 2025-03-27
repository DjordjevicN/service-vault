const ChecklistNote = ({
  id,
  onChange,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
}) => (
  <div className="mb-1 gap-2 flex border-b border-gray-200 p-2">
    <textarea
      id={id}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add a note"
      className="border-none focus:outline-none w-full"
    />
  </div>
);
export default ChecklistNote;
