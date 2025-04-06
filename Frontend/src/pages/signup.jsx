import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      message.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      message.error(
        error.response?.data?.email?.[0] ||
        error.response?.data?.username?.[0] ||
        "Signup failed. Please check your input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
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
        <Form name="signup-form" onFinish={handleSubmit}>
          {/* Username Field */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
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
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
