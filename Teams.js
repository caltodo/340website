
module.exports = function(){
    var express = require('express');
    var router = express.Router();






    function getTeams(res, mysql, context, complete){
       mysql.pool.query("SELECT Teams.TeamID, TeamName, Wins, Losses FROM Teams ", function(error, results, fields){
	     if(error){
	     res.write(JSON.stringify(error));
	     res.end();
	     }
	     context.people = results;
	     complete();
	     });
    }

    function getRoster(res,mysql,context,complete){
       mysql.pool.query("SELECT Players.PlayerID AS PlayerID, FirstName, LastName, Height, Weight, Age FROM Teams INNER JOIN Players ON Teams.TeamName = Player.TeamName WHERE TeamID = [input]", function(error,results, fields){

	     if(error){                                          
	     res.write(JSON.stringify(error));   
	     res.end();      
	     }                                                                             context.people = results;
	     complete();                                 
	     });                   
    } 

    return router;
}();
