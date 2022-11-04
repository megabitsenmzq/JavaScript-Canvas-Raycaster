// OSD
var timeEstimate = 0;
var timerRunning = false;
setInterval(updateTimer, 100);

function updateTimer() {
  if (timerRunning) {
    timeEstimate += 100;
  }
}

function resetTimer() {
  timeEstimate = 0;
}

function drawTimer() {
  // Make String
  const millisecondsPart = timeEstimate % 1000 / 100;
  const seconds = Math.floor(timeEstimate / 1000);
  var minutesPart = Math.floor((seconds) / 60);
  var secondsPart = seconds - (minutesPart * 60);

  if (minutesPart < 10) { minutesPart = "0"+ minutesPart; }
  if (secondsPart < 10) { secondsPart = "0"+ secondsPart; }
  const timeString = minutesPart + ':' + secondsPart + '.' + millisecondsPart;

  context.fillStyle = "white";
  context.fillRect(
    SCREEN_WIDTH - 100,
    SCREEN_HEIGHT - 40,
    200,
    80,
  )

  context.fillStyle = "black";
  context.font = "bold 25px Times Roman";
  const textSize = context.measureText(timeString);
  context.fillText(
    timeString, 
    SCREEN_WIDTH - 100 + 8, 
    SCREEN_HEIGHT - 10
  );
}

function drawControlTip() {
  if (pointerLockState) { return; }
  context.fillStyle = "white";
  context.fillRect(
    SCREEN_WIDTH / 2 - 200, 
    SCREEN_HEIGHT / 2 - 40,
    400,
    80,
  )

  context.fillStyle = "black";
  context.font = "bold 25px Times Roman";
  const tipText = "Click to Start";
  const textSize = context.measureText(tipText);
  context.fillText(
    tipText, 
    SCREEN_WIDTH / 2 - textSize.width / 2, 
    SCREEN_HEIGHT / 2
  );

  context.fillStyle = "black";
  context.font = "10px Times Roman";
  const tipText2 = "Move mouse to turn. W / S / A / D to move.";
  const textSize2 = context.measureText(tipText2);
  context.fillText(
    tipText2, 
    SCREEN_WIDTH / 2 - textSize2.width / 2, 
    SCREEN_HEIGHT / 2 + 20
  );
}

function drawOSD() {
  drawTimer();
  drawControlTip();
}