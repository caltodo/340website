// the plan is to get this one working then copy over for the rest of the pages

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT Players.PlayerID, FirstName, LastName, Height, Weight, Age, Teams.TeamName FROM Players INNER JOIN Teams ON Teams.TeamName = Players.TeamName",function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Players = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletePlayer.js"];
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);	
        function complete(){
            callbackCount++;
	    if(callbackCount >= 2){
	    	res.render('Players', context);
	    }
	}
    });
  
    router.delete('/:id', function(req, res){
	  var mysql = req.app.get('mysql');
	  var sql = "DELETE FROM Players WHERE id = ?";
	  var inserts = [req.params.id];
	  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
	     if(error){
                res.write(JSON.stringify(error));
		res.status(400);
		res.end();
	     }else{
		res.status(202).end();
	     }
	  })
    })
   

    router.put('/id',function(req,res){;

	  var mysql = req.app.get('mysql');
  	  console.log(req.body)
	  console.log(req.params.id)
	  var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
	  var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
	  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
	     if(error){
	        console.log(error)
	        res.write(JSON.stringify(error));
	        res.end();
	     }else{
	        res.status(200);
	        res.end();
	     }
	  });
    });
return router;
}();
