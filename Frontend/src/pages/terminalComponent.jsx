import React, { useEffect, useRef } from 'react';

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    // Ensure xterm.js is loaded globally
    if (!window.Terminal) {
      console.error('xterm.js is not loaded!');
      return;
    }

    // Create a new terminal instance
    const term = new window.Terminal();

    // Attach the terminal to the DOM
    if (terminalRef.current) {
      term.open(terminalRef.current);

      // Write some text to the terminal
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    }

    return () => {
      // Dispose of the terminal on unmount
      term.dispose();
    };
  }, []);

  return (
    <div
      id="terminal"
      ref={terminalRef}
      style={{
        width: '100%',
        height: '400px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    />
  );
};

export default TerminalComponent;
