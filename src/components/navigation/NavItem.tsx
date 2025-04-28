import { Link } from "react-router-dom";

const NavItem = ({
  url,
  name,
  status,
  disabled,
}: {
  url: string;
  name: string;
  status?: "soon" | undefined;
  disabled?: boolean;
}) => {
  return (
    <div className="p-2 mb-1">
      {disabled ? (
        <div className="relative">
          <p>
            <span className="hover:text-gray-400">{name}</span>
            {status === "soon" && (
              <span className="text-yellow-500 text-[10px] ml-3">soon</span>
            )}
          </p>
        </div>
      ) : (
        <Link to={url} className="relative">
          <p>
            <span className="hover:text-gray-400">{name}</span>
            {status === "soon" && (
              <span className="text-yellow-500 text-[10px] ml-3">soon</span>
            )}
          </p>
        </Link>
      )}
    </div>
  );
};

export default NavItem;
