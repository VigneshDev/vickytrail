var game = new Phaser.Game(640, 520, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, create, this); },
    //  The Google Fonts we want to load.
    google: { families: [ 'Architects+Daughter::latin' ] }
};

function preload()
{
  //Importing the asset(s) required for the game
  game.load.image('background' , 'assets/images/highClick/background_640_520.jpg');
  game.load.image('play' , 'assets/images/highClick/play_30_30.png');
  game.load.image('pause' , 'assets/images/highClick/pause_30_30.png');
  game.load.image('box', 'assets/images/highClick/displaybox_130_130.png' );
  game.load.image('equals', 'assets/images/highClick/equal_130_90.png' );
  game.load.image('living' , 'assets/images/highClick/living_30_30.png');
  game.load.image('dead' , 'assets/images/highClick/dead_30_30.png');
  game.load.image('happy' , 'assets/images/highClick/happy_75_75.png');
  game.load.image('sad' , 'assets/images/highClick/sad_75_75.png');
  //Load the Google WebFont Loader script
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}
var pauseState = 0;
var level = 1;
var livingState; //create
var life; //create
var block; //create
var equals;
var numberOne;
var numberTwo;
var numberTwoDisplay;
var boxOneText;
var boxTwoText;
var score = 0;
var isCorrect = null;
var lifeline = 3;
var play;
var pause;
var tempText;
function create()
{
  game.add.sprite(0 , 0 , 'background');
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
  {
    life = livingState.create(27 , 180 + p*38 , 'living');
  }
  block = game.add.group();
  var item;
  for(var i = 0 ; i < 2 ; i++)
  {
    item = block.create(145 + i*215 , 165 , 'box' );
    item.inputEnabled = true;
  }
  equals = game.add.sprite(255,335,'equals');
  equals.inputEnabled = true;
  tempText = game.add.text(470, 470 , ' ' , {font : "15px Arial" , fill : "#eceff1"});
  pause = game.add.sprite(575,455,'pause');
  pause.inputEnabled = true;
  myscore = game.add.text(80, 43 , '000' , {font : "15px Arial" , fill : "#eceff1"});
  mylevel = game.add.text(311, 43 , '01' , {font : "15px Arial" , fill : "#eceff1"});
  timer = game.add.text(515, 43, '00:00:00' ,{font : "15px Arial" , fill : "#eceff1"});
  createText();
  love = game.add.sprite(535, 350 , 'happy');
}
function createText()
{

  boxOneText = game.add.text(0, 0,'56 + 56',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: block.getAt(0).width, align: "center" });
  boxOneText.x = Math.floor(block.getAt(0).x + block.getAt(0).width/2);
  boxOneText.y = Math.floor(block.getAt(0).y + block.getAt(0).height/2);
  boxOneText.anchor.set(0.45,0.3);
  boxOneText.font = 'Architects Daughter';

  boxTwoText = game.add.text(400, 225,'56 + 56',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: block.getAt(0).width, align: "center" });
  boxTwoText.x = Math.floor(block.getAt(1).x + block.getAt(1).width/2);
  boxTwoText.y = Math.floor(block.getAt(1).y + block.getAt(1).height/2);
  boxTwoText.anchor.set(0.45,0.3);
  boxTwoText.font = 'Architects Daughter';
  boxText();
}
function update()
{
  updateTimer();
  block.getAt(0).events.onInputDown.add(boxOneSelected);
  block.getAt(1).events.onInputDown.add(boxTwoSelected);
  equals.events.onInputUp.add(equalsSelected);


  block.getAt(0).events.onInputUp.add(updateBox);
  block.getAt(1).events.onInputUp.add(updateBox);
  equals.events.onInputUp.add(updateBox);

  pause.events.onInputUp.add(pauseAndPlay);

}
var userSelection;
function boxOneSelected ()
{
  if(pauseState === 0)
  {
    userSelection = 1;
    boxOneText.setText(' ');
    boxTwoText.setText(' ');
  }
}
function boxTwoSelected ()
{
  if(pauseState === 0)
  {
    userSelection = 2;
    boxOneText.setText(' ');
    boxTwoText.setText(' ');
  }
}
function equalsSelected ()
{
  if(pauseState === 0)
  {
    userSelection = 3;
    boxOneText.setText(' ');
    boxTwoText.setText(' ');
  }
}
var love;
function updateBox()
{
  if (pauseState === 0)
  {
    love.kill();
    updateScore();
    boxText();
    if(isCorrect)
    {
      love = game.add.sprite(535, 350 , 'happy');
    }
    else
    {
    love = game.add.sprite(535, 350 , 'sad');
    if(lifeline === 2)
      {
        livingState.getAt(0).kill();
        game.add.sprite(27,180,'dead');
      }
      else if (lifeline === 1)
      {
        livingState.getAt(1).kill();
        game.add.sprite(27,218,'dead');
      }
      else if (lifeline === 0)
      {
        livingState.getAt(2).kill();
        game.add.sprite(27,256,'dead');
        pauseState = 1;
        pause.inputEnabled = false;
        var destroy = game.add.text(272, 305 , 'Game Over !' , {font : "17px Arial" , fill : "#ec407a"});
        var TuxMathAd = game.add.text(245, 327 , '\"Try TuxMath Dear !\"', {font : "17px Arial" , fill : "#ffffff"})
      }
    }
  }
}
function updateScore()
{

  if(selectedBox === 1)
  {
    if(greaterThan && userSelection === 1)
    {
      score+=25;
      isCorrect = 1;
    }
    else if(lessThan && userSelection === 2)
    {
      score+=25;
      isCorrect = 1;
    }
    else if(equalTo && userSelection === 3)
    {
      score+=25;
      isCorrect = 1;
    }
    else
    {
      isCorrect = 0;
      lifeline--;
    }
  }
  else
  {
    if(lessThan && userSelection === 1)
    {
      score+=25;
      isCorrect = 1;
    }
    else if(greaterThan && userSelection === 2)
    {
      score+=25;
      isCorrect = 1;
    }
    else if(equalTo && userSelection === 3)
    {
      score+=25;
      isCorrect = 1;
    }
    else
    {
      isCorrect = 0;
      lifeline--;
    }
  }
  var displayScore;
  if (score < 100)
  {
    displayScore = '00' + score;
  }
  else if (score < 1000)
  {
    displayScore = '0' + score;
  }
  else
  {
    displayScore = score;
  }
  myscore.setText(displayScore);
  updateLevel();
}

