import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ResumeAnalyzer.css'; // For custom styling

const ResumeAnalyzer = () => {
    const [pdfFile, setPdfFile] = useState(null);

    // Drag and drop file upload handler
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.pdf',
    });

    return (
        <div className="resume-analyzer-container">
            <h1 className="title">Resume Analyzer</h1>

            {/* Embedding Streamlit App */}
            <div className="streamlit-embed">
            <iframe
  title="Resume Analyzer Streamlit App"
  src="https://nabin2004-leetpandas-new-aiapp-5fx7hy.streamlit.app/"
  frameBorder="0"
  style={{
    width: '100%',
    height: '600px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
  }}
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
/>

            </div>
        </div>
    );
};

export default ResumeAnalyzer;
