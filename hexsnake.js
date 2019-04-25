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

var paused, takingInput;

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
	takingInput = true;
	
    board = new HexSnakeBoard(canvas, ROWS, COLS);
	board.placeApple();
	
	board.drawGrid();
	board.fillGrid();	
    board.drawSnake();
	board.drawApple();
	
    pause();	
	
	inputDir = [1, 1];
	
	score = 0;
	
	setTimeout(tick, TICKDELAY);
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
  takingInput = false;
  
  context.font = TEXTFONT;
  context.textAlign = "center";
  context.fillStyle = TEXTCOLOR;
  context.strokeStyle = TEXTOUTLINE;
  context.lineWidth = 6;
  context.strokeText(GAMEOVERTEXT, canvas.width/2, canvas.height/2);
  context.fillText(GAMEOVERTEXT, canvas.width/2, canvas.height/2);

  setTimeout(start, 1000);
};

const keyDownHandler = function(e)
{
  if(!takingInput) { return; }
	
  var c = e.key.toUpperCase();
  
  if(paused && c != " ") { return; }
	
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
	  if(! paused)
	  {
		  pause();
	  }
	  else
	  {
		paused = false;
		setTimeout(tick, 2 * TICKDELAY);  
	  }
  }
};

const pause = function()
{
	paused = true;
	
	context.font = TEXTFONT;
	context.textAlign = "center";
	context.fillStyle = TEXTCOLOR;
	context.strokeStyle = TEXTOUTLINE;
	context.lineWidth = 6;
	context.strokeText(PAUSETEXT, canvas.width/2, canvas.height/2);
	context.fillText(PAUSETEXT, canvas.width/2, canvas.height/2);  
}