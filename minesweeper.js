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



var set_board = function() {
    var gameboardDiv = $("div.span8");
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
                        .attr("id", button_loc)        
                        .html('<p>?</p>');

            $(tableRow).append(square); 
            $(square).append(squareButton);
        };
    };

    var locs = mine_locations();

    for(i = 0; i <= locs.length - 1; i++) {
        var createMine = $("button#" + locs[i]).addClass("mine");
    }
};


$("div.span8").on("click", "button.btn", function(){
    var $this = $(this);
    var mine_count = [];
    if ($this.hasClass("mine")){
        $this.html('<i class="icon-certificate"></i>')
        $(".span4 h1").text("Game Over!")
    } else {var adjacents = valid_adjacents(parseInt(($this.attr("id"))));
            for (var i = 0; i < adjacents.length; i++) {
                if ($("#" + adjacents[i]).hasClass("mine")){
                mine_count.push("+");
            }
            $this.text("" + mine_count.length);    
            //$("#" + adjacents[i]).addClass("adjacent");
            };
    };

    $this.prop("disabled", true);
    
});

$("div.span4 > a.btn").on("click", function(){
    $(".gameboard").remove();
    $(".span4 h1").text("");
    set_board();
});



set_board();