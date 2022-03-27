function plot(guesses, elem) {
	Plotly.newPlot( elem, [{
		x: guesses[3],
		y: guesses[0] }],
		{ margin: { t: 0 } }
	);
}

window.addEventListener("message", (event) => {
guesses = JSON.parse(event.data);
guesses.sort((a,b) => a[3]-b[3]);
progress = guesses[0].map((col, i) => guesses.map(row => row[i]));
plot(progress, document.getElementById("semantle-plot"));
});
