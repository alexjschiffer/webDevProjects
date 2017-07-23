// Create an html object (panel with heading) to insert entries into
// Divided into parts so that you can insert content
var panelStart = "<a href='";
var panelStart2 =
  "'><div class='panel panel-default'><div class='panel-heading'><b>";
var panelMiddle = "</b></div><div class='panel-body'>";
var panelEnd = "</div></div></a>";

var limit = 5;
var search = "pizza";

$("#search").on("click", function() {
  var value = $("#searchTerm").val();
  search = value;
  var wikiURL =
    "https://en.wikipedia.org/w/api.php/w/api.php?action=opensearch&format=json&search=" +
    search +
    "&namespace=0&limit=" +
    limit +
    "&utf8=1";

  $.ajax({
    url: wikiURL,
    dataType: "jsonp",
    success: function(data) {
      $("#results").html("");
      for (var i = 0; i < limit; i++) {
        $("#results").append(
          panelStart +
            data[3][i] +
            panelStart2 +
            data[1][i] +
            panelMiddle +
            data[2][i] +
            panelEnd +
            "<br>"
        );
      }
    }
  });
});