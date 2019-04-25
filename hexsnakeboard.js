class HexSnakeBoard
{
  constructor(canvas, rows, cols)
  {
    this.canvas = canvas;
	this.context = canvas.getContext('2d');
	
	this.rows = rows;
	this.cols = cols;
	
	this.honeycomb = new Honeycomb(canvas.width, canvas.height, rows, cols);
	this.hexcoords = this.honeycomb.getHexCoords();
	
	this.snake = [[1,1]]; // this is okay for now, but replace with linked list or something
	this.snakeDir = [1, 1];
	
	this.snakeColor = 'green';
	this.appleColor = 'red';
	this.gridColor = 'grey';
  }
  
  setSnakeDir(p)
  {
	  var a, b, ca, cb;
	  
	  [a, b] = p;
	  
	  [ca, cb] = this.snakeDir;
	  
	  // Don't let the snake back into itself (which would immediately end the game)
	  if(a != -ca || b != -cb)
	  {
		this.snakeDir = [a, b];  
	  }
  }
  
  randomElement(l)
  {
	  return l[Math.floor(Math.random() * l.length)];
  }
  
  snakeContainsPoint(a,b)
  {
	  for(var i = 0; i < this.snake.length; i++)
	  {
	    var sa, sb;
		
		[sa, sb] = this.snake[i];
		
		if(a == sa && b == sb) return true;
	  }
	  
	  return false;
  }
  
  placeApple()
  {  
	  do
	  {
		  this.apple = this.randomElement(this.hexcoords)
	  }
	  while(this.snake.includes(this.apple));
  }
  
  makePathAroundPerimeter(a, b)
  {
	var vertices = this.honeycomb.getVerticesCCW(a, b);

	var x, y;

	this.context.beginPath();

	for(var j = 0; j < vertices.length; j++)
	{
		[x, y] = vertices[j];
		
		if(j == 0)
		{
			this.context.moveTo(x, y);
		}
		else
		{
			this.context.lineTo(x, y);
		}
	}

	this.context.closePath();
  }
  
  drawGrid()
  {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);  
	  
	this.context.strokeStyle = this.gridColor;
	  
	for(var i = 0; i < this.hexcoords.length; i++)
	{
		var a, b;
		
		[a, b] = this.hexcoords[i];
		
		this.makePathAroundPerimeter(a, b);
		
		this.context.stroke();
	}
  }
  
  fillGrid()
  {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);  
	  
	this.context.fillStyle = 'lightgreen';
	  
	for(var i = 0; i < this.hexcoords.length; i++)
	{
		var a, b;
		
		[a, b] = this.hexcoords[i];
		
		this.makePathAroundPerimeter(a, b);
		
		this.context.fill();
	}
  }
  
  drawSnake()
  {
	  this.context.fillStyle = this.snakeColor;
	  
	  for(var i = 0; i < this.snake.length; i++)
	  {
		  var a, b;
		  
		  [a, b] = this.snake[i];
		  
		  this.makePathAroundPerimeter(a, b);
		  
		  this.context.fill();
	  }
  }
  
  drawApple()
  {
	this.context.fillStyle = this.appleColor;
	
	var a, b;
	
	[a, b] = this.apple;
	
	this.makePathAroundPerimeter(a, b);
	
	this.context.fill();
  }
  
  attemptSnakeMove()
  {
	  var a, b, da, db, newa, newb;
	  
	  [a, b] = this.snake[this.snake.length - 1];
	  
	  [da, db] = this.snakeDir;
	  
	  newa = a + da; newb = b + db;
	  
	  if(   newa <= 0 || newa > this.cols 
	     || newb < 0 || newb >= this.rows
		 || this.snakeContainsPoint(newa, newb))
	  {
		  return -1;
	  }
	  
	  if(newa != this.apple[0] || newb != this.apple[1])
	  {
		this.snake.shift();
	    this.snake.push([newa, newb]);
		return 0;
	  }
      else
	  {
		this.snake.push([newa, newb]);
		this.placeApple();
		return 1;
	  }
  }
};