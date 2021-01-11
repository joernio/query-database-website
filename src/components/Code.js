import React, { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
