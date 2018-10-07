import { Locale } from './core/utils.js';

let RUSSIAN = {
	USER_NAME: 'имя',
	USER_BIRTHDATE: 'дата рождения',
	USER_ADDRESS: 'адрес',
	USER_CITY: 'город',
	USER_PHONE: 'телефон',

	ERR_INP_REQUIRED: 'необходимо указать знаечние',
	ERR_INP_PATTERN_MISMATCH: 'некорректное значение',

	BTN_SAVE: 'сохранить',
	BTN_EDIT: 'редактировать',
	BTN_REMOVE: 'удалить'
};

let ENGLISH = {
	USER_NAME: 'name',
	USER_BIRTHDATE: 'birthdate',
	USER_ADDRESS: 'address',
	USER_CITY: 'city',
	USER_PHONE: 'phone',

	ERR_INP_REQUIRED: 'enter value',
	ERR_INP_PATTERN_MISMATCH: 'invalid format',

	BTN_SAVE: 'save',
	BTN_EDIT: 'edit',
	BTN_REMOVE: 'remove'
};

let dictionary = {
	RUSSIAN: RUSSIAN,
	ENGLISH: ENGLISH
};

export default function(tag) {
	let locale = Locale.getLocale();
	let dict;

	switch (true) {
		case /^en/i.test(locale):
			dict = dictionary.ENGLISH;
			break;

		case /^ru/i.test(locale):
			dict = dictionary.RUSSIAN;
			break;

		default:
			dict = dictionary.ENGLISH;
			break; 
	}

	return dict.hasOwnProperty(tag) ? dict[tag] : tag;
};
