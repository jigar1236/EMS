import React from "react";
import Moment from "react-moment";

const HolidayDateFormatter = ({row}) => {
  const { holiday_date } = row || {};
  console.log("🚀 ~ file: HolidayDateFormatter.jsx:6 ~ HolidayDateFormatter ~ holiday_date:", holiday_date)
  return <Moment format={"DD-MM-YYYY"}>{holiday_date}</Moment>;
};

export default HolidayDateFormatter;
