import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
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
            // Send login request to backend
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: values.username,  
                password: values.password,
            });

            // Extract the tokens from the response
            const { access, refresh } = response.data;

            // Store the access token
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // On successful login:
            message.success('Login successful');
            navigate('/problems');  

        } catch (error) {
            console.error('Login failed:', error);
            message.error('Login failed. Please check your credentials and try again.');
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
                    initialValues={{ username: credentials.username, password: credentials.password }}
                >
                    {/* Username Field */}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            value={credentials.username}
                            onChange={handleChange}
                            name="username"
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
