$(document).ready(function(){
    



    const spaceX = window.innerWidth-$("#car").width();
    var spaceY = window.innerHeight-$("#car").height();
    var speedSlider = document.getElementById("speed");
    var turnspeedSlider = document.getElementById("turnspeed");
    var driftenSlider = document.getElementById("driften");
  
    speedSlider.oninput = function() {
        speed = this.value;
    };
    turnspeedSlider.oninput = function() {
        turnspeed = this.value;
    };
    driftenSlider.oninput = function() {
        driften = this.value;
    };

    turnspeed = turnspeedSlider.value;
    speed = speedSlider.value;
    driften = driftenSlider.value;

    var rot = 90;
    var x = 1000;
    var y = 200;
    var dx = 0;
    var dy = 0;
    var leftDown = 0;
    var rightDown = 0;

    var score = 0;

    setInterval(function(){
        if(leftDown){
            rot-=+turnspeed;
        }
        if(rightDown){
            rot+=+turnspeed;
        }
        rotRad = rot*Math.PI/180;
        ax = Math.sin(rotRad);
        ay = -Math.cos(rotRad);

        driften = 0.99;


        dx = dx*driften+(ax*(1-driften));
        dy = dy*driften+(ay*(1-driften));

        x+=dx*speed;
        y+=dy*speed;

        $("#car").css({
            "-webkit-transform": "rotate("+rot+"deg)",
            "-moz-transform": "rotate("+rot+"deg)",
            "transform": "rotate("+rot+"deg)", /* For modern browsers(CSS3)  */
            "left": x+'px',
            "top": y+'px'
        });
        if(x<0){
            bounceX(1);
        }
        if(y<0){
            bounceY(1);
        }
        if(x>spaceX){
            bounceX(spaceX-1);
        }
        if(y>spaceY){
            bounceY(spaceY-1);
        }

    },10);

    bounceX = function(setXTo){
        rot%=360;
        rot=360-rot;
        x=setXTo;
        dx*=-0.5;
        dy*= 0.5;
    };

    bounceY = function(setYTo){
        rot=180-rot;
        y=setYTo;
        dx*= 0.5;
        dy*=-0.5;
    };


    if(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)){
        $(".mobile").css('visibility', 'visible');

        startleft = function(event) {
            leftDown = 1;
            return false;
        };
        startright = function(event) {
            rightDown = 1;
            return false;
        };
        cancelleft = function(event) {
            leftDown = 0;
        };
        cancelright = function(event) {
            rightDown = 0;
        };
        $("#buttonleft").on({"touchstart":startleft, "touchend":cancelleft, "touchleave":cancelleft, "touchcancel":cancelleft});
        $("#buttonright").on({"touchstart":startright, "touchend":cancelright, "touchleave":cancelright, "touchcancel":cancelright});
        
        //dev
        buttonleft.addEventListener("mousedown", startleft);
        buttonleft.addEventListener("mouseup", cancelleft);
        buttonright.addEventListener("mousedown", startright);
        buttonright.addEventListener("mouseup", cancelright);

        spaceY*=0.9;
    }else{
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 37) {
                leftDown = 1;
            }
            else if(event.keyCode == 39) {
                rightDown = 1;
            }
        });
    
        document.addEventListener('keyup', function(event) {
            if(event.keyCode == 37) {
                leftDown = 0;
            }
            else if(event.keyCode == 39) {
                rightDown = 0;
            }
            else if(event.keyCode == 32) {
                speed = 0;
            }
        });
    }
    
});