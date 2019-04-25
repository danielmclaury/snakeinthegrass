class Honeycomb
{
  constructor(width, height, rows, cols)
  {
	  this.width = width;
	  this.height = height;
	  this.rows = rows;
	  this.cols = cols;
	  
	  var s1 = 2 * this.height / (3 * this.rows + 1);
	  var s2 = 2 * width / ((cols + 1) * Math.sqrt(3));
	  
	  this.s = Math.min(s1, s2);
	  
	  var hs = (3 * this.rows + 1) * this.s / 2;
	  var ws = ((cols + 1) * Math.sqrt(3)) * this.s / 2;
	  
	  this.hMargin = (this.width - ws) / 2;
	  this.vMargin = (this.height - hs) / 2;
  }
  
  getHexCoords()
  {
	// TODO: Fix for even numbers of columns
	  
	var results = [];
	  
    for(var b = 0; b < this.rows; b++)
	{
		for(var c = 1; c < (this.cols + 1) / 2 + (b % 2); c++)
		{
			var a = 2 * c  - (b % 2);
			results.push([a, b]);
		}
	}
	
	return results;
  }
  
  getCenter(a, b)
  {
	  var x = (a) * Math.sqrt(3) * this.s / 2;
	  var y = (3 * b + 2) * this.s / 2;
	  
	  return [x + this.hMargin, this.height - y - this.vMargin];	  
  }
  
  getVerticesCCW(a, b)
  {
	  var cx, cy;
	  
	  [ cx, cy ] = this.getCenter(a, b);
	  
	  var result = [];
	  
	  for(var k = 0; k < 6; k++)
	  {
		  var x = cx + this.s * Math.sin(2 * Math.PI * k / 6);
		  var y = cy + this.s * Math.cos(2 * Math.PI * k / 6);
		  		  
		  result.push([x, y]);
	  }
	  
	  return result;
  }
};