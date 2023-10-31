import React from "react";

const HolidayImageFormatter = ({ cell, row, handleImageShow }) => {
  const { holiday_img } = row;
  const { url } = holiday_img || {};
  return (
    <div>
      <img
        className="holidayimage_hiegth"
        src={url}
        alt=" "
        onClick={() => handleImageShow(url)}
      />
    </div>
  );
};

export default HolidayImageFormatter;
