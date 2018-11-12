import lodashUniqueId from 'lodash/uniqueId';

const DEFAULT_TOAST = {
	message: '',
	duration: 10000,
};

export class Toast {
	constructor(message) {
		this.id = lodashUniqueId();
		this.message = message || DEFAULT_TOAST.message;
		this.duration = DEFAULT_TOAST.duration;
	}
}
