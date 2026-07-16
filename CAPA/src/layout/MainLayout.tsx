import React, { useState } from 'react';
import { Layout, Menu, theme, Typography, Space } from 'antd';
import { SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import MasterDropdownPage from '../pages/Master/MasterDropdownPage';
import RcaManagementPage from '../pages/RCA/RcaManagementPage';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const MainLayout: React.FC = () => {
  // State tracking for current active page
  const [currentPage, setCurrentPage] = useState<string>('rca-operations');
  
  // Ant Design dynamic tokens for theme consistency
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Navigation menu item configuration
  const navigationItems = [
    {
      key: 'rca-operations',
      icon: <DatabaseOutlined style={{ fontSize: '16px' }} />,
      label: 'RCA Operations Dashboard',
    },
    {
      key: 'master-dropdowns',
      icon: <SettingOutlined style={{ fontSize: '16px' }} />,
      label: 'Configure Dropdown Masters',
    },
  ];

  // Component router mapping strategy
  const renderPageContent = () => {
    switch (currentPage) {
      case 'rca-operations':
        return <RcaManagementPage />;
      case 'master-dropdowns':
        return <MasterDropdownPage />;
      default:
        return <RcaManagementPage />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar / Header Component */}
      <Header 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#001529',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* App Logo/Title block */}
        <Space size="middle" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('rca-operations')}>
          <div style={{ fontSize: '22px' }}>🛡️</div>
          <Title level={4} style={{ color: '#ffffff', margin: 0, fontWeight: 600, letterSpacing: '0.5px' }}>
            CAPA Engine
          </Title>
        </Space>

        {/* Ant Design Header Menu Links */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPage]}
          onClick={(e) => setCurrentPage(e.key)}
          items={navigationItems}
          style={{ 
            flex: 1, 
            justifyContent: 'flex-end', 
            minWidth: 0,
            borderBottom: 'none'
          }}
        />
      </Header>

      {/* Main Structural Body Viewport */}
      <Content style={{ background: '#f5f5f5', flex: 1 }}>
        <div

        >
          {renderPageContent()}
        </div>
      </Content>

      {/* Sticky Structural Base Footer */}
      <Footer style={{ textAlign: 'center', background: '#f5f5f5', color: '#8c8c8c', padding: '16px' }}>
        Root Cause Analysis & CAPA System ©{new Date().getFullYear()} Created with Ant Design
      </Footer>

    </Layout>
  );
};

export default MainLayout;
