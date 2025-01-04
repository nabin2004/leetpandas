import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Row, Col } from 'antd';
import TerminalComponent from './terminalComponent.jsx';

const CodeEditor = () => {
    const [code, setCode] = useState('// Write your Python code here');

    const handleEditorChange = (value) => {
        setCode(value || ''); // Update the state with the editor content
    };

    return (
        <div style={{ height: '100vh', padding: '20px', boxSizing: 'border-box', backgroundColor: '#f0f2f5' }}>
            <Row gutter={16} style={{ height: '100%' }}>
                {/* Left Column: Questions and other details */}
                <Col span={8} style={{ height: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            overflowY: 'auto',
                        }}
                    >
                        <h2 style={{ marginBottom: '16px' }}>Questions and Details</h2>
                        <p>Write the code for sorting the list in reverse order.</p>
                    </div>
                </Col>

                {/* Right Column: Code Editor and Terminal */}
                <Col span={16} style={{ height: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '2px solid #d9d9d9',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fff',
                        }}
                    >
                        {/* Code Editor */}
                        <div style={{ flex: 1, borderBottom: '1px solid #d9d9d9' }}>
                            <MonacoEditor
                                height="100%"
                                language="python"
                                theme="vs-dark"
                                value={code}
                                onChange={handleEditorChange}
                                options={{
                                    selectOnLineNumbers: true,
                                    wordWrap: 'on',
                                    minimap: { enabled: false },
                                    folding: true,
                                }}
                            />
                        </div>

                        {/* Terminal */}
                        <div style={{ flex: 1, backgroundColor: '#000', color: '#fff' }}>
                            <TerminalComponent />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CodeEditor;
