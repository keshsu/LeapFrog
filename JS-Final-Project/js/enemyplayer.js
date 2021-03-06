function enemyPlayer(canvas, ctx,x,y,width, height,image) {

    // var this =this;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.newY = Math.floor(this.y);
    this.speed = 0.15;    
    
    this.draw =function(){
        ctx.fillStyle = "#aff"; 
        ctx.beginPath();
        ctx.drawImage(image,this.x, this.newY, this.width, this.height);
        ctx.fill();
    }

    this.update = function() {
        this.x_velocity += this.speed;
        this.x -= this.x_velocity;
        this.x_velocity *= 0.9;
        

        if (this.x < -64) {

            this.x = -64;

        } else if (this.x > canvas.width) {

            this.x = canvas.width - 42;

        }
        this.draw();
    }

}