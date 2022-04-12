var drawn = false;

window.addEventListener("message", (event) => {
	let guesses = JSON.parse(event.data);
	guesses.sort((a,b) => a[3]-b[3]);
	var progress = guesses[0].map((col, i) => guesses.map(row => row[i]));
	progress[2] = progress[2].map(x => x * 1);
	window.localStorage.setItem("progress", JSON.stringify(progress));
	if (drawn==true) {
		plot_data = set_plot_data(plot_state);
		plot_replot(plot_data);
		plot_status.textContent = "New data received.";
	}
});
