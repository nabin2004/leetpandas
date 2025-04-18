import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col, Skeleton } from "antd";
import GitHubCalendar from "react-github-calendar";
import { useNavigate } from 'react-router-dom'; 
import image3 from "../assets/image(3).jpg";
import { getCurrentUser } from "../utils/auth.js";

const { Title } = Typography;

const Home = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user and stats on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData) return;

        setUser(userData);

        const token = localStorage.getItem("access_token");

        const statsResponse = await fetch("http://127.0.0.1:8000/api/stats/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching user or stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
          <Col />
          <Col
            style={{
              marginLeft: "24px",
              padding: "20px",
              background: "linear-gradient(135deg, #fff 0%, #f0f7ff 100%)",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <Title
                level={3}
                style={{
                  marginBottom: "8px",
                  background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {user ? `Hi ${user.username},` : "Hi Learner,"}
              </Title>
            )}

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
                  Score: {stats ? stats.questions_solved : "..."}
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
                  Rank: {stats ? stats.rank : "..."}
                </Title>
              </div>
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
                  Current Streak: {stats ? stats.login_streak : "..."}
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
                  Best Streak: {stats ? stats.rank : "..."}
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={4} style={{ textAlign: "center", marginBottom: "16px", color: "#1a1a1a" }}>
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
            <p style={{ color: "#595959", marginBottom: "16px", height: "40px" }}>
              Detailed guides to revise, learn and test your Machine Learning Knowledge.
            </p>
            <Button
              type="primary"
              block
              style={{ borderRadius: "6px", height: "38px" }}
              onClick={() => navigate("/problems")}
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