function updateLevel()
{
  var levelFlag = level;
  level = Math.floor(score/250) + 1;
  mylevel.setText('0'+level);
  if(levelFlag !== level)
  {
    updateLife();
  }
}
function updateLife()
{
  lifeline = 3;
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
  {
    life = livingState.create(27 , 180 + p*38 , 'living');
  }

}
var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
// The userdefined function to update the timer.
function updateTimer()
{
	//To find and display the elapsed time.
	if(pauseState === 0)
	{
		if(timeUpdateFlag === 0)
		{
			timeUpdateFlag = 1;
			timePaused = timePaused + (Math.floor(game.time.totalElapsedSeconds())-totalSeconds);
		}
		totalSeconds=Math.floor(game.time.totalElapsedSeconds());
		gameSeconds = totalSeconds - timePaused;
		var minutes = Math.floor(gameSeconds / 60);
		var hours = Math.floor(minutes/60);
		var modmin = minutes%60;
		if (modmin < 10)
		{
			modmin = '0' + modmin;
		}
		var modsec = gameSeconds % 60;
		if (modsec < 10)
		{
			modsec = '0' + modsec;
		}
		timeText = '0'+hours+':'+modmin+ ':' + modsec ;
		timer.setText(timeText);
	}
	else
	{
		timeUpdateFlag = 0
	}
}

