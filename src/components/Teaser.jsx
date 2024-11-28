import { Link, useLocation } from 'wouter';
import { imageBase } from '../movieDb';
export default function Teaser({
	title,
	original_title,
	poster_path,
	release_date,
	id,
}) {
	// https://github.com/molefrog/wouter?tab=readme-ov-file#uselocation-working-with-the-history
	const [, setLocation] = useLocation();
	const posterUrl = poster_path ? `${imageBase}/w342/${poster_path}` : '';

	/* In year soll das Jahr aus release_date gespeichert werden: */
	const year = release_date ? release_date.substring(0, 4) : '';

	const linkTarget = `/movie/${id}`;

	// Verschiedene Techniken, um gesamten article "klickbar" zu machen:
	// https://css-tricks.com/block-links-the-search-for-a-perfect-solution/

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<article className="teaser" onClick={() => setLocation(linkTarget)}>
			<header className="teaser__header">
				<h3 className="teaser__title">
					<Link href={linkTarget}>
						{title} {year && <time dateTime={year}>({year})</time>}
					</Link>
				</h3>
				{/* Originaltitel nur anzeigen, wenn er vom Titel abweicht */}
				{title !== original_title && (
					<em className="teaser__original-title">{original_title}</em>
				)}
			</header>

			<div className="teaser__poster">
				{!posterUrl && (
					<div className="teaser__poster__placeholder" aria-hidden="true">
						🎞️
					</div>
				)}
				{posterUrl && <img src={posterUrl} alt={`Filmplakat ${title}`} />}
			</div>
		</article>
	);
}
