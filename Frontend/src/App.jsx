import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
    VideoCameraOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// Helper function for menu items
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Menu items with routing keys
const items = [
  getItem('Home', '1', <PieChartOutlined />),
  getItem('Problems', '2', <DesktopOutlined />),
  getItem('Leaderboard', '3', <UserOutlined />),
  getItem('Interview', 'sub2', <VideoCameraOutlined />, [
    getItem('with AI', '6'),
    getItem('with Peers', '8'),
  ]),
  getItem('Resume Analyzer', '9', <FileOutlined />),
];

// Components for each route
const Home = () => <div>Welcome to Home Page</div>;
const Problems = () => <div>Problems Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;
const InterviewWithAI = () => <div>Interview with AI Page</div>;
const InterviewWithPeers = () => <div>Interview with Peers Page</div>;
const ResumeAnalyzer = () => <div>Resume Analyzer Page</div>;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  // Handle menu click
  const onMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/problems');
        break;
      case '3':
        navigate('/leaderboard');
        break;
      case '6':
        navigate('/interview/ai');
        break;
      case '8':
        navigate('/interview/peers');
        break;
      case '9':
        navigate('/resume-analyzer');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <img
          src="../public/logo.svg"
          alt="Logo"
          style={{ width: '100%', padding: '5px' }}
        />
        <div />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Leetpandas</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/interview/ai" element={<InterviewWithAI />} />
              <Route path="/interview/peers" element={<InterviewWithPeers />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          LeetPandas ©{new Date().getFullYear()} Created by LeetPandas Team
        </Footer>
      </Layout>
    </Layout>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
