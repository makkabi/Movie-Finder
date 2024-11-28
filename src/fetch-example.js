try {
	/* Diese Zeile würde das Programm zum Absturz bringen, wenn
    sie nicht in einem try-catch-Block stehen würde. D.h. nicht
    der Zugriff auf eine Eigenschaft von null führt zum Absturz,
    sondern die Tatsache, dass der Fehler "uncaught", also nicht
    aufgefangen wäre. Danach wüsste JavaScript nicht, ob der restliche
    Code stabil und sicher läuft, und beendet das Programm.
    Wenn man den Fehler dagegen in einem catch-Block auffängt,
    geht JavaScript davon aus, dass man auf den Fehler reagiert,
    und führt den weiteren Code aus. */
	const data = null; // Hier wird eigentlich ein Array in data erwartet

	console.log(data.length);

	console.log('Diese Zeile wird nicht erreicht');
} catch (error) {
	console.log(error);
} finally {
	console.log('Code in finally wird immer ausgeführt. Finally ist optional.');
}

async function fetchExample(search) {
	try {
		const response = await fetch(`http://localhost:8000/?search=${search}`);
		console.log(response);

		/* response.ok ist true, wenn die Antwort einen "guten" Statuscode hat,
    z.B. 200. Beim Statuscode 404 ("nicht gefunden") wäre ok false, aber
    das würde keine Error erzeugen, da die Anfrage ja korrekt funktioniert
    hat, auch wenn mir die Antwort nicht gefällt. D.h. hier müssen wir
    selbst auf einen guten Statuscode (der die gewünschten Daten liefert)
    prüfen und dann selbst einen Fehler werfen. Die Zeilen nach if werden
    dann nicht mehr ausgeführt, und JavaScript spingt in den catch-Block. */
		if (!response.ok) {
			throw new Error('Fehler beim Laden der Daten!');
		}

		const data = await response.json();

		console.log(data);
	} catch (error) {
		/* Hier solle nicht nur in der Konsole etwas ausgegeben werden, sondern
      es sollte z.B. den Usern angezeigt werden, dass etwas mit der Anfrage
      schief ging. */
		console.log(error);
	}

	console.log('Weiter geht es!');
}

fetchExample('10999');
