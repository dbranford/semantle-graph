window.addEventListener("message", (event) => {
  let guesses = JSON.parse(event.data);
  guesses.sort((a,b) => a[3]-b[3]);
  var progress = guesses[0].map((col, i) => guesses.map(row => row[i]));
  window.localStorage.setItem("progress", JSON.stringify(progress));
  if (drawn==true) {
    plot_replot();
		plot_status.textContent = "New data received.";	
  }
});
