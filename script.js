let game = {
  team1: {
    shots: {
      one: {
        made: 0, 
        missed: 0
      },
      two: {
        made: 0, 
        missed: 0
      },
      three: {
        made: 0, 
        missed: 0
      }
    }, 
    fouls: 0,
    turnovers: 0
  }, 
  team2: {
    shots: {
      one: {
        made: 0, 
        missed: 0
      },
      two: {
        made: 0, 
        missed: 0
      },
      three: {
        made: 0, 
        missed: 0
      }
    }, 
    fouls: 0,
    turnovers: 0
  }
};
var team = 0;
var point = 0;
document.getElementById('videoFile').addEventListener('change', function(event) {
  var videoElement = document.getElementById('myVideo');
  var file = event.target.files[0];
  if (file && file.type.startsWith('video/')) {
    var videoURL = URL.createObjectURL(file);
    videoElement.src = videoURL;
  } else {
    alert('Please choose a valid video file.');
  }
});


function Team1_click() {
  document.getElementById("team-buttons").style.display = "none";
  document.getElementById("main-buttons").style.display = "block";
  document.getElementById('myVideo').pause();
  team = 1;
}

function Team2_click() {
  document.getElementById("team-buttons").style.display = "none";
  document.getElementById("main-buttons").style.display = "block";
  document.getElementById('myVideo').pause();
  team = 2;
}


function Shot_click() {
  document.getElementById("main-buttons").style.display = "none";
  document.getElementById("point-buttons").style.display = "block";
}

function Foul_click() {
  document.getElementById("main-buttons").style.display = "none";
  document.getElementById("team-buttons").style.display = "block";
  if (team == 1) {
    game.team1.fouls += 1;
  }
  else if (team == 2) {
    game.team2.fouls += 1;
  };
  
  console.log(game);
}

function Turnover_click() {
  document.getElementById("main-buttons").style.display = "none";
  document.getElementById("team-buttons").style.display = "block";
  if (team == 1) {
    game.team1.turnovers += 1;
  }
  else if (team == 2) {
    game.team2.turnovers += 1;
  };
  console.log(game);
}


function onept_click() {
  document.getElementById("point-buttons").style.display = "none";
  document.getElementById("result-buttons").style.display = "block";
  point = 1;
}

function twopt_click() {
  document.getElementById("point-buttons").style.display = "none";
  document.getElementById("result-buttons").style.display = "block";
  point = 2;
}

function threept_click() {
  document.getElementById("point-buttons").style.display = "none";
  document.getElementById("result-buttons").style.display = "block";
  point = 3;
}

function made_click() {
  document.getElementById("result-buttons").style.display = "none";
  document.getElementById("team-buttons").style.display = "block";
  if (team == 1) {
    if (point == 1) {
      game.team1.shots.one.made += 1;
    }
    if (point == 2) {
      game.team1.shots.two.made += 1;
    }
    if (point == 3) {
      game.team1.shots.three.made += 1;
    }
  }
  else if (team == 2) {
    if (point == 1) {
      game.team2.shots.one.made += 1;
    }
    if (point == 2) {
      game.team2.shots.two.made += 1;
    }
    if (point == 3) {
      game.team2.shots.three.made += 1;
    }
  };
  console.log(game);
}

function missed_click() {
  document.getElementById("result-buttons").style.display = "none";
  document.getElementById("team-buttons").style.display = "block";
  if (team == 1) {
    if (point == 1) {
      game.team1.shots.one.missed += 1;
    }
    if (point == 2) {
      game.team1.shots.two.missed += 1;
    }
    if (point == 3) {
      game.team1.shots.three.missed += 1;
    }
  }
  else if (team == 2) {
    if (point == 1) {
      game.team2.shots.one.missed += 1;
    }
    if (point == 2) {
      game.team2.shots.two.missed += 1;
    }
    if (point == 3) {
      game.team2.shots.three.missed += 1;
    }
  };
  console.log(game);
}

function Highlight_click() {
  
}