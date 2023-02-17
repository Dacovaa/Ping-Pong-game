//posição da bolinha e o tamanho dela
let xBola = 250;
let yBola = 200;
let diametroBola = 13;
let raio = diametroBola /2;

//velocidade em que ela se movimenta para cima e para baixo (y) e da direita para a esquerda (x)
let velocidadexBola = 6;
let velocidadeyBola = 6;

//parametros da raquete
let xRaquete = 3;
let yRaquete = 150;
let larguraRaquete = 7;
let alturaRaquete = 80;

let colidiu = false

//parametros da raquete inimiga
let xInimiga = 490;
let yInimiga = 150;
let velocidadeYInimiga;

//placar
let meusPontos = 0;
let pontosInimigo = 0;

//sons
let ponto;
let raquetada
let trilha

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}
function setup() {
  createCanvas(500, 400);
  trilha.loop();
}
//Função que executa todo o jogo, chamando as demais funções
function draw() {
  background(0);
  formatoBolinha();
  velocidadeBola();
  colisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentoRaquete();
  //colisaoRaquete();
  colisao(xRaquete,yRaquete);
  mostraRaquete(xInimiga,yInimiga);
  movimentoInimigo();
  colisao(xInimiga,yInimiga);
  mostraPlacar();
  pontos();
  bolinhaNaoFicaPresa();
}
function formatoBolinha(){
  circle(xBola,yBola,diametroBola)
}
function velocidadeBola(){
   xBola += velocidadexBola;
   yBola += velocidadeyBola;
}
function colisaoBorda(){
  if (xBola + raio > width ||
    xBola - raio < 0) {
    velocidadexBola *= -1
  }
  if (yBola + raio > height ||
     yBola - raio < 0){
    velocidadeyBola *= -1
  }
}
function mostraRaquete(x,y){
  rect(x,y,larguraRaquete,alturaRaquete)
}
function movimentoRaquete(){
  if (keyIsDown (87)){
    yRaquete -= 10;
  }
  if (keyIsDown (83)){
    yRaquete += 10;
}
}
function movimentoInimigo(){
   if (keyIsDown (UP_ARROW)){
    yInimiga -= 10;
  }
  if (keyIsDown (DOWN_ARROW)){
    yInimiga += 10;
}
}
function colisaoRaquete(){
  if (xBola - raio < xRaquete + larguraRaquete && yBola - raio < yRaquete + alturaRaquete && yBola + raio > yRaquete){
    velocidadexBola *=-1
  }
}
function colisao(x,y){
  colidiu=
collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBola, yBola, raio)
  if (colidiu){
    velocidadexBola *= -1;
    raquetada.play();
  }
  }
function mostraPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(17)
  fill(color(255,140,0))
  rect(150,10,40,20)
  rect(350,10,40,20)
  fill(255)
  text(meusPontos,170,26)
  text(pontosInimigo,370,26)
}
function pontos(){
  if (xBola > 495){
    meusPontos += 1
    ponto.play();
  }
  if (xBola < 5){
    pontosInimigo +=1
    ponto.play();
  }
}
function bolinhaNaoFicaPresa(){
    if (xBola + raio < 0 || xBola + raio > 506){
console.log('bolinha ficou presa');
    xBola = 250;    }
}