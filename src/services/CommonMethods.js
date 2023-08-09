export const sortByDate = (data) => {
	const sorted = data.sort(function compare(a, b) {
		var dateA = new Date(a.create_date)
		var dateB = new Date(b.create_date)
		return dateA - dateB
	})
	return sorted
}

export const generateId = (projects) => {
	if (projects.length === 0) {
		return '1';
	}
	return `${+projects[projects.length - 1].id + 1}`
}
