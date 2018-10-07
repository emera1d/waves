import './application.less';

import RCRenderer from './core/react-component-renderer.js';

import ApplicationComponent from './components/application.jsx';
import UserListModel from './models/user-list.js';

class CApplication {

	constructor() {

		let node = document.querySelector('.app-container');

		this.renderer = new RCRenderer(ApplicationComponent, node);
		this.userList = new UserListModel();

		this.userList.on('loaded', this.onUserListLoad.bind(this));
		this.userList.on('update', this.onUserListUpdate.bind(this));
	}

	start() {
		this.userList.load();
	}

	onUserListLoad() {
		this.redrawUserList();
	}

	onUserListUpdate() {
		this.redrawUserList();
	}

	redrawUserList() {
		let users = this.userList.users;

		this.renderer.setProps({
			users: users,

			onAdd: this.onAddUser.bind(this),
			onChange: this.onChangeUser.bind(this),
			onRemove: this.onRemoveUser.bind(this)
		});
	}

	onAddUser(userInfo) {
		this.userList.addUser(userInfo);
	}

	onChangeUser(user, userFields) {
		this.userList.changeUser(user, userFields);
	}

	onRemoveUser(userId) {
		this.userList.removeUser(userId);
	}
}

let app = new CApplication();

app.start();

export default CApplication;
