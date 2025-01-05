import React from 'react';
import { Typography, Layout, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const About = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                <Card
                    style={{ maxWidth: '800px', width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    bodyStyle={{ padding: '24px 32px' }}
                >
                    <Typography>
                        <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
                            About LeetPandas
                        </Title>
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            Welcome to <Text strong>LeetPandas</Text>, the premier platform for mastering data science coding 
                            interview questions. Our mission is to empower aspiring data scientists and professionals with the 
                            skills needed to excel in the ever-evolving world of data.
                        </Paragraph>
                        <Divider />
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            At LeetPandas, we focus on:
                        </Paragraph>
                        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            <li>
                                Comprehensive and diverse question sets inspired by <Text strong>Pandas</Text>, 
                                <Text strong> NumPy</Text>, and <Text strong>Seaborn</Text>.
                            </li>
                            <li>Interactive solutions with detailed explanations for every challenge.</li>
                            <li>A structured approach to enhancing data manipulation and visualization skills.</li>
                        </ul>
                        <Divider />
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
                            Whether you're preparing for a competitive interview or honing your data science expertise, 
                            <Text strong> LeetPandas</Text> is your partner on this journey. Together, we can unlock the 
                            potential of data and make learning engaging and impactful.
                        </Paragraph>
                        <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginTop: '24px', color: '#8c8c8c' }}>
                            <Text italic>"Empowering data scientists, one question at a time."</Text>
                        </Paragraph>
                    </Typography>
                </Card>
            </Content>
        </Layout>
    );
};

export default About;
