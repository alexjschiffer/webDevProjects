$(document).ready(function() {
  // Create variable to keep track of break or session
  var last = "break";
  // Initialize the timer on document load
  // Permanent variables for switch between session and break
  var sessionMin = 25;
  var breakMin = 5;
  // Temporary variables which will count down
  var minutes = sessionMin;
  var seconds = 0;
  // Update Displays
  $("#sestime").html(sessionMin);
  $("#bktime").html(breakMin);
  $("#min").html(minutes);
  $("#timer").html(seconds);

  function countDown() {
    t = setTimeout(decrease, 1000);
  }

  function decrease() {
    seconds--;
    if (seconds === 0 && minutes === 0) {
      $("#min").html(minutes);
      $("#timer").html(seconds);
      clearTimeout(t);
      playAudio();
      $("#myModal").show();
    }
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
    $("#min").html(minutes);
    $("#timer").html(seconds);
    countDown();
  }

  $("#start").on("click", function() {
    if (last == "break") {
      minutes = sessionMin;
    } else if ((last = "session")) {
      minutes = breakMin;
    }
    countDown();
    $("#start").hide();
  });

  $("#stop").on("click", function() {
    clearTimeout(t);
    $("#start").show();
  });

  $("#reset").on("click", function() {
    clearTimeout(t);
    minutes = sessionMin;
    seconds = 0;
    $("#min").html(sessionMin);
    $("#timer").html(seconds);
    $("#start").show();
  });

  // Buttons for changing session length
  $("#sesinc").on("click", function() {
    if (sessionMin < 90) {
      sessionMin += 1;
    }
    $("#min").html(sessionMin);
    $("#sestime").html(sessionMin);
    $("#timer").html(seconds);
  });
  $("#sesdec").on("click", function() {
    if (sessionMin > 0) {
      sessionMin -= 1;
    }
    $("#min").html(sessionMin);
    $("#sestime").html(sessionMin);
    $("#timer").html(seconds);
  });
  $("#sesinc5").on("click", function() {
    if (sessionMin < 90) {
      sessionMin += 5;
    }
    $("#min").html(sessionMin);
    $("#sestime").html(sessionMin);
    $("#timer").html(seconds);
  });
  $("#sesdec5").on("click", function() {
    if (sessionMin > 4) {
      sessionMin -= 5;
    }
    $("#min").html(sessionMin);
    $("#sestime").html(sessionMin);
    $("#timer").html(seconds);
  });
  // Change break time
  $("#bkdec").on("click", function() {
    if (breakMin > 0) {
      breakMin--;
    }
    $("#bktime").html(breakMin);
  });
  $("#bkinc").on("click", function() {
    if (breakMin < 90) {
      breakMin++;
    }
    $("#bktime").html(breakMin);
  });

  // Define the audio as a global variable so all fxns can access it
  var audio = new Audio(
    "https://www.freespecialeffects.co.uk/soundfx/computers/futurebeep2.wav"
  );
  function playAudio() {
    audio.loop = true;
    audio.play();
  }
  $("#stopSound").on("click", function() {
    audio.pause();
    $("#myModal").hide();
    $("#start").show();
    if (last == "break") {
      last = "session";
      clearTimeout(t);
      minutes = breakMin;
      seconds = 0;
      $("#min").html(breakMin);
      $("#timer").html(seconds);
      $("#start").show();
      $("#stat").html("Take a Break!");
    } else if (last == "session") {
      last = "break";
      clearTimeout(t);
      minutes = sessionMin;
      seconds = 0;
      $("#min").html(sessionMin);
      $("#timer").html(seconds);
      $("#start").show();
      $("#stat").html("Get to Work!");
    }
  });
});