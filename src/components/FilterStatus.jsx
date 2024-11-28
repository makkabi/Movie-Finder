export default function FilterStatus({ count }) {
	const cssClasses = `filter-status ${
		count === 0 ? 'filter-status--no-results' : ''
	}`;

	return <div className={cssClasses}>{getStatusText(count)}</div>;
}

function getStatusText(count) {
	switch (count) {
		case 0:
			return 'Kein Film gefunden';
		case 1:
			return 'Ein Film gefunden';
		default:
			return `${count} Filme gefunden`;
	}
}
