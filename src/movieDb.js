import axios from 'redaxios';

/* 
Hier werden Werte ("Umgebungsvariablen") aus der Datei .env.local
ausgelesen. .env-Dateien können dazu dienen, nicht-öffentliche Zugangsdaten
aus GIT-Verzeichnissen auszuschließen, wobei das hier nicht die Aufgabe ist,
da der API-Key ja im Browser benutzt wird und damit sowieso öffentlich ist.
Ein weiterer Zweck von .env-Dateien ist es, leicht in verschiedenen Umgebungen
(vor allem lokale Entwicklung und Online-Server) verschiedene Werte zu speichern,
etwa für verschiedene Datenbankzugänge.
Dokumentation zur Verwendung von .env-Dateien mit Vite:
https://vitejs.dev/guide/env-and-mode.html#env-files
*/
const { VITE_MOVIEDB_API_KEY_V4 } = import.meta.env;

export const fetchMovieDb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	/* Diese default-Parameter werden mit den Parametern zusammengefügt, die
bei der Verwendung von fetchMovieDb ggf. verwendet werden. Hier also nur
Werte eintragen, die für alle Anfragen gelten sollen, z.B. Sprache oder
API-Key.  */
	params: {
		// api_key: VITE_MOVIEDB_API_KEY_V3,
		language: 'de',
	},
	/* Alternativ kann die Authorisierung auch mit einem Header-Eintrag und einem
  dafür vorgesehenen API-Key erfolgen, bei Version 4 der API ist das Pflicht.
  Header sind Teil des HTTP-Protokolls, es handelt sich um Schlüssel-Wert-Paare,
  die als Text bei jeder Anfrage und Antwort mitgesendet werden. */
	headers: {
		Authorization: `Bearer ${VITE_MOVIEDB_API_KEY_V4}`,
	},
});

export const imageConfig = {
	base_url: 'http://image.tmdb.org/t/p/',
	secure_base_url: 'https://image.tmdb.org/t/p/',
	backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
	logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
	poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
	profile_sizes: ['w45', 'w185', 'h632', 'original'],
	still_sizes: ['w92', 'w185', 'w300', 'original'],
};

export const imageBase = imageConfig.secure_base_url;
