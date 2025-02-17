import React from 'react';
import { Card, Button, Typography, Row, Col, Avatar } from 'antd';
import GitHubCalendar from 'react-github-calendar';
import nabin from '../assets/nabin.jpg';
import image1 from '../assets/image(1).jpg';
import image2 from '../assets/image(2).jpg';
import image3 from '../assets/image(3).jpg';
const { Title, Paragraph } = Typography;

const Home = () => {
  // Dummy GitHub contribution data
  const dummyData = [
    { date: '2024-12-21', count: 40 },
    { date: '2024-12-22', count: 50 },
    { date: '2024-12-23', count: 20 },
    { date: '2024-12-24', count: 10 },
    { date: '2024-12-25', count: 30 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center" align="middle" style={{ marginBottom: '40px' }}>
        <Col>
          <Avatar 
            size={64} 
            src={nabin} 
            shape="square" 
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col style={{ marginLeft: '16px' }}>
          <Title level={3} style={{ marginBottom: '0' }}>
            Hi Nabin Oli,
          </Title>
          <Paragraph style={{ fontSize: '16px' }}>
            Master your interview preparation journey with curated resources and quizzes.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '40px' }}>
        <Col>
          <Title level={4}>Your Activity</Title>
          <GitHubCalendar
            username="nabin2004"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            color="#A41034"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Pandas Interview Preparation"
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="interview" src={image3} />}
          >
            <p>Detailed guides to crack your technical interviews.</p>
            <Button type="primary" block>
              Explore Now
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Python Quiz"
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="quiz" src={image1} />}
          >
            <p>Test your Python skills with our interactive quizzes.</p>
            <Button type="primary" block>
              Take Quiz
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Top Interview Questions"
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="questions" src={image2} />}
          >
            <p>Get access to frequently asked interview questions.</p>
            <Button type="primary" block>
              View Questions
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
