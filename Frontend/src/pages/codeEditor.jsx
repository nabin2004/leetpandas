import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Row, Col, Button } from 'antd';
import TerminalComponent from './terminalComponent.jsx';

const CodeEditor = () => {
    const [code, setCode] = useState('# Write your Python code here\n\n# Print Hello World\nprint("Hello World!")');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [layoutInitialized, setLayoutInitialized] = useState(false);

    useEffect(() => {
        setLayoutInitialized(true);
    }, []);

    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div
            className="MYBOX"
            style={{
                height: isFullscreen ? '100vh' : 'calc(100vh - 40px)',
                width: isFullscreen ? '100vw' : '100%',
                padding: isFullscreen ? '0' : '20px',
                boxSizing: 'border-box',
                backgroundColor: '#f0f2f5',
                position: isFullscreen ? 'fixed' : 'relative',
                top: isFullscreen ? '0' : 'auto',
                left: isFullscreen ? '0' : 'auto',
                zIndex: isFullscreen ? 9999 : 'auto',
                transition: 'all 0.3s ease-in-out',
                display: layoutInitialized ? 'block' : 'none',
                overflow: 'hidden',
            }}
        >
            <Row gutter={16} style={{ height: '100%' }}>
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
                        <p>1. Write a Python function to sort a list of numbers in descending order.</p>
                        <p>2. Modify the function to accept an optional parameter that allows sorting in either ascending or descending order.</p>
                        <p>3. Implement error handling to manage cases where the input is not a list or contains non-numeric values.</p>
                        <p>4. Optimize the function for large datasets using an efficient sorting algorithm.</p>
                        <p>5. Provide a unit test example to validate the function's correctness.</p>
                    </div>
                </Col>
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
                                }}
                            />
                        </div>
                        <div style={{ flex: 2, backgroundColor: '#000', color: '#fff' }}>
                            <TerminalComponent />
                        </div>
                    </div>
                </Col>
            </Row>
            <Button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10000,
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#40a9ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1890ff'}
            >
                {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </Button>
        </div>
    );
};

export default CodeEditor;
