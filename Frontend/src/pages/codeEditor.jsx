import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Row, Col, Button } from 'antd';
import TerminalComponent from './terminalComponent.jsx';

const CodeEditor = () => {
    const [code, setCode] = useState('// Write your Python code here');
    const [isFullscreen, setIsFullscreen] = useState(false); // State to track fullscreen mode
    const [layoutInitialized, setLayoutInitialized] = useState(false); // To track initial layout load

    useEffect(() => {
        // Ensure layout is initialized properly after the first render
        setLayoutInitialized(true);
    }, []);

    const handleEditorChange = (value) => {
        setCode(value || ''); // Update the state with the editor content
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen); // Toggle fullscreen state
    };

    return (
        <div
            className="MYBOX"
            style={{
                height: isFullscreen ? '100vh' : 'auto', // Adjust height for fullscreen
                width: isFullscreen ? '100vw' : 'auto', // Adjust width for fullscreen
                padding: '20px',
                boxSizing: 'border-box',
                backgroundColor: '#f0f2f5',
                position: isFullscreen ? 'fixed' : 'relative', // Fix position for fullscreen
                top: isFullscreen ? '0' : 'auto',
                left: isFullscreen ? '0' : 'auto',
                zIndex: isFullscreen ? 9999 : 'auto', // Ensure it's on top when fullscreen
                transition: 'all 0.3s ease', // Smooth transition for fullscreen
                display: layoutInitialized ? 'block' : 'none', // Hide until layout is initialized
            }}
        >
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
                                }}
                            />
                        </div>

                        {/* Terminal */}
                        <div style={{ flex: 2, backgroundColor: '#000', color: '#fff' }}>
                            <TerminalComponent />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Fullscreen Button */}
            <Button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10000,
                }}
            >
                {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </Button>
        </div>
    );
};

export default CodeEditor;
