javascript:
graphWindow = window.open("https://dbranford.github.io/index.html", "graph");
graphWindow.postMessage(localStorage.getItem("guesses"), "https://dbranford.github.io");
