/* Hook */
import React, { useState } from 'react';

/* Component */
import DatePicker from 'antd/es/date-picker';
import moment from 'moment';
import { Select, Button } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

// DateSelector's props
// @param {number} id - id of the date selector
// @param {string} startDate - start date of the date selector
// @param {string} endDate - end date of the date selector
// @param {Function} changeDate - function to change the date
// @param {string} type - type of the date selector, either day, month or year
// @param {boolean} hasType - whether the date selector's type is editable
// @param {boolean} isEditable - whether the date selector is editable or not
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

  const [dateFormat, setDateFormat] = useState(getDateFormat(type));

  function handleDateChange(value: any) {
    if (value && value[0] && value[1]) {
      // eslint-disable-next-line no-underscore-dangle
      const sd = `${value[0]._d.getFullYear()}-${value[0]._d.getMonth() + 1}-${value[0]._d.getDate()}`;
      // eslint-disable-next-line no-underscore-dangle
      const ed = `${value[1]._d.getFullYear()}-${value[1]._d.getMonth() + 1}-${value[1]._d.getDate()}`;
      if (hasType) {
        changeDate(
          new Date(sd).toISOString().slice(0, 10),
          new Date(ed).toISOString().slice(0, 10),
          type,
        );
      } else {
        changeDate(
          new Date(sd).toISOString().slice(0, 10),
          new Date(ed).toISOString().slice(0, 10),
        );
      }
    }
  }

  const handleTypeChange = (e : any) => {
    setDateFormat(getDateFormat(e));
    changeDate(startDate, endDate, e);
  };

  return (
    <div className="time">
      <span className="blog-slider__code">
        <span style={{ color: 'black', lineHeight: '32px' }}>Time:</span>
        <RangePicker
          key={id}
          defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
          bordered={false}
          disabled={!isEditable}
          style={{ marginLeft: 46 }}
          onCalendarChange={(value) => handleDateChange(value)}
          format={dateFormat}
          picker={type}
          onOk={(value) => console.log(value)}
          allowClear
          renderExtraFooter={() => (
            <>
              {isEditable
                && hasType
                && (
                  <Select
                    value={type}
                    onChange={handleTypeChange}
                    className="date-selector-select"
                  >
                    <Option value="date">Date</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                )}
              <Button type="primary"> Submit </Button>
            </>
          )}
        />
      </span>
    </div>
  );
}

export default DateSelector;
