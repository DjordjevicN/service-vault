import { useState } from "react";
import { Button } from "../ui/Button";

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <Button className="mt-2" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy URL"}
    </Button>
  );
};

export default CopyUrlButton;
