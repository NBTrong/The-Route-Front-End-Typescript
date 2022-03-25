/* Hook */
import React, { useState } from 'react';

/* Component */
import {
  Modal, Form, Input, Button,
} from 'antd';

import DateSelector from '../DateSelector';

interface ModalAddMilestonePropsType {
  isModalVisible: boolean,
  confirmLoading: boolean,
  handleOk: (formData: any) => void,
  handleCancel: () => void
}

function ModalAddMilestone({
  isModalVisible,
  confirmLoading,
  handleOk,
  handleCancel,
}: ModalAddMilestonePropsType) {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState<'date' | 'month' | 'year'>('date');

  const handleChangeDate = (start: any, end: any, t: 'date' | 'month' | 'year') => {
    setStartDate(start);
    setEndDate(end);
    setType(t);
  };

  const onFinish = () => {
    const options = {
      ...form.getFieldsValue(),
      startDate: new Date(startDate).toISOString().substring(0, 10),
      endDate: new Date(endDate).toISOString().substring(0, 10),
      type,
    };
    handleOk(options);
  };

  return (
    <>
      <Modal
        title="New Milestone"
        className="Modal-addRoadmap"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              handleCancel();
              form.resetFields();
            }}
          >
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={() => {
              onFinish();
              form.resetFields();
            }}
          >
            Submit
          </Button>]}
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
        >
          <Form.Item
            className="form-item"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Des"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ justifyContent: 'left !important' }}
          >
            <DateSelector
              id="add"
              changeDate={handleChangeDate}
              startDate={startDate}
              endDate={endDate}
              type={type}
              hasType
              isEditable
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* <Loading /> */}
    </>
  );
}

export default ModalAddMilestone;
