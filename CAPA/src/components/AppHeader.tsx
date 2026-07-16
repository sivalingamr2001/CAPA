import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout, Space, Typography } from 'antd';
import { ChevronDown, FileSpreadsheet, FolderKey, Layers, LogOut, User } from 'lucide-react';
import React from 'react';

const { Header } = Layout;
const { Text } = Typography;

type PageKey = 'masters' | 'rcaList';

interface AppHeaderProps {
    activePage: PageKey;
    onNavigate: (key: PageKey) => void;
    userName?: string;
    userEmail?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    activePage,
    onNavigate,
    userName = 'John Doe',
    userEmail = 'john.doe@company.com',
}) => {
    
    // User Menu Actions
    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: (
                <Space style={{ padding: '4px 4px' }}>
                    <User size={14} />
                    <div>
                        <Text strong style={{ fontSize: 13 }}>{userName}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 11 }}>{userEmail}</Text>
                    </div>
                </Space>
            ),
            disabled: true,
        },
        { type: 'divider' },
        {
            key: 'logout',
            label: (
                <Space>
                    <LogOut size={14} />
                    <span>Logout</span>
                </Space>
            ),
            danger: true,
        },
    ];

    return (
        <Header
            style={{
                background: '#fff',
                padding: '0 16px',
                borderBottom: '1px solid #e8e8e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 45, // Small height design
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
        >
            {/* LEFT SIDE: Identity Branding & Navigation Options */}
            <Space size={16} align="center">
                {/* RCA CAPA Brand Identity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: '#1677ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                        }}
                    >
                        <FolderKey size={18} strokeWidth={2.5} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: '#111', letterSpacing: '0.3px' }}>
                            RCA / CAPA
                        </span>
                        <span style={{ fontSize: 10, color: '#8c8c8c', fontWeight: 600, letterSpacing: '0.5px' }}>
                            PORTAL
                        </span>
                    </div>
                </div>

                {/* Subtle Divider Line */}
                <div style={{ width: 1, height: 20, background: '#e8e8e8' }} />

                {/* Navigation Controls structured as Active Pills */}
                <Space size={4}>
                    <Button
                        type={activePage === 'masters' ? 'primary' : 'text'}
                        shape="round"
                        size="middle"
                        icon={<Layers size={14} />}
                        onClick={() => onNavigate('masters')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 500,
                            fontSize: 13,
                        }}
                    >
                        Master Data
                    </Button>

                    <Button
                        type={activePage === 'rcaList' ? 'primary' : 'text'}
                        shape="round"
                        size="middle"
                        icon={<FileSpreadsheet size={14} />}
                        onClick={() => onNavigate('rcaList')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 500,
                            fontSize: 13,
                            color: activePage !== 'rcaList' ? '#595959' : undefined,
                        }}
                    >
                        RCA Details
                    </Button>
                </Space>
            </Space>

            {/* RIGHT SIDE: Profile Dropdown Actions & Hot-Sync Utility */}
            <Space size={12} align="center">
                {/* Standardized Administrator Profile Selector Dropdown */}
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                    <Button
                        type="default"
                        shape="round"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 500,
                            fontSize: 13,
                            borderColor: '#d9d9d9',
                        }}
                    >
                        <span style={{ color: '#595959', marginRight: 4 }}>{userName}</span>
                        <ChevronDown size={12} style={{ color: '#bfbfbf' }} />
                    </Button>
                </Dropdown>
            </Space>
        </Header>
    );
};

export default AppHeader;
