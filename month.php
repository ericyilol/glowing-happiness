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
        // put your code here
            $myfile = fopen("journal/328.txt", "r") or die("Unable to open file!");
            $text = fread($myfile,filesize("journal/328.txt"));
            fclose($myfile);
            echo $text.$text."2";
            
            
            
        ?>
        
        <form>
        First name:<br>
        <textarea id = "journal" name="textarea" rows="10" cols="50">Write something here</textarea>
        <br>
        </form>
        <button id = "save"> Save </button>
        <script src="journal.js" type="text/javascript"></script>
        
        <!--<img id="month" src="img/building.png">-->
    </body>
    
</html>
