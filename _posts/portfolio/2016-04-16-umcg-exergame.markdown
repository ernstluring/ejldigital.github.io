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


~~~ python
#BackUpper.py

import maya.cmds as cmds
import functools

withoutExtension = 4

scnName = cmds.file(query=True, sceneName=True, shortName=True)
nameLength = len(scnName)
fileNumber = scnName[nameLength-withoutExtension]


def backUpper():
    print scnName

    scnNameWithoutNumber = scnName[:nameLength-withoutExtension]

    print "totalSceneName = %s" %scnName
    print "fileNumber = %s" %fileNumber
    print "SceneNameWithoutNumber = %s" %scnNameWithoutNumber

    newFileNumber = str(int(fileNumber)+1)
    newFileName = scnNameWithoutNumber+newFileNumber

    print "newFileName = %s" %newFileName

    cmds.file(rename = scnNameWithoutNumber+newFileNumber+".ma")
    cmds.file(save=True, type='mayaAscii')


def createSaveWindow():

    if cmds.window("windowID", exists=True):
       cmds.deleteUI("windowID")

    cmds.window("windowID", title="Save Scene", sizeable=False, resizeToFitChildren=True, h=200, w=200)
    cmds.rowColumnLayout(numberOfColumns=1, columnWidth=[(1,99)])
    cmds.text(label="Name Your Scene")
    inputField = cmds.textField(text="scene")

    cmds.button(label="Save", command=functools.partial(saveScene, inputField))
    cmds.button(label="Cancel", command = cancelSaveScene)

    cmds.showWindow()

def cancelSaveScene(*args):
    cmds.deleteUI("windowID")

def saveScene(sceneName, *args):   
   name = cmds.textField(sceneName, query=True, text=True)
   cmds.file(rename = name+"0.ma")
   cmds.file(save=True, type='mayaAscii')
   cmds.deleteUI("windowID")


if scnName != "":
    if fileNumber.isdigit():
        backUpper()
    else:
        print "fileNumber is no digit"
        cmds.file(rename = scnName[:nameLength-3]+"0.ma")
        cmds.file(save=True, type='mayaAscii')
else:
    createSaveWindow()
~~~

* [AlignX][alignx], [AlignY][aligny], [AlignZ][alignz] are a Maya tools I created that straightens an edge between vertices. Currently it only works with two vertices, but I'm planning on extending it so it can work with more vertices. I created this tool when I saw there was a uv mapping tool that does the same thing and I thought that it would be useful during modeling.

~~~ python
#AlignX.py
import maya.cmds as cmds

firstVtxIndexY = 2
secondVtxIndexY = 4

cmds.selectPref(isp=False)

s = cmds.ls(fl=1, os=True)
firstObj = s[0]
secondObj = s[1]

vertPos1 = cmds.xform(firstObj, query=True, worldSpace=True, translation=True)
vertPos2 = cmds.xform(secondObj, query=True, worldSpace=True, translation=True)

vtx1X = vertPos1[0]

vtx1Y = vertPos1[1]

vtx1Z = vertPos1[2]


vtx2X = vertPos2[0]

vtx2Y = vertPos2[1]

vtx2Z = vertPos2[2]

cmds.xform(firstObj, a=False, t=(vtx2X, vtx1Y, vtx1Z), ws=True)
~~~

* [GetObjectsByName][getobjectsbyname], [GiveParent][giveparent] and [ReplaceGameObjects][replacegameobjects] are a bunch of Unity tools I created to make the creation of levels in Unity easier.

~~~ csharp
using UnityEngine;
using UnityEditor;
using System.Collections;

public class ReplaceGameObjects : ScriptableWizard {

	public bool isNewObjectPrefab = true;
	public bool copyVales = true;
	public GameObject newObject;
	public GameObject[] oldObjects;

	[MenuItem("Tools/Replace GameObjects")]

	static void CreateWizard(){
		ScriptableWizard.DisplayWizard("Replace GameObjects", typeof(ReplaceGameObjects), "Replace and Close", "Replace");
	}

	private void OnWizardCreate(){
		if(errorString != "")
			return;
		Replace();
	}

	private void OnWizardOtherButton(){
		if(errorString != "")
			return;
		Replace();
		newObject = null;
		oldObjects = null;
	}

