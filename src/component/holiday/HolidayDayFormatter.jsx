import React from "react";
import Moment from "react-moment";

const HolidayDayFormatter = ({row}) => {
  const { holiday_date } = row || {};
  return <Moment format={"dddd"}>{holiday_date}</Moment>;
};

export default HolidayDayFormatter;
