import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({language,code,setCode,readOnly=false}) => {
  return (
    <Editor
        height="400px"
        language={language}
        theme='vs-dark'
        value={code}
        onChange={(newValue)=>setCode(newValue)}
        options={{
            minimap: {enabled:false},
            fontSize: 14,
            readOnly: readOnly,
        }}
    />
  );
};

export default CodeEditor