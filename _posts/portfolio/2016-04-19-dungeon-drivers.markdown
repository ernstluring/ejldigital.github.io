---
layout: post
title:  "Dungeon Drivers"
genre: "Turn based strategy game"
dev-role: "gameplay programmer"
categories: portfolio
img: dungeon-drivers-header-small.jpg
permalink: /dungeon-drivers/
---
* __Genre:__ turn based strategy game
* __Platform:__ PC
* __Role:__ gameplay programmer
* __Date:__ september 2015 - february 2016
* __Repository:__ [ernstluring/dungeon-drivers][github]
* __Download:__ [Windows][windowsBuild] / [OSX][osxBuild]
* __Additional Info:__ the game is played best with two xbox controllers.

{% include youtubePlayer.html id="3dKhFZrvpBU" %}

Dungeon drivers is a turn based strategy game with cards and cars.
The game was an assignment from the [ConceptSleutelaars][conceptsleutelaars]. They pitched the concept of a fantasy themed card game with cars, they explained it as *"Mario Kart meets The Lord of the Rings"*.

We got inspired by this concept and expanded it with different characters, a card burning mechanic and a deck building mechanic that works in combination with customization of your vehicle. The player can choose between different wheels and weapons, that all have different cards for in the deck.

<br />

# My Role

I was the only programmer in a team of 6 people, the rest of the team were mainly artists. Because of this I had a important role and big responsibility in addition to be the only programmer. I was the last person in the development pipeline who touched the game build and I needed to ensure that every asset and mechanic was implemented the right way, for this a great skill of communication was needed.

I designed most of the systems beforehand with UML. With this game I chose to mainly make use of two design patterns: the strategy pattern and the state machine pattern. I also created a xml serialization system, so the card design process would be easier and faster for the game designer and the iteration time would be shorter.

All the code can be found on the [GitHub repository.][github]

* [XML serialization][cardsystem]:

{% include imageEnhancer.html src="/img/dungeon-drivers/serialization.jpg" scale="1" %}

~~~ csharp
[XmlRoot("CardsLibrary")]
public class CardLibrary {

	[XmlArray("GenericCards"), XmlArrayItem("genericCard")]
	public List<Card> genericCards = new List<BaseCard>();

	[XmlArray("Cards"), XmlArrayItem("card")]
	public List<Card> cards = new List<BaseCard>();

	public static CardLibrary Load (TextAsset xmlFile) {
		XmlSerializer serializer = new XmlSerializer(typeof(CardLibrary));
		using (StringReader sr = new StringReader (xmlFile.text)) {
			return (CardLibrary)serializer.Deserialize(sr);
		}
	}
}
~~~



* [Gameplay state machine][gameplayStateMachine]:

{% include imageEnhancer.html src="/img/dungeon-drivers/state-machine.jpg" scale="1" %}

~~~ csharp
public class GameplayStateMachine : StateMachine {

	private List<Player> players = new List<Player>();
	public List<Player> Players {
		get { return players; }
	}

	public Player activePlayer;
	public int activePlayerNumber;
	public List<Player> passivePlayers = new List<Player>();

	private State currentState;
	private State exitState;

	private State drawState, playState, burnState, endState, endgameState;

	public GameplayStateMachine (List<Player> players) {
		drawState = new DrawState(this);
		playState = new PlayState(this);
		burnState = new BurnState(this);
		endState = new EndState(this);
		endgameState = new EndGameState(this);

		drawState.NextState = playState;
		playState.NextState = burnState;
		burnState.NextState = endState;
		endState.NextState = drawState;

		currentState = drawState;
		exitState = endgameState;

		foreach (Player player in players) {
			this.players.Add(player);
		}

		activePlayer = players[0];
		activePlayerNumber = activePlayer.PlayerNumber;

		foreach (Player p in this.players) {
			if (p.PlayerNumber != activePlayerNumber) {
				passivePlayers.Add (p);
			}
		}

		// Only works with 2 players!
		if (passivePlayers.Count == 1) {
			activePlayer.SetOpponent (passivePlayers[0]);
			passivePlayers[0].SetOpponent (activePlayer);
		}
	}

