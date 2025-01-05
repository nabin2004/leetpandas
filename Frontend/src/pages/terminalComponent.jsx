import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // Import xterm.js styles

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    // Create a new terminal instance
    const term = new Terminal({
      cursorBlink: true, // Enable cursor blinking
      rows: 12,          // Set number of rows
      cols: 50,         // Set number of columns
      theme: {
        background: '#2e2e2e', // Dark background for a modern look
        foreground: '#f5f5f5', // Light text color for better readability
        cursor: '#ff79c6',     // Pinkish cursor for some flair
      },
    });

    // Attach the terminal to the DOM
    if (terminalRef.current) {
      term.open(terminalRef.current);

      // Showcase a dummy command and output
      term.writeln('Welcome to the xterm.js terminal!');
      term.writeln('');
      term.writeln('Type "help" to see available commands.');

      // Simulate user interaction for showcasing
      term.prompt = () => {
        term.write('\r\n$ ');
      };

      // Simulate a basic input handler
      let commandBuffer = '';
      term.onData((data) => {
        const char = data.charCodeAt(0);
        if (char === 13) { // Enter key
          term.writeln('');
          if (commandBuffer === 'help') {
            term.writeln('Available commands:');
            term.writeln('  help - Show available commands');
            term.writeln('  clear - Clear the terminal');
          } else if (commandBuffer === 'clear') {
            term.clear();
          } else {
            term.writeln(`Unknown command: ${commandBuffer}`);
          }
          commandBuffer = '';
          term.prompt();
        } else if (char === 127) { // Backspace key
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          commandBuffer += data;
          term.write(data);
        }
      });

      term.prompt();
    }

    return () => {
      // Dispose of the terminal on unmount
      if (term) {
        term.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #444',  // Darker border for a sleek look
        borderRadius: '10px',       // Rounded corners for modern appeal
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4e4e4e 0%, #1e1e1e 100%)',  // Gradient background for added style
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  // Soft shadow for depth
        fontFamily: 'monospace',  // Monospaced font for terminal feel
      }}
    />
  );
};

export default TerminalComponent;
