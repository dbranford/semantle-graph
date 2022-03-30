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
