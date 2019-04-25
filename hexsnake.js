const ROWS = 39;
const COLS = 99;

const TICKDELAY = 60;

const PAUSETEXT = "Press Space";
const GAMEOVERTEXT = "OUCH!";
const TEXTCOLOR = 'white';
const TEXTOUTLINE = 'black';
const TEXTFONT = '72px Impact';

var canvas, context, scoreDiv, highScoreDiv;

var board;

var inputDir;

var paused;

var score, highScore;

const init = function()
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	scoreDiv = document.getElementById('score');
	highScoreDiv = document.getElementById('highscore');
	
	highScore = 0;
	
	document.onkeydown = keyDownHandler;
	
	start();
};

const start = function()
{
    board = new HexSnakeBoard(canvas, ROWS, COLS);
	board.placeApple();
	
	inputDir = [1, 1];
	
	score = 0;
	
	tick();
};

const tick = function()
{
	if(paused) { return; }
	
	board.setSnakeDir(inputDir);
	
	var points = board.attemptSnakeMove();
	
	if(points < 0)
	{
	  gameover();
	}
	else
	{
	  board.drawGrid();
	  board.fillGrid();	
      board.drawSnake();
	  board.drawApple();
	  
	  addPoints(points);
	
	  setTimeout(tick, TICKDELAY);		
	}
};

const addPoints = function(points)
{
	score += points;
	
	highScore = Math.max(highScore, score);
	
	scoreDiv.innerHTML = score;
	highScoreDiv.innerHTML = highScore;
}

const gameover = function()
{  
  paused = true;
  
  context.font = TEXTFONT;
  context.textAlign = "center";
  context.fillStyle = TEXTCOLOR;
  context.strokeStyle = TEXTOUTLINE;
  context.lineWidth = 6;
  context.strokeText(GAMEOVERTEXT, canvas.width/2, canvas.height/2);
  context.fillText(GAMEOVERTEXT, canvas.width/2, canvas.height/2);

  start();
};

const keyDownHandler = function(e)
{
  var c = e.key.toUpperCase();
	
  if("QWERT".includes(c))
  {
	  inputDir = [-1, 1];
  }
  else if("YUIOP".includes(c))
  {
	  inputDir = [1, 1];
  }
  else if("ASDFG".includes(c))
  {
	  inputDir = [-2, 0];
  }
  else if("HJKL;".includes(c))
  {
	  inputDir = [2, 0];
  }
  else if("ZXCV".includes(c))
  {
	  inputDir = [-1, -1];
  }
  else if("BNM,.".includes(c))
  {
	  inputDir = [1, -1];
  }
  else if(c == " ")
  {
	  paused = ! paused;
	  
	  if(paused)
	  {
		context.font = TEXTFONT;
        context.textAlign = "center";
        context.fillStyle = TEXTCOLOR;
        context.strokeStyle = TEXTOUTLINE;
        context.lineWidth = 6;
        context.strokeText(PAUSETEXT, canvas.width/2, canvas.height/2);
        context.fillText(PAUSETEXT, canvas.width/2, canvas.height/2);  
	  }
	  else
	  {
	    setTimeout(tick, 0);
	  }
  }
};