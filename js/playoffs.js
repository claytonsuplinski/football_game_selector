var playoff_teams = {};
playoff_teams.afc = new Array(6);
playoff_teams.nfc = [];
function load_playoffs(){
	code = "PIT";
	
	var tmp_divisions = [
		"AFC North",
		"AFC South",
		"AFC East",
		"AFC West",
		"NFC North",
		"NFC South",
		"NFC East",
		"NFC West"
	];
	
	var sorted_teams = teams;
	
	sorted_teams.sort(function (a, b){
		if (a.wins > b.wins){return -1;}
		if (a.wins < b.wins){return 1;}
		return 0;
	});
	
	sorted_teams.sort(function (a, b){
		if (a.losses > b.losses){return 1;}
		if (a.losses < b.losses){return -1;}
		return 0;
	});
	
	sorted_teams.sort(function (a, b){
		var a_wp = (a.wins + a.losses > 0 ? a.wins / (a.wins + a.losses) : 0);
		var b_wp = (b.wins + b.losses > 0 ? b.wins / (b.wins + b.losses) : 0);
		if (a_wp > b_wp){return -1;}
		if (a_wp < b_wp){return 1;}
		return 0;
	});	
	
	playoff_teams.afc = new Array(6);
	playoff_teams.nfc = new Array(6);
	
	var afc_division = 0;
	var nfc_division = 0;
	var afc_wild_card = 0;
	var nfc_wild_card = 0;
	sorted_teams.forEach(function(team){
		if(team.conference == "AFC"){
			var division_index = tmp_divisions.indexOf(team.conference + " " + team.division);
			if(division_index != -1){
				playoff_teams.afc[afc_division] = team;
				afc_division++;
				tmp_divisions.splice(division_index, 1);
			}
			else if(afc_wild_card < 2){
				playoff_teams.afc[4+afc_wild_card] = team;
				afc_wild_card++;
			}
		}
		else if(team.conference == "NFC"){
			var division_index = tmp_divisions.indexOf(team.conference + " " + team.division);
			if(division_index != -1){
				playoff_teams.nfc[nfc_division] = team;
				nfc_division++;
				tmp_divisions.splice(division_index, 1);
			}
			else if(nfc_wild_card < 2){
				playoff_teams.nfc[4+nfc_wild_card] = team;
				nfc_wild_card++;
			}
		}
	});
	
	var tmp_html = "";
	tmp_html += '<div class="col-xs-12 col-lg-12 team-schedule-vs">Wild Card</div>';
	
	tmp_html += get_playoff_element(playoff_teams.afc, 6);
	tmp_html += get_playoff_element(playoff_teams.afc, 3);
	
	tmp_html += get_playoff_element(playoff_teams.afc, 5);
	tmp_html += get_playoff_element(playoff_teams.afc, 4);
	
	tmp_html += get_playoff_element(playoff_teams.nfc, 6);
	tmp_html += get_playoff_element(playoff_teams.nfc, 3);
	
	tmp_html += get_playoff_element(playoff_teams.nfc, 5);
	tmp_html += get_playoff_element(playoff_teams.nfc, 4);
	
	tmp_html += '<div class="col-xs-12 col-lg-12 team-schedule-vs">Divisional</div>';
	
	tmp_html += get_playoff_element(playoff_teams.afc, 2);
	tmp_html += get_playoff_element(playoff_teams.afc, 1);
	
	tmp_html += get_playoff_element(playoff_teams.nfc, 2);
	tmp_html += get_playoff_element(playoff_teams.nfc, 1);
	
	tmp_html += '<div class="col-xs-12 col-lg-12 team-schedule-vs">Conference</div>';
	
	tmp_html += '<div class="col-xs-12 col-lg-12 team-schedule-vs">Super Bowl</div>';
	
	tmp_html += '<div class="col-xs-12 col-lg-12 team-schedule-vs">Champion</div>';

	$("#standings-title").html("Playoffs");
	$("#standings-container").html(tmp_html);
}

function get_playoff_element(teams, index){
	return '<div class="col-xs-6 col-lg-6 team-schedule-week" style="background-color:'+
			teams[index-1].color+';background-image:url(\'./teamIcons/'+
			teams[index-1].code+'.png\');"><div class="hidden-xs">'+
			index+'</div></div>';
}


	/*
	schedule_data.forEach(function (week, week_number){
		var game = week.filter(function (game) { 
			return (game.away_team == team.full_name || game.home_team == team.full_name);
		});
		if(game.length > 0){
			game = game[0];
			var away_team = teams.filter(function (team) { 
				return team.full_name == game.away_team;
			})[0];
			var home_team = teams.filter(function (team) { 
				return team.full_name == game.home_team;
			})[0];
			var win_color = "";
			if(game.home_result == "W"){
				win_color = home_team.color;
			}
			if(game.away_result == "W"){
				win_color = away_team.color;
			}
			tmp_html += '<div class="col-xs-5 col-lg-5 team-schedule-week" style="background-color:'+away_team.color+';background-image:url(\'./teamIcons/'+away_team.code+'.png\');"><div class="hidden-xs">'+game.away_team+'</div></div>';
			tmp_html += '<div class="col-xs-2 col-lg-2 team-schedule-vs" style="background-color:'+win_color+';"><span class="hidden-xs">Week </span>'+(week_number+1)+'</div>';
			tmp_html += '<div class="col-xs-5 col-lg-5 team-schedule-week" style="background-color:'+home_team.color+';background-image:url(\'./teamIcons/'+home_team.code+'.png\');"><div class="hidden-xs">'+game.home_team+'</div></div>';
		}
		else{//Bye Week
			tmp_html += '<div class="col-xs-12 team-schedule-vs">BYE</div>';
		}
	});
	*/