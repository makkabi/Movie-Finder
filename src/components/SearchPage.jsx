import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import defaultMovies from '../defaultMovies';
import { fetchMovieDb } from '../movieDb';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

import MovieTeasers from './MovieTeasers';
import FilterForm from './FilterForm';
import FilterStatus from './FilterStatus';

export default function SearchPage() {
	const [searchTerm, setSearchTerm] = useState(() => getInitialSearchTerm());

	const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

	useSearchParams(debouncedSearchTerm);

	const {
		data: movies = [],
		isError,
		isPending,
		isSuccess,
	} = useQuery({
		queryKey: ['movies', debouncedSearchTerm],
		queryFn: fetchMovies,
	});

	return (
		<>
			<Helmet>
				<title>Filmdatenbank</title>
				<meta
					name="description"
					content="Finden Sie Ihre Lieblingsfilme in der Datenbank"
				/>
			</Helmet>
			<FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{isError && (
				<strong>Es gab ein Problem 🙁. Vielleicht hilft Neuladen?</strong>
			)}
			{isPending && <strong>Laden…</strong>}
			{isSuccess && movies !== defaultMovies && (
				<FilterStatus count={movies.length} />
			)}
			<MovieTeasers movies={movies} />
		</>
	);
}

/* 
1. Nutzt den useDebouncedValue-Hook, um mit 600 Millisekunden Verzögerung
den Wert von searchTerm in eine Variable namens debouncedSearchTerm zu
speichern.
2. Nutzt useQuery und fetchMovieDB, um die zu debouncedSearchTerm passenden Filme 
zu laden, wenn debouncedSearchTerm mindestens zwei Buchstaben enthält.
Bei einem kürzeren String sollen die defaultMovies angezeigt werden.
https://developers.themoviedb.org/3/search/search-movies
3. Speichert die geladenen Filme in movies
4. Zeigt zwischen FilterForm und MovieTeasers die Komponente FilterStatus an,
aber nur dann, wenn nicht die defaultMovies angezeigt werden und die Suchanfrage
erfolgreich war.

*/

async function fetchMovies({ queryKey }) {
	const searchTerm = queryKey[1];

	if (searchTerm.length < 2) {
		return defaultMovies;
	}

	const { data } = await fetchMovieDb('/search/movie', {
		params: {
			query: searchTerm,
		},
	});

	return data.results;
}

function getInitialSearchTerm() {
	const url = new URL(window.location.href);
	return url.searchParams.get('search') ?? '';
}

function useSearchParams(debouncedSearchTerm) {
	useEffect(() => {
		const url = new URL(window.location.href);
		url.searchParams.delete('search');

		if (debouncedSearchTerm.length >= 2) {
			url.searchParams.set('search', debouncedSearchTerm);
		}

		window.history.replaceState({}, '', url);
	}, [debouncedSearchTerm]);
}
