const startButton = document.getElementById("start-button");
const clickSound = new Audio("img/Click_stereo.ogg.mp3");
const startScreen = document.getElementById("start-screen");

if (startButton) {
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    clickSound.play()
    setTimeout(() => {
      window.location.href = "./loadingScreen.html/loading.html";
    }, 180);
  });
}
