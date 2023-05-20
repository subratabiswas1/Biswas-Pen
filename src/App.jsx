import React, { useState } from "react";
import { useEffect } from "react";
import Editor from "./assets/Editor";
import UseLocalStorage from "./assets/UseLocalStorage";

const App = () => {
  const [html, setHtml] = UseLocalStorage("html", "");
  const [css, setCss] = UseLocalStorage("css", "");
  const [js, setJs] = UseLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  
  useEffect(() => {
    console.log("useeffect...");
    const timeout = setTimeout(() => {
      setSrcDoc(
        `<html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>`
      );
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  
  return (
    <div className="m-0 p-0 box-border h-screen w-full ">
      <div className="bg-gray-500 w-screen h-1/2 flex px-2">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="h-1/2">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default App;
