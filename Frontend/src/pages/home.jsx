import React from 'react';
import { Flex, Card, Button, Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <Flex vertical>
            <main style={{ padding: '20px'}}>
      <Title level={3} style={{  marginBottom: '24px' }}>
        Hi Nabin,
      </Title>
      <Paragraph style={{ fontSize: '16px', marginBottom: '40px' }}>
        Master your interview preparation journey with curated resources, quizzes, and top-notch tools designed to help you succeed.
      </Paragraph>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Pandas Interview Preparation"
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="interview" src="https://via.placeholder.com/300x150" />}
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
            cover={<img alt="quiz" src="https://via.placeholder.com/300x150" />}
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
            cover={<img alt="questions" src="https://via.placeholder.com/300x150" />}
          >
            <p>Get access to frequently asked interview questions.</p>
            <Button type="primary" block>
              View Questions
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Resume Analyzer"
            bordered={true}
            hoverable
            style={{ width: '100%' }}
            cover={<img alt="resume" src="https://via.placeholder.com/300x150" />}
          >
            <p>Optimize your resume for maximum impact.</p>
            <Button type="primary" block>
              Analyze Now
            </Button>
          </Card>
        </Col>
      </Row>
    </main>
        </Flex>
    );
};

export default Home;