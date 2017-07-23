// Control buttons
$("#showAll").on("click", function(){
  $(".online").fadeIn();
  $(".offline").fadeIn();
})
$("#showLive").on("click", function(){
  $(".online").fadeIn();
  $(".offline").fadeOut();
})
$("#showOffline").on("click", function(){
  $(".online").fadeOut();
  $(".offline").fadeIn();
})

// Create an array to hold the users to check on
var users = [
  "ESL_SC2",
  "cretetion",
  "freecodecamp",
  "RobotCaleb",
  "noobs2ninjas",
  "fullstopcoding",
  "GamesDoneQuick",
  "brunofin",
  "Darkness429"
];

 // Create different panels for online status
var panelStartOnline =
  "<div class='panel panel-default online'><div class='panel-body'><div class'media'><div class='media-left'><a href='";
var panelStartOffline =
  "<div class='panel panel-default offline'><div class='panel-body'><div class'media'><div class='media-left'><a href='";

// Function to find the status of all users
function getUserStatus(users, callback, callback2) {
  for (var i = 0; i < users.length; i++) {
    let userName = users[i];
    let statusLink = "https://wind-bow.glitch.me/twitch-api/streams/" + userName;
    let userStatus = "";
    let game = "";
    let viewer = "";
    // Set the status of each user by checking their stream
    $.getJSON(statusLink, function(data) {
      if (data.stream === null) {
        userStatus = "offline";
      } else {
        userStatus = "online";
        game = data.stream.game;
      viewer = data.stream.viewers;
      }

      callback(userStatus, game, viewer, userName);
    });
  }
}

  // Create global arrays to hold user information
  var statuses = [];
  var games = [];
  var viewers = [];
  var userNames = [];
  var userNames2 = [];
  var urls = [];
  var logos = [];

// Callback function called after async getJSON request (getUserStatus) has finished
function onStatusDone(userStatus, game, viewer, userName) {
  // Write new values to the global arrays
  userNames.push(userName);
  statuses.push(userStatus);
  games.push(game);
  viewers.push(viewer);

if (statuses.length == users.length){
  getUserInfo();
  }
}

// Function to get user info
function getUserInfo() { 
  for (var j = 0; j < users.length; j++) {
    let channelLink = "https://wind-bow.glitch.me/twitch-api/channels/" + users[j];
    let userName2 = users[j];
    let url = "";
    let logo = "";
    // Display a pannel with all relevant information for each channel
    $.getJSON(channelLink, function(data) {
      url = data._links.self;
      logo = data.logo;
      finalizeInfo(userName2, url, logo);
    });
  }
}

function finalizeInfo(userName2, url, logo){
  userNames2.push(userName2);
  urls.push(url);
  logos.push(logo);
  if (userNames2.length == users.length-1){
    displayUserInfo(statuses, urls, logos, games, viewers, userNames, userNames2);
  }
}

function displayUserInfo(statuses, urls, logos, games, viewers, userNames, userNames2) {
  for (var m=0; m<users.length; m++){
    // Because the requests were async, we have two different orders of usernames for the sets of data
    // We use indexOf to match the correct data with each user
    let currentUser = users[m];
    let currentIndex = userNames.indexOf(currentUser);
    let currentStatus = statuses[currentIndex];
    let currentGame = games[currentIndex];
    let currentViewers = viewers[currentIndex];
    // Find corrent info from second set of data
    let currentIndexAlt = userNames2.indexOf(currentUser);
    let currentUrl = urls[currentIndexAlt];
    let currentLogo = logos[currentIndexAlt];
    // Display all of the information we've received
    if (currentStatus == "online" & currentLogo !== null){
      $("#output").append(panelStartOnline + currentUrl + "'><img class='media-object' src='" + currentLogo + "'/></a></div><div class='media-body'><h1 class='media-heading'>" + currentUser + "</h1><h3>Currently playing: " + currentGame + "</h3><h5>Viewers: " + currentViewers + "</h5></div></div>" + "</div></div>");
    }else if (currentLogo == null){
      $("#output").append(panelStartOffline + "url" + "'><img class='media-object' src='" + "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Human-dialog-error.svg/200px-Human-dialog-error.svg.png" + "'/></a></div><div class='media-body'><h1 class='media-heading'>" + currentUser + "</h1><h3>User Not Found</h3></div></div>" + "</div></div>");  
    }else{
       $("#output").append(panelStartOffline + currentUrl + "'><img class='media-object' src='" + currentLogo + "'/></a></div><div class='media-body'><h1 class='media-heading'>" + currentUser + "</h1><h3>Currently offline</h3></div></div>" + "</div></div>");  
    }
  }
}

getUserStatus(users, onStatusDone, getUserInfo);