	public override State CurrentState {
		get {
			return currentState;
		}
	}

	public override void AdvanceAndRun () {
		currentState = currentState.NextState;
		currentState.Run ();
	}

	public override bool IsComplete () {
		return currentState == exitState;
	}
}
~~~

~~~ csharp
public class PlayState : State {

	private GameplayStateMachine machine;
	private State nextState;

	public override State NextState {
		get {
			return nextState;
		}
		set {
			nextState = value;
		}
	}

	public PlayState (GameplayStateMachine machine) {
		this.machine = machine;
	}

	public override string GetName ()
	{
		return this.ToString();

	}

	public override void Run ()
	{
		// Set current player active and other players passive
		machine.activePlayer.SetPlayerActive();
		machine.activePlayer.phaseIndicator.SetText("Play");
		machine.activePlayer.phaseIndicator.DoTransition();
		foreach (Player p in machine.passivePlayers) {
			p.SetPlayerPassive();
			p.phaseIndicator.SetText("Waiting");
			p.phaseIndicator.DoTransition();
		}

		// When the active player is in pull position at the end of his turn, he gets health.
		// When he is in the ditch at the end of his turn, he gets damage
		if (machine.activePlayer.boardStatusEffect is DamagePerTurn) {
			machine.activePlayer.boardStatusEffect.Execute ();
			machine.activePlayer.boardStatusEffect = null;
		}
		if (machine.activePlayer.boardStatusEffect is HealPerTurn) {
			machine.activePlayer.boardStatusEffect.Execute ();
			machine.activePlayer.boardStatusEffect = null;
		}
	}
}
~~~

* [Weapons][weaponSystem]:

{% include imageEnhancer.html src="/img/dungeon-drivers/weapon.jpg" scale="1" %}

~~~ csharp
public abstract class Weapon : MonoBehaviour {

	protected List<AudioSource> audioSources = new List<AudioSource>();
	protected Animator gunAnim;
	protected Quaternion startRot;
	protected float speed = 2.5f;
	public Animator GunAnim { get { return gunAnim; } }

	void Awake () {
		startRot = transform.localRotation;
		AudioSource[] a = GetComponents<AudioSource>();
		for (int i = 0; i < a.Length; i++) {
			audioSources.Add (a[i]);
		}
		gunAnim = GetComponentInParent<Animator>();
	}

	protected IEnumerator StartLooking (AttackPointer target, Animator playerAnim, Player player) {

		float timer = 0;
		Quaternion targetRot = Quaternion.LookRotation(target.transform.position - transform.position);

		while (Quaternion.Angle(transform.rotation, targetRot) > 0.1f) {
			timer += Time.deltaTime * speed;
			transform.rotation = Quaternion.Slerp(startRot, targetRot, timer);
			yield return new WaitForEndOfFrame();
		}

		yield return StartCoroutine (Shoot (target, player));

		timer = 0;
		while (Quaternion.Angle(transform.rotation, startRot) > 0.1f) {
			timer += Time.deltaTime * speed;
			transform.rotation = Quaternion.Slerp(targetRot, startRot, timer);
			yield return new WaitForEndOfFrame();
		}

		Reset (playerAnim);
	}

	public abstract IEnumerator Shoot (AttackPointer attackPointer, Player player);
	public abstract IEnumerator Deploy (Player player, Card card, AttackPointer attackPointer, Player opponent);
	public abstract void Reset (Animator playerAnim);
}
~~~

[weaponSystem]: https://github.com/ernstluring/dungeon-drivers/tree/master/Scripts/Gameplay/Weapons
[gameplayStateMachine]: https://github.com/ernstluring/dungeon-drivers/tree/master/Scripts/Framework/TurnBased
[cardsystem]:https://github.com/ernstluring/dungeon-drivers/tree/master/Scripts/Framework/CardSystem
[windowsBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgaWNURmpjM2tNQlk/view?usp=sharing
[osxBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgRXlyTGFQVFBJQVU/view?usp=sharing
[conceptsleutelaars]: www.conceptsleutelaars.nl
[github]: https://github.com/ernstluring/dungeon-drivers
