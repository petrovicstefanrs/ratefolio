import moment from 'moment';

export const toHumanReadableDate = date => {
	return moment(date).format('DD.MM.YYYY');
};
