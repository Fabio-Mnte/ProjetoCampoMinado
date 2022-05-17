var casas = []
var dificuldade
var iniciar = true
var posMinas
var NumerLinha
let NumerColuna
var bombas

function startup(nivel){ //define quantidade de casas e bombas
    if(nivel=='facil'){
        dificuldade = 80
        NumerLinha = 10
        NumerColuna = 8
        bombas = 10
    } else if(nivel=='medio'){
        dificuldade = 252
        NumerLinha = 18
        NumerColuna = 14
        bombas = 40
    } else{
        dificuldade = 480
        NumerLinha = 24
        NumerColuna = 20
        bombas = 99
    }
    plot(nivel)
}
function plot(nivel){ //cria uma matriz com todas as casas
    let sumirCena = document.getElementById("Menu")
    sumirCena.setAttribute("style","display:none")
    let mudarCena = document.getElementById("CampoMinado")
    mudarCena.setAttribute("style","display:inline")
        if(nivel=='facil'){
            for(i=0;i<NumerLinha;i++){
                casas.push([0,0,0,0,0,0,0,0],)
            }
        }
        else if(nivel=='medio'){
            for(i=0;i<NumerLinha;i++){
                casas.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0],)
            }
        }else{
            for(i=0;i<NumerLinha;i++){
                casas.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],)
            }
        }
    criarTabuleiro()
}
function criarTabuleiro(){  //monta um tabueleiro no HTML utilizando input type=button e o id e o onclick representam a posição na Matriz
    if(NumerLinha==10){
        for(i=0;i<10;i++){
            for(j=0;j<8;j++){
                document.getElementById("CampoMinado").innerHTML+="<input type='button' id='casa"+i+" "+j+"' class='casaFacil' onclick='chute("+i+","+j+")' value=' '>"
            }
            document.getElementById("CampoMinado").innerHTML+="<br>"
        }
    }else if(NumerLinha==18){
        for(i=0;i<18;i++){
            for(j=0;j<14;j++){
                document.getElementById("CampoMinado").innerHTML+="<input type='button' id='casa"+i+" "+j+"' class='casaMedia' onclick='chute("+i+","+j+")' value=' '>"
            }
            document.getElementById("CampoMinado").innerHTML+="<br>"
        }
    }else{
        for(i=0;i<24;i++){
            for(j=0;j<20;j++){ 
                document.getElementById("CampoMinado").innerHTML+="<input type='button' id='casa"+i+" "+j+"' class='casaDificil' onclick='chute("+i+","+j+")' value = ' '>"
            }
            document.getElementById("CampoMinado").innerHTML+="<br>"
        }
    }
}
function minas(casaX, casaY){ //gera as minas em lugares aleatórios
    for(i=0;i<bombas;i++){
        let bombaX = Math.floor(Math.random()*NumerLinha)
        let bombaY = Math.floor(Math.random()*NumerColuna)
        if(iniciar== true && bombaX == casaX &&  bombaY==casaY){
            bombaX = Math.floor(Math.random()*NumerLinha)
            bombaY = Math.floor(Math.random()*NumerLinha)
            iniciar = false
        } else{
            casas[bombaX][bombaY]= -2
        }
    }
    iniciar = false
}
//A partir daqui ta quebrado
function chute(casaX,casaY){ //verifica se tem bomba em cima da casa apertada e quantas bombas tem ao redor
    let nBomba = 0
    for(l=casaX-1;l<=casaX+1;l++){
        if(l<0){
            l = 0
        } else if(l>NumerLinha-1){
            break
        }
        for(j=casaY-1;j<=casaY+1;j++){           
            if(j>NumerColuna-1){
                break
            } else if(j<0){
                j=0
            }
            if(iniciar == true){
                minas(casaX,casaY)
            }
            if(casas[l][j]==-2){
                nBomba++
            }
            if(casas[casaX][casaY]==-2){
               terminou()
               return
            }
        }
    }
    if(nBomba==0){
        document.getElementById('casa'+casaX+' '+casaY).value = " "
        let cor = document.getElementById('casa'+casaX+" "+casaY)
        cor.setAttribute("style","background-color:#00FF00")
    } else{
        document.getElementById('casa'+casaX+' '+casaY).value = nBomba
    }
    casas[casaX][casaY] = 1
    verificarFim()

    if(nBomba==0){ //verifica se tem 0 nas redondezas e revela ele e as casas ao redor
        var f=-1
        for( f=-1;f<2;f++){
            let linhaX = casaX+f
            if(casaX+f<0){
                linhaX=0
            } else if(casaX+f>NumerLinha-1){
                break
            }
            let g=-1
            for(g=-1;g<2;g++){               
                let linhaY = casaY+g                
                if(casaY+g<0){
                    linhaY=0
                } else if(casaY+g>NumerColuna-1){
                    break
                }
                if(casas[linhaX][linhaY]==0){
                    chute(linhaX,linhaY)
                }
                
            }
        }
        return
    }
}
function verificarFim(){
    let testeFim = 0
    for(i=0;i<NumerLinha;i++){
        for(j=0;j<NumerColuna;j++){
            if(casas[i][j]==1||casas[i][j]==-2){
                testeFim++
            }
            if(testeFim == dificuldade){
                alert("você ganhou") //ganhar()
            }
        }
    }
}
function terminou() {
    alert("Puts... Você perdeu e explodiu uma bomba")
    location.reload()   
}