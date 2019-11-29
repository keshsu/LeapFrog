multiple = [];
function Container(mainparent){
    this.width = 30;
    this.height = 30;
    this.x= 20;
    this.y = 20;
    this.directionX =1;
    this.directionY= 1;

    this.element= null;
    this.mainContainer= mainparent;

    this.container_wid = document.getElementById('game-container').offsetWidth;
    this.container_heigh = document.getElementById('game-container').offsetHeight;
    // console.log(this.mainContainer);
    
    //initializing box element
    this.init = function(){
        var box = document.createElement('div');
        // console.log(box);
        
        box.style.height = this.height+"px";
        box.style.width = this.width+'px';
        box.style.position = "absolute";
        box.style.background = "indigo";
        box.classList.add('box');
        this.mainContainer.appendChild(box);
        this.element = box;  

        this.drawElement();
        return this;
    }
    
    //setting the position
    this.setPosition = function(x,y){
        this.x= x;
        this.y= y;

        this.findPositon(this.x,this.y);
        
    }

    this.update= function(speed){
        this.x += speed* this.directionX;
        this.y += speed*this.directionY;

        this.drawElement();
    }

    //drawing the element 
    this.drawElement= function(){
        this.element.style.left = this.x+'px';
        this.element.style.top = this.y+'px';
    }

    this.findPositon = function(first, second){
        var single=[];

        single.push(first, second);

        
        multiple.push(single);
        

    }
    
    var checklen = multiple.length;
    console.log(checklen);

    this.checkCollision = function(boxes){
       
        this.boxes = boxes;
        for(var i=0; i< this.boxes.length; i++) {

        
        this.current = this.boxes[i];
        this.rest = this.boxes.slice(i + 1);
        
        // console.log(this.rest);
        this.count  = this.rest.length;
        for (var p= 0; p<this.count;p++) {
            if (this.current.x < this.rest[p].x + this.width &&
                this.current.x + this.width > this.rest[p].x &&
                this.current.y < this.rest[p].y + this.height &&
                this.current.y + this.height > this.rest[p].y) {
                
                // console.log("directionY",this.rest.directionY);  
                // console.log("directionX",this.rest.directionX);  4

                console.log("moving");
                if(this.rest[p].directionX == 1 && this.rest[p].directionY == -1){
                    this.rest[p].directionY= 1;
                    
                }else if( this.rest[p].directionX == 1&&this.rest[p].directionY == 1){
                    this.rest[p].directionX= -1;
                }
                if(this.current.directionX == -1 && this.current.directionY == -1){
                    this.current.directionY= 1;
                    
                }else if( this.current.directionX == -1 && this.current.directionY == 1){
                    this.current.directionY= -1;
                }


                 if( this.rest[p].directionX ==1 && this.current.directionY ==-1){
                    this.current.directionY= 1;
                    this.current.directionX= -1;
                    this.rest[p].directionX = 1;
                    this.rest[p].directionY= -1;
                }
                else if( this.rest[p].directionX == -1 && this.current.directionY ==-1){
                    this.current.directionY= 1;
                    this.current.directionX= -1;
                    this.rest[p].directionX = 1;
                    this.rest[p].directionY= -1;
                }
                else if( this.rest[p].directionX == -1 &&this.rest[p].directionY == -1 && this.current.directionY ==-1 && this.current.directionX==-1){
                    this.rest[p].directionX = 1;
                    this.rest[p].directionY= 1;
                }
                this.current = this.rest;   
            }
        }  
    }
    }
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(mainparent, totalboxes){

    var boxes = [];
    this.totalboxes= totalboxes;
    var MAX_WIDTH = document.getElementById('game-container').offsetWidth;
    var MAX_HEIGHT = document.getElementById('game-container').offsetHeight;
    
    this.mainContainer= mainparent;
    
    this.startGame=function(){
        for(var i=0; i < this.totalboxes; i++) {
            var box = new Container(mainparent).init();
            // console.log("box width:", box.width);
            box.setPosition(
                getRandomArbitrary(0, MAX_WIDTH -box.width),
                getRandomArbitrary(0, MAX_HEIGHT- box.height)
            );  
            box.drawElement();
            boxes.push(box);
        }
        // console.log(00);
        
        setInterval(this.moveBoxes.bind(this), 40);
        
        // box.checkCollision(); 
    }
    this.moveBoxes = function() {
        for(var i=0; i< this.totalboxes; i++) {

            boxes[i].update(1);
            
            // console.log(boxes[0]);
            // console.log(boxes[i].x);
            var lastx= boxes[i].x + boxes[i].width;
            var lasty= boxes[i].y + boxes[i].height;

            // console.log(MAX_WIDTH);
            
            // console.log(lastx, lasty);
            if(lasty >= MAX_HEIGHT){

                boxes[i].directionY = -1;   
            }
            
            else if( lastx >= MAX_WIDTH){
                boxes[i].directionX = -1;
            }

            else if(boxes[i].x <= 0){

                boxes[i].directionX = 1;
                
            }
            
            else if( boxes[i].y <= 0){
                boxes[i].directionY = 1;
            }
            
            boxes[i].checkCollision(boxes);
        }
    }
}
var mainparent = document.getElementById('game-container');
var gamePlay = new Game(mainparent , 10);
gamePlay.startGame();