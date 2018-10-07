import React from 'react';

import UserList from './user-list/user-list.jsx';

class Application extends React.Component {

	render () {
		let props = this.props;
		let users = props.users;
		let newUser = {
			name: 'Name',
			birthdate: Date.now(),
			address: 'Address',
			city: 'City',
			phone: '79231234567',
		};

		return (
			<div>
				<UserList
					users={users}
					onAdd={this.onAddUser.bind(this)}
					onChange={props.onChange}
					onRemove={props.onRemove}
				/>
			</div>
		);
	}

	onAddUser(userInfo) {
		let props = this.props;

		props.onAdd(userInfo);
	}
}

export default Application;
