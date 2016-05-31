---
layout: post
title:  "Mariachi Mayhem"
genre: "Game jam game"
dev-role: "gameplay programmer"
categories: portfolio
img: mariachi-mayhem-header-small.png
permalink: /mariachi-mayhem/
---
* __Genre:__ local multiplayer party game
* __Platform:__ PC
* __Role:__ programmer, game design
* __Setting:__ global gamejam 2016
* __Date:__ february 2016
* __Repository:__ [ernstluring/mariachi-mayhem][github]
* __Download:__ [Windows][windowsBuild] / [OSX][osxBuild]

Mariachi Mayhem is a fun party game created in 48 hours during the Global Game Jam 2016 with as theme "ritual". The game was created with a
team of 4 people: two 3d/texture artists, one animator and me as programmer.

The goal of the game is to get as much skeletons as possible on the altar in the middle of the screen. To win you can bash your opponents away,
steal the skeleton and stay in the lead.

Normally before I actually start coding I always design the systems with UML. But because I had only 48 hours to complete this game I decided to start coding right away. Because of this and the time pressure of the last day the code is somewhat messy, but nonetheless it became a working fun game and I am proud of the end result.

Because I wanted the game to have cross platform xbox controller support (windows and osx) and I didn't have that much time I created a very simple system that checks the operating system and has the right mapped buttons for the according player number.

~~~ csharp
switch (playerNumber) {
  case PlayerNumber.ONE:
		if (Application.platform == RuntimePlatform.WindowsPlayer ||
    Application.platform == RuntimePlatform.WindowsEditor) {
		_controls.Add("Horizontal", "HorizontalP1Windows");
		_controls.Add("Vertical", "VerticalP1Windows");
		_controls.Add("PickUp", "PickUpP1Windows");
		_controls.Add("Attack", "AttackP1Windows");
		}
		if (Application.platform == RuntimePlatform.OSXPlayer ||
    Application.platform == RuntimePlatform.OSXEditor) {
		_controls.Add("Horizontal", "HorizontalP1OSX");
		_controls.Add("Vertical", "VerticalP1OSX");
		_controls.Add("PickUp", "PickUpP1OSX");
		_controls.Add("Attack", "AttackP1OSX");
		}
		break;
	case PlayerNumber.TWO:
		if (Application.platform == RuntimePlatform.WindowsPlayer ||
    Application.platform == RuntimePlatform.WindowsEditor) {
		_controls.Add("Horizontal", "HorizontalP2Windows");
		_controls.Add("Vertical", "VerticalP2Windows");
		_controls.Add("PickUp", "PickUpP2Windows");
		_controls.Add("Attack", "AttackP2Windows");
		}
		if (Application.platform == RuntimePlatform.OSXPlayer ||
    Application.platform == RuntimePlatform.OSXEditor) {
		_controls.Add("Horizontal", "HorizontalP2OSX");
		_controls.Add("Vertical", "VerticalP2OSX");
		_controls.Add("PickUp", "PickUpP2OSX");
		_controls.Add("Attack", "AttackP2OSX");
		}
		break;
	case PlayerNumber.THREE:
		if (Application.platform == RuntimePlatform.WindowsPlayer ||
    Application.platform == RuntimePlatform.WindowsEditor) {
		_controls.Add("Horizontal", "HorizontalP3Windows");
		_controls.Add("Vertical", "VerticalP3Windows");
		_controls.Add("PickUp", "PickUpP3Windows");
		_controls.Add("Attack", "AttackP3Windows");
		}
		if (Application.platform == RuntimePlatform.OSXPlayer ||
    Application.platform == RuntimePlatform.OSXEditor) {
		_controls.Add("Horizontal", "HorizontalP3OSX");
		_controls.Add("Vertical", "VerticalP3OSX");
		_controls.Add("PickUp", "PickUpP3OSX");
		_controls.Add("Attack", "AttackP3OSX");
		}
		break;
	case PlayerNumber.FOUR:
		if (Application.platform == RuntimePlatform.WindowsPlayer ||
    Application.platform == RuntimePlatform.WindowsEditor) {
		_controls.Add("Horizontal", "HorizontalP4Windows");
		_controls.Add("Vertical", "VerticalP4Windows");
		_controls.Add("PickUp", "PickUpP4Windows");
		_controls.Add("Attack", "AttackP4Windows");
		}
		if (Application.platform == RuntimePlatform.OSXPlayer ||
    Application.platform == RuntimePlatform.OSXEditor) {
		_controls.Add("Horizontal", "HorizontalP4OSX");
		_controls.Add("Vertical", "VerticalP4OSX");
		_controls.Add("PickUp", "PickUpP4OSX");
		_controls.Add("Attack", "AttackP4OSX");
		}
		break;
}
~~~

For [later games][blasterfest] I have rewritten this to a polymorphic system so it works better and is easier to maintain.

The game is played best with 4 players (it is possible with a minimum of 2 players) and an xbox controller.

The code can be found in my [repository][github] and the game can be downloaded for [osx][osxBuild] and
[windows][windowsBuild]

![ingame1]

<br />

![titlescreen]

[blasterfest]: {{ site.baseurl }}/blasterfest/
[windowsBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgTXdVWVluRU1UQ0U/view?usp=sharing
[osxBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgWDYzSjFJM0N6SnM/view?usp=sharing

[github]: https://github.com/ernstluring/mariachi-mayhem
[ingame1]: {{site.baseurl}}/img/mariachi-mayhem/mariachiMayhemScreenshot1.png
[titlescreen]: {{site.baseurl}}/img/mariachi-mayhem/mariachiMayhemTitlescreen.png
