import { useState } from "react";
import { dateToCorrectStringFormat } from "../../../../utils/utils";
import { DateRangePicker } from "react-date-range";

import "./modalDatePicker.css";

const ModalDatePicker = ({
  date,
  setDate,
  title = "Date",
  customClasses = "",
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log(date);

  return (
    <fieldset className={`default-modal-fieldset date-range ${customClasses}`}>
      <legend className="default-modal-legend">{title}</legend>
      <input
        className="default-modal-input"
        disabled={true}
        value={`${dateToCorrectStringFormat(
          date[0].startDate
        )} - ${dateToCorrectStringFormat(date[0].endDate)}`}
      />
      <img
        src="/calendar-icon.png"
        alt="calendar"
        onClick={() => setShowDatePicker((prev) => !prev)}
      />
      {showDatePicker && (
        <div className="date-range-wrapper">
          <DateRangePicker
            onChange={(item) => setDate([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date}
            direction="horizontal"
          />
        </div>
      )}
    </fieldset>
  );
};

export default ModalDatePicker;
