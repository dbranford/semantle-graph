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

function set_plot_data(plot_state) {
	if (plot_state.quantity=="score") {
		plot_data[1] = progress[0];
	} else if (plot_state.quantity=="proximity") {
		plot_data[1] = progress[2];
	}
	if (plot_state.measure=="value") {
		plot_data[1] = measure_to_date(plot_data[1], moving_measure_value);
	} else if (plot_state.measure=="max") {
		plot_data[1] = measure_to_date(plot_data[1], moving_measure_max);
	} else if (plot_state.measure=="mean") {
		plot_data[1] = measure_to_date(plot_data[1], moving_measure_mean);
	}
	return plot_data;
}

function measure_to_date(data, func) {
	return Array.from(data, (_,i) => func(data.slice(0,i+1)));
}

function moving_measure_value(data) {
	return data[data.length-1];
}

function moving_measure_max(data) {
	var max = data.reduce(
		(previousValue, currentValue) => Math.max(previousValue, currentValue), 0
	);
	return max;
}

function moving_measure_mean(data) {
	const tot = data.reduce(
		(previousValue, currentValue) => previousValue + currentValue, 0
	);
	return (tot / data.length);
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
		var plot_form = new FormData(form);
		plot_state.quantity = plot_form.get("quantity");
		plot_state.measure = plot_form.get("measure");
		plot_data = set_plot_data(plot_state);

		console.group(`Re-plotting`);
		console.log(`Plotting quantity ${plot_state.quantity}`);
		console.log(`Plotting measure ${plot_state.measure}`);
		console.groupEnd();

		plot_replot(plot_data)
	});
});
