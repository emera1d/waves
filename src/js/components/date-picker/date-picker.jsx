import React from 'react';
import { UtilsDate } from '../../core/utils.js';

class DatePicker extends React.Component {

	constructor(props) {
		super(props);

		this._onChange = this.onChange.bind(this);

		let date = new Date(props.value);

		this.initialState = {
			value: props.value,

			day: date.getDate(),
			month: date.getMonth() + 1, 
			year: date.getFullYear()
		};

		this.state = {};
		Object.assign(this.state, this.initialState);
	}

	resetState() {
		this.setState(this.initialState);
	}

	render () {
		let state = this.state;

		return (
			<div>
				<select name="day" value={state.day} onChange={this._onChange}>{this.renderDays()}</select>
				<select name="month" value={state.month} onChange={this._onChange}>{this.renderMonths()}</select>
				<select name="year" value={state.year} onChange={this._onChange}>{this.renderYears()}</select>
			</div>
		);
	}

	onChange(event) {
		let el = event.target;
		let name = el.name;
		let value = Number(el.value);
		let timestamp;

		let date = {
			day: this.state.day,
			month: this.state.month,
			year: this.state.year
		};

		date[name] = value;
		timestamp = new Date(date.year, date.month-1, date.day).getTime();

		this.setState({
			value: timestamp,
			[name]: value
		});

		this.props.onChange(timestamp);
	}

	renderDays() {
		let list = [];
		let count = UtilsDate.getDaysInMonth(this.state.month, this.state.year);

		for(var i = 1; i <= count; i++) {
			list.push(i);
		}

		return this.renderOptionsList(list);
	}

	renderMonths() {
		let list = [1,2,3,4,5,6,7,8,9,10,11,12];

		return this.renderOptionsList(list);
	}

	renderYears() {
		let list = [];
		let currentYear = new Date().getFullYear();
		let count = 20;

		for(var i = 0; i <= count; i++) {
			list.push(currentYear-i);
		}

		return this.renderOptionsList(list);
	}

	renderOptionsList(list) {
		return list.map(function(val, index) {
			return (
				<option value={val} key={index}>{(val<10?'0':'')+val}</option>
			);
		});
	}
}

export default DatePicker;
