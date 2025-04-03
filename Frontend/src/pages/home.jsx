import React from "react";
import { Card, Button, Typography, Row, Col, Avatar } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import GitHubCalendar from "react-github-calendar";
import image1 from "../assets/image(1).jpg";
import image2 from "../assets/image(2).jpg";
import image3 from "../assets/image(3).jpg";
const { Title, Paragraph } = Typography;
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#f0f2f5" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row justify="start" align="middle" style={{ marginBottom: "32px" }}>
          <Col>
          </Col>
          <Col
            style={{
              marginLeft: "24px",
              padding: "20px",
              background: "linear-gradient(135deg, #fff 0%, #f0f7ff 100%)",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            }}
          >
            <Title
              level={3}
              style={{
                marginBottom: "8px",
                background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hi Nabin Oli,
            </Title>
            <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
              <div
                style={{
                  padding: "12px 24px",
                  background: "#000000",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(24,144,255,0.2)",
                }}
              >
                <Title level={3} style={{ margin: 0, color: "white" }}>
                  Score: 1900
                </Title>
              </div>
              <div
                style={{
                  padding: "12px 24px",
                  background: "#b02e4a",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(82,196,26,0.2)",
                }}
              >
                <Title level={3} style={{ margin: 0, color: "white" }}>
                  Rank: 1
                </Title>
              </div>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "16px",
                padding: "12px",
                background: "rgba(255,255,255,0.8)",
                borderRadius: "12px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
              }}
            >

            </div>
          </Col>
          <Col
            style={{
              marginLeft: "24px",
              padding: "20px",
              background: "linear-gradient(135deg, #fff 0%, #f0f7ff 100%)",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
              <div
                style={{
                  padding: "12px 24px",
                  background: "#000000",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(24,144,255,0.2)",
                }}
              >
                <Title level={3} style={{ margin: 0, color: "white" }}>
                  Current Streak: 10
                </Title>
              </div>
              <div
                style={{
                  padding: "12px 24px",
                  background: "#b02e4a",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(82,196,26,0.2)",
                }}
              >
                <Title level={3} style={{ margin: 0, color: "white" }}>
                  Best Streak: 15
                </Title>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Row justify="center" style={{ marginBottom: "32px" }}>
        <Col>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <Title
              level={4}
              style={{
                textAlign: "center",
                marginBottom: "16px",
                color: "#1a1a1a",
              }}
            >
              Your Activity
            </Title>
            <GitHubCalendar
              username="nabin2004"
              blockSize={22}
              blockMargin={2}
              fontSize={15}
              color="#b42e4a"
            />
          </div>
        </Col>
      </Row>
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
            <p
              style={{ color: "#595959", marginBottom: "16px", height: "40px" }}
            >
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

export default Home;
