

var canvas = document.getElementById("canvas001");
var canvasContext = canvas.getContext("2d");
canvas.addEventListener("click",pointerCoordinates,false);
// canvasContext.moveTo(0,0);
// canvasContext.lineTo(100,100);
// canvasContext.stroke();
//
// canvasContext.fillRect(50,50,20,20);

var grid = new Array(); // A 2d-array (matrix)
var cellSize = 10; // The size of each cell
var rowAmount = 60; // Rows of cells
var columnAmount = 80; // Columns of cells

var ticks = 0;
var tickp = document.getElementById("tick");

matrix();
drawCells();


function pointerCoordinates(event)
{
  var x = event.clientX;
  var y = event.clientY;
  //var coordinates = "x: " + x + " y: " + y;
  var rect = canvas.getBoundingClientRect();
  x = x - rect.left;
  y = y - rect.top;
  //alert(coordinates);
  updateCell(x,y);
}

function matrix()
{
  for (var i = 0; i < columnAmount; i++)
  {
    grid[i] = new Array();
    for (var j = 0; j < rowAmount; j++)
    {
      grid[i][j] = 0;
    }
  }
}
function randomMatrix()
{
  for (var i = 0; i < columnAmount; i++)
  {
    grid[i] = new Array();
    for (var j = 0; j < rowAmount; j++)
    {
      var number = Math.floor((Math.random() * 10) + 1);
      if (number <= 5) {
        grid[i][j] = 1;
      }
      else{grid[i][j] = 0;}

    }
  }
}

function clearCanvas()
{
  canvasContext.clearRect(0,0,canvas.width,canvas.height);
}

function drawCells()
{
  clearCanvas();
  var textDraw = "";

  for (var i = 0; i < columnAmount; i++)
  {
    textDraw += "<br/>";
    for (var j = 0; j < rowAmount; j++) {

      //textDraw += i + ", "+ j +": "+ grid[i][j] + "|";
      textDraw += grid[i][j] + "|";

      if (grid[i][j] == 0) {
        canvasContext.strokeStyle = "#D3D3D3";
        canvasContext.strokeRect(i*cellSize ,j*cellSize ,cellSize ,cellSize);
      }
      else if (grid[i][j] == 1){
        canvasContext.fillStyle = "#3f3f3f";
        canvasContext.fillRect(i*cellSize ,j*cellSize ,cellSize ,cellSize);
      }
      else if (grid[i][j] == 2){
        canvasContext.fillStyle = "#FFFF00";
        canvasContext.fillRect(i*cellSize ,j*cellSize ,cellSize ,cellSize);
      }
      else if (grid[i][j] == 3){
        canvasContext.fillStyle = "#0000FF";
        canvasContext.fillRect(i*cellSize ,j*cellSize ,cellSize ,cellSize);
      }

    }
  }

  document.getElementById("textDrawArea").innerHTML = textDraw;
}

function updateCell(x,y)
{
  var cellR = x / cellSize;
  cellR = parseInt(cellR,10);
  var cellC = y / cellSize;
  cellC = parseInt(cellC,10);

  if (grid[cellR][cellC] == 0)
  {
    grid[cellR][cellC] = 1;
  }
  else if (grid[cellR][cellC] == 1)
  {
    grid[cellR][cellC] = 0;
  }

  // for (var m = -1; m <= 1; m++)
  // {
  //   for (var n = -1; n <= 1; n++)
  //   {
  //     if(!(m == 0 && n == 0)){
  //     var c = cellC + m;
  //     var r = cellR + n;
  //     grid[r][c] = 2;}
  //
  //     }
  //   }

  drawCells();
}

//var neighborMatrix = array

function tick()
{

  for (var i = 0; i < columnAmount; i++)
  {
    for (var j = 0; j < rowAmount; j++)
    {

      var aliveNeighbors = 0;
      //
      // | -1,-1 | 0,-1 | 1,-1 |
      // | -1, 0 | 0, 0 | 1, 0 |
      // | -1, 1 | 0, 1 | 1, 1 |
      //
      for (var m = -1; m <= 1; m++)
      {
        for (var n = -1; n <= 1; n++)
        {
            if (!(m == 0 && n == 0)) // Dont look at the current cell
            {
              var c = i + m;
              var r = j + n;
              if (!(c < 0 || c >= columnAmount|| r < 0 || r >= rowAmount))
              {
                if(grid[c][r] == 1)
                {
                  aliveNeighbors = aliveNeighbors + 1;

                }
                else if(grid[c][r] == 2)
                {

                  aliveNeighbors = aliveNeighbors + 1;
                }
              }
            }
          }
      }
      // end of neighbor search
      var currentState = grid[i][j];
      if (currentState == 1) // Alive
      {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) // Cell dies
        {
          grid[i][j] = 2;
        }
      }
      else // Dead
      {
        if (aliveNeighbors == 3)
        {
          grid[i][j] = 3;
        }
      }

    }
  }



  // Convert 2s and 3s to 0s
  for (var i = 0; i < columnAmount; i++)
  {
    for (var j = 0; j < rowAmount; j++)
    {
        if (grid[i][j] == 3 || grid[i][j] == 1) {
          grid[i][j] = 1;
        }
        else {
          grid[i][j] = 0;
        }
    }
  }

  drawCells();
ticks++;
tickp.innerHTML = ticks;

} // end of tick();
var frameID;
function gameLoop()
{
  tick();
  drawCells();
  frameID = requestAnimationFrame(gameLoop);
}


function Start()
{
  frameID = requestAnimationFrame(gameLoop);
}
function Stop()
{
  cancelAnimationFrame(frameID);
  return;
}

function Reset()
{
  clearCanvas();
  grid.length = 0;
  matrix();
  drawCells();
  ticks = 0;
  tickp.innerHTML = ticks;
}

function Randomize()
{
  clearCanvas();
  grid.length = 0;
  randomMatrix();
  drawCells();
  ticks = 0;
  tickp.innerHTML = ticks;
}
