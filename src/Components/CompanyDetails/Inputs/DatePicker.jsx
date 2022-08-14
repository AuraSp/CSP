import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '../../../Styles/InputsSection/datePicker.css';


function DatePicker({ currentDate, handleEvent, handleCallback }) {

  return (
    <div className='w-50 m-auto text-center'>
      <DateRangePicker
        onEvent={(picker) => handleEvent(picker)}
        onCallback={handleCallback}
        initialSettings={{ startDate: currentDate.value, endDate: currentDate.value }}
      >
        <input type="text" className="border border-danger text-light text-center dateInput" />
      </DateRangePicker>
    </div>
  )

}

export default DatePicker