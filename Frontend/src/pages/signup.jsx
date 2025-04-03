import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signup = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            if (values.password !== values.confirmPassword) {
                message.error('Passwords do not match!');
                return;
            }
            // Replace this with your actual signup API call
            console.log('Signup attempt with:', values);
            // On successful signup:
            message.success('Signup successful');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            message.error('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
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
                <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
                <Form
                    name="signup-form"
                    onFinish={handleSubmit}
                    initialValues={credentials}
                >
                    {/* Username Field */}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            onChange={handleChange}
                            name="username"
                        />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
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
                            onChange={handleChange}
                            name="password"
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            name="confirmPassword"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Signup;