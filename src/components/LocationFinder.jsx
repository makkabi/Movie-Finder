import { useEffect, useState } from 'react';
import axios from 'redaxios';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function LocationFinder() {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebouncedValue(search, 600);

	const [locations, setLocations] = useState([]);
	const [error, setError] = useState(null);

	useSearch(debouncedSearch, setLocations, setError);

	return (
		<div className="location-finder">
			<label htmlFor="search">PLZ oder Ortsname</label>
			<input
				id="search"
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{error?.message && <strong>{error.message}</strong>}
			<ul>
				{locations.map(({ zipcode, place, latitude, longitude }) => (
					<li key={zipcode + place + longitude}>
						<a
							href={`https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`}
						>
							{zipcode} {place}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

function useSearch(debouncedSearch, setLocations, setError) {
	useEffect(() => {
		let ignore = false;
		setError(null);

		if (debouncedSearch.length < 2) {
			setLocations([]);
			return;
		}

		async function fetchLocations() {
			try {
				const { data } = await axios('http://localhost:8000', {
					params: {
						search: debouncedSearch,
					},
				});

				if (ignore) {
					return;
				}

				setLocations(data);
			} catch (error) {
				console.log(error);
				setError(error);
				setLocations([]);
			}
		}

		fetchLocations();

		return () => (ignore = true);
	}, [debouncedSearch, setError, setLocations]);
}

/* Stellt innerhalb von ul den Inhalt von locations dar, für jeden Eintrag
ein li-Element, das einen Link enthält. Link-Text ist Name und Postleitzahl,
Linkziel ist https://www.openstreetmap.org/#map=14/latitude/longitude,
latitude und longitude dabei mit den Werten aus der Datenbank ersetzen.
Beispiel: <li><a href="https://www.openstreetmap.org/#map=14/123/456">12345 Ortsname</a></li>
*/
