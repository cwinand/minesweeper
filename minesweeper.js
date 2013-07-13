"use strict";

var matrix = [[0, 1, 2, 3, 4, 5, 6, 7], 
              [8, 9, 10, 11, 12, 13, 14, 15], 
              [16, 17, 18, 19, 20, 21, 22, 23], 
              [24, 25, 26, 27, 28, 29, 30, 31], 
              [32, 33, 34, 35, 36, 37, 38, 39], 
              [40, 41, 42, 43, 44, 45, 46, 47], 
              [48, 49, 50, 51, 52, 53, 54, 55], 
              [56, 57, 58, 59, 60, 61, 62, 63]];

var check_row = function(num, matrix) {
    for (var i = 0; i < matrix.length; i++) {
        var check = matrix[i].indexOf(num)
        if (check > -1){
            return i;
        }   
    }
};

var check_col = function(num, matrix) {
    for (var i = 0; i < matrix.length; i++) {
        var check = matrix[i].indexOf(num)
        if (check > -1){
            return check;
        }
    }
};

var valid_adjacents = function(num){

    var matrix = [[0, 1, 2, 3, 4, 5, 6, 7], 
              [8, 9, 10, 11, 12, 13, 14, 15], 
              [16, 17, 18, 19, 20, 21, 22, 23], 
              [24, 25, 26, 27, 28, 29, 30, 31], 
              [32, 33, 34, 35, 36, 37, 38, 39], 
              [40, 41, 42, 43, 44, 45, 46, 47], 
              [48, 49, 50, 51, 52, 53, 54, 55], 
              [56, 57, 58, 59, 60, 61, 62, 63]];

    var row = check_row(num, matrix);
    var col = check_col(num, matrix);
    var adjacents = [];

    if (row === 0 && col === 0){
        adjacents.push(matrix[row][col+1], 
                       matrix[row+1][col], 
                       matrix[row+1][col+1]);

    } else if (row === 0 && col === 7){
        adjacents.push(matrix[row][col-1],
                       matrix[row+1][col-1],
                       matrix[row+1][col]);

    } else if (row === 7 && col === 0){
        adjacents.push(matrix[row][col+1],
                       matrix[row-1][col],
                       matrix[row-1][col+1]);

    } else if (row === 7 && col === 7){
        adjacents.push(matrix[row][col-1],
                       matrix[row-1][col-1],
                       matrix[row-1][col]);

    } else if (row === 0){
        adjacents.push(matrix[row][col-1],
                       matrix[row][col+1],
                       matrix[row+1][col-1],
                       matrix[row+1][col],
                       matrix[row+1][col+1]);

    } else if (col === 0){
        adjacents.push(matrix[row-1][col],
                       matrix[row-1][col+1], 
                       matrix[row][col+1],
                       matrix[row+1][col],
                       matrix[row+1][col+1]);

    } else if (row === 7){
        adjacents.push(matrix[row][col-1],
                       matrix[row][col+1],
                       matrix[row-1][col-1],
                       matrix[row-1][col],
                       matrix[row-1][col+1]);


    } else if (col === 7){
        adjacents.push(matrix[row-1][col],
                       matrix[row+1][col],
                       matrix[row-1][col-1],
                       matrix[row][col-1],
                       matrix[row+1][col-1]);
    } else {
        adjacents.push(matrix[row-1][col-1],
                       matrix[row-1][col],
                       matrix[row-1][col+1],
                       matrix[row][col-1],
                       matrix[row][col+1],
                       matrix[row+1][col-1],
                       matrix[row+1][col],
                       matrix[row+1][col+1]);
    }
    return adjacents;
};

//randomizes the number to be set as the ID of a button
var mine_locations = function(){
  var locations = [];

  while(locations.length < 10){
    var place = Math.floor(Math.random() * 64);
 
    if ($.inArray(place, locations) < 0){ //makes sure place IS NOT in locations array
      locations.push(place);
      };
    };

    return locations;
};       

var mine_adjs = function(mine_locations){
  var mine_adj = {};
  for(var i = 0; i < mine_locations.length; i++){
    mine_adj[mine_locations[i]]= valid_adjacents(mine_locations[i])
  }; 
  return mine_adj
};

var set_board = function() {
    var gameboardDiv = $("div.span7");
    var table = $(document.createElement("table"));
    var tableBody = $(document.createElement("tbody"));
    
    $(gameboardDiv).append(table.addClass("gameboard"));
    $(table).append(tableBody);        
    
    for(var i = 0; i < 8; i++){
        var tableRow = $(document.createElement("tr"));
        $(tableBody).append(tableRow);

        for(var j = 0; j < 8; j++){
            var square = $(document.createElement("td"));
            var squareButton = $(document.createElement("button"));
            var button_loc = i * 8 + j;
            squareButton.addClass("btn btn-large")
                        .attr("id", button_loc);

            $(tableRow).append(square); 
            $(square).append(squareButton);
        };
    };
    var locs = mine_locations();
    var adjs = mine_adjs(locs);

    for(i = 0; i <= locs.length - 1; i++) {
        var createMine = $("button#" + locs[i]).addClass("mine");
    };
};

$("div.span7").on("click", "button.btn", function(event){
    var $this = $(this);
    var mine_count = 0;
    var $mine = $(".mine");

    if (event.shiftKey) {
      $this.html("<i class='icon-flag'></i>")
           .addClass("flag");
    } else if ($this.hasClass("mine")){
      $(".mine.flag").css("color", "green");
      $mine.not(".flag")
           .html('<i class="icon-certificate"></i>')
           .prop("disabled", true);
        $(".span5 h1").text("Game Over!");

    } else {
        var adjacents = valid_adjacents(parseInt($this.attr("id")));
        
        for (var i = 0; i < adjacents.length; i++) {
          var $adjacent = $("#" + adjacents[i]);
          if ($adjacent.hasClass("mine")){
            mine_count += 1;
          }; 
        };  

        $this.text("" + mine_count);
        $this.prop("disabled", true);
        
        if ($this.text() == 0){
          $this.text("");
          for (var i = 0; i < adjacents.length; i++) {
            $("#" + adjacents[i]).click();
            
          };
        };
    };

    
    
});


$("div.btn-group :nth-child(1)").on("click", function(){
  $(".gameboard").remove();
  $(".span5 h1").text("");
  $("div.btn-group :nth-child(3)").removeClass("active");
  set_board();
});

$("div.btn-group :nth-child(2)").on("click", function(){
  var $mine = $(".mine");
  var flagged = 0;

  $mine.each(function(){
    if($(this).hasClass("flag")){
      flagged += 1;
    };

    if (flagged === 10){
      $(".span5 h1").text("You Win!");
    } else {
      $(".span5 h1").text("Game Over!");
      $(".mine.flag").css("color", "green");
      $mine.not(".flag")
           .html('<i class="icon-certificate"></i>')
           .prop("disabled", true);
      };
  });
});

$("div.btn-group :nth-child(3)").on("click", function(){
  if(!$(this).hasClass("active")){
    $(".mine").css("border", "1px solid red");
  }
  else {
    $(".mine").css("border", "");
  };
});


set_board();