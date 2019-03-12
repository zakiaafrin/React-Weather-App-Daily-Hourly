import React from "react";

const Date = () => {
  let currentDate = new Date().getDate();
  return <span>{currentDate}</span>;
};

export default Date;
