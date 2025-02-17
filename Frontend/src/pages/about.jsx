import React from 'react';
import { Typography, Layout, Card, Divider, Row, Col, Space } from 'antd';
import { LineChartOutlined, TeamOutlined, TrophyOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const About = () => {
    const features = [
        {
            icon: <LineChartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            title: 'Data-Driven Learning',
            description: 'Practice with real-world scenarios and industry-standard tools like Pandas, NumPy, and Seaborn.'
        },
        {
            icon: <TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
            title: 'Community-Powered',
            description: 'Join a thriving community of data enthusiasts, share solutions, and learn from peers.'
        },
        {
            icon: <TrophyOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
            title: 'Interview Success',
            description: 'Prepare effectively with questions sourced from top tech companies and industry leaders.'
        },
        {
            icon: <BookOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />,
            title: 'Comprehensive Learning',
            description: 'Access detailed explanations, multiple solutions, and best practices for every challenge.'
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                <Card
                    style={{ maxWidth: '1000px', width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    bodyStyle={{ padding: '32px 40px' }}
                >
                    <Typography>
                        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1890ff' }}>
                            Welcome to LeetPandas
                        </Title>
                        <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', color: '#595959', textAlign: 'center' }}>
                            Your Gateway to Data Science Excellence
                        </Paragraph>
                        
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959', marginTop: '24px' }}>
                            At <Text strong>LeetPandas</Text>, we're revolutionizing how data scientists prepare for their careers. 
                            Our platform combines cutting-edge technology with practical learning experiences to help you master 
                            the essential skills needed in today's data-driven world.
                        </Paragraph>

                        <Divider />
                        
                        <Title level={3} style={{ marginBottom: '24px', color: '#262626' }}>
                            Why Choose LeetPandas?
                        </Title>
                        
                        <Row gutter={[24, 24]}>
                            {features.map((feature, index) => (
                                <Col xs={24} sm={12} key={index}>
                                    <Space direction="vertical" size={12}>
                                        {feature.icon}
                                        <Text strong style={{ fontSize: '16px', color: '#262626' }}>
                                            {feature.title}
                                        </Text>
                                        <Text style={{ color: '#595959' }}>
                                            {feature.description}
                                        </Text>
                                    </Space>
                                </Col>
                            ))}
                        </Row>

                        <Divider />

                        <Title level={3} style={{ marginBottom: '24px', color: '#262626' }}>
                            Our Commitment
                        </Title>
                        
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            We're committed to providing you with:
                        </Paragraph>
                        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            <li>Regularly updated content reflecting the latest industry trends</li>
                            <li>Personalized learning paths tailored to your skill level</li>
                            <li>Interactive coding environment with real-time feedback</li>
                            <li>Comprehensive coverage of data manipulation, analysis, and visualization</li>
                        </ul>

                        <Divider />
                        
                        <Paragraph style={{ textAlign: 'center', fontSize: '18px', marginTop: '32px', color: '#262626' }}>
                            <Text strong>"Transforming Data Scientists into Industry Leaders"</Text>
                        </Paragraph>
                        <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginTop: '16px', color: '#8c8c8c' }}>
                            Join thousands of successful data professionals who started their journey with LeetPandas
                        </Paragraph>
                    </Typography>
                </Card>
            </Content>
        </Layout>
    );
};

export default About;
