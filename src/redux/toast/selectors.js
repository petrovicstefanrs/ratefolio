export const getToast = state => {
	const toastRecord = state.toast.toJS();
	const {toast} = toastRecord;

	const message = toast ? toast.message : null;

	return message;
};
