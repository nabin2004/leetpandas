import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            // Replace this with your actual login API call
            console.log('Login attempt with:', values);
            // On successful login:
            message.success('Login successful');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Card 
                style={{ 
                    width: 400, 
                    padding: '20px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8'
                }} 
                hoverable
            >
                <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                <Form
                    name="login-form"
                    onFinish={handleSubmit}
                    initialValues={{ email: credentials.email, password: credentials.password }}
                >
                    {/* Email Field */}
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            name="email"
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
