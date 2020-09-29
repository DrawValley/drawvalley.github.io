    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 6;
    
    function init() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        setInterval(mev(), 10);
        function mev(){
            canvas.addEventListener("mousemove", function (e) {
                findxy('move', e)
            }, false);
            canvas.addEventListener("mousedown", function (e) {
                findxy('down', e)
            }, false);
            canvas.addEventListener("mouseup", function (e) {
                findxy('up', e)
            }, false);
            canvas.addEventListener("mouseout", function (e) {
                findxy('out', e)
            }, false);
        }
    }
    
    function color(obj) {
        switch (obj.id) {
            case "green":
                x = "#00EE6F";
                break;
            case "blue":
                x = "#003CFF";
                break;
            case "red":
                x = "#FF1D34";
                break;
            case "yellow":
                x = "#EBEB00";
                break;
            case "dark-yellow":
                x = "#EBEB00";
                break;
            case "orange":
                x = "#FFB300";
                break;
            case "porpora":
                x = "#D43092";
                break;
            case "porpora":
                x = "#D43092";
                break;
            case "lilla":
                x = "#7727D2";
                break;  
            case "light-blue-sky":
                x = "#00CBFF";
                break;
            case "light-blue-dark":
                x = "#0067EE";
                break;
            case "pink":
                x = "#FF9BDE";
                break;
            case "violet":
                x = "#CF33E8";
                break;
            case "black":
                x = "black";
                break;
            case "white":
                x = "white";
                break;
        }
    }

    function lineDimensionSelected(obj){
        switch(obj.id) {
            case "y40":
                y = 40;
                break;
            case "y20":
                y = 20;
                break;
            case "y14":
                y = 14;
                break;
            case "y6":
                y = 6;
                break;
            case "y4":
                y = 4;
                break;
        }
    }

    selectedTool = "pen";
    function onToolSelected(obj){
        console.log(obj.id)
        var tools = document.getElementsByClassName("tool") ;
        switch(obj.id) {
            case "stylographic":
                for(i = 0; i < tools.length; i++) {
                    tools[i].style.paddingTop = "6vh";
                }
                document.getElementById(obj.id).style.paddingTop = "0vh";
                selectedTool = "stylographic";
                break;
            case "pencil":
                for(i = 0; i < tools.length; i++) {
                    tools[i].style.paddingTop = "6vh";
                }
                document.getElementById(obj.id).style.paddingTop = "0vh";     
                selectedTool = "pencil";           
                break;
            case "pen":
                for(i = 0; i < tools.length; i++) {
                    tools[i].style.paddingTop = "6vh";
                }
                document.getElementById(obj.id).style.paddingTop = "0vh";   
                selectedTool = "pen";             
                break;
            case "hightlighter":
                for(i = 0; i < tools.length; i++) {
                    tools[i].style.paddingTop = "6vh";
                }
                document.getElementById(obj.id).style.paddingTop = "0vh";  
                selectedTool = "hightlighter";              
                break;
        }
    }
    
    function draw() {
        switch (selectedTool){
            case "stylographic":
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX + y, currY - y);
                ctx.strokeStyle = x;
                ctx.globalAlpha = 1;
                ctx.lineWidth = y;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.closePath();
                break;
            case "pencil":
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = x;
                ctx.globalAlpha = 1;
                ctx.lineWidth = y;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.closePath();
                break;
            case "pen":
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = x;
                ctx.globalAlpha = 1;
                ctx.lineWidth = y;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.closePath();
                break;  
            case "hightlighter":
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = x;
                ctx.globalAlpha = 0.2;
                ctx.lineWidth = y;
                ctx.lineCap = "butt";
                ctx.stroke();
                ctx.closePath();
                break; 
        }
        
    }

    var divPrincipal = document.getElementsByClassName("div-principal");

    
    function hidePanelsClick()
    {
        document.getElementById("hidePanels").style.animation = "rotation1 0.4s";
        setTimeout(function(){ document.getElementById("hidePanels").style.transform = "rotate(180deg)"; }, 400);
        hidePanels();
    }

    function hidePanels()
    {
        for (var i = 0; i < divPrincipal.length; i++){
            if (divPrincipal[i].style.display !== "none") {
                // divPrincipal[i].style.display = "flex";
                $(divPrincipal[i]).toggle("slide");
            } else {
                // $(divPrincipal[i]).fadeOut("fast");
                $(divPrincipal[i]).toggle("slide");
                document.getElementById("hidePanels").style.animation = "rotation2 0.4s";
                setTimeout(function(){ document.getElementById("hidePanels").style.transform = "rotate(0deg)"; }, 400);
            }
        }
    }   
    
    function erase() {
        var m = confirm("Cancellare?");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }
    
    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }
    
    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag && selectedTool != "hightlighter") {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.globalAlpha = 1;
                //ctx.fillRect(currX, currY, 8, 8);
                ctx.arc(currX, currY, (y/2), 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                dot_flag = false;
            }else if (selectedTool == "hightlighter") {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.globalAlpha = 0.2;
                //ctx.fillRect(currX, currY, 8, 8);
                //ctx.arc(currX, currY, (y/2), 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == "down" && divPrincipal[0].style.display !== "none")
        {
            console.log("il topo è giu");
        }

        if (res == 'up' || res == "out") {
            flag = false;
        }
        if(res == "up" && divPrincipal[0].style.display === "none"){
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }

    function borderLightColor(s){
        var divColList = document.getElementsByClassName("spanColor") ;
        for(i = 0; i < divColList.length; i++) {
            divColList[i].style.borderColor = "#888888";
        }
        document.getElementById(s.id).style.borderColor = "#155ebd";
        console.log(s);
    }

    function borderLightDimension(s){
        var divColList = document.getElementsByClassName("span-lineDimension") ;
        for(i = 0; i < divColList.length; i++) {
            divColList[i].style.borderColor = "#888888";
        }
        document.getElementById(s.id).style.borderColor = "#155ebd";
        console.log(s);
    }

    //*  *//

function colorSelect(_cs){
    borderLightColor(_cs);
    color(_cs);
}

function lineDimensionSelect(_cs){
    borderLightDimension(_cs);
    lineDimensionSelected(_cs);
}

///////////////********* *********//////////////////
///////////////********* *********//////////////////
///////////////********* *********//////////////////