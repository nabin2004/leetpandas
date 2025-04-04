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
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd'; // Removed Button import as it's not used
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Home from './pages/home';
import Problems from './pages/problems';
import Leaderboard from './pages/leaderboard';
import ResumeAnalyzer from './pages/resumeanalyzer';
import CodeEditor from './pages/codeEditor'; // Import CodeEditor
import InterviewWithAI from './pages/InterviewWithAI'; // Import InterviewWithAI
import About from './pages/about';
import Tracks from './pages/tracks';
import Login from './pages/login'; // Import the Login page
import Signup from './pages/signup'; // Import the Signup page

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
  getItem('Home', '1', <HomeOutlined />),
  getItem('Problems', '2', <CodeOutlined />),
  getItem('Leaderboard', '3', <LayoutOutlined />),
  getItem('Interview', 'sub2', <VideoCameraOutlined />, [
    getItem('with AI', '6'),
    getItem('with Peers', '8'),
  ]),
  getItem('Resume Analyzer', '9', <FileOutlined />),
  getItem('About', '10', <InfoCircleOutlined />),
  getItem('Code Editor', '11', <CodeOutlined />), // Added Code Editor menu item
  getItem('Tracks', '12', <IssuesCloseOutlined />), // Added Tracks menu item
  getItem('Login', '13', <UserOutlined />), // Added Login menu item (optional)
  getItem('Signup', '14', <UserOutlined />), // Added Signup menu item (optional)
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
  '/tracks':'Tracks',
  '/login': 'Login',
  '/signup': 'Signup',
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
      case '11':
        navigate('/code-editor'); 
        break;
      case '12':
        navigate('/tracks');
        break;
      case '13':
        navigate('/login'); 
        break;
      case '14':
        navigate('/signup'); 
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
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={onMenuClick}
            selectedKeys={[location.pathname.split('/')[1]]}
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
                {/* <Route path="/interview/ai" element={<InterviewWithAI />} /> */}
                {/* <Route path="/interview/peers" element={<InterviewWithPeers />} /> */}
                <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
                <Route path="/about" element={<About />} />
                <Route path="/code-editor" element={<CodeEditor />} /> {/* Added route for Code Editor */}
                <Route path="/tracks" element={<Tracks />} /> {/* Added route for Code Editor */}
                <Route path="/login" element={<Login />} /> {/* Added route for Login */}
                <Route path="/signup" element={<Signup />} /> {/* Added route for Signup */}
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
