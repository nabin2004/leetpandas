import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider, Space } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Home from './pages/home';
import Problems from './pages/problems';
import Leaderboard from './pages/leaderboard';
import ResumeAnalyzer from './pages/resumeanalyzer';

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
  getItem('About', '10', <PieChartOutlined />),
];

// Components for each route
const InterviewWithAI = () => <div>Interview with AI Page</div>;
const InterviewWithPeers = () => <div>Interview with Peers Page</div>;
const About = () => <div>About LeetPandas: Learn more about our mission and team.</div>;

// Mapping routes to breadcrumb names
const breadcrumbNameMap = {
  '/': 'Home',
  '/problems': 'Problems',
  '/leaderboard': 'Leaderboard',
  '/interview/ai': 'Interview with AI',
  '/interview/peers': 'Interview with Peers',
  '/resume-analyzer': 'Resume Analyzer',
  '/about': 'About',
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

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
      case '10':
        navigate('/about');
        break;
      default:
        break;
    }
  };

  // Generate breadcrumbs dynamically based on the current path
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {breadcrumbNameMap[url] || 'Unknown'}
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="root">LeetPandas</Breadcrumb.Item>,
    location.pathname === '/' ? (
      <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
    ) : (
      extraBreadcrumbItems
    ),
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#A41034',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
       
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

  <div style={{ padding: '0 16px' }}>
  <img
      src="../public/logo.svg"
      alt="Logo"
      style={{ width: '15%', padding: '5px' }}
          />
  </div>

</Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
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
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            LeetPandas ©{new Date().getFullYear()} Created by LeetPandas Team
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
