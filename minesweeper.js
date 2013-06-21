var mine_locations = function(){
	var locations = [];

	function take_a_num () {
		return Math.floor(Math.random() * 9);
	};

	while(locations.length < 11){
		var row = take_a_num();
		var column = take_a_num();
		var place = row + "" + column;
		
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
	
	for(var i = 0; i < 9; i++){
		var tableRow = $(document.createElement("tr"));
		$(tableBody).append(tableRow);

		for(var j = 0; j < 9; j++){
			var square = $(document.createElement("td"));
			var squareButton = $(document.createElement("button"));
			squareButton.addClass("btn btn-large " + i + j) //i is the row, j is the column			
						.append("+")
						.attr("data-row", i)
						.attr("data-column", j);

			$(tableRow).append(square); 
			$(square).append(squareButton);
		};
	};

	var locs = mine_locations();

	for(i = 0; i <= locs.length; i++) {
		$("button." + locs[i]).addClass("mine");
	};

	var $buttonMine = $("button.mine");
	console.log($buttonMine)
	
};


$("div.span8").on("click", "button.btn", function(){
	$(this).prop("disabled", true);
});

$("div.span4 > a.btn").on("click", function(){
	$(".gameboard").remove();
	set_board();
});


set_board();