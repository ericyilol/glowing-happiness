/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



window.addEventListener("DOMContentLoaded", function() {
    var saveButton = document.getElementById("save");
    saveButton.addEventListener("click", function() {
           var journal = document.getElementById("journal").value;
                console.log(journal);
                var ajax = new XMLHttpRequest();
                ajax.open("POST","saveJournal.php",false);
                ajax.setRequestHeader("Content-Type", "application/upload");
                ajax.send(journal);
            
        });
}, false);

