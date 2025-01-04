import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
    // Declare the state for the code
    const [code, setCode] = useState('// Write your Python code here');

    // Function to handle code changes in the editor
    const handleEditorChange = (value, event) => {
        setCode(value);  // value holds the current code from Monaco editor
    };

    return (
        <div style={{ height: '500px' }}>
            <MonacoEditor
                height="100%"  // Make the editor height 100% of the parent container
                language="python"  // Set the language for syntax highlighting
                theme="vs-dark"  // Set the editor theme
                value={code}  // Bind the value to the state
                onChange={handleEditorChange}  // Update the state on change
                options={{
                    selectOnLineNumbers: true,  // Enable line number selection
                    wordWrap: 'on',  // Enable word wrap
                    minimap: { enabled: false },  // Disable minimap
                    folding: true,  // Enable code folding
                }}
            />
        </div>
    );
};

export default CodeEditor;
