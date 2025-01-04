import React from 'react';
import { Button, Flex } from 'antd';

const InterviewWithAI = () => {

    const handleClick = () => {
        
      };





    return (
        <div>
            <h1>Interview with AI</h1>
            <div style={{ textAlign: 'center' }}>
            <Button 
                type="primary" 
                danger 
                style={{ backgroundColor: '#c21943', fontSize: '18px', padding: '12px 24px' }}
                onClick={handleClick}
            >
                Start Interview
            </Button>
    </div>
        </div>
    );
};

export default InterviewWithAI;