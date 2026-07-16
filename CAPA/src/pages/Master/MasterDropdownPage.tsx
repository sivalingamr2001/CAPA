import React, { useState } from 'react';
import { Tabs, Table, Button, Space, Modal, Form, Input, DatePicker, Select, Switch } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export const MasterDropdownPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  // Mock Data store for presentation
  const sourceData = [
    { key: 1, SOURCE_ID: 101, SOURCE_NAME: 'Internal Audit', CREATION_DATE: '2026-01-10' },
    { key: 2, SOURCE_ID: 102, SOURCE_NAME: 'Customer Complaint', CREATION_DATE: '2026-02-15' }
  ];

  const rcaSourceData = [
    { key: 1, RCA_SOURCE_ID: 501, SOURCE_ID: 101, RCA_SOURCE: 'Equipment Failure', RCA_CODE: 'EQ-01', RCA_DESCRIPTION: 'Hardware malfunction', RCA_LIVE_FLAG: 1 }
  ];

  const openModal = (record?: any) => {
    setEditingItem(record || null);
    if (record) {
      form.setFieldsValue({
        ...record,
        CREATION_DATE: record.CREATION_DATE ? dayjs(record.CREATION_DATE) : null,
        RCA_INACTIVE_DATE: record.RCA_INACTIVE_DATE ? dayjs(record.RCA_INACTIVE_DATE) : null,
        RCA_LIVE_FLAG: record.RCA_LIVE_FLAG === 1
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Action Triggered (Save Master):', values);
      setIsModalOpen(false);
    });
  };

  const table1Columns = [
    { title: 'Source ID', dataIndex: 'SOURCE_ID', key: 'SOURCE_ID' },
    { title: 'Source Name', dataIndex: 'SOURCE_NAME', key: 'SOURCE_NAME' },
    { title: 'Creation Date', dataIndex: 'CREATION_DATE', key: 'CREATION_DATE' },
    { title: 'Actions', key: 'actions', render: (_: any, record: any) => <Button type="text" icon={<EditOutlined />} onClick={() => openModal(record)}>Edit</Button> }
  ];

  const table2Columns = [
    { title: 'RCA Source ID', dataIndex: 'RCA_SOURCE_ID', key: 'RCA_SOURCE_ID' },
    { title: 'RCA Source', dataIndex: 'RCA_SOURCE', key: 'RCA_SOURCE' },
    { title: 'RCA Code', dataIndex: 'RCA_CODE', key: 'RCA_CODE' },
    { title: 'Description', dataIndex: 'RCA_DESCRIPTION', key: 'RCA_DESCRIPTION' },
    { title: 'Status', dataIndex: 'RCA_LIVE_FLAG', key: 'RCA_LIVE_FLAG', render: (val: number) => (val === 1 ? 'Live' : 'Inactive') },
    { title: 'Actions', key: 'actions', render: (_: any, record: any) => <Button type="text" icon={<EditOutlined />} onClick={() => openModal(record)}>Edit</Button> }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <h2>🗂️ Dropdown Masters Configuration</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
          Create New {activeTab === '1' ? 'Source Master' : 'RCA Source Master'}
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
        { key: '1', label: 'Table 1: Source Master', children: <Table dataSource={sourceData} columns={table1Columns} pagination={false} /> },
        { key: '2', label: 'Table 2: RCA Source Variant Master', children: <Table dataSource={rcaSourceData} columns={table2Columns} pagination={false} /> }
      ]} />

      <Modal title={`${editingItem ? 'Update' : 'Create'} Configuration Data`} open={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)} destroyOnClose>
        <Form form={form} layout="vertical">
          {activeTab === '1' ? (
            <>
              <Form.Item name="SOURCE_ID" label="Source ID" rules={[{ required: true }]}><Input type="number" disabled={!!editingItem} /></Form.Item>
              <Form.Item name="SOURCE_NAME" label="Source Name" rules={[{ required: true }]}><Input /></Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="RCA_SOURCE_ID" label="RCA Source ID" rules={[{ required: true }]}><Input type="number" disabled={!!editingItem} /></Form.Item>
              <Form.Item name="SOURCE_ID" label="Map Parent Source ID" rules={[{ required: true }]}><Select options={[{ value: 101, label: 'Internal Audit' }, { value: 102, label: 'Customer Complaint' }]} /></Form.Item>
              <Form.Item name="RCA_SOURCE" label="RCA Source Title" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="RCA_CODE" label="RCA Unique Code" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="RCA_DESCRIPTION" label="Detailed Description"><Input.TextArea rows={3} /></Form.Item>
              <Form.Item name="RCA_LIVE_FLAG" label="Is Dynamic Active Node?" valuePropName="checked"><Switch /></Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MasterDropdownPage;
