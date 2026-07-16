import React, { useState } from 'react';
// 1. Add Modal, Form, DatePicker, Select to your antd imports
import { Table, Button, Space, Input, Card, Breadcrumb, message, Modal, Form, DatePicker, Select } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined, EyeOutlined, FileAddOutlined } from '@ant-design/icons';
import RcaDetailSubPage from './RcaDetailSubPage';

const { Search } = Input;

export const RcaManagementPage: React.FC = () => {
  const [selectedRca, setSelectedRca] = useState<any | null>(null);
  const [subPageMode, setSubPageMode] = useState<'view' | 'create_capa' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 2. Add states for your new Create Modal form
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock global state data array
  const [table3Data, setTable3Data] = useState([
    { key: 1, RCA_ID: 9001, RCA_DATE: '2026-07-10', RCA_CODE: 'ERR-NET-04', RCA_DETAILS: 'Data drop during peak load', RESPONSIBLE_DEPT: 'Infrastructure', RCA_SEVERITY: 'Critical', RCA_TARGET_DATE: '2026-07-20' },
    { key: 2, RCA_ID: 9002, RCA_DATE: '2026-07-12', RCA_CODE: 'ERR-APP-12', RCA_DETAILS: 'Memory leak on user exit call', RESPONSIBLE_DEPT: 'Software Eng', RCA_SEVERITY: 'High', RCA_TARGET_DATE: '2026-07-28' }
  ]);

  const handleRefresh = () => {
    message.info('Data grid refreshed securely.');
  };

  const handleNavigateToChildView = (record: any, intent: 'view' | 'create_capa') => {
    setSelectedRca(record);
    setSubPageMode(intent);
  };

  // 3. Add the form submit handler function
  const handleCreateRcaSubmit = () => {
    form.validateFields().then(values => {
      const newRcaItem = {
        key: Date.now(),
        RCA_ID: Math.floor(9000 + Math.random() * 1000),
        RCA_DATE: values.RCA_DATE ? values.RCA_DATE.format('YYYY-MM-DD') : '2026-07-16',
        RCA_TARGET_DATE: values.RCA_TARGET_DATE ? values.RCA_TARGET_DATE.format('YYYY-MM-DD') : '2026-07-30',
        RCA_CODE: values.RCA_CODE,
        RCA_DETAILS: values.RCA_DETAILS,
        RESPONSIBLE_DEPT: values.RESPONSIBLE_DEPT,
        RCA_SEVERITY: values.RCA_SEVERITY
      };

      setTable3Data([...table3Data, newRcaItem]);
      setIsCreateModalOpen(false);
      form.resetFields();
      message.success(`Root Cause Record ${values.RCA_CODE} created successfully!`);
    });
  };

  const columnsTable3 = [
    { title: 'RCA Code', dataIndex: 'RCA_CODE', key: 'RCA_CODE' },
    { title: 'Date Identified', dataIndex: 'RCA_DATE', key: 'RCA_DATE' },
    { title: 'Details', dataIndex: 'RCA_DETAILS', key: 'RCA_DETAILS', ellipsis: true },
    { title: 'Owner Unit', dataIndex: 'RESPONSIBLE_DEPT', key: 'RESPONSIBLE_DEPT' },
    { title: 'Severity', dataIndex: 'RCA_SEVERITY', key: 'RCA_SEVERITY' },
    { title: 'Target Settlement', dataIndex: 'RCA_TARGET_DATE', key: 'RCA_TARGET_DATE' },
    {
      title: 'Action Panel',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button size="small" type="primary" ghost icon={<EyeOutlined />} onClick={() => handleNavigateToChildView(record, 'view')}>
            View CAPA
          </Button>
          <Button size="small" icon={<FileAddOutlined />} onClick={() => handleNavigateToChildView(record, 'create_capa')}>
            Create New CAPA
          </Button>
        </Space>
      )
    }
  ];

  if (subPageMode && selectedRca) {
    return (
      <div>
        <Breadcrumb style={{ marginBottom: 16 }} items={[
          { title: <a onClick={() => setSubPageMode(null)}>Root Cause Investigations (Table 3)</a> },
          { title: `Incident Node: ${selectedRca.RCA_CODE}` }
        ]} />
        <RcaDetailSubPage rcaRecord={selectedRca} initialActionIntent={subPageMode} onBackLayout={() => setSubPageMode(null)} />
      </div>
    );
  }

  const filteredData = table3Data.filter(item => 
    item.RCA_CODE.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.RESPONSIBLE_DEPT.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card title="⚠️ Tracked Root Cause Profiles (Table 3 Data Log)" variant="borderless">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, gap: '12px', flexWrap: 'wrap' }}>
        <Search
          placeholder="Search by Code or Responsible Department..."
          allowClear
          enterButton={<SearchOutlined />}
          style={{ maxWidth: 380 }}
          onSearch={(val) => setSearchQuery(val)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh Grid</Button>
          
          {/* 4. UPDATE THE BUTTON: Click to open the Modal view state */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
            Log New Root Cause Item
          </Button>
        </Space>
      </div>

      <Table dataSource={filteredData} columns={columnsTable3} rowKey="RCA_ID" pagination={{ pageSize: 5 }} />

      {/* 5. ADD THE POPUP MODAL FORM FOR INPUTS */}
      <Modal 
        title="Log New Root Cause Item (Table 3 Schema)" 
        open={isCreateModalOpen} 
        onOk={handleCreateRcaSubmit} 
        onCancel={() => setIsCreateModalOpen(false)}
        okText="Save Entry"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="RCA_CODE" label="RCA Unique Code" rules={[{ required: true, message: 'Please input code!' }]}>
            <Input placeholder="e.g. ERR-SYS-99" />
          </Form.Item>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name="RCA_DATE" label="Date Identified" style={{ flex: 1 }}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="RCA_TARGET_DATE" label="Target Date" style={{ flex: 1 }}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name="RESPONSIBLE_DEPT" label="Responsible Department" style={{ flex: 1 }} rules={[{ required: true }]}>
              <Input placeholder="e.g. IT, Security, HR" />
            </Form.Item>
            <Form.Item name="RCA_SEVERITY" label="RCA Severity" style={{ flex: 1 }} rules={[{ required: true }]}>
              <Select options={[
                { value: 'Critical', label: 'Critical' },
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' }
              ]} />
            </Form.Item>
          </div>

          <Form.Item name="RCA_DETAILS" label="Detailed Root Cause Description">
            <Input.TextArea rows={3} placeholder="Provide details of the failure mechanism..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default RcaManagementPage;
