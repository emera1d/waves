import React from 'react';
import l10n from '../../l10n.js';
import { UtilsDate, UtilsPhone } from '../../core/utils.js';
import DatePicker from '../date-picker/date-picker.jsx';

const PHONE_PATTERN = '7[0-9]{10}';

class UserEdit extends React.Component {

	constructor(props) {
		super(props);

		let user = props.user || {};

		this._onInput= this.onInput.bind(this);
		this._onChange = this.onChange.bind(this);
		this._onInvalid = this.onInvalid.bind(this);
		this._onChangeDate = this.onChangeDate.bind(this);

		// let user = this.props.user || {};

		this.initialState = {
			name: user.name || '',
			birthdate: user.birthdate || Date.now(),
			address: user.address || '',
			city: user.city || '',
			phone: user.phone || ''
		};

		this.state = {};
		Object.assign(this.state, this.initialState);
	}

	resetState() {
		this.setState(this.initialState);
	}

	render () {
		let state = this.state;
		let user = state;

		let date;
		let birthday;
		let birthmonth;
		let birthyear;

		if(user.birthdate) {
			date = new Date(user.birthdate);

			birthday = date.getDate();
			birthmonth = date.getMonth() + 1;
			birthyear = date.getFullYear();
		}

		return (
			<div className="ctr user-item">
				<form onSubmit={this.onSave.bind(this)}>
					<div className="ctd cell cell-name">
						<input
							type="text"
							name="name"
							value={user.name}
							onChange={this._onChange}
							onInput={this._onInput}
							onInvalid={this._onInvalid}
							placeholder={l10n('USER_NAME')} maxLength="100" autoComplete="nope" required />
					</div>
					<div className="ctd cell cell-birthdate">
						<DatePicker value={user.birthdate} onChange={this._onChangeDate}/>
					</div>
					<div className="ctd cell cell-address">
						<input
							type="text"
							name="address"
							value={user.address}
							onChange={this._onChange}
							onInput={this._onInput}
							onInvalid={this._onInvalid}
							placeholder={l10n('USER_ADDRESS')} autoComplete="nope" required />
					</div>
					<div className="ctd cell cell-city">
						<input
							type="text"
							name="city"
							value={user.city}
							onChange={this._onChange}
							onInput={this._onInput}
							onInvalid={this._onInvalid}
							placeholder={l10n('USER_CITY')} autoComplete="nope" required />
					</div>
					<div className="ctd cell cell-phone">
						<input
							type="text"
							name="phone"
							value={user.phone}
							onChange={this._onChange}
							onInput={this._onInput}
							onInvalid={this._onInvalid}
							placeholder={l10n('USER_PHONE')} pattern={PHONE_PATTERN} maxLength="11" autoComplete="nope" required />
					</div>
					<div className="ctd cell cell-action">
						<button type="submit" className="btn-add">{l10n('BTN_SAVE')}</button>
					</div>
				</form>
			</div>
		);
	}

	onChange(event) {
		let el = event.target;
		let fldName = el.name;
		let value = el.value;

		switch (fldName) {
			case 'name':
			case 'address':
			case 'city':
			case 'phone':
				this.setState({ [fldName]: value });
				this.forceUpdate();
				el.classList.remove('error');
				break;
		}
	}

	onChangeDate(value) {
		this.setState({ birthdate: value });
		this.forceUpdate();
	}

	onSave(event) {
		let props = this.props;

		event.preventDefault();

		props.onSave(this.props.user, this.state);

		this.resetState();
	}

	onInput(event) {
		let el = event.target;
		let fldName = el.name;
		let value = el.value;

		el.setCustomValidity('');
	}

	onInvalid(event) {
		let el = event.target;
		let fldName = el.name;
		let value = el.value;

		this.checkValidity(el);
	}

	checkValidity(el) {
		// input.type, input.validity, customMessages
		let validity = el.validity;
		let message;

		if(validity.patternMismatch) {
			message = l10n('ERR_INP_PATTERN_MISMATCH');
		} else {
			if(el.value) {
				message = '';
			} else {
				message = l10n('ERR_INP_REQUIRED');
			}
		}

		el.setCustomValidity(message);
	}

	renderMonths() {
		return [1,2,3,4,5,6,7,8,9,10,11,12].map(function(val) {
			return (
				<option value={val}>{val}</option>
			);
		})
	}
}

export default UserEdit;
