const startButton = document.getElementById("start-button");
const clickSound = new Audio("img/Click_stereo.ogg.mp3");
const startScreen = document.getElementById("start-screen");
const rizzlasSound = new Audio("img/rizzlas-rizzlas-c418-224649.mp3");
if (startButton) {
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    setTimeout(() => {
      window.location.href = "./loadingScreen.html/loading.html";
    }, 100);
  });
}
rizzlasSound.play()