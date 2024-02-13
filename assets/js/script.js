/**
 * After the page is loaded it fisishes the design
 * and sets up eventlisteners
 */
document.addEventListener("DOMContentLoaded",function(){
    let spaces= [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    for(let i=0; i<3;i++){
        for(let j=0; j<3;j++){
            spaces[i][j]=document.getElementsByClassName("space")[i*3+j];
        }
    }
    drawLines(spaces);
    click(spaces);
    document.getElementById("new-game").addEventListener("click",newGame);
})
/**
 * Draw a brown line between the spaces
 */
function drawLines(spaces){
    for(let i=0; i<3;i++){
        for(let j=0; j<3;j++){
            if(i!==2){
                spaces[i][j].style.borderBottom="3px solid black";
            }
            if(j!==2){
                spaces[i][j].style.borderRight="3px solid black";
            }
        }
    }  
}
/**
 * Event listener for the board 
 */
function click(spaces){
    for(let i=0; i<3;i++){
        for(let j=0; j<3;j++){
            spaces[i][j].addEventListener("click",playerMove);
        }
    }
}
/**
 * It draws the player move
 */
function playerMove(event){
    if(this.innerHTML===" "){
        this.innerHTML="X";
        /*
            After the player played it blocks the player
            and the bot play with a delay
        */
        clickBlock();
        setTimeout(()=> {botMove();},300);
    }
}
/**
 * It draws the bot move 
 */
function botMove(){
    // Indexes of the free spaces are collected in this array
    let freeSpaces=[];
    for(let i=0;i<9;i++){
        if (document.getElementsByClassName("space")[i].innerHTML==="  "){
            freeSpaces.push(i);
        }
    }
    // Check if someone won or there is no more space
    let finished=isItFinished(freeSpaces.length);
    // If the game can be continued the bot choses a random space
    if (!finished){
        document.getElementsByClassName("space")[
        freeSpaces[Math.floor(Math.random()*freeSpaces.length)]].innerHTML="O";
        //Check if someone won or there is no more space
        isItFinished(freeSpaces.length-1);
    }
}
/**
* Checks if the game finished
*/
function isItFinished(numOfFreePlaces){
    let space;
    let spaceValue;
    // it collects the solution of each rows, columns and diagonals
    let winTable ={
        row:[0,0,0],
        column:[0,0,0],
        diagonal:[0,0],
    };
    /*
        As it iterates over the spaces checks the innerHTML
        if it's "X" the spaceValue become 1
        if it's "X" the spaceValue become -1
        if it's "X" the spaceValue become 0 
    */
    for(let i=0; i<3;i++){
        for(let j=0; j<3;j++){
            space=document.getElementsByClassName("space")[i*3+j];
            if (space.innerHTML==="X"){
                spaceValue=1;
            }else if(space.innerHTML==="O"){
                spaceValue=-1;
            } else{
                spaceValue=0;
            }
            /*
                We add the spaceValue to the winTable to the correct row,
                coulumn, and if it is come from a diagonal, to that as well.
            */
            winTable.row[i]+=spaceValue;
            winTable.column[j]+=spaceValue;
            if(i===j){
                winTable.diagonal[0]+=spaceValue;
            }
            if(i+j===2){
                winTable.diagonal[1]+=spaceValue;
            }
        }
    }   
    /*
        If a number in the wintable 3 the player won
        If a number in the winTable -3 the bot won
    */
    for (let i=0;i<3;i++){
        if(winTable.row[i]===3){
            drawWiningLine(i,"horisontal");
            win();
            return true;
        }
        if(winTable.column[i]===3){
            drawWiningLine(i+3,"vertical");
            win();
            return true;
        }
        if(winTable.row[i]===-3){
            drawWiningLine(i,"horisontal");
            lose();
            return true;
        }
        if(winTable.column[i]===-3){
            drawWiningLine(i+3,"vertical");
            lose();
            return true;
        }
    }
    if (winTable.diagonal[0]===3){
        drawWiningLine(1,"diagonal0");
        win();
        return true;
    }
    if (winTable.diagonal[0]===-3){
        drawWiningLine(1,"diagonal0");
        lose();
        return true;
    }
    if (winTable.diagonal[1]===3){
        drawWiningLine(1,"diagonal1");
        win();
        return true;
    }
    if (winTable.diagonal[1]===-3){
        drawWiningLine(1,"diagonal1");
        lose();
        return true;
    }
    if(numOfFreePlaces===0){
        // also if there is no more place to play
        draw();
        return true;
    }else{
        clickAllow();
        return false;
     }
}
/**
 * Add point to wins
 * Congratulate for the player
 * */
function win(){
    alert("Congratulation! You Won!");
    clickBlock();
    document.getElementById("win-num").innerHTML++;
}
/**
 * Add point to loses
 * Inform the player that he lost
 * */
function lose(){
    alert("Unfortunately you lost this time!")
    clickBlock();
    document.getElementById("lose-num").innerHTML++;
}
/**
 * Block the player to play after the game is over
 * or if it is the bot's turn
 * */
function clickBlock(){
    for(let i=0;i<9;i++){
        //change the spaces is to double spaces
        if (document.getElementsByClassName("space")[i].innerHTML===" "){
            document.getElementsByClassName("space")[i].innerHTML="  ";
        }
    }
}
/**
 * Allow the player to play after the bot played
 */
function clickAllow(){
    for(let i=0;i<9;i++){
        //change the double spaces is to spaces
        if (document.getElementsByClassName("space")[i].innerHTML==="  "){
            document.getElementsByClassName("space")[i].innerHTML=" ";
        }
    }
}
/**
 * Alert the player that it is a draw
 */
function draw(){
    alert("It is a draw!")
}
/**
 * Start a new game
 */
function newGame(){
    for(let i=0;i<9;i++){
        
        document.getElementsByClassName("space")[i].innerHTML=" ";
        
    }
    document.getElementById("gameboard").style.background="#F9CC9C";
}
/**
 * It draws a line on the wining three
 */
function drawWiningLine(positionCode, direction){
    // position of the line
    let position;
    if (positionCode===0) { position ="top"; }
    if (positionCode===1) { position ="center"; }
    if (positionCode===2) { position ="bottom"; }
    if (positionCode===3) { position ="left"; }
    if (positionCode===4) { position ="center"; }
    if (positionCode===5) { position ="right"; }
    // the vertical line image has a different width
    let backgroundSize="max(40vh)";
    if (direction==="vertical"){ backgroundSize="max(17vh)"}

    direction="#F9CC9C url('assets/images/"+direction+".png') no-repeat";
    document.getElementById("gameboard").style.background=direction;
    document.getElementById("gameboard").style.backgroundSize=backgroundSize;
    document.getElementById("gameboard").style.backgroundPosition=position;
}