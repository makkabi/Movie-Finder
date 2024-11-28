import Teaser from './Teaser';

export default function MovieTeasers({ movies }) {
	return (
		<div className="movie-teasers">
			{movies.map((movie) => (
				<Teaser {...movie} key={movie.id} />
			))}
		</div>
	);
}
