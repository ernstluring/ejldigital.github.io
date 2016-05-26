---
layout: post
title:  "UMCG Exergame"
genre: "Exercise game"
dev-role: "tool programmer"
categories: portfolio
img: umcg-header-small.png
permalink: /umcg-exergame/
---
* __Genre:__ exercise game
* __Platform:__ PC
* __Role:__ tool programmer (Unity/Maya), level design, SCRUM master
* __Date:__ february 2015 - july 2015
* __Repository  :__ [ernstluring/umcg-exergame][github]

This project was an assignment from the game development studio [8D Games][8dgames]. They were creating an exercise game focused on balance exercise and fall prevention for elderly people in collaboration with UMCG Groningen. A Kinect registers the movement of the balance exercises and converts these in-game to ice skating motions. The data of the players' movement collected by the Kinect can be forwarded to a physician or physiotherapist. They can inspect this data and see for example if the patient leans to much to the left or right and/or in what kind of physical shape the patient is in.


{% include youtubePlayer.html id="OKwsO7oyTEI" %}

<br />

# My Role

This project already started a half year before I joined the development team.
The team consisted of only 3d artists and they created a lot of art for the game but they wanted to implement this in the Unity game engine and asked me to join the development to give support with the implementation. I decided to join because one of my biggest learning goals at that point was learning more about the 3d art pipeline in game development. I started by setting up a workflow from creating an asset to implementing it in the game engine so it runs as smoothly as possible.
To make the delivery of new game versions to the client easier I have set up repository on BitBucket.

Because I'm a programmer by heart I quickly started to program Unity and Maya tools for the artists to make their lives easier:


* [BackUpper][backupper] is a Maya tool written in python. I saw that a lot of artists used "save as" often and I thought: "that can go quicker and easier". So I started writing a backup plugin that saves a new scene with a incrementing number with a press of a button.
* [AlignX][alignx], [AlignY][aligny], [AlignZ][alignz] are a Maya tools I created that straightens an edge between vertices. Currently it only works with two vertices, but I'm planning to extended it so it can work with more vertices. I created this tool when I saw there was uv mapping tool that does the same thing and I thought it also can be useful during modeling.
* [GetObjectsByName][getobjectsbyname], [GiveParent][giveparent] and [ReplaceGameObjects][replacegameobjects] are a bunch of Unity tools I created to make the creation of levels in Unity easier.


All the code can also be found on [this GitHub repository][github].

![exergamescreen1]

[exergamescreen1]: {{ site.baseurl }}/img/exergame/exergame-screenshot.png
[getobjectsbyname]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/GetObjectsByNameEditor.cs
[giveparent]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/GiveParent.cs
[replacegameobjects]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/ReplaceGameObjects.cs
[alignx]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignX1.0.py
[aligny]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignY1.0.py
[alignz]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignZ1.0.py
[backupper]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/BackUpper/BackUpper1.3.py
[github]: https://github.com/ernstluring/umcg-exergame
[8dgames]: http://www.8d-games.nl/
