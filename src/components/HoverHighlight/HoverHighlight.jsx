import { useState } from "react";
import s from "./HoverHighlight.module.css";

export default function HoverHighlight({ id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={s.container}>
      <span
        className={s.text}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCopy}
      >
        id: {id.slice(0, 8)}
        {"..."}
        {copied ? "✔" : "📄"}
      </span>
      {isHovered && <div className={s.tooltip}>{id}</div>}
    </div>
  );
}
