/* Hook */
import React, { useEffect, useState } from 'react';

/* Component */
import DatePicker from 'antd/es/date-picker';
import moment from 'moment';
import { Select, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface PropsType {
  id: string,
  startDate: Date,
  endDate: Date,
  changeDate: Function,
  type: 'date' | 'month' | 'year',
  hasType: boolean,
  isEditable: boolean,
}

function DateSelector({
  id,
  startDate,
  endDate,
  changeDate,
  type,
  hasType,
  isEditable,
}: PropsType) {
  function getDateFormat(t: string) {
    switch (t) {
      case 'date':
        return 'YYYY-MM-DD';
      case 'month':
        return 'MMM YYYY';
      case 'year':
        return 'YYYY';
      default:
        return 'YYYY-MM-DD';
    }
  }

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [typeSelect, setTypeSelect] = useState('date' as 'date' | 'month' | 'year');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const handleDateChange = (value: any) => {
    if (value && value[0] && value[1]) {
      // eslint-disable-next-line no-underscore-dangle
      const sd = `${value[0]._d.getFullYear()}-${value[0]._d.getMonth() + 1}-${value[0]._d.getDate()}`;
      // eslint-disable-next-line no-underscore-dangle
      const ed = `${value[1]._d.getFullYear()}-${value[1]._d.getMonth() + 1}-${value[1]._d.getDate()}`;
      setStart(new Date(sd));
      setEnd(new Date(ed));
    }
  };

  const handleSubmit = () => {
    changeDate(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10), typeSelect);
    setPopUpIsOpen(false);
  };

  const handleTypeChange = (e : any) => {
    setTypeSelect(e);
    setDateFormat(getDateFormat(e));
    setPopUpIsOpen(true);
  };

  const handleCancel = () => {
    setStart(startDate);
    setEnd(endDate);
    setTypeSelect(type);
    setDateFormat(getDateFormat(type));
    setPopUpIsOpen(false);
  };

  useEffect(() => {
    setStart(startDate);
    setEnd(endDate);
    setTypeSelect(type);
    setDateFormat(getDateFormat(type));
  }, [startDate, endDate, type]);

  return (
    <div className="time">
      <span className="blog-slider__code">
        <span style={{ color: 'black', lineHeight: '32px' }}>Time:</span>
        <RangePicker
          key={id}
          value={[moment(startDate), moment(endDate)]}
          // eslint-disable-next-line react/jsx-boolean-value
          open={popUpIsOpen}
          bordered={false}
          disabled={!isEditable}
          style={{ marginLeft: 46 }}
          onCalendarChange={handleDateChange}
          format={dateFormat}
          picker={typeSelect}
          onClick={() => setPopUpIsOpen(true)}
          allowClear
          renderExtraFooter={() => (
            <>
              <Select
                value={typeSelect}
                onChange={handleTypeChange}
                className="date-selector-select"
                style={{ marginRight: 5, display: hasType ? 'inline-block' : 'none' }}
              >
                <Option value="date">Date</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
              <Button
                className="date-selector-submit"
                type="primary"
                onClick={handleSubmit}
                style={{ marginRight: 5 }}
              >
                Choose
              </Button>
              <CloseCircleFilled
                className="date-selector-cancel"
                onClick={handleCancel}
              />
            </>
          )}
        />
      </span>
    </div>
  );
}

export default DateSelector;
