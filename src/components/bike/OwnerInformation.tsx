const OwnerInformation = ({
  label,
  value,
  from,
  to,
  phone,
  currentOwner,
}: {
  label: string;
  value: string;
  from: string;
  to: string;
  phone?: string;
  currentOwner?: boolean;
}) => {
  return (
    <div className="my-3 bg-gray-100 p-2">
      <div className="flex gap-3">
        <p className={`${currentOwner && "text-green-600"} font-bold`}>
          {label}:
        </p>
        <p>{value}</p>
        <p>
          from {from} to {to}
        </p>
        {phone && <p>{phone}</p>}
      </div>
      <div>
        <p className="font-bold">Owners note:</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          repellendus eaque earum obcaecati, rem mollitia fugiat unde! Ut, earum
          cumque possimus nesciunt rem dolor magni magnam rerum, aperiam nam
          debitis.
        </p>
      </div>
    </div>
  );
};
export default OwnerInformation;
