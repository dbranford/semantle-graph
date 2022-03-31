var progress = JSON.parse(window.localStorage.getItem("progress"));
var plot_data = new Array();
var plot_state = {
	quantity: "score",
	measure: "value",
};

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

function set_plot_data(plot_state) {
		if (plot_state.quantity=="score") {
			plot_data[1] = progress[0];
		} else if (plot_state.quantity=="proximity") {
			plot_data[1] = progress[2];
		}
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
		plot_state.quantity = data.get("quantity");
		set_plot_data(plot state);
		if (quantity=="score") {
			plot_status.textContent = "Re-plotting score";	
		} else if (quantity=="proximity") {
			plot_status.textContent = "Re-plotting proximity";	
		}
		plot_replot(plot_data)
	});
});
