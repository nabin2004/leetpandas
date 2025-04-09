import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  VideoCameraOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  IssuesCloseOutlined,
  LayoutOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  BookOutlined,
  BulbOutlined, // Icon for theme toggle
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider, Switch } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Home from './pages/home';
import Problems from './pages/problems';
import Leaderboard from './pages/leaderboard';
import ResumeAnalyzer from './pages/resumeanalyzer';
import CodeEditor from './pages/codeEditor';
import InterviewWithAI from './pages/InterviewWithAI';
import About from './pages/about';
import Tracks from './pages/tracks';
import Login from './pages/login';
import Signup from './pages/signup';
import QuestionCard from './pages/questioncard';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  backgroundColor: '#000',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

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
  getItem('Home', '/', <HomeOutlined />),
  getItem('Problems', '/problems', <CodeOutlined />),
  getItem('Leaderboard', '/leaderboard', <LayoutOutlined />),
  getItem('Interview', 'sub2', <VideoCameraOutlined />, [
    getItem('with AI', '/interview/ai'),
    getItem('with Peers', '/interview/peers'),
  ]),
  getItem('Resume Analyzer', '/resume-analyzer', <FileOutlined />),
  getItem('About', '/about', <InfoCircleOutlined />),
  getItem('Code Editor', '/code-editor', <CodeOutlined />),
  getItem('Tracks', '/tracks', <IssuesCloseOutlined />),
  getItem('Login', '/login', <UserOutlined />),
  getItem('Signup', '/signup', <UserOutlined />),
  getItem('QuestionCard', '/question', <BookOutlined />), // Updated icon for QuestionCard
];

// Components for each route
const InterviewWithPeers = () => <div>Interview with Peers Page</div>;

// Mapping routes to breadcrumb names
const breadcrumbNameMap = {
  '/': 'Home',
  '/problems': 'Problems',
  '/leaderboard': 'Leaderboard',
  '/interview/ai': 'Interview with AI',
  '/interview/peers': 'Interview with Peers',
  '/resume-analyzer': 'Resume Analyzer',
  '/about': 'About',
  '/code-editor': 'Code Editor',
  '/tracks': 'Tracks',
  '/login': 'Login',
  '/signup': 'Signup',
  '/question': 'Question', // Fixed missing breadcrumb name for /question
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme mode
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle menu click
  const onMenuClick = (e) => {
    navigate(e.key);
  };

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
          colorPrimary: isDarkMode ? '#1890ff' : '#A41034',
          colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
          colorText: isDarkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={siderStyle}
        >
          <div className="demo-logo-vertical" />

          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            mode="inline"
            items={items}
            onClick={onMenuClick}
            selectedKeys={[location.pathname]}
            style={{ backgroundColor: '#000', color: '#fff' }}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 0,
              color: colorBgContainer,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: '0 16px' }}>
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ width: '15%', padding: '5px' }}
              />
            </div>
            <div style={{ padding: '0 16px' }}>
              <Switch
                checked={isDarkMode}
                onChange={(checked) => setIsDarkMode(checked)}
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<BulbOutlined />}
              />
            </div>
          </Header>

          <Content style={{ margin: '2px 9px', marginTop: '4px', overflow: 'initial' }}>
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
                <Route path="/code-editor" element={<CodeEditor />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/question" element={<QuestionCard />} />
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
