var progress = JSON.parse(window.localStorage.getItem("progress"));
var plot_data = new Array();
var plot_state;

function plot(plot_data) {
	Plotly.newPlot( plot_canvas, [{
		x: plot_data[0],
		y: plot_data[1] }],
		{ margin: { t: 0 } }
	);
	var drawn = true;
}

function plot_replot(plot_data) {
	Plotly.newPlot( plot_canvas, [{
		x: plot_data[0],
		y: plot_data[1] }],
		{ margin: { t: 0 } }
	);
}

function plot_button() {
	plot_status.textContent="Re-plotting";
	plot_replot(progress)
	plot_status.textContent="Re-plotted";
}

window.addEventListener("load", (event) => {
	plot_status = document.getElementById("semantle-graph-status")
	plot_canvas = document.getElementById("semantle-plot")
	form = document.querySelector("form");
	button = document.querySelector("button");

	if (progress == null){
		plot_status.textContent = "Waiting for data...";	
		var plot_data = [[0],[0]];
	} else {
		plot_status.textContent = "Data found.";	
		var plot_data = [progress[3],progress[0]];
	}

	plot(plot_data);

	button.addEventListener("click", (event) => {
		var data = new FormData(form);
		let quantity = data.get("quantity");
		if (quantity=="score") {
			plot_status.textContent = "Re-plotting score";	
			plot_data[1] = progress[0];
		} else if (quantity=="proximity") {
			plot_status.textContent = "Re-plotting proximity";	
			plot_data[1] = progress[2];
		}
		plot_replot(plot_data)
	});
});
