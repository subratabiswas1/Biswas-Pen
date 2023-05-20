import React, { useState,useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
const Editor = (props) => {
  const [open, setOpen] = useState(true);
  const editor = useRef();
  const wrapper = useRef();
  const { language, displayName, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const editorWillUnmount = () => {
    editor.current.display.wrapper.remove();
    wrapper.current.hydrated = false;
  };
  return (
    <>
      <div className={`editor-container ${open ? "" : "collapsed"} flex flex-grow basis-0 flex-col p-2 drop-shadow-md`}>
        <div className="editor-title flex justify-between bg-black text-white p-2 rounded-t-lg text-xl">
          {displayName}
          <button className="expand-collapse-btn ml-2 bg-none border-none decoration-white cursor-pointer"
            type="button"
            onClick={() => setOpen((prevOpen) => !prevOpen)}>
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
        </div>
        <ControlledEditor className="code-mirror-wrapper flex-grow rounded-b-lg overflow-hidden text-lg break-words"
          onBeforeChange={handleChange}
          value={value}
          ref={wrapper}
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
          editorDidMount={(e) => (editor.current = e)}
          editorWillUnmount={editorWillUnmount}
        />
      </div>
    </>
  );
};
export default Editor;
