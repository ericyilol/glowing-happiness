/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Happy Territory
//By Eric Yi 
//The initial code of drawing hexagon is built with a tutorial written by Pedro's Tech Mumbling


        var xOffset = 100;
        var yOffset = 100;

        var previousPointX;
        var previousPointY;

        var down = false;
        var hex;
        
        var center0;
 
        var content= new Array([]);
//        content[0][1] = 0;
        content[0]= [];
        content[1]= [];
        content[2]= [];
        content[3]= [];
        
        var date= new Array([]);
        date[0]= [];
        date[1]= [];
        date[2]= [];
        date[3]= [];
        
        

        window.onload = function () {

            canvas = document.getElementById("myCanvas");
            
            hex = new hexDefinition(100);

            render();

            canvas.onmousedown = function (e) {
                
                var x;
                var y;
                
//                console.log(e.pageX);
//                console.log(e.pageY);
                
                down = true;
                findTile(e);
                
                
//                console.log('mouse down');
                
                if (e.pageX || e.pageY) {
                    x = e.pageX;
                    y = e.pageY;
                    render();
                }
                else {
                    x = e.clientX + document.body.scrollLeft 
                                  + document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop 
                                  + document.documentElement.scrollTop;
                }
                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;

                previousPointX = x;
                previousPointY = y;
            };

            canvas.onmouseup = function (e) {

                down = false;

//                console.log('mouse up');
            };

            canvas.onmousemove = function (e) {

                if (down == false) {
                    return;
                } 
                
                var x;
                var y;

                if (e.pageX || e.pageY) {
                    x = e.pageX;
                    y = e.pageY;
                }
                else {
                    x = e.clientX + document.body.scrollLeft 
                                  + document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop
                                  + document.documentElement.scrollTop;
                          
                }
                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;
                xOffset += (x - previousPointX);
                yOffset += (y - previousPointY);

                previousPointX = x;
                previousPointY = y;

                render();

            };
        };
        
        function findTile(e){
            
            center0 =  hex.getHexagonalCoordinates(e.pageX-xOffset,e.pageY-yOffset);
        };
        
        function drawHexSelect(context, hexCoordinates){
//            console.log(center0.u);
//            console.log(center0.v);
            var u =Math.round(hexCoordinates.u);
            var v= Math.round(hexCoordinates.v);
            
            
            var center = hex.getWorldCoordinates(u, v);
//            var center = hex.getWorldCoordinates(hexCoordinates.u, hexCoordinates.v);
            context.beginPath();
            context.moveTo((center.x - hex.b / 2.0) + xOffset, 
                           center.y + yOffset );
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.b / 2.0) + xOffset, 
                           center.y + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0) + yOffset);
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0)  + yOffset);
            context.lineTo((center.x - hex.b / 2.0) + xOffset,
                           center.y + yOffset);
            context.lineWidth = 0;
            context.strokeStyle = "FFCC66";
            context.fillStyle = "#FFCC66";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("(" + hexCoordinates.u + "," + hexCoordinates.v + ")", 
                                    center.x + xOffset, center.y + yOffset );
            context.fill();
            showTextBox(hexCoordinates);
            showContent(context,hexCoordinates);
        }
        
        function showTextBox(hexCoordinates){
            var textbox = document.getElementById("textbox2");
            var button = document.getElementById("confirmButton");
            
            var center = hex.getWorldCoordinates(Math.round(hexCoordinates.u), Math.round(hexCoordinates.v));
            

           textbox.style.backgroundColor= "yellow";
           textbox.style.position= "absolute";
           textbox.style.top = center.y+ yOffset+"px";
           
           button.style.backgrounColor = "yellow";
           button.style.top = center.y+ yOffset+"px";
           
           
            
        }
        
        function confirm(){
           var textboxContent = document.getElementById("textbox2").value;
           var currentdate = new Date(); 
           var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        
//           console.log(center0.u);
//           console.log(datetime);
           content[Math.round(center0.u)] [Math.round(center0.v)] = textboxContent;
           date[Math.round(center0.u)] [Math.round(center0.v)] = datetime;

        }
        
        function showContent(context, hexCoordinates){
//            var center = hex.getWorldCoordinates(hexCoordinates.u, hexCoordinates.v);
//            context.fillText("(" + hexCoordinates.u + "," + hexCoordinates.v + ")", 
//                             center.x + xOffset, center.y + yOffset );
          for (i=0; i < 3; i ++){
              for (j=0; j <6; j++){
//                  console.log("("+i+","+j+":"+content[i][j]);
                    var newCenter = hex.getWorldCoordinates(i, j);
                    context.beginPath();
                    context.fillStyle = "black";
                    context.fillText(content[i][j], newCenter.x + xOffset, newCenter.y + yOffset );
                    context.fillText(date[i][j], newCenter.x + xOffset, newCenter.y + yOffset+10 );
                    context.fill();
                    
                  
                  
              }
          }  
            
        }
        
        function drawHex(context, hexCoordinates) {

            var center = hex.getWorldCoordinates(hexCoordinates.u, hexCoordinates.v);
            context.moveTo((center.x - hex.b / 2.0) + xOffset, 
                           center.y + yOffset );
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y - hex.a / 2.0) + yOffset);
            context.lineTo((center.x + hex.b / 2.0) + xOffset, 
                           center.y + yOffset);
            context.lineTo((center.x + hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0) + yOffset);
            context.lineTo((center.x - hex.s / 2.0) + xOffset, 
                          (center.y + hex.a / 2.0)  + yOffset);
            context.lineTo((center.x - hex.b / 2.0) + xOffset,
                           center.y + yOffset);
            context.lineWidth = 2;
            context.strokeStyle = "#444";
     context.fillStyle = "#444";
     context.textAlign = "center";
     context.textBaseline = "middle";
     context.fillText("(" + hexCoordinates.u + "," + hexCoordinates.v + ")", 
                             center.x + xOffset, center.y + yOffset );
            
        }

        function render() {

            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");

            context.clearRect(0, 0, 800, 600);
            drawHexagonGrid(context);
            
            if (down){
                
                drawHexSelect(context, center0);
            }

            }

        function drawHexagonGrid(context) {

            context.beginPath();
            for (var i = -5; i < 5; i++) {
                for (var j = -5; j < 5; j++) {
                    drawHex(context, new hexCoordinates(i, j));
                }
            }
            context.stroke();            
        }

        function hexDefinition(edgeSize) {

            this.s = edgeSize;

            this.h = Math.sin(30*Math.PI/180) * edgeSize;

            this.r = Math.cos(30*Math.PI/180) * edgeSize;

            this.b = edgeSize + 2 * this.h;

            this.a = 2 * this.r;

            this.hexagon_narrow_width  = this.s + this.h;
            this.hexagon_wide_width = this.b;
            this.hexagon_height = this.a;

            /*
             u - horizontal index of hex
             v - vertical index of hex
             */
            this.getWorldCoordinates = function(u, v) {

                var x = this.hexagon_narrow_width * u;
                var y = this.hexagon_height * (u*0.5 + v);

                return new worldCoordinates(x,y);
            };

            this.getHexagonalCoordinates = function(x, y) {

                var u = x / this.hexagon_narrow_width;
                var v = y / this.hexagon_height - u * 0.5;

                return new hexCoordinates(u, v);
            };
        }

        function worldCoordinates(x, y) {
            this.x = x;
            this.y = y;
        }

        function hexCoordinates(u, v) {
            this.u = u;
            this.v = v;
        }

