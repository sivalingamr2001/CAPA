import React, { useState } from 'react';
import { Input as AntInput, Badge, Button, Card, DatePicker, Input, message, Popconfirm, Space, Switch, Table, Tabs, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { Database, Plus, Search, Wrench, Edit2, Trash2 } from 'lucide-react';
import MasterModal from '../components/MasterModal';
import type { MasterFieldConfig, RcaSource, SearchState, Source } from '../types';
import { formatDate, today } from '../utils/helpers';
import { initialRcaSources, initialSources } from '../utils/mockData';

const { TextArea } = AntInput;
const { Title, Text } = Typography;

const MasterPage: React.FC = () => {
    const [sources, setSources] = useState<Source[]>(initialSources);
    const [rcaSources, setRcaSources] = useState<RcaSource[]>(initialRcaSources);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTable, setModalTable] = useState<'sources' | 'rcaSources' | null>(null);
    const [editingRecord, setEditingRecord] = useState<Source | RcaSource | null>(null);
    const [searchText, setSearchText] = useState<SearchState>({ sources: '', rca: '' });

    const openModal = (table: 'sources' | 'rcaSources', record?: Source | RcaSource) => {
        setModalTable(table);
        setEditingRecord(record || null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalTable(null);
        setEditingRecord(null);
    };

    const handleSubmitSource = (values: Source) => {
        const now = today();
        if (editingRecord) {
            setSources((prev) =>
                prev.map((s) =>
                    s.SOURCE_ID === (editingRecord as Source).SOURCE_ID
                        ? {
                            ...s,
                            ...values,
                            LAST_UPDATE_DATE: now,
                            INACTIVE_DATE: values.INACTIVE_DATE ? dayjs(values.INACTIVE_DATE as unknown as string).format('YYYY-MM-DD') : null,
                        }
                        : s
                )
            );
            message.success('Source updated successfully');
        } else {
            const newId = Math.max(...sources.map((s) => s.SOURCE_ID), 0) + 1;
            setSources((prev) => [
                ...prev,
                {
                    SOURCE_NAME: values.SOURCE_NAME,
                    SOURCE_ID: newId,
                    CREATION_DATE: now,
                    LAST_UPDATE_DATE: now,
                    INACTIVE_DATE: values.INACTIVE_DATE ? dayjs(values.INACTIVE_DATE as unknown as string).format('YYYY-MM-DD') : null,
                    CREATED_BY: 999,
                },
            ]);
            message.success('Source created successfully');
        }
        closeModal();
    };

    const handleSubmitRcaSource = (values: RcaSource) => {
        const now = today();
        const rawValues = values as unknown as Record<string, unknown>;
        if (editingRecord) {
            setRcaSources((prev) =>
                prev.map((s) =>
                    s.RCA_SOURCE_ID === (editingRecord as RcaSource).RCA_SOURCE_ID
                        ? {
                            ...s,
                            ...values,
                            LAST_UPDATE_DATE: now,
                            RCA_INACTIVE_DATE: values.RCA_INACTIVE_DATE ? dayjs(values.RCA_INACTIVE_DATE as unknown as string).format('YYYY-MM-DD') : null,
                            RCA_LIVE_FLAG: rawValues.RCA_LIVE_FLAG ? 1 : 0,
                        }
                        : s
                )
            );
            message.success('RCA Source updated successfully');
        } else {
            const newId = Math.max(...rcaSources.map((s) => s.RCA_SOURCE_ID), 0) + 1;
            setRcaSources((prev) => [
                ...prev,
                {
                    RCA_SOURCE: values.RCA_SOURCE,
                    RCA_CODE: values.RCA_CODE,
                    RCA_DESCRIPTION: values.RCA_DESCRIPTION,
                    RCA_SOURCE_ID: newId,
                    SOURCE_ID: 1,
                    CREATION_DATE: now,
                    LAST_UPDATE_DATE: now,
                    CREATED_BY: 999,
                    RCA_LIVE_FLAG: rawValues.RCA_LIVE_FLAG ? 1 : 0,
                    RCA_INACTIVE_DATE: values.RCA_INACTIVE_DATE ? dayjs(values.RCA_INACTIVE_DATE as unknown as string).format('YYYY-MM-DD') : null,
                },
            ]);
            message.success('RCA Source created successfully');
        }
        closeModal();
    };

    const handleDelete = (table: 'sources' | 'rcaSources', id: number) => {
        if (table === 'sources') {
            setSources((prev) => prev.filter((s) => s.SOURCE_ID !== id));
        } else {
            setRcaSources((prev) => prev.filter((s) => s.RCA_SOURCE_ID !== id));
        }
        message.success('Record deleted successfully');
    };

    const sourceColumns = [
        { title: 'ID', dataIndex: 'SOURCE_ID', key: 'SOURCE_ID', width: 70 },
        {
            title: 'Source Name',
            dataIndex: 'SOURCE_NAME',
            key: 'SOURCE_NAME',
            sorter: (a: Source, b: Source) => a.SOURCE_NAME.localeCompare(b.SOURCE_NAME),
        },
        { title: 'Created', dataIndex: 'CREATION_DATE', key: 'CREATION_DATE', render: formatDate, width: 130 },
        { title: 'Updated', dataIndex: 'LAST_UPDATE_DATE', key: 'LAST_UPDATE_DATE', render: formatDate, width: 130 },
        {
            title: 'Status',
            key: 'status',
            width: 110,
            render: (_: unknown, r: Source) => (
                <Badge status={r.INACTIVE_DATE ? 'default' : 'success'} text={r.INACTIVE_DATE ? 'Inactive' : 'Active'} />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right' as const,
            render: (_: unknown, record: Source) => (
                <Space size="middle">
                    <Button
                        type="text"
                        size="small"
                        icon={<Edit2 size={14} color="#1677ff" />}
                        onClick={() => openModal('sources', record)}
                    />
                    <Popconfirm title="Delete this source?" onConfirm={() => handleDelete('sources', record.SOURCE_ID)} okText="Yes" cancelText="No">
                        <Button
                            type="text"
                            danger
                            size="small"
                            icon={<Trash2 size={14} color="#ff4d4f" />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const rcaSourceColumns = [
        { title: 'ID', dataIndex: 'RCA_SOURCE_ID', key: 'RCA_SOURCE_ID', width: 70 },
        {
            title: 'Source',
            dataIndex: 'RCA_SOURCE',
            key: 'RCA_SOURCE',
            sorter: (a: RcaSource, b: RcaSource) => a.RCA_SOURCE.localeCompare(b.RCA_SOURCE),
        },
        { title: 'Code', dataIndex: 'RCA_CODE', key: 'RCA_CODE', width: 110 },
        { title: 'Description', dataIndex: 'RCA_DESCRIPTION', key: 'RCA_DESCRIPTION', ellipsis: true },
        {
            title: 'Live',
            key: 'live',
            width: 90,
            render: (_: unknown, r: RcaSource) => <Tag color={r.RCA_LIVE_FLAG ? 'green' : 'red'}>{r.RCA_LIVE_FLAG ? 'Yes' : 'No'}</Tag>,
        },
        {
            title: 'Status',
            key: 'status',
            width: 110,
            render: (_: unknown, r: RcaSource) => (
                <Badge status={r.RCA_INACTIVE_DATE ? 'default' : 'success'} text={r.RCA_INACTIVE_DATE ? 'Inactive' : 'Active'} />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right' as const,
            render: (_: unknown, record: RcaSource) => (
                <Space size="middle">
                    <Button
                        type="text"
                        size="small"
                        icon={<Edit2 size={14} color="#1677ff" />}
                        onClick={() => openModal('rcaSources', record)}
                    />
                    <Popconfirm title="Delete this RCA source?" onConfirm={() => handleDelete('rcaSources', record.RCA_SOURCE_ID)} okText="Yes" cancelText="No">
                        <Button
                            type="text"
                            danger
                            size="small"
                            icon={<Trash2 size={14} color="#ff4d4f" />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredSources = sources.filter((s) => s.SOURCE_NAME.toLowerCase().includes(searchText.sources.toLowerCase()));
    const filteredRcaSources = rcaSources.filter(
        (s) =>
            s.RCA_SOURCE.toLowerCase().includes(searchText.rca.toLowerCase()) ||
            s.RCA_CODE.toLowerCase().includes(searchText.rca.toLowerCase())
    );

    const sourceFields: MasterFieldConfig[] = [
        {
            name: 'SOURCE_NAME',
            label: 'Source Name',
            rules: [{ required: true, message: 'Please enter source name' }],
            component: <Input placeholder="e.g. Internal Audit" />,
        },
        {
            name: 'INACTIVE_DATE',
            label: 'Inactive Date (Optional)',
            isDate: true,
            component: <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />,
        },
    ];  

    const rcaSourceFields: MasterFieldConfig[] = [
        {
            name: 'RCA_SOURCE',
            label: 'RCA Source',
            rules: [{ required: true, message: 'Please enter RCA source' }],
            component: <Input placeholder="e.g. Equipment" />,
        },
        {
            name: 'RCA_CODE',
            label: 'RCA Code',
            rules: [{ required: true, message: 'Please enter code' }],
            component: <Input placeholder="e.g. EQ-001" />,
        },
        {
            name: 'RCA_DESCRIPTION',
            label: 'Description',
            rules: [{ required: true, message: 'Please enter description' }],
            component: <TextArea rows={3} placeholder="Describe the RCA source..." />,
        },
        {
            name: 'RCA_LIVE_FLAG',
            label: 'Live Flag',
            isSwitch: true,
            component: <Switch checkedChildren="Yes" unCheckedChildren="No" />,
        },
        {
            name: 'RCA_INACTIVE_DATE',
            label: 'Inactive Date (Optional)',
            isDate: true,
            component: <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />,
        },
    ];

    return (
        <Card style={{ padding: '0px', border: 'none', background: 'transparent' }} bodyStyle={{ padding: 0 }}>
            <Tabs
                defaultActiveKey="sources"
                type="card"
                size="small"
                items={[
                    {
                        key: 'sources',
                        label: (
                            <Space size="small">
                                <Database size={15} color="#1677ff" style={{ verticalAlign: 'middle' }} />
                                <span style={{ fontWeight: 500 }}>Source Master</span>
                            </Space>
                        ),
                        children: (
                            <Card style={{ borderRadius: '0px 0px 8px 8px', borderTop: 'none', background: '#fff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                    <div>
                                        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>Source Origins Configuration</Title>
                                        <Text type="secondary" style={{ fontSize: 13 }}>
                                            Manage baseline channel origins capturing root cause triggers (e.g., Audits, Complaints).
                                        </Text>
                                    </div>
                                    <Space size="middle">
                                        <Input.Search
                                            placeholder="Search sources..."
                                            allowClear
                                            enterButton={<Search size={14} />}
                                            onChange={(e) => setSearchText((prev) => ({ ...prev, sources: e.target.value }))}
                                            style={{ width: 240 }}
                                        />
                                        <Button
                                            type="primary"
                                            icon={<Plus size={14} />}
                                            onClick={() => openModal('sources')}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            Add Source
                                        </Button>
                                    </Space>
                                </div>
                                <Table
                                    columns={sourceColumns}
                                    dataSource={filteredSources}
                                    rowKey="SOURCE_ID"
                                    size="middle"
                                    pagination={{ pageSize: 5, showSizeChanger: true }}
                                    scroll={{ x: 800 }}
                                />
                            </Card>
                        ),
                    },
                    {
                        key: 'rcaSources',
                        label: (
                            <Space size="small">
                                <Wrench size={15} color="#52c41a" style={{ verticalAlign: 'middle' }} />
                                <span style={{ fontWeight: 500 }}>RCA Source Master</span>
                            </Space>
                        ),
                        children: (
                            <Card style={{ borderRadius: '0px 0px 8px 8px', borderTop: 'none', background: '#fff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                    <div>
                                        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>RCA Sub-Category Mappings</Title>
                                        <Text type="secondary" style={{ fontSize: 13 }}>
                                            Configure underlying operational sub-categories to map targeted descriptive codes.
                                        </Text>
                                    </div>
                                    <Space size="middle">
                                        <Input.Search
                                            placeholder="Search RCA sources..."
                                            allowClear
                                            enterButton={<Search size={14} />}
                                            onChange={(e) => setSearchText((prev) => ({ ...prev, rca: e.target.value }))}
                                            style={{ width: 240 }}
                                        />
                                        <Button
                                            type="primary"
                                            icon={<Plus size={14} />}
                                            onClick={() => openModal('rcaSources')}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            Add RCA Source
                                        </Button>
                                    </Space>
                                </div>
                                <Table
                                    columns={rcaSourceColumns}
                                    dataSource={filteredRcaSources}
                                    rowKey="RCA_SOURCE_ID"
                                    size="middle"
                                    pagination={{ pageSize: 5, showSizeChanger: true }}
                                    scroll={{ x: 1000 }}
                                />
                            </Card>
                        ),
                    },
                ]}
            />

            <MasterModal<Source>
                visible={modalVisible && modalTable === 'sources'}
                onCancel={closeModal}
                onSubmit={handleSubmitSource}
                record={editingRecord as Source | null}
                title="Source"
                fields={sourceFields}
                formName="sourceForm"
            />
            <MasterModal<RcaSource>
                visible={modalVisible && modalTable === 'rcaSources'}
                onCancel={closeModal}
                onSubmit={handleSubmitRcaSource}
                record={editingRecord as RcaSource | null}
                title="RCA Source"
                fields={rcaSourceFields}
                formName="rcaSourceForm"
            />
        </Card>
    );
};

export default MasterPage;
