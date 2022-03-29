const storage = window.localStorage;

function plot(guesses, elem) {
	Plotly.newPlot( elem, [{
		x: guesses[3],
		y: guesses[0] }],
		{ margin: { t: 0 } }
	);
}

var progress = JSON.parse(storage.getItem("progress"));
if (progress != null){
window.addEventListener("load", (event) => {
plot(progress, document.getElementById("semantle-plot"));
});
}

window.addEventListener("message", (event) => {
guesses = JSON.parse(event.data);
guesses.sort((a,b) => a[3]-b[3]);
var progress = guesses[0].map((col, i) => guesses.map(row => row[i]));
storage.setItem("progress", JSON.stringify(progress));
plot(progress, document.getElementById("semantle-plot"));
});
