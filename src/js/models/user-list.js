import BaseModel from './base-model.js';

import { User } from '../api/api.js';

const STORE_KEY = 'users';

class UserListModel extends BaseModel {

	// constructor() {
	// 	// super();
	// }

	load() {
		let stored = localStorage.getItem(STORE_KEY);

		this.users = stored ? JSON.parse(stored) : [];

this.users = this.users.length > 0 ? this.users : [
	{ id: 1, name: 'Ivanov A.A.', birthdate: Date.now(), address: 'Address one', city: 'Moscow', phone: '79261234567' },
	{ id: 2, name: 'Ivanov A.B.', birthdate: Date.now(), address: 'Address two', city: 'Paris', phone: '79261234567' },
	{ id: 3, name: 'Ivanov A.C.', birthdate: Date.now(), address: 'Address three', city: 'London', phone: '79261234567' },
	{ id: 4, name: 'Ivanov B.A.', birthdate: Date.now(), address: 'Address four', city: 'Petersburg', phone: '79261234567' },
	{ id: 5, name: 'Ivanov B.B.', birthdate: Date.now(), address: 'Address five', city: 'Turin', phone: '79261234567' },
	{ id: 6, name: 'Ivanov B.C.', birthdate: Date.now(), address: 'Address six', city: 'Leon', phone: '79261234567' },
	{ id: 7, name: 'Ivanov B.C.', birthdate: Date.now(), address: 'Address six', city: 'Leon', phone: '79261234567' },
	{ id: 8, name: 'Ivanov B.B.', birthdate: Date.now(), address: 'Address five', city: 'Turin', phone: '79261234567' },
	{ id: 9, name: 'Ivanov B.C.', birthdate: Date.now(), address: 'Address six', city: 'Leon', phone: '79261234567' },
	{ id: 10, name: 'Ivanov B.C.', birthdate: Date.now(), address: 'Address six', city: 'Leon', phone: '79261234567' }
];
		this.users = this.users.map(function(userInfo) {
			return new User().init(userInfo);
		});

		this.fire('loaded');
	}

	save() {
		localStorage.setItem(STORE_KEY, JSON.stringify(this.users));
	}

	addUser(userInfo) {
		var newUser = new User();

		newUser.id = Date.now();
		newUser.init(userInfo);

		this.users.push(newUser);

		this.save();
		this.fire('update');
	}

	changeUser(changedUser, userInfo) {
		let user = this.users.find(function(user) {
			return user.id == changedUser.id;
		});

		user.init(userInfo);

		this.save();
		this.fire('update');
	}

	removeUser(userId) {
		this.users = this.users.filter(function(user) {
			return user.id != userId;
		});

		this.save();
		this.fire('update');
	}

}

export default UserListModel;
