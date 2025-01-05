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
  CodeOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Home from './pages/home';
import Problems from './pages/problems';
import Leaderboard from './pages/leaderboard';
import ResumeAnalyzer from './pages/resumeanalyzer';
import Landingpage from './pages/landingpage'; // Import Landingpage
import CodeEditor from './pages/codeEditor'; // Import CodeEditor
import InterviewWithAI from './pages/InterviewWithAI'; // Import InterviewWithAI
import About from './pages/about';

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
  getItem('Home', '1', <HomeOutlined />),
  getItem('Problems', '2', <CodeOutlined />),
  getItem('Leaderboard', '3', <LayoutOutlined />),
  getItem('Interview', 'sub2', <VideoCameraOutlined />, [
    getItem('with AI', '6'),
    getItem('with Peers', '8'),
  ]),
  getItem('Resume Analyzer', '9', <FileOutlined />),
  getItem('About', '10', <PieChartOutlined />),
  getItem('Code Editor', '11', <CodeOutlined />),
];

// Components for each route
const InterviewWithPeers = () => <div>Interview with Peers Page</div>;

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
        navigate('/home');
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
      case '11':
        navigate('/code-editor');
        break;
      default:
        break;
    }
  };

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#A41034',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {!isLandingPage && (
          <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <img
              src="../public/logo.svg"
              alt="Logo"
              style={{ width: '100%', padding: '5px' }}
            />
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
              onClick={onMenuClick}
            />
          </Sider>
        )}
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
            
          </Header>

          <Content style={{ margin: '0 16px', marginTop: '24px', overflow: 'initial' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
            <div
              style={{
                padding: isLandingPage ? '0' : '24px',
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/interview/ai" element={<InterviewWithAI />} />
                <Route path="/interview/peers" element={<InterviewWithPeers />} />
                <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
                <Route path="/about" element={<About />} />
                <Route path="/code-editor" element={<CodeEditor />} />
              </Routes>
            </div>
          </Content>
          {!isLandingPage && (
            <Footer style={{ textAlign: 'center' }}>
              LeetPandas ©{new Date().getFullYear()} Created by LeetPandas Team
            </Footer>
          )}
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