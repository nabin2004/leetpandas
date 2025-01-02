import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import * as pdfjsLib from 'pdfjs-dist';
import { useDropzone } from 'react-dropzone';
import './ResumeAnalyzer.css'; // For custom styling

const ResumeAnalyzer = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfText, setPdfText] = useState('');
    const [mode, setMode] = useState('review'); // 'review' or 'roaster'

    // Drag and drop file upload handler
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            extractTextFromPDF(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.pdf',
    });

    // Extract text from the PDF file
    const extractTextFromPDF = async (file) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            const typedArray = new Uint8Array(fileReader.result);
            const pdfDocument = await pdfjsLib.getDocument(typedArray).promise;
            let fullText = '';
            const numPages = pdfDocument.numPages;

            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                const page = await pdfDocument.getPage(pageNumber);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }

            setPdfText(fullText);
        };

        fileReader.readAsArrayBuffer(file);
    };

    // Handle file selection using browse button
    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            extractTextFromPDF(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    // Toggle between review and roaster mode
    const toggleMode = () => {
        setMode(mode === 'review' ? 'roaster' : 'review');
    };

    // Analyze the resume text (simplified)
    const analyzeResume = (text) => {
        if (mode === 'review') {
            return (
                <div className="analysis-section">
                    <h3>Resume Review</h3>
                    <p><strong>Experience:</strong> {text.includes('Experience') ? 'Found Experience' : 'No experience section found'}</p>
                    <p><strong>Education:</strong> {text.includes('Education') ? 'Found Education' : 'No education section found'}</p>
                    {/* Additional analysis logic */}
                </div>
            );
        } else if (mode === 'roaster') {
            return (
                <div className="analysis-section">
                    <h3>Roaster Mode</h3>
                    <p>Key Skills or Technologies: {text.includes('JavaScript') ? 'JavaScript' : 'Not Found'}</p>
                    <p>Key Technologies: {text.includes('React') ? 'React' : 'Not Found'}</p>
                    {/* Additional keyword highlighting */}
                </div>
            );
        }
    };

    return (
        <div className="resume-analyzer-container">
            <h1 className="title">Resume Analyzer</h1>

            {/* Drag-and-Drop Area */}
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag & Drop your resume (PDF) here or click to select a file</p>
            </div>

            {/* File Browse Button */}
            <div className="file-upload">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelection}
                    className="file-input"
                />
                <button className="browse-button">Browse</button>
            </div>

            {/* Display file info and analysis after file is uploaded */}
            {pdfFile && (
                <div className="file-info">
                    <h2>Uploaded Resume: {pdfFile.name}</h2>
                    <button className="toggle-mode" onClick={toggleMode}>
                        Switch to {mode === 'review' ? 'Roaster' : 'Review'} Mode
                    </button>

                    <div className="pdf-preview">
                        <h3>PDF Preview</h3>
                        <Document file={pdfFile}>
                            {[...Array(5)].map((_, index) => (
                                <Page key={index} pageNumber={index + 1} />
                            ))}
                        </Document>
                    </div>

                    <div className="resume-analysis">
                        {analyzeResume(pdfText)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeAnalyzer;
