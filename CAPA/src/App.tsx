import { Layout } from 'antd';
import React, { useState } from 'react';
import AppHeader from './components/AppHeader';
import MasterPage from './pages/MasterPage';
import RcaDetailView from './pages/RcaDetailView';
import RcaListPage from './pages/RcaListPage';

const { Content } = Layout;

type PageKey = 'masters' | 'rcaList' | 'rcaDetail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageKey>('masters');
  const [viewRcaId, setViewRcaId] = useState<number | null>(null);
  const [openNewCapa, setOpenNewCapa] = useState<boolean>(false);

  const handleViewRca = (rcaId: number, openCapaModal: boolean = false) => {
    setViewRcaId(rcaId);
    setOpenNewCapa(openCapaModal);
    setCurrentPage('rcaDetail');
  };

  const handleBack = () => {
    setCurrentPage('rcaList');
    setViewRcaId(null);
    setOpenNewCapa(false);
  };

  const handleNavigate = (key: 'masters' | 'rcaList') => {
    setCurrentPage(key);
    setViewRcaId(null);
    setOpenNewCapa(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'masters':
        return <MasterPage />;
      case 'rcaList':
        return <RcaListPage onViewRca={handleViewRca} />;
      case 'rcaDetail':
        return viewRcaId ? (
          <RcaDetailView rcaId={viewRcaId} onBack={handleBack} openCapaModal={openNewCapa} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f5f5f5' }}>
      <AppHeader
        activePage={currentPage === 'rcaDetail' ? 'rcaList' : currentPage}
        onNavigate={handleNavigate}
        userName="John Doe"
        userEmail="john.doe@company.com"
      />
      <Content
        style={{
          height: 'calc(100vh - 52px)', // Matches your header size perfectly
          overflowY: 'auto',            // Individual panel scrollbar containment
          padding: '20px 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default App;
