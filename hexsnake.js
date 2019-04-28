const ROWS = 39;
const COLS = 99;

const TICKDELAY = 60;

const PAUSETEXT = "Paused";
const GAMEOVERTEXT = "OUCH!";
const TEXTCOLOR = 'white';
const TEXTOUTLINE = 'black';
const TEXTFONT = '72px Impact';

var canvas, context, scoreDiv, highScoreDiv;

var board;

var inputDir;

var paused, gameOver;

var score, highScore;

const init = function()
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	scoreDiv = document.getElementById('score');
	highScoreDiv = document.getElementById('highscore');
	
	initDrag();
	
	highScore = 0;
	
	document.onkeydown = keyDownHandler;
	
	start();
};

const start = function()
{
    board = new HexSnakeBoard(canvas, ROWS, COLS);
	board.placeApple();
	
	board.drawGrid();
	board.fillGrid();	
    board.drawSnake();
	board.drawApple();

    gameOver = false;	
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
};

const gameover = function()
{  
  gameOver = true;
  
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
  var propagate = false;
	
  var c = e.key.toUpperCase();
  
  var keyId = "key_" + c;
  
  var commandId = lookupCommandId(keyId);
  
  blinkKeyAndCommand(keyId);
  
  var oldInputDir = inputDir;  

  switch(commandId)
  {
	  case "cmd_NW":
	    inputDir = [-1, 1];
		break;
		
	  case "cmd_NE":
        inputDir = [1, 1];	  
		break;
		
      case "cmd_W":
	    inputDir = [-2, 0];
		break;
		
	  case "cmd_E":
	    inputDir = [2, 0];
		break;
		
	  case "cmd_SW":
	    inputDir = [-1, -1];
		break;
		
	  case "cmd_SE":
	    inputDir = [1, -1];
		break;
		
	  case "cmd_PAUSE":
	    if(! gameOver)
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
	    break;
		
	  default:	
	    propagate = true;
  	    break;
  }
  
  if(paused)
  {
    inputDir = oldInputDir;
  }
  
  if(! propagate)
  {
	  e.stopPropagation();
	  e.preventDefault();
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
};