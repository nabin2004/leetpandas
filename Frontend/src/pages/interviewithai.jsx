



import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]);
  const mediaRecorder = useRef(null);
  const socket = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',  // Best choice for real-time audio streaming
        bitsPerSecond: 128000,   // 128kbps for audio quality (adjust as needed)
        audioBitsPerSecond: 128000  // Can help with lower bandwidth scenarios
    });
      
      // Connect to WebSocket server
      socket.current = new WebSocket('ws://127.0.0.1:8000/audio');
     // Start recording in chunks of 250ms
      mediaRecorder.current.start(1000);
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Send audio chunks to backend through WebSocket
          socket.current.send(event.data);
        }
      };

      // Handle responses from the AI
      socket.current.onmessage = (event) => {
        const response = JSON.parse(event.data);
        setResponses(prev => [...prev, response]);
      };

    
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      socket.current.close();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-full ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {isRecording ? <Square size={24} /> : <Mic size={24} />}
          </button>
        </div>
        
        <div className="w-full space-y-4">
          {responses.map((response, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">{response.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;







