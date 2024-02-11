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
})
/**
 * Draw a brown line between the spaces
 */
function drawLines(spaces){
    for(let i=0; i<3;i++){
        for(let j=0; j<3;j++){
            if(i!==2){
                spaces[i][j].style.borderBottom="2px solid #bb6622";
            }
            if(j!==2){
                spaces[i][j].style.borderRight="2px solid #bb6622";
            }
        }
    }  
}