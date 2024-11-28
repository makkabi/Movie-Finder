// Das http-Modul von Node importieren, mit dem ein Server erschaffen werden kann
import http from 'http';

/* 
Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
Experimenteller Syntax, um JSON-Dateien zu importieren. Noch nicht
in allen Browsern verfügbar!
https://caniuse.com/mdn-javascript_statements_import_import_attributes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
 */

import allLocations from './zipcodes.de.json' with { type: 'json' };

// Port und Domain, unter der der Server erreichbar ist
const host = 'localhost';
const port = 8000;

// Server erschaffen und Callback-Funktion für Anfragen  übergeben
const server = http.createServer(requestListener);

// Server starten
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});

/* Die Callback-Funktion erhält in req ein Objekt mit allen Details über
die Anfrage ("Request") und mit res ein Objekt mit vielen Methoden für
die Antwort ("Response"). */
function requestListener(req, res) {
	// Header müssen am Anfang gesetzt werden, hier Inhaltstyp und Statuscode
	res.setHeader('Content-Type', 'application/json'); // Für HTML "text/html"
	res.setHeader('Access-Control-Allow-Origin', '*'); // CORS-Header, erlaubt Anfragen von allen Domains
	res.writeHead(200); // "Ok"

	// JS URL-Objekt erstellen und die gesuchte Postleitzahl auslesen
	const url = new URL(req.url, `http://${req.headers.host}`);
	const searchTerm = url.searchParams.get('search');

	console.log(url.searchParams);

	// Array mit Einträgen bzw. leerer Array, falls searchTerm leer ist
	const foundLocations = searchTerm ? getLocations(searchTerm) : [];

	// Array in JSON-String umwandeln und in die Ausgabe schreiben
	res.write(JSON.stringify(foundLocations));
	// Ausgabe beenden, andernfalls läuft der Server ewig

	res.end();
}

function getLocations(searchTerm) {
	/*  Datensatz filtern, zipcode ist ein String und kein Integer, da
    PLZ mit 0 beginnen können. startsWith ist einen String-Methode, die
    prüft, ob ein String mit einem anderen String beginnt, und entsprechend
    true oder false zurückgibt.
    Bei der Ortssuche wird ein Regulärer Ausdruck verwendet, um nicht nur den
    Anfang des Strings zu suchen und dadurch auch Stadteile wie "Berlin Kreuzberg"
    oder Orte wie "Lutherstadt Wittenberg" zu finden. 
*/

	const regExp = new RegExp(searchTerm, 'i');
	return allLocations.filter(
		({ zipcode, place }) => zipcode.startsWith(searchTerm) || regExp.test(place)
	);
}
