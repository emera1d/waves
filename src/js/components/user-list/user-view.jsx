import React from 'react';
import l10n from '../../l10n.js';
import { UtilsDate, UtilsPhone } from '../../core/utils.js';

class UserView extends React.Component {

	render () {
		let props = this.props;

		let user = props.user;
		let birthdate = user.birthdate ? UtilsDate.toLocalString(user.birthdate) : '';
		let phone = user.phone ? UtilsPhone.format(user.phone) : '';

		return (
			<div className="ctr user-item" >
				<div className="ctd cell cell-name">{user.name}</div>
				<div className="ctd cell cell-birthdate">{birthdate}</div>
				<div className="ctd cell cell-address">{user.address}</div>
				<div className="ctd cell cell-city">{user.city}</div>
				<div className="ctd cell cell-phone">{phone}</div>
				<div className="ctd cell cell-action">
					<button onClick={this.onEdit.bind(this)} className="btn-edit">{l10n('BTN_EDIT')}</button>
					<button onClick={this.onRemove.bind(this)} className="btn-remove">{l10n('BTN_REMOVE')}</button>
				</div>
			</div>
		);
	}

	onEdit() {
		this.props.onEdit(this.props.user);
	}

	onRemove() {
		this.props.onRemove(this.props.user);
	}

}

export default UserView;
