import { Events } from '../core/utils.js';

class BaseModel extends Events {

	constructor() {
		super();

		this.events = new Events();
		// this.users = [];
	}

	on(...params) { this.events.on(...params); }
	un(...params) { this.events.un(...params); }
	fire(...params) { this.events.fire(...params); }
}

export default BaseModel;
