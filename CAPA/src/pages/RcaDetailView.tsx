import {
    Input as AntInput,
    Badge,
    Button, Card, Col,
    DatePicker,
    Descriptions, Divider, Empty,
    Form,
    Input,
    List,
    message,
    Modal, notification,
    Row, Space, Tag, Tree, Typography,
} from 'antd';
import dayjs from 'dayjs';
import {
    AlertTriangle,
    ArrowLeft,
    Bell,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    Crosshair,
    FileText,
    FolderOpen,
    Paperclip,
    Plus,
    Printer,
    Shield,
    Target,
    UserCheck,
    Wrench
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { CapaDetail, RcaDetail } from '../types';
import { formatDate, today } from '../utils/helpers';
import { initialCapaDetails, initialRcaDetails } from '../utils/mockData';

const { Title, Text } = Typography;
const { TextArea } = AntInput;

interface RcaDetailViewProps {
    rcaId: number;
    onBack: () => void;
    openCapaModal?: boolean;
}

interface TreeNodeData {
    title: React.ReactNode;
    key: string;
    children?: TreeNodeData[];
    capaId?: number;
}

const RcaDetailView: React.FC<RcaDetailViewProps> = ({ rcaId, onBack, openCapaModal = false }) => {
    const [selectedCapaId, setSelectedCapaId] = useState<number | null>(null);
    const [createCapaModal, setCreateCapaModal] = useState<boolean>(openCapaModal);
    const [capaData, setCapaData] = useState<CapaDetail[]>(initialCapaDetails);
    const [form] = Form.useForm();

    const rca: RcaDetail | undefined = initialRcaDetails.find((r) => r.RCA_ID === rcaId);
    const capaList: CapaDetail[] = capaData.filter((c) => c.RCA_ID === rcaId);
    const selectedCapa: CapaDetail | undefined = capaList.find((c) => c.CAPA_ID === selectedCapaId);

    const treeData: TreeNodeData[] = useMemo(
        () => [
            {
                title: (
                    <Space>
                        <Tag color="blue" icon={<FileText size={12} />}>RCA</Tag>
                        <Text strong>{rca?.RCA_CODE}</Text>
                    </Space>
                ),
                key: `rca-${rcaId}`,
                children: capaList.map((capa) => ({
                    title: (
                        <Space>
                            <Tag color="green" icon={<Shield size={12} />}>CAPA</Tag>
                            <Text>CAPA-{String(capa.CAPA_ID).padStart(3, '0')}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {formatDate(capa.CAPA_DATE)}
                            </Text>
                        </Space>
                    ),
                    key: `capa-${capa.CAPA_ID}`,
                    capaId: capa.CAPA_ID,
                })),
            },
        ],
        [rcaId, capaList, rca]
    );

    const handleCreateCapa = (values: Record<string, unknown>) => {
        const now = today();
        const newId = Math.max(...capaData.map((c) => c.CAPA_ID), 0) + 1;
        const newCapa: CapaDetail = {
            RCA_ID: rcaId,
            CAPA_ID: newId,
            CAPA_DATE: values.CAPA_DATE ? dayjs(values.CAPA_DATE as string).format('YYYY-MM-DD') : now,
            ROOT_CAUSE: values.ROOT_CAUSE as string,
            CORRECTIVE_DETAILS: values.CORRECTIVE_DETAILS as string,
            PREVENTIVE_DETAILS: values.PREVENTIVE_DETAILS as string,
            CAPA_REMARKS: (values.CAPA_REMARKS as string) || null,
            CAPA_ATTACHMENT: (values.CAPA_ATTACHMENT as string) || null,
            LAST_UPDATE_DATE: now,
        };
        setCapaData((prev) => [...prev, newCapa]);
        setSelectedCapaId(newId);
        message.success(`CAPA-${String(newId).padStart(3, '0')} created successfully`);
        setCreateCapaModal(false);
        form.resetFields();
    };

    const handleTreeSelect = (keys: React.Key[]) => {
        const key = keys[0] as string;
        if (key && key.startsWith('capa-')) {
            const capaId = parseInt(key.replace('capa-', ''), 10);
            setSelectedCapaId(capaId);
        } else {
            setSelectedCapaId(null);
        }
    };

    const handleAction = (action: 'print' | 'toast', capa: CapaDetail) => {
        if (action === 'print') {
            console.log('PRINT CAPA:', JSON.stringify(capa, null, 2));
            message.success('CAPA data printed to console');
        } else if (action === 'toast') {
            notification.success({
                message: (
                    <Space>
                        <Shield size={16} />
                        <span>CAPA-{String(capa.CAPA_ID).padStart(3, '0')} Details</span>
                    </Space>
                ),
                description: (
                    <div>
                        <div style={{ marginBottom: 4 }}>
                            <Crosshair size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                            <strong>Root Cause:</strong> {capa.ROOT_CAUSE}
                        </div>
                        <div style={{ marginBottom: 4 }}>
                            <Wrench size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                            <strong>Corrective:</strong> {capa.CORRECTIVE_DETAILS}
                        </div>
                        <div>
                            <Shield size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                            <strong>Preventive:</strong> {capa.PREVENTIVE_DETAILS}
                        </div>
                    </div>
                ),
                duration: 5,
                placement: 'topRight',
            });
        }
    };

    if (!rca) return <Empty description="RCA not found" />;

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button icon={<ArrowLeft size={16} />} onClick={onBack}>
                    Back to List
                </Button>
                <Title level={4} style={{ margin: 0 }}>
                    <Space>
                        <FileText size={22} />
                        RCA Detail View
                    </Space>
                </Title>
            </Space>

            <Row gutter={24}>
                {/* Left Sidebar - Tree */}
                <Col span={7}>
                    <Card
                        title={
                            <Space>
                                <FolderOpen size={18} />
                                <Text strong>CAPA Items</Text>
                                <Badge count={capaList.length} style={{ backgroundColor: '#52c41a' }} />
                            </Space>
                        }
                        extra={
                            <Button type="primary" size="small" icon={<Plus size={14} />} onClick={() => setCreateCapaModal(true)}>
                                New CAPA
                            </Button>
                        }
                        bodyStyle={{ padding: '12px', minHeight: 500 }}
                    >
                        <Tree
                            treeData={treeData}
                            defaultExpandAll
                            onSelect={handleTreeSelect}
                            selectedKeys={selectedCapaId ? [`capa-${selectedCapaId}`] : [`rca-${rcaId}`]}
                            blockNode
                        />
                    </Card>
                </Col>

                {/* Right Content - Details */}
                <Col span={17}>
                    {!selectedCapaId ? (
                        <Card
                            title={
                                <Space>
                                    <Tag color="blue" icon={<FileText size={12} />}>RCA</Tag>
                                    <Text strong>{rca.RCA_CODE}</Text>
                                </Space>
                            }
                        >
                            <Descriptions bordered column={2} size="middle">
                                <Descriptions.Item label={
                                    <Space size={4}><Calendar size={14} />RCA Date</Space>
                                }>{formatDate(rca.RCA_DATE)}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><AlertTriangle size={14} />Severity</Space>
                                }>
                                    <Tag color={rca.RCA_SEVERITY === 'Critical' ? 'red' : rca.RCA_SEVERITY === 'High' ? 'orange' : rca.RCA_SEVERITY === 'Medium' ? 'gold' : 'green'}>
                                        {rca.RCA_SEVERITY}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Building2 size={14} />Department</Space>
                                }>{rca.RESPONSIBLE_DEPT}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Target size={14} />Target Date</Space>
                                }>{formatDate(rca.RCA_TARGET_DATE)}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><CheckCircle2 size={14} />Status</Space>
                                }>
                                    {rca.RCA_CLOSED_DATE ? (
                                        <Badge status="success" text="Closed" />
                                    ) : (
                                        <Badge status="processing" text="Open" />
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Clock size={14} />Closed Date</Space>
                                }>{formatDate(rca.RCA_CLOSED_DATE)}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><FileText size={14} />Details</Space>
                                } span={2}>
                                    {rca.RCA_DETAILS}
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Clock size={14} />Last Updated</Space>
                                }>{formatDate(rca.LAST_UPDATE_DATE)}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><UserCheck size={14} />Approved By</Space>
                                }>User #{rca.RCA_APPROVED_USER}</Descriptions.Item>
                            </Descriptions>

                            <Divider orientation="vertical">
                                <Space>
                                    <Shield size={16} />
                                    <Text strong>Linked CAPA Summary</Text>
                                </Space>
                            </Divider>
                            <List
                                dataSource={capaList}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <Button size="small" icon={<FileText size={14} />} onClick={() => setSelectedCapaId(item.CAPA_ID)}>
                                                View Details
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={
                                                <Space>
                                                    <Tag color="green" icon={<Shield size={12} />}>CAPA-{String(item.CAPA_ID).padStart(3, '0')}</Tag>
                                                    <Text>{formatDate(item.CAPA_DATE)}</Text>
                                                </Space>
                                            }
                                            description={
                                                <div>
                                                    <Text type="secondary"><Crosshair size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />Root Cause: </Text>
                                                    <Text>{item.ROOT_CAUSE}</Text>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    ) : selectedCapa ? (
                        <Card
                            title={
                                <Space>
                                    <Tag color="green" icon={<Shield size={12} />}>CAPA</Tag>
                                    <Text strong>CAPA-{String(selectedCapa.CAPA_ID).padStart(3, '0')}</Text>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        for {rca.RCA_CODE}
                                    </Text>
                                </Space>
                            }
                            extra={
                                <Space>
                                    <Button icon={<Printer size={16} />} onClick={() => handleAction('print', selectedCapa)}>
                                        Print Console
                                    </Button>
                                    <Button type="primary" icon={<Bell size={16} />} onClick={() => handleAction('toast', selectedCapa)}>
                                        Show Toast
                                    </Button>
                                </Space>
                            }
                        >
                            <Descriptions bordered column={1} size="middle" layout="vertical">
                                <Descriptions.Item label={
                                    <Space size={4}><Calendar size={14} />CAPA Date</Space>
                                }>
                                    {formatDate(selectedCapa.CAPA_DATE)}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Space size={4}>
                                            <Crosshair size={16} />
                                            <Text strong>Root Cause</Text>
                                        </Space>
                                    }
                                    style={{ background: '#fff2f0' }}
                                >
                                    <Text>{selectedCapa.ROOT_CAUSE}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Space size={4}>
                                            <Wrench size={16} />
                                            <Text strong>Corrective Action</Text>
                                        </Space>
                                    }
                                    style={{ background: '#f6ffed' }}
                                >
                                    <Text>{selectedCapa.CORRECTIVE_DETAILS}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Space size={4}>
                                            <Shield size={16} />
                                            <Text strong>Preventive Action</Text>
                                        </Space>
                                    }
                                    style={{ background: '#e6f7ff' }}
                                >
                                    <Text>{selectedCapa.PREVENTIVE_DETAILS}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><FileText size={14} />Remarks</Space>
                                }>
                                    {selectedCapa.CAPA_REMARKS || '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Paperclip size={14} />Attachment</Space>
                                }>
                                    {selectedCapa.CAPA_ATTACHMENT ? (
                                        <Space>
                                            <Paperclip size={14} />
                                            <Text >{selectedCapa.CAPA_ATTACHMENT}</Text>
                                        </Space>
                                    ) : (
                                        '-'
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label={
                                    <Space size={4}><Clock size={14} />Last Updated</Space>
                                }>
                                    {formatDate(selectedCapa.LAST_UPDATE_DATE)}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    ) : (
                        <Empty description="Select a CAPA item from the tree" />
                    )}
                </Col>
            </Row>

            {/* Create CAPA Modal */}
            <Modal
                title={
                    <Space>
                        <Plus size={20} />
                        <span>Create New CAPA for {rca.RCA_CODE}</span>
                    </Space>
                }
                open={createCapaModal}
                onOk={() => form.submit()}
                onCancel={() => {
                    setCreateCapaModal(false);
                    form.resetFields();
                }}
                width={700}
                okText="Create CAPA"
            >
                <Form form={form} layout="vertical" onFinish={handleCreateCapa} style={{ marginTop: 16 }}>
                    <Form.Item name="CAPA_DATE" label={
                        <Space size={4}><Calendar size={14} />CAPA Date</Space>
                    } rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item name="ROOT_CAUSE" label={
                        <Space size={4}><Crosshair size={14} />Root Cause</Space>
                    } rules={[{ required: true }]}>
                        <TextArea rows={2} placeholder="What is the root cause of this issue?" />
                    </Form.Item>
                    <Form.Item name="CORRECTIVE_DETAILS" label={
                        <Space size={4}><Wrench size={14} />Corrective Action</Space>
                    } rules={[{ required: true }]}>
                        <TextArea rows={2} placeholder="What immediate action was taken?" />
                    </Form.Item>
                    <Form.Item name="PREVENTIVE_DETAILS" label={
                        <Space size={4}><Shield size={14} />Preventive Action</Space>
                    } rules={[{ required: true }]}>
                        <TextArea rows={2} placeholder="What will prevent recurrence?" />
                    </Form.Item>
                    <Form.Item name="CAPA_REMARKS" label={
                        <Space size={4}><FileText size={14} />Remarks (Optional)</Space>
                    }>
                        <TextArea rows={2} placeholder="Any additional notes..." />
                    </Form.Item>
                    <Form.Item name="CAPA_ATTACHMENT" label={
                        <Space size={4}><Paperclip size={14} />Attachment (Optional)</Space>
                    }>
                        <Input placeholder="e.g. report.pdf" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RcaDetailView;
