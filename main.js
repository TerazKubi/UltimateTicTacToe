var game = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
]
var nextTarget 
var gameOver = false
const P1 = 'X'
const P2 = 'O'

var activePlayer

window.onload = function(){
    drawBoard()
    whoStarts()
    console.log(game)
    showInfo(activePlayer + " starts!")

}


function clickOnNode(i, j){
    if(!gameOver){
        game[i][j]=activePlayer
        console.log(game)

        //check for win in small nodes
        for(var i=0;i<game.length;i++){
            if(game[i]!=P1 && game[i]!=P2){
                if(checkForWin(game[i])){
                    game[i]=activePlayer
                    break
                }
            }
            
        }
        //check for win in big game / game over
        
        nextTarget = j
        drawBoard()
        if(checkForWin(game)){
            console.log("game over")
            showInfo(activePlayer + " wins!")
            gameOver = true
            return
            showWin()
        }
        showNextTarget(j)
        
        swapActivePlayer()
        showInfo(activePlayer + " turn.")
    }
    
}

function drawBoard(){
    var board = document.querySelector(".gameBoard")
    var html = ""
    
    if(nextTarget==null){//case if game just started and player can put X or O everywhere
        for(var i=0;i<game.length;i++){
            html+="<div class='bigGameNode' id='Big"+i+"' >"
            for(var j=0;j<game[i].length;j++){            
                html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' onclick='clickOnNode("+i+","+j+")'>"+game[i][j]+"</div>"             
            }
            html+="</div>"
        }
        html+="</div>"
    }else if(game[nextTarget]==P1 || game[nextTarget]==P2){//case when next target is already won
        console.log("this node is already won")
        for(var i = 0; i< game.length;i++){

            if(game[i]==P1 || game[i]==P2){
                html+="<div class='bigNodeWin' id='Big"+i+"' >"
                html+=game[i]
            }else{
                html+="<div class='bigGameNode' id='Big"+i+"' >"
                for(var j=0;j<game[i].length;j++){
                    if(game[i][j]!=' '){
                        html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' >"+game[i][j]+"</div>"
                    }else{
                        html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' onclick='clickOnNode("+i+","+j+")'>"+game[i][j]+"</div>"
                    }
                }
            }
            html+="</div>"
        }
    }else{ //===========================================================================
        for(var i=0;i<game.length;i++){
            
            
            if(game[i]==P1 || game[i]==P2){
                html+="<div class='bigNodeWin' id='Big"+i+"' >"
                html+=game[i]
            }
            else if(nextTarget == i){
                html+="<div class='bigGameNode' id='Big"+i+"' >"
                for(var j=0;j<game[i].length;j++){
                    if(game[i][j]!=' '){
                        html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' >"+game[i][j]+"</div>"
                    }else{
                        html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' onclick='clickOnNode("+i+","+j+")'>"+game[i][j]+"</div>"
                    }  
                }
            }else{
                html+="<div class='bigGameNode' id='Big"+i+"' >"
                for(var j=0;j<game[i].length;j++){
                        html+="<div class='smallGameNode' id='Small"+j+"B"+i+"' >"+game[i][j]+"</div>"
                }
            }
            
    
    
            html+="</div>"
        }
    }
    
    
    board.innerHTML = html
}
function swapActivePlayer(){
    if(activePlayer==P1){
        activePlayer=P2
    }else{
        activePlayer=P1
    }

}
function whoStarts(){
    x = parseInt(Math.random()*10)
    if(x>=5){
        activePlayer = P1
    }else{
        activePlayer = P2
    }
}

function showInfo(txt){
    document.querySelector(".gameInfo").innerHTML = txt
}

function showNextTarget(j){
    if(game[j]==P1 || game[j]==P2){//if target is already won then set target on other available nodes
        for(i=0; i<game.length;i++){
            if(game[i]==P1 || game[i]==P2){
                continue
            }else{
                document.querySelector("#Big"+i).style.border="1px solid red"
            }
        }
    }else{// just set target on desired node
        document.querySelector("#Big"+j).style.border="1px solid red"
    }
    
}

function checkForWin(t){
    // 0, 1, 2
    // 3, 4, 5
    // 6, 7, 8
    if(t[0]==t[1] && t[1]==t[2] && t[0]!=' '){   
        showWin(1, 2, 0)     
        return true
    }else if(t[3]==t[4] && t[4]==t[5] && t[3]!=' '){
        showWin(3, 4,5)  
        return true
    }else if(t[6]==t[7] && t[7]==t[8] && t[6]!=' '){
        showWin(6, 7, 8)  
        return true
    }else if(t[0]==t[3] && t[3]==t[6] && t[0]!=' '){
        showWin(0, 3, 6)  
        return true
    }else if(t[1]==t[4] && t[4]==t[7] && t[1]!=' '){
        showWin(1, 4, 7)  
        return true
    }else if(t[2]==t[5] && t[5]==t[8] && t[2]!=' '){
        showWin(2, 5, 8)  
        return true
    }else if(t[0]==t[4] && t[4]==t[8] && t[0]!=' '){
        showWin(0, 4, 8)  
        return true
    }else if(t[2]==t[4] && t[4]==t[6] && t[2]!=' '){
        showWin(2, 4, 6)  
        return true
    }
    return false       
}
function showWin(id1, id2, id3){
    document.getElementById("Big"+id1).style.border="2px solid green"
    document.getElementById("Big"+id2).style.border="2px solid green"
    document.getElementById("Big"+id3).style.border="2px solid green"
    document.getElementById("Big"+id1).style.color="green"
    document.getElementById("Big"+id2).style.color="green"
    document.getElementById("Big"+id3).style.color="green"
}