	private void OnWizardUpdate(){
		errorString = "";
		isValid = true;

		if (oldObjects == null){
			errorString += "Assign the old objects, so they can be replaced\n";
			isValid = false;
		}

		if (newObject == null){
			errorString += "What is the new / replacement object?";
			isValid = false;
		}
	}

	private void Replace(){
		foreach (GameObject g in oldObjects){
			GameObject obj;
			if(isNewObjectPrefab){
				obj = (GameObject)PrefabUtility.InstantiatePrefab(newObject);
			}else{
				obj = Instantiate(newObject);
				obj.name = newObject.name;
			}
			if(copyVales){
				obj.transform.position = g.transform.position;
				obj.transform.rotation = g.transform.rotation;
				obj.transform.parent = g.transform.parent;
			}

			Undo.RegisterCreatedObjectUndo(obj, "Replaced objects");
			Undo.DestroyObjectImmediate(g);
		}
	}
}
~~~

* [LevelEditingTool][levelediting]. The biggest project I worked on during this semester is creating a level editing tool for in Unity. This was a request of the client; he wanted to easily change the models in-game and especially during runtime so the levels could be a little bit random. The user can create 3 types of databases (buildings, trees, props) that dynamically load the models of the right type. These databases are connected to gameobjects that can be used in the scene editor and with a push on a button (or assigning from external script) the model of that gameobject can be changed.

~~~ csharp
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

[CustomEditor (typeof(BuildingObject))]
public class BuildingObjectInspectorEditor : Editor {

	SerializedProperty objectProp;

	Transform selectedTransform;

	BuildingObject buildingObject;
	BuildingObjectsDatabase database;

	void OnEnable (){
		buildingObject = (BuildingObject) target;

		objectProp = serializedObject.FindProperty("objects");

		if(!buildingObject.IsObjectSet()){
			buildingObject.SetObject(DatabaseLoader.LoadDatabase<BuildingObjectsDatabase>());
			if(buildingObject.GetObject() != null){
				Debug.Log("BuildingObjectsDatabase loaded");
			}else{
				Debug.Log("BuildingObjectsDatabase not loaded");
				return;
			}
		}

		database = buildingObject.GetObject();

		selectedTransform = Selection.activeTransform;
		if(selectedTransform.GetComponent<DrawGizmo>() != null)
			selectedTransform.GetComponent<DrawGizmo>().modelType = DrawGizmo.ModelType.Building;
	}

	public override void OnInspectorGUI(){
		serializedObject.Update();

		EditorGUILayout.PropertyField(objectProp);

		GUILayout.Label("Models");
		HashSet<Object>.Enumerator enu = database.objects.GetEnumerator();
		bool hasNext = enu.MoveNext();
		while(hasNext){
			GUILayout.BeginHorizontal();
			for(int i = 0; i < 3 && hasNext; i++){
				Object obj = enu.Current;
				hasNext = enu.MoveNext();
				if(GUILayout.Button(obj.name)){

					foreach(Transform child in selectedTransform){
						DestroyImmediate(child.gameObject);
					}

					GameObject newObj = PrefabUtility.InstantiatePrefab(obj) as GameObject;
					newObj.transform.parent = selectedTransform;
					newObj.transform.position = selectedTransform.position;

					serializedObject.ApplyModifiedProperties();
				}
			}
			GUILayout.EndHorizontal();
		}
	}

}
~~~


<br />

All the code can be found on [this GitHub repository][github].

{% include imageEnhancer.html src="/img/exergame/exergame-screenshot.png" scale="1" %}

[levelediting]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/
[getobjectsbyname]:  https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/GetObjectsByNameEditor.cs
[giveparent]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/GiveParent.cs
[replacegameobjects]: https://github.com/ernstluring/umcg-exergame/blob/master/Unity/Editor/ReplaceGameObjects.cs
[alignx]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignX1.0.py
[aligny]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignY1.0.py
[alignz]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/AlignXYZ/AlignZ1.0.py
[backupper]: https://github.com/ernstluring/umcg-exergame/blob/master/Maya/BackUpper/BackUpper1.3.py
[github]: https://github.com/ernstluring/umcg-exergame
[8dgames]: http://www.8d-games.nl/
