import { ArrowLeftOutlined, FileProtectOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, DatePicker, Descriptions, Form, Input, List, message, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface SubPageProps {
  rcaRecord: any;
  initialActionIntent: 'view' | 'create_capa';
  onBackLayout: () => void;
}

export const RcaDetailSubPage: React.FC<SubPageProps> = ({ rcaRecord, initialActionIntent, onBackLayout }) => {
  const [capaList, setCapaList] = useState<any[]>([
    { CAPA_ID: 701, CAPA_DATE: '2026-07-11', ROOT_CAUSE: 'Firewall rules restricted outbound traffic unexpectedly', CORRECTIVE_DETAILS: 'Rolled back immediate rule configurations', PREVENTIVE_DETAILS: 'Implement automated check pipelines', CAPA_REMARKS: 'Resolved within threshold window', CAPA_ATTACHMENT: 'logs_701.pdf' },
    { CAPA_ID: 702, CAPA_DATE: '2026-07-14', ROOT_CAUSE: 'Load balancer session timeout miscalculated', CORRECTIVE_DETAILS: 'Adjusted idle timeout properties to 300s', PREVENTIVE_DETAILS: 'Incorporate runtime alert monitors', CAPA_REMARKS: 'Validation pending staging test runs', CAPA_ATTACHMENT: 'config_dump.json' }
  ]);

  const [selectedCapaIndex, setSelectedCapaIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialActionIntent === 'create_capa') {
      openCapaModal();
    }
  }, [initialActionIntent]);

  const openCapaModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCapaSelection = (index: number) => {
    setSelectedCapaIndex(index);
    console.log(`Action Console: Swapped to CAPA Item Detail View ID - ${capaList[index]?.CAPA_ID}`);
    message.info(`Viewing CAPA Item Entry Reference: #${capaList[index]?.CAPA_ID}`);
  };

  const submitCapaForm = () => {
    form.validateFields().then(values => {
      const generatedNewNode = {
        CAPA_ID: Math.floor(100 + Math.random() * 900),
        CAPA_DATE: values.CAPA_DATE ? values.CAPA_DATE.format('YYYY-MM-DD') : '2026-07-16',
        ...values
      };

      const updatedList = [...capaList, generatedNewNode];
      setCapaList(updatedList);
      setSelectedCapaIndex(updatedList.length - 1);
      setIsModalOpen(false);

      console.log('Action Console: Logged CAPA Item Saved Successfully', generatedNewNode);
      message.success(`CAPA Node Reference #${generatedNewNode.CAPA_ID} Appended Safely!`);
    });
  };

  const currentActiveCapa = capaList[selectedCapaIndex];

  return (
    <div style={{ background: '#fafafa', padding: '16px', borderRadius: '8px' }}>
      {/* Dynamic Header Block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onBackLayout}>Return to Investigation List</Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCapaModal}>Create & Link CAPA Node</Button>
      </div>

      {/* Meta context snapshot board */}
      <Card size="small" style={{ marginBottom: 24, borderLeft: '4px solid #1677ff', background: '#e6f4ff' }}>
        <Descriptions title="Linked Core Incident Master View Context" column={3} size="small">
          <b>{rcaRecord.RCA_CODE}</b>
        </Descriptions>
        <Descriptions.Item label="Severity Classification"><Badge status="error" text={rcaRecord.RCA_SEVERITY} /></Descriptions.Item>
        <Descriptions.Item label="Response Squad Assignment">{rcaRecord.RESPONSIBLE_DEPT}</Descriptions.Item>
      </Card>

      {/* Master Detail Horizontal Layout Workstation splits */}
      <Row gutter={24}>
        {/* LEFT COLUMN: Rail selection map */}
        <Col span={7}>
          <Card title={`CAPA Tasks Map (${capaList.length})`} bodyStyle={{ padding: 0 }} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <List
              dataSource={capaList}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => handleCapaSelection(index)}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    transition: 'all 0.3s',
                    background: selectedCapaIndex === index ? '#f0f5ff' : 'transparent',
                    borderLeft: selectedCapaIndex === index ? '4px solid #1677ff' : '4px solid transparent'
                  }}
                >
                  <List.Item.Meta
                    avatar={<FileProtectOutlined style={{ fontSize: '20px', color: selectedCapaIndex === index ? '#1677ff' : '#8c8c8c' }} />}
                    title={`CAPA Reference Tracker ID: #${item.CAPA_ID}`}
                    description={`Logged date: ${item.CAPA_DATE}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* RIGHT COLUMN: Execution Profile Inspection Surface */}
        <Col span={17}>
          {currentActiveCapa ? (
            <Card title={`Inspecting Data Sheet Entry - Reference Matrix #${currentActiveCapa.CAPA_ID}`} style={{ minHeight: '400px' }}>
              <Descriptions column={2} bordered layout="vertical">
                <Descriptions.Item label="Record Creation Timestamp" span={2}>
                  {currentActiveCapa.CAPA_DATE}
                </Descriptions.Item>
                <Descriptions.Item label="Root Cause Synthesis Analysis" span={2}>
                  <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>{currentActiveCapa.ROOT_CAUSE}</div>
                </Descriptions.Item>
                <Descriptions.Item label="Immediate Corrective Actions Implemented" span={2}>
                  {currentActiveCapa.CORRECTIVE_DETAILS}
                </Descriptions.Item>
                <Descriptions.Item label="Long Term Preventative Actions Engineered" span={2}>
                  {currentActiveCapa.PREVENTIVE_DETAILS}
                </Descriptions.Item>
                <Descriptions.Item label="Engineering Operations Remarks">
                  {currentActiveCapa.CAPA_REMARKS || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Audit Document Attachments Asset Link">
                  <a href={`#download/${currentActiveCapa.CAPA_ATTACHMENT}`} onClick={(e) => { e.preventDefault(); console.log(`Trigger File Download: ${currentActiveCapa.CAPA_ATTACHMENT}`); }}>
                    📁 {currentActiveCapa.CAPA_ATTACHMENT}
                  </a>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : (
            <Card style={{ textAlign: 'center', padding: '40px' }}>No CAPA Items exist for this entry. Click top right to append new tracking records.</Card>
          )}
        </Col>
      </Row>

      {/* Table 4 Modal form asset injection setup */}
      <Modal title="Log New CAPA Structural Action Entry (Table 4)" open={isModalOpen} onOk={submitCapaForm} onCancel={() => setIsModalOpen(false)} width={640} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={{ CAPA_DATE: dayjs() }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="CAPA_DATE" label="Action Log Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="CAPA_ATTACHMENT" label="Verification Document Reference Name"><Input placeholder="e.g. log_patch_v1.pdf" /></Form.Item>
            </Col>
          </Row>
          <Form.Item name="ROOT_CAUSE" label="Confirmed Root Cause Scope Statement" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="CORRECTIVE_DETAILS" label="Corrective Fix Vector Particulars" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="PREVENTIVE_DETAILS" label="Preventative Hardening Procedures Design" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="CAPA_REMARKS" label="Engineering Action Remarks / Notes"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </div >
  );
};

export default RcaDetailSubPage;
