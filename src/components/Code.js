import React, { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import parse from 'html-react-parser';

export default function Code({ highlightedCode, language }) {
  return (
    <div className="code">
      <pre>
        <code>{parse(highlightedCode)}</code>
      </pre>
    </div>
  );
}
