/*
	У пользователя есть:

	* ФИО (обязательно, не больше 100 символов)
	* Дата рождения (обязательно, в форме трех селектов)
	* Адрес (одной строкой)
	* Город
	* Телефон (российский мобильный)
*/
class BaseProto {

	init(data) {
		Object.assign(this, data);

		return this;
	}

}

class User extends BaseProto {

	constructor(data) {
		super();

		this.id = null;

		this.name = null;
		this.birthdate = null;
		this.address = null;
		this.city = null;
		this.phone = null;
	}

}

export {
	User as User
};
