import { useState } from 'react';
import axios from 'redaxios';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';

export default function LocationFinderReactQuery() {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebouncedValue(search, 600);

	const {
		data: locations = [],
		isSuccess,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['locations', debouncedSearch],
		queryFn: fetchLocations,
	});

	return (
		<div className="location-finder">
			<label htmlFor="search">PLZ oder Ortsname</label>
			<input
				id="search"
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{isError && <strong>{error.message}</strong>}
			{isPending && <strong>Laden…</strong>}
			{isSuccess && (
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
			)}
		</div>
	);
}

async function fetchLocations({ queryKey }) {
	const search = queryKey[1];

	if (search.length < 2) {
		return [];
	}

	await new Promise((resolve) => setTimeout(resolve, 3000));

	const { data } = await axios('http://localhost:8000', {
		params: {
			search,
		},
	});

	return data;
}

/* Stellt innerhalb von ul den Inhalt von locations dar, für jeden Eintrag
ein li-Element, das einen Link enthält. Link-Text ist Name und Postleitzahl,
Linkziel ist https://www.openstreetmap.org/#map=14/latitude/longitude,
latitude und longitude dabei mit den Werten aus der Datenbank ersetzen.
Beispiel: <li><a href="https://www.openstreetmap.org/#map=14/123/456">12345 Ortsname</a></li>
*/
