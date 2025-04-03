import React from 'react';
import { Card, Row, Col, Button, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom'; 

const { Title, Text } = Typography;

import image3 from "../assets/image(3).jpg";
import { Navigate } from 'react-router-dom';

const Tracks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            hoverable
            style={{
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            cover={
              <img
                alt="interview"
                src={image3}
                style={{ height: "200px", objectFit: "cover" }}
              />
            }
            bodyStyle={{ padding: "16px" }}
          >
            <Title level={4} style={{ marginBottom: "8px", fontSize: "18px" }}>
              Machine Learning Preparation
            </Title>
            <p style={{ color: "#595959", marginBottom: "16px", height: "40px" }}>
              Detailed guides to revise, learn and test your Machine Learning Knowledge.
            </p>
            <Button
              type="primary"
              block
              style={{ borderRadius: "6px", height: "38px" }}
              onClick={() => navigate('/problems')} 
            >
              Explore Now
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tracks;
