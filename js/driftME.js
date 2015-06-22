var game = new Phaser.Game(640, 520, Phaser.AUTO, '', { preload: preload, create: create, update: update, render : render });
function preload()
{
	//Importing the asset(s) required for the game
	game.load.image('background' , 'assets/images/background3_640_520.png');
	game.load.image('pp_button' , 'assets/images/playpause_120_35.png');
	game.load.image('info' , 'assets/images/info_35_35.png');

	//Game specific asset(s)
	game.load.image('box' , 'assets/images/driftU/displaybox_130_130.png');
	game.load.image('smile' , 'assets/images/driftU/smile_261_89.png');
	game.load.image('correct' , 'assets/images/correct_60_60.png');
	game.load.image('wrong' , 'assets/images/wrong_60_60.png');
}
var block;
var score = 0;
var level = 1;
var timer;
var minutes = 0;
var seconds;
var isVowel;
var isEven;
var boxNumber;
var boxText;
var xTextPos;
var yTextPos;
var selectedBox;
var yes;
var no;
var answer;
var questionOne;
var questionTwo;
var questionThree;
var x_initial = 0;
function create()
{
	//Adding the background images
	game.add.sprite(0 , 0 , 'background');
	playpause = game.add.sprite(255 , 475 , 'pp_button');
	info_button = game.add.sprite(5, 430 , 'info');

	renderBox();

	//game.add.sprite(183 , 314, 'smile');
	yes = game.add.sprite(230,355, 'correct');
	yes.inputEnabled = true;

	no = game.add.sprite(350,355 , 'wrong');
	no.inputEnabled = true;

	myscore = game.add.text(90, 19 , '000' , {font : "15px Arial" , fill : "white"});
	mylevel = game.add.text(312, 19 , '01' , {font : "15px Arial" , fill : "white"});
	timer = game.add.text(505, 19, '00:00' ,{font : "15px Arial" , fill : "white"});
	boxText = game.add.text(xTextPos, yTextPos , '' ,{ font : '50px Arial' , fill : "black"}  );
	initialize();
	

}

function renderBox()
{

	if (level < 5)
	{
		boxNumber = 2;
		x_initial = 150 ;
	}	
	else
	{
		boxNumber = 3;
		x_initial = 55;	
	}

	block = game.add.group();
	var item;
	for(var i = 0 ; i < boxNumber ; i++)
	{
		item = block.create(x_initial + i*200 , 135 , 'box' );
		if(i === 0)
		{
			questionOne = game.add.text (x_initial + i*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);

		}
		else if (i === 1)
		{
			questionTwo = game.add.text (x_initial + i*200 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
		else if (i === 2)
		{
			questionThree = game.add.text (x_initial + i*200 - 13 , 285 , 'Is the number odd ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionThree.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
	}
}

function update()
{	
	//myscore.setText(score);
	//mylevel.setText('0'+level);
	updateTimer();
	
}

function updateTimer()
{
	//To find and display the elapsed time.
	seconds=Math.floor(game.time.totalElapsedSeconds());
	minutes = Math.floor(seconds / 60);
	hours = Math.floor(minutes/60);
		
	if (minutes < 10) 
	{
		minutes = '0' + minutes;	
	}

	var modsec = seconds % 60;
	if (modsec < 10) 
	{
		modsec = '0' + modsec;	
	}
	var timeText = '0'+hours+':'+minutes+ ':' + modsec ;
	timer.setText(timeText);
}

function boxValue()
{
 	return getAlphabet()+getNumber();
}
function getAlphabet() 
{
 var vowels =['A','E',' I','O','U'];
 var constnants =['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','X','Y','Z'];
 if ((game.rnd.integerInRange(1,100)%2)==0) 
 {
 isVowel=1;
 return vowels[(game.rnd.integerInRange(1,100)% vowels.length)];
 }
 else
 {
 isVowel=0;
 return constnants[(game.rnd.integerInRange(1,100)% constnants.length)];
 }
 
}

function getNumber() 
{
 var a = (game.rnd.integerInRange(1,100)%9)+1;
 if (a%2 === 0) 
 {
 isEven = 1;
 }
 else
 {
 isEven = 0;
 }
 return a;
}
var p =0;
function selectBox()
{	console.log(p++);

	if(boxNumber === 2)
	{
		if ((game.rnd.integerInRange(1,100)%2)==0) 
		 {
		 	xTextPos = 185;
		 	yTextPos = 175;
		 	selectedBox = 1;
		 	//boxText.game.text.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' ,{ font : '50px Arial' , fill : "white"}  );
		 	//console.log(selectedBox);
		 }
		 else
		 {
		 	xTextPos = 385;
		 	yTextPos = 175;
		 	selectedBox = 2;
		 	//boxText.game.text.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 	//console.log(selectedBox);
		 }
	}
	else if(boxNumber === 3)
	{
		var random = game.rnd.integerInRange(1,100)%3;
		//console.log(random);
		if (random === 0)
		 {
		 	xTextPos = 90;
		 	yTextPos = 175;
		 	selectedBox = 1;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }
		else if (random === 1)
		 {
		 	xTextPos = 290;
		 	yTextPos = 175;
		 	selectedBox = 2;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }
		else
		 {
		 	xTextPos = 490;
		 	yTextPos = 175;
		 	selectedBox = 3;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }	
	}
}

function initialize()
{
	var text = boxValue();
	selectBox();
	boxText.setText(text);
}

function updateBox()
{	
	//var loosu = ' ';
	//boxText.setText(loosu);
	updateScore();
	var text = boxValue();
	selectBox();
	boxText.setText(text);
}

function render()
{
	yes.events.onInputDown.add(removeTextYes);
	no.events.onInputDown.add(removeTextNo);

	yes.events.onInputUp.add(updateBox);
	no.events.onInputUp.add(updateBox);
}

function removeTextYes()
{
	answer = 1;
	var empty = ' ';
	boxText.setText(empty);
}

function removeTextNo()
{
	answer = 0;
	var empty = ' ';
	boxText.setText(empty);
}

function updateScore()
{
	if(level % 2 == 0)
	{
		if(selectedBox === 2)
		{
			if(isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isEven && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}
		}
		else if(selectedBox === 1)
		{
			if(isVowel && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isVowel && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}		
		}
		else if(selectedBox === 3)
		{
			if(!isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (isEven && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}		
		}

	}
	else
	{
		if(selectedBox === 1)
		{
			if(isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isEven && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}
		}
		else if(selectedBox === 2)
		{
			if(isVowel && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isVowel && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}		
		}
		else if(selectedBox === 3)
		{
			if(!isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (isEven && !answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else
			{
				isCorrect = 0;
			}		
		}
	}

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
	level = Math.floor(score/250) + 1;
	mylevel.setText('0'+level);
	if(level<5)
	{
		if(level%2 === 0)
		{
			questionOne.setText(' ');
			questionTwo.setText(' ');
			questionOne = game.add.text (150 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
			questionTwo = game.add.text (150 + 1*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
		else
		{
			questionTwo.setText(' ');
			questionOne.setText(' ');
			questionOne = game.add.text (150 + 0*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
			questionTwo = game.add.text (150 + 1*200 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
	}	

	
}
