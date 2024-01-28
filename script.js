class Player {
    constructor(name) {
        this.name = name;
    }
}


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

const team1 = ["Gunn",
    new Player('KA'),
    new Player('IR'),
    new Player('IF'),
    new Player('LW'),
    new Player('AM')
];

const team2 = ["Paly",
    new Player('Kane Do'),
    new Player('Tanmay Adya'),
    new Player('Ben Larris'),
    new Player('Jake Wang'),
    new Player('Someone else')
];

const teams = [team1, team2]

function HideAll() {
    const classes = ["ParentAction", "ShotType", "PlayerSelect", "MakePage", "MadeShot", "MissedShot", "FreeThrow", "StealCheck",
        "AddComment"];

    for (let i = 0; i < classes.length; i++) {
        const elements = document.getElementsByClassName(classes[i]);
        for (let j = 0; j < elements.length; j++) {
            elements[j].style.display = 'none';
        }
    }
}

function showElements(className) {
    HideAll();
    const elements = document.getElementsByClassName(className);
    for (let j = 0; j < elements.length; j++) {
        elements[j].style.display = 'flex';
    }
}

function PlayerSelect() {
    const playerNames = [teams[currentTeam][1].name, teams[currentTeam][2].name, teams[currentTeam][3].name, teams[currentTeam][4].name, teams[currentTeam][5].name];
    const playerButtons = ['p1', 'p2', 'p3', 'p4', 'p5'];

    document.getElementById("Team 1").textContent = String(teams[0][0] + " team")
    document.getElementById("Team 2").textContent = String(teams[1][0] + " team")
    document.getElementById("Other team").textContent = String(teams[(currentTeam + 1) % 2][0] + "'s Players")
    for (let i = 0; i < 5; i++) {
        const button = document.getElementById(playerButtons[i]);
        button.textContent = playerNames[i];
    }
}


var videoElement = document.getElementById('myVideo');

var currentTeam = 0;
var currentPage = "ParentAction"
var ActionStorage = [];
var GameStorage = [];

showElements("ParentAction");

// All event listeners

document.getElementById('FG Attempt').addEventListener('click', function() {
    showElements("ShotType");
    currentPage = "ShotType"
    ActionStorage = [];
    ActionStorage.push("FG Attempt");
});

document.getElementById('2pts').addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "WhoShot"
    ActionStorage.push("2pts");
    PlayerSelect();
});

document.getElementById('3pts').addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "WhoShot"
    ActionStorage.push("3pts");
    PlayerSelect();
});

document.getElementById('Other team').addEventListener('click', function() {
    currentTeam = (currentTeam + 1) % 2;
    showElements("PlayerSelect");
    PlayerSelect();
});

document.getElementById('Made').addEventListener('click', function() {
    showElements("MadeShot");
    currentPage = "Made"
    ActionStorage.push("Made");
});

document.getElementById("Assist").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Assist"
    ActionStorage.push("Assist");
});

document.getElementById("Rebound").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Rebound"
    ActionStorage.push("Rebound");
});

document.getElementById("Block").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Block"
    ActionStorage.push("Block");
});

document.getElementById("MadeShootingFoul").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "ShootingFoul"
    ActionStorage.push("ShootingFoul");
});

document.getElementById("MissedShootingFoul").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "ShootingFoul"
    ActionStorage.push("ShootingFoul");
});

document.getElementById("Turnover").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Turnover"
    ActionStorage.push("Turnover");
    PlayerSelect();
});

document.getElementById("Steal").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Steal"
    ActionStorage.push("Steal");
    PlayerSelect();
});

document.getElementById("Highlight").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "Highlight";
    ActionStorage.push("Highlight");
    PlayerSelect();
});

document.getElementById("AddComment").addEventListener('click', function() {
    showElements("ParentAction");
    currentPage = "ParentAction";
    ActionStorage.push("Comment: " + document.getElementById("Comment").value);
});

document.getElementById("Foul").addEventListener('click', function() {
    showElements("PlayerSelect");
    currentPage = "FoulPlayer";
    ActionStorage.push("Foul");
    PlayerSelect();
});

var continueButtons = document.getElementsByClassName("Continue");
for (var i = 0; i < continueButtons.length; i++) {
    continueButtons[i].addEventListener('click', function() {
        showElements("ParentAction");
        currentPage = "ParentAction";
        console.log(ActionStorage);
        GameStorage.push(ActionStorage);
    });
}

document.getElementById("Missed").addEventListener('click', function() {
    showElements("MissedShot");
    currentPage = "MissedShot"
    ActionStorage.push("Missed");
});

document.getElementById("FTMade").addEventListener('click', function() {
    ActionStorage.push("FTMade");
    let ShotType = parseInt(ActionStorage[1][0]);
    let ShotMade = ActionStorage[4] === "Made";
    var count = 0;
    ActionStorage.forEach((v) => ((v === "FTMade" || v === "FTMissed") && count++));
        if (ShotMade || count == ShotType) {
            showElements("ParentAction");
            currentPage = "ParentAction";
            console.log(ActionStorage);
            GameStorage.push(ActionStorage);
        }
    });

document.getElementById("FTMissed").addEventListener('click', function() {
    ActionStorage.push("FTMissed");
    let ShotType = parseInt(ActionStorage[1][0]);
    let ShotMade = ActionStorage[4] === "Made";
    var count = 0;
    ActionStorage.forEach((v) => ((v === "FTMade" || v === "FTMissed") && count++));
    if (ShotMade || count === ShotType) {
        showElements("PlayerSelect");
        currentPage = "Rebound";
    }
});

let players = ["p1", "p2", "p3", "p4", "p5", "Team 1", "Team 2"]
    for (let i = 0; i < 7; i++) {
        document.getElementById(players[i]).addEventListener('click', function() {
            if (currentPage == "WhoShot") {
                showElements("MakePage");
                currentPage = "MakePage";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
            }
            if (currentPage == "Assist") {
                showElements("ParentAction");
                currentPage = "ParentAction";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }
            if (currentPage == "ShootingFoul") {
                showElements("FreeThrow");
                currentPage = "FreeThrow";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
            }

            if (currentPage == "Rebound") {
                showElements("ParentAction");
                currentPage = "ParentAction";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }
            if (currentPage == "Block") {
                showElements("ParentAction");
                currentPage = "ParentAction";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }

            if (currentPage == "Turnover") {
                showElements("StealCheck");
                currentPage = "StealCheck";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
            }
            if (currentPage == "Steal") {
                showElements("ParentAction");
                currentPage = "ParentAction";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }
            if (currentPage == "Highlight") {
                showElements("AddComment");
                currentPage = "AddComment";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }
            if (currentPage == "FoulPlayer") {
                showElements("ParentAction");
                currentPage = "ParentAction";
                ActionStorage.push(videoElement.currentTime)
                ActionStorage.push(teams[currentTeam][i + 1].name);
                console.log(ActionStorage)
                GameStorage.push(ActionStorage);
            }
        });
    }