function createNumberTwo()
{
  var num;
  var random = game.rnd.integerInRange(1,100)% 6;

  if(random === 0)
  {
    num = numberOne - 1;
  }
  else if(random === 1)
  {
    num = numberOne + 1;
  }
  else if(random === 2)
  {
    num = numberOne;
  }
  else if(random === 3)
  {
    num = numberOne;
  }
  else if(random === 4)
  {
    num = numberOne + 2;
  }
  else
  {
    num = numberOne - 2;
  }

  console.log(num + 'num');

  var randomOperation = game.rnd.integerInRange(1,100)% 4;
  var tempOne;
  var tempTwo;

  if(randomOperation === 0)//addition
  {
    var randomAdd = game.rnd.integerInRange(1,100)% 4;
    if(randomAdd === 0) //In terms of num/2 + num/2
    {
      tempOne = Math.floor(num/2);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else if(randomAdd === 1) //in terms of num/3 + (num - num/3)
    {
      tempOne = Math.floor(num/3);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else if(randomAdd === 2)
    {
      tempOne = Math.floor(num/4);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else
    {
      tempOne = Math.floor(num/5);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
  }
  else if(randomOperation === 1)//subtraction
  {
    var randomSub = game.rnd.integerInRange(1,100)% 3;
    if(randomSub === 0)
    {
      tempOne = num * 2;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
    else if(randomSub === 1)
    {
      tempOne = num * 3;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
    else
    {
      tempOne = num * 4;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
  }
  else if(randomOperation === 2)//Multiplication
  {
    //var randomMul = game.rnd.integerInRange(1,100)% 4;
    if(num % 7 === 0)
    {
      tempOne = num/7;
      numberTwo = tempOne*7; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '7';
    }
    else if(num % 5 === 0)
    {
      tempOne = num/5;
      numberTwo = tempOne*5; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '5';
    }
    else if(num % 3 === 0)
    {
      tempOne = num/3;
      numberTwo = tempOne*3; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '3';
    }
    else
    {
      tempOne = Math.floor(num/2);
      numberTwo = tempOne*2; //num may or may not be equal to numberTwo;
      numberTwoDisplay = tempOne + ' x ' + '2';
    }
  }
  else //Division
  {
    var randomDiv = game.rnd.integerInRange(1,100)% 2 ;
    if(randomDiv === 0)
    {
      tempOne = num*2;
      numberTwo = Math.floor(tempOne/2);
      numberTwoDisplay = tempOne + ' / ' + '2';
    }
    else
    {
      tempOne = num*5;
      numberTwo = Math.floor(tempOne/5);
      numberTwoDisplay = tempOne + ' / ' + '5';
    }



  }
  console.log(numberTwo + 'numberTwo');

}
var equalTo = null;
var lessThan = null;
var greaterThan = null;
var selectedBox = null;

function boxText()
{
  numberOne = ((game.rnd.integerInRange(1,100)) % (level*10))+5 ;
  console.log(numberOne + 'numberOne');
  createNumberTwo();
  console.log(numberTwo + 'numberTwo');
  if(numberOne === numberTwo)
  {
    equalTo = 1;
    greaterThan = 0;
    lessThan = 0;
  }
  else if(numberOne > numberTwo)
  {
    equalTo = 0;
    greaterThan = 1;
    lessThan = 0;
  }
  else if(numberOne < numberTwo)
  {
    equalTo = 0;
    greaterThan = 0;
    lessThan = 1;
  }
  var randomBox = game.rnd.integerInRange(1,100)% 2;
  if(randomBox === 0)
  {
    boxOneText.setText(numberOne);
    boxTwoText.setText(numberTwoDisplay);
    selectedBox = 1;
  }
  else
  {
    boxOneText.setText(numberTwoDisplay);
    boxTwoText.setText(numberOne);
    selectedBox = 2;
  }
  console.log('selectedBox' + selectedBox);
  console.log(greaterThan);
  console.log(lessThan);
  console.log(equalTo);

}

function pauseAndPlay()
{
  if(pauseState  === 0)
  {
    pauseState = 1;
    tempText.setText('Game Paused');
  }
  else
  {
    tempText.setText(' ');
    pauseState = 0;
  }
}
