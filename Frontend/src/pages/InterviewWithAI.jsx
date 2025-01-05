import React from 'react';

const InterviewWithAI = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f9',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '20px',
        }}>
            <a
                href="https://ddna-cair-nepal96ad--conversation-coach.soului.dh.soulmachines.cloud/?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzYwMDkwOTgsImlzcyI6InNpZ25lZF91cmwtMWNjYjc3NGYtNDQ0YS00MDY5LThhZjQtNDU0OGQyMzkwZTVhIiwiZXhwIjoxODIyMzIyNjk4LCJlbWFpbCI6ImNhaXItbmVwYWw5NmFkLS1jb252ZXJzYXRpb24tY29hY2hAZGRuYS5zdHVkaW8iLCJzb3VsSWQiOiJkZG5hLWNhaXItbmVwYWw5NmFkLS1jb252ZXJzYXRpb24tY29hY2gifQ.qAIh-A2IvM1QrLUpw7TgojPJLDSlj7te4pvkUgOJRD0"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    fontSize: '1.1rem',
                    color: '#fff',
                    backgroundColor: '#A41034',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#357ABD'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
            >
                Start the Interview
            </a>
        </div>
    );
};

export default InterviewWithAI;
