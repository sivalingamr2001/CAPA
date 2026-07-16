import { Form, Modal, Space } from 'antd';
import { useEffect } from 'react';
import type { MasterFieldConfig } from '../types';

interface MasterModalProps<T extends object> {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    record: T | null;
    title: string;
    fields: MasterFieldConfig[];
    formName: string;
}

const MasterModal = <T extends object>({
    visible,
    onCancel,
    onSubmit,
    record,
    title,
    fields,
    formName,
}: MasterModalProps<T>) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (record) {
                form.setFieldsValue(record as Record<string, unknown>);
            } else {
                form.resetFields();
                fields.forEach((f) => {
                    if (f.isSwitch) {
                        form.setFieldsValue({ [f.name]: true });
                    }
                });
            }
        }
    }, [visible, record, form, fields]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit({ ...record, ...values } as T);
        });
    };

    return (
        <Modal
            title={
                <Space>
                    <div style={{ width: 4, height: 20, background: '#1677ff', borderRadius: 2 }} />
                    <span style={{ fontWeight: 600 }}>{record ? 'Edit' : 'Create'} {title}</span>
                </Space>
            }
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
            okText={record ? 'Update' : 'Create'}
            cancelText="Cancel"
            destroyOnClose
        >
            <Form form={form} layout="vertical" name={formName} style={{ marginTop: 16 }}>
                {fields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={field.rules || []}
                        valuePropName={field.isSwitch ? 'checked' : undefined}
                    >
                        {field.component}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default MasterModal;