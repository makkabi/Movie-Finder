import { useQuery } from '@tanstack/react-query';
import { fetchMovieDb } from '../movieDb';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet-async';

export default function Movie({ params: { id } }) {
	/* Hier die Filmdaten laden und in movieData speichern.
	https://developers.themoviedb.org/3/movies/get-movie-details
	*/

	const {
		data: movieData,
		isPending,
		error,
	} = useQuery({
		queryKey: ['movie', id],
		queryFn: fetchMovie,
	});

	if (isPending) {
		return <BallTriangle />;
	}

	if (error) {
		return <strong>{error.message}</strong>;
	}

	const { title, original_title, overview, release_date, runtime, genres } =
		movieData;

	const date = release_date
		? new Date(release_date).toLocaleDateString('de')
		: '';

	return (
		<article className="movie">
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<h1 className="movie__title">{title}</h1>
			{title !== original_title && (
				<em className="movie__original-title">{original_title}</em>
			)}
			{overview && <p className="movie__overview">{overview}</p>}
			<h2>Details</h2>
			<dl className="movie__details">
				{date && (
					<>
						<dt>Datum</dt>
						<dd>24.3.2022</dd>
					</>
				)}
				{runtime && (
					<>
						<dt>Dauer</dt>
						<dd>{runtime} Min.</dd>
					</>
				)}
				{genres.length > 0 && (
					<>
						<dt>{genres.length === 1 ? 'Genre' : 'Genres'}</dt>
						<dd>{genres.map(({ name }) => name).join(', ')}</dd>
					</>
				)}
			</dl>
		</article>
	);
}

async function fetchMovie({ queryKey: [, id] }) {
	const { data } = await fetchMovieDb(`/movie/${id}`);

	return data;
}

/* 

Hinweise: 
- Originaltitel nur anzeigen, wenn er vom deutschen Titel abweicht

- Overview nur anzeigen, wenn vorhanden.

- Falls Erscheinungsdatum vorhanden, das Datum anzeigen.
Bonus: Datum mit Hilfe der toLocaleDateString-Methode des Date-Objekts
im deutschen Format anzeigen:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

- Genres als kommagetrennten String anzeigen, hier können zwei
Array-Methoden mit chaining verbunden und genutzt werden.
Je nachdem, ob es ein oder mehrere Genres gibt, soll in dt Genre oder
Genres stehen.

Bonus: Filmtitel als Seitentitel darstellen

Bonus: Stellt statt dem article-Element mit den Filmdaten eine Ladeanzeige 
   von https://mhnpd.github.io/react-loader-spinner/ dar, bis die Filmdaten 
   geladen sind. 

   
Infos zum HTML-Element dl (description list):
https://www.mediaevent.de/xhtml/dl.html
http://html5doctor.com/the-dl-element/ 

*/
