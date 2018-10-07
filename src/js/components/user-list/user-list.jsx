import './user-list.less';

import React from 'react';
import l10n from '../../l10n.js';
import UserView from './user-view.jsx';
import UserEdit from './user-edit.jsx';

class UserList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			edit: {}
		};
	}

	render () {
		let props = this.props;
		let users = props.users.map(this.renderUser, this);

		return (
			<div className="ctable user-list">
				<div className="cthead">
					<div className="ctr">
						<div className="cth cell cell-name">{l10n('USER_NAME')}</div>
						<div className="cth cell cell-birthdate">{l10n('USER_BIRTHDATE')}</div>
						<div className="cth cell cell-address">{l10n('USER_ADDRESS')}</div>
						<div className="cth cell cell-city">{l10n('USER_CITY')}</div>
						<div className="cth cell cell-phone">{l10n('USER_PHONE')}</div>
						<div className="cth cell cell-action"></div>
					</div>
				</div>
				<div className="ctbody">
					{users}
				</div>
				<div className="ctfoot">
					<UserEdit
						// user={user}
						key={'user-edit'}
						onSave={this.onAdd.bind(this)}
					/>
				</div>
			</div>
		);
	}

	renderUser(user, index) {
		return (
			user.id in this.state.edit
				? <UserEdit
					user={user}
					key={index}
					onSave={this.onSave.bind(this)}
				/>
				:  <UserView
					user={user}
					key={index}
					onEdit={this.onEdit.bind(this)}
					onRemove={this.onRemove.bind(this)}
				/>
		);
	}

	onAdd(user, userInfo) {
		this.props.onAdd(userInfo);
	}

	onEdit(user) {
		this.state.edit[user.id] = true;
		this.forceUpdate();
	}

	onSave(user, userInfo) {
		delete this.state.edit[user.id];
		// this.forceUpdate();

		this.props.onChange(user, userInfo);
	}

	onRemove(user) {
		this.props.onRemove(user.id);
	}

}

export default UserList;
