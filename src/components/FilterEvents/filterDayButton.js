import React from 'react'
import Select from 'react-select'
import { connect } from "react-redux";
import { filterByDay } from "../../actions/filterActions";


const options = [0, 1, 2, 3, 4, 5, 6, 7].map(day => {
    if (day === 0) return {value: 0,label: "Today"}
  const value = day;
  let date = new Date();
  const dayInWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  date.setDate(date.getDate() + day);
  const label = dayInWeek[date.getDay()] + " " + date.getMonth() + "/" + date.getDate();
  return { value, label };
});

const FilterDayButton = props => (
    <Select options={options} onChange={day => props.filterByDay(day.value)} placeholder="Today"/>
  )

const mapDispatchToProps = dispatch => ({
  filterByDay: day => dispatch(filterByDay(day))
});

export default connect(
  undefined,
  mapDispatchToProps
)(FilterDayButton);
