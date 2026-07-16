import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Badge, Card, Typography, Modal, Form, DatePicker, Select, Row, Col, message, type TableProps } from 'antd';
import { Input as AntInput } from 'antd';
import dayjs from 'dayjs';
import { formatDate, getSeverityColor, today } from '../utils/helpers';
import { initialRcaDetails, initialRcaSources } from '../utils/mockData';
import type { RcaDetail } from '../types';
import { AlertCircle, Eye, FileSpreadsheet, Plus, RefreshCw, Search } from 'lucide-react';

const { Title, Text } = Typography;
const { TextArea } = AntInput;

interface RcaListPageProps {
    onViewRca: (rcaId: number, openCapaModal?: boolean) => void;
}

const RcaListPage: React.FC<RcaListPageProps> = ({ onViewRca }) => {
    const [data, setData] = useState<RcaDetail[]>(initialRcaDetails);
    const [searchText, setSearchText] = useState('');
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [form] = Form.useForm();

    const filteredData = data.filter(
        (item) =>
            item.RCA_CODE.toLowerCase().includes(searchText.toLowerCase()) ||
            item.RCA_DETAILS.toLowerCase().includes(searchText.toLowerCase()) ||
            item.RESPONSIBLE_DEPT.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleCreate = (values: Record<string, unknown>) => {
        const now = today();
        const newId = Math.max(...data.map((d) => d.RCA_ID), 0) + 1;
        const newCode = `RCA-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`;
        setData((prev) => [
            ...prev,
            {
                RCA_ID: newId,
                RCA_SOURCE_ID: values.RCA_SOURCE_ID as number,
                RCA_CODE: newCode,
                RCA_DATE: values.RCA_DATE ? dayjs(values.RCA_DATE as string).format('YYYY-MM-DD') : now,
                RCA_DETAILS: values.RCA_DETAILS as string,
                RESPONSIBLE_DEPT: values.RESPONSIBLE_DEPT as string,
                RCA_SEVERITY: values.RCA_SEVERITY as RcaDetail['RCA_SEVERITY'],
                // Change the null fallback to an empty string ''
                RCA_TARGET_DATE: values.RCA_TARGET_DATE ? dayjs(values.RCA_TARGET_DATE as string).format('YYYY-MM-DD') : '',
                LAST_UPDATE_DATE: now,
                RCA_APPROVED_USER: 999,
                RCA_CLOSED_DATE: null,
            },
        ]);
        message.success(`RCA ${newCode} created successfully`);
        setCreateModalVisible(false);
        form.resetFields();
    };

    const handleRefresh = () => {
        message.loading('Refreshing data...', 0.5);
        setTimeout(() => {
            setData([...initialRcaDetails]);
            message.success('Data refreshed');
        }, 500);
    };

    const columns: TableProps<RcaDetail>['columns'] = [
        {
            title: 'RCA Code',
            dataIndex: 'RCA_CODE',
            key: 'RCA_CODE',
            width: 150,
            render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text>,
            sorter: (a, b) => a.RCA_CODE.localeCompare(b.RCA_CODE),
        },
        {
            title: 'Date',
            dataIndex: 'RCA_DATE',
            key: 'RCA_DATE',
            width: 120,
            render: formatDate,
        },
        {
            title: 'Details',
            dataIndex: 'RCA_DETAILS',
            key: 'RCA_DETAILS',
            ellipsis: true,
        },
        {
            title: 'Department',
            dataIndex: 'RESPONSIBLE_DEPT',
            key: 'RESPONSIBLE_DEPT',
            width: 130,
            filters: [...new Set(data.map((d) => d.RESPONSIBLE_DEPT))].map((d) => ({ text: d, value: d })),
            onFilter: (value, record) => record.RESPONSIBLE_DEPT === value,
        },
        {
            title: 'Severity',
            dataIndex: 'RCA_SEVERITY',
            key: 'RCA_SEVERITY',
            width: 110,
            render: (severity: RcaDetail['RCA_SEVERITY']) => <Tag color={getSeverityColor(severity)}>{severity}</Tag>,
            filters: [
                { text: 'Critical', value: 'Critical' },
                { text: 'High', value: 'High' },
                { text: 'Medium', value: 'Medium' },
                { text: 'Low', value: 'Low' },
            ],
            onFilter: (value, record) => record.RCA_SEVERITY === value,
        },
        {
            title: 'Target Date',
            dataIndex: 'RCA_TARGET_DATE',
            key: 'RCA_TARGET_DATE',
            width: 120,
            render: formatDate,
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_, record) =>
                record.RCA_CLOSED_DATE ? (
                    <Badge status="success" text={<Text type="success">Closed</Text>} />
                ) : (
                    <Badge status="processing" text={<Text type="warning">Open</Text>} />
                ),
            filters: [
                { text: 'Open', value: 'open' },
                { text: 'Closed', value: 'closed' },
            ],
            onFilter: (value, record) =>
                value === 'closed' ? !!record.RCA_CLOSED_DATE : !record.RCA_CLOSED_DATE,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 220,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<Eye size={14} />}
                        onClick={() => onViewRca(record.RCA_ID)}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                        View
                    </Button>
                    <Button
                        size="small"
                        icon={<Plus size={14} />}
                        onClick={() => onViewRca(record.RCA_ID, true)}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                        New CAPA
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card
                title={
                    <Space size="middle">
                        <FileSpreadsheet size={20} color="#1677ff" style={{ verticalAlign: 'middle' }} />
                        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>RCA Details Log</Title>
                        <Badge count={data.length} style={{ backgroundColor: '#1677ff' }} />
                    </Space>
                }
                extra={
                    <Space size="middle">
                        <Input
                            placeholder="Search RCA code, details, dept..."
                            allowClear
                            prefix={<Search size={14} style={{ color: '#bfbfbf' }} />}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 280 }}
                        />
                        <Button
                            icon={<RefreshCw size={14} />}
                            onClick={handleRefresh}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                            Refresh
                        </Button>
                        <Button
                            type="primary"
                            icon={<Plus size={14} />}
                            onClick={() => setCreateModalVisible(true)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                            Create RCA
                        </Button>
                    </Space>
                }
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)', borderRadius: '8px' }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="RCA_ID"
                    size="middle"
                    pagination={{ pageSize: 8, showSizeChanger: true, showTotal: (total: number) => `Total ${total} records` }}
                    scroll={{ x: 1200 }}
                    rowClassName={(record: RcaDetail) => (record.RCA_CLOSED_DATE ? 'rca-closed-row' : '')}
                />
            </Card>

            <Modal
                title={
                    <Space size="small">
                        <AlertCircle size={18} color="#1677ff" style={{ verticalAlign: 'middle' }} />
                        <span style={{ fontWeight: 600, fontSize: 16 }}>Create New RCA Record</span>
                    </Space>
                }
                open={createModalVisible}
                onOk={() => form.submit()}
                onCancel={() => {
                    setCreateModalVisible(false);
                    form.resetFields();
                }}
                width={700}
                okText="Create RCA"
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleCreate} style={{ marginTop: 20 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="RCA_SOURCE_ID" label="RCA Source Origin" rules={[{ required: true, message: 'Please select an RCA origin source' }]}>
                                <Select placeholder="Select source platform">
                                    {initialRcaSources
                                        .filter((s) => !s.RCA_INACTIVE_DATE)
                                        .map((s) => (
                                            <Select.Option key={s.RCA_SOURCE_ID} value={s.RCA_SOURCE_ID}>
                                                {s.RCA_SOURCE} ({s.RCA_CODE})
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="RCA_DATE" label="RCA Incident Date" rules={[{ required: true, message: 'Incident log date is required' }]}>
                                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="RCA_DETAILS" label="Root Cause Investigation Details" rules={[{ required: true, message: 'Please document investigation details' }]}>
                        <TextArea rows={4} placeholder="Describe the detected operational anomaly or defect path in full detail..." />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="RESPONSIBLE_DEPT" label="Responsible Department" rules={[{ required: true, message: 'Assign target department group' }]}>
                                <Input placeholder="e.g. Production Operations" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="RCA_SEVERITY" label="Risk Classification Severity" rules={[{ required: true, message: 'Select severity layer' }]}>
                                <Select placeholder="Select classification layer">
                                    <Select.Option value="Critical">Critical Risk</Select.Option>
                                    <Select.Option value="High">High Severity</Select.Option>
                                    <Select.Option value="Medium">Medium Severity</Select.Option>
                                    <Select.Option value="Low">Low Boundary</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="RCA_TARGET_DATE" label="Target Closure Milestone Date" rules={[{ required: true, message: 'Target milestone boundary is required' }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RcaListPage;