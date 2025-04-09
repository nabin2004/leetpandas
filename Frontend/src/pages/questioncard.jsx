import React, { useState } from 'react';
import { Button, Typography, Card, Row, Col, message, Progress, Space, Divider } from 'antd';
import { LeftOutlined, RightOutlined, RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const questions = [
  {
    question: "What is the main purpose of Linear Regression?",
    options: [
      "To predict a categorical outcome",
      "To predict a continuous outcome",
      "To find correlations between variables",
      "None of the above"
    ],
    answer: "To predict a continuous outcome"
  },
  {
    question: "What is the key assumption of Logistic Regression?",
    options: [
      "The outcome is continuous",
      "The relationship between independent and dependent variables is linear",
      "The outcome is binary",
      "The data is normally distributed"
    ],
    answer: "The outcome is binary"
  },
  {
    question: "What is the key feature of K-Nearest Neighbors?",
    options: [
      "It uses decision boundaries",
      "It uses a similarity measure to classify data",
      "It is used for regression only",
      "It performs optimization during training"
    ],
    answer: "It uses a similarity measure to classify data"
  },
  // Add more questions as needed
];

const QuestionCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setAnswerCorrect(null);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setAnswerCorrect(null);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAttempted(attempted + 1);
    
    if (option === questions[currentIndex].answer) {
      setAnswerCorrect(true);
      setScore(score + 1);
      message.success({
        content: "Correct Answer!",
        icon: <CheckOutlined style={{ color: '#52c41a' }} />
      });
    } else {
      setAnswerCorrect(false);
      message.error({
        content: "Incorrect Answer!",
        icon: <CloseOutlined style={{ color: '#f5222d' }} />
      });
    }
  };

  const retryQuestion = () => {
    setSelectedOption(null);
    setAnswerCorrect(null);
  };

  const getOptionStyle = (option) => {
    if (selectedOption === null) return {};

    if (option === questions[currentIndex].answer) {
      return {
        backgroundColor: '#f6ffed',
        borderColor: '#b7eb8f',
        color: '#52c41a'
      };
    }
    
    if (selectedOption === option && option !== questions[currentIndex].answer) {
      return {
        backgroundColor: '#fff1f0',
        borderColor: '#ffccc7',
        color: '#f5222d'
      };
    }
    
    return { opacity: 0.6 };
  };

  return (
    <div className="question-container" style={{ padding: '2rem', maxWidth: '100%', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card 
        bordered
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        className="question-card"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Progress indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">Question {currentIndex + 1} of {questions.length}</Text>
            <Text strong>Score: {score}/{attempted}</Text>
          </div>
          <Progress percent={(currentIndex / (questions.length - 1)) * 100} showInfo={false} strokeColor="#1890ff" />
          
          <Title level={3} style={{ marginBottom: '1.5rem', textAlign: 'left', fontSize: '22px' }}>
            {questions[currentIndex].question}
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {questions[currentIndex].options.map((option, index) => (
              <Button
                key={index}
                block
                onClick={() => !selectedOption && handleOptionSelect(option)}
                disabled={selectedOption !== null}
                style={{
                  height: 'auto',
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                  ...getOptionStyle(option),
                  boxShadow: selectedOption ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Space>
                  <div style={{ 
                    display: 'inline-flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: selectedOption ? 'transparent' : '#e6f7ff',
                    border: '1px solid #91d5ff',
                    marginRight: '8px'
                  }}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </Space>
              </Button>
            ))}
          </Space>

          {answerCorrect !== null && (
            <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: answerCorrect ? '#f6ffed' : '#fff1f0', borderRadius: '4px' }}>
              <Text strong style={{ color: answerCorrect ? '#52c41a' : '#f5222d' }}>
                {answerCorrect ? 'Correct!' : 'Incorrect!'} 
              </Text>
              {!answerCorrect && (
                <Text style={{ display: 'block', marginTop: '8px' }}>
                  The correct answer is: <Text strong>{questions[currentIndex].answer}</Text>
                </Text>
              )}
            </div>
          )}

          <Divider style={{ margin: '16px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              icon={<LeftOutlined />}
              type="default"
            >
              Previous
            </Button>
            
            <Space>
              {selectedOption !== null && (
                <Button 
                  onClick={retryQuestion}
                  icon={<RedoOutlined />}
                  type="default"
                >
                  Retry
                </Button>
              )}
              
              <Button
                onClick={nextQuestion}
                disabled={currentIndex === questions.length - 1}
                type="primary"
              >
                Next <RightOutlined />
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default QuestionCard;
