// Request a quote from the following JSON based API: https://quotesondesign.com/api-v4-0/
$("#getMessage").on("click", function() {
  // Fade out a pre-existing quote and shrink text back to normal
  $("#message").fadeOut(600);
  $("#message").css("font-size", "1em");
  // Use $.ajax instead of $.getJSON because $.ajax includes several optional arguments, important in this case is cache: false, so that we can retrieve a new quote each time
  $.ajax({
    url:
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    success: function(data) {
      $("#message").html(data[0].content);
      $("#message").append("- " + data[0].title);
    },
    cache: false
  });
  // Fade in the new quote
  $("#message").fadeIn(600);
  var colors = [
    "#80ffff",
    "#5cd65c",
    "#4d4dff",
    "#ff6633",
    "#b84dff",
    "#ff5050",
    "#db4dff",
    "#009900",
    "#00ffbf",
    "#b3ff66",
    "#ff3333"
  ];
  var color = Math.floor(Math.random() * colors.length);
  $("body").css("background", colors[color]);
  $("#getMessage").css("background", colors[color]);
  $("#message").animate({ fontSize: "2em" }, 1000);
  // Set twitter quote
  // Variable to store the quote in
  var quoteAndAuthor = $("#message").text();
  var link = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + quoteAndAuthor;
  $(".twitter-button").attr("href", link);
});