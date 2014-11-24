<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
			$servername = "localhost";
			$username = "root";
			$password = "1234";
			$dbname = "testNewDB";

			// Create connection
			$conn = mysqli_connect($servername, $username, $password, $dbname);

			// Check connection
			if (!$conn) {
			    die("Connection failed: " . mysqli_connect_error());
			}
			echo "Connected successfully";

			// Insert into table
			

			$sql = "INSERT INTO testTable (firstname, lastname, email)
			VALUES ('Johnny', 'Doe', 'john@example.com')";

			if ($conn->query($sql) === TRUE) {
			    echo "<br> New record created successfully";
			} else {
			    echo "Error: " . $sql . "<br>" . $conn->error;
			}

			//perform database query
			$query = "SELECT id, firstname FROM testTable";
			$result = mysqli_query($conn, $query);
			if (!$result){
				die("<br> database query failed!");
			}

			$conn->close();
		?> 

		<?php 
			while($row = mysqli_fetch_row($result)){
					var_dump($row);
					
					echo "<hr />" ;
				}
		?>
		<?php
		mysqli_free_result($result); 
		?>
    </body>
</html>
