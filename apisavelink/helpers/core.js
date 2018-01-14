
var core = module.exports = {
	 fetchRowsFromRS: function(connection, resultSet, numRows, res)
	{
		// console.log("fetchR");
	  resultSet.getRows( // get numRows rows
		numRows,
		function (err, rows)
		{
		  if (err) {
			console.log(err);
			core.doClose(connection, resultSet); // always close the result set
			res.send("Err");
		  } else if (rows.length === 0) {    // no rows, or no more rows
			console.log("No length");
			core.doClose(connection, resultSet); // always close the result set
			res.send([]);
		  } else if (rows.length > 0) {
			console.log(rows);
			core.doClose(connection, resultSet); // always close the result set
			res.send(rows);
		  }
		  
		});
	},
	doClose: function (connection, resultSet)
	{
	  resultSet.close(
		function(err)
		{
			if (err) { 
				console.log("Err close resultSet");
				console.error(err.message); 
			}
		  core.doRelease(connection);
		});
	},
	
	doRelease: function (connection)
	{
	  connection.close(
		function(err)
		{
		  if (err) { 
			console.log("Err close connection");
			console.error(err.message); }
		});
	},
	
	bubble: function (arr, numVal) {
		var len = arr.length;
		var retVal = [];
		for (var i = 0; i < len ; i++) {
			for(var j = 0 ; j < len - i - 1; j++){ // this was missing
				if (arr[j].VALUE < arr[j + 1].VALUE) {
				  // swap
				  var temp = arr[j];
				  arr[j] = arr[j+1];
				  arr[j + 1] = temp;
				}
			}
		}
		for (var i = 0; i < (len-numVal) ; i++)
		{
		  arr.pop();  
		}
		for(var i = arr.length - 1; i >= 0; i--) {
			if(arr[i].VALUE === 0) {
			   arr.splice(i, 1);
			}
		}
		//console.log(JSON.stringify(arr));
		return arr;
    },
	checkContains:	function (weather, val){
		var ret = false;
		for(var i = 0; i < weather.length; i++)
		{
			if(weather[i].DRILLDOWNID.indexOf(val) != -1)
			{
				return true;
			}
		}
	},
	checkContainsTech:	function (weather, val){
		var ret = false;
		for(var i = 0; i < weather.length; i++)
		{
			if(weather[i].OUGID.indexOf(val) != -1)
			{
				return true;
			}
		}
	}
				
}