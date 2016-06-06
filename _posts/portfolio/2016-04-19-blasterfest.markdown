---
layout: post
title:  "Blasterfest"
genre: "Local multiplayer brawler"
dev-role: "lead gameplay programmer"
categories: portfolio
img: blasterfest-header-small.png
permalink: /blasterfest/
---
* __Genre:__ local multiplayer brawler
* __Platform:__ PC
* __Role:__ lead gameplay programmer, SCRUM master
* __Date:__ february 2016 - current
* __Repository:__ [ernstluring/blasterfest][github]
* __Download:__ [Web][webBuild] / [Windows][windowsBuild] / [OSX][osxBuild]
* __Additional Info:__ the game requires (2 - 4) controllers

![wantedImg]

Blasterfest is a local-multiplayer brawler game where you face off against up to three of your friends with your blaster and jetpack to win the title of deadliest bounty hunter.

This game is a self initiated project in collaboration with a publisher with a small scope and as goal to release it on steam at the end of the semester (a half year).


* Controls mapper: because I want the game to have cross platform controller support I designed and created a control mapper system. The system works with a abstract class that needs to be inherited from per platform classes. All the classes can be found [here on the GitHub repository][controlsmapper].

~~~ csharp
public enum InputKeyValue { Horizontal, Vertical, Jetpack, AimHorizontal, AimVertical, Shoot, Jump, A, B, Start, Select,
							X, Y, DpadRight, DpadLeft, DpadUp, DpadDown, DpadHorizontalAxis, DpadVerticalAxis }
public abstract class AControlsMapper {

	public abstract string GetHorizontalAxis();
	public abstract string GetVerticalAxis();
	public abstract string GetShootTrigger();
	public abstract string GetJetpackTrigger();
	public abstract string GetAimHorizontalAxis();
	public abstract string GetAimVerticalAxis();
	public abstract string GetJumpButton();
	public abstract string GetAButton();
	public abstract string GetBButton();
	public abstract string GetXButton();
	public abstract string GetYButton();
	public abstract string GetStartButton();
	public abstract string GetSelectButton();
	public abstract string GetDpadRight();
	public abstract string GetDpadLeft();
	public abstract string GetDpadUp();
	public abstract string GetDpadDown();

	public abstract bool AimingRight();
	public abstract bool AimingLeft();

	public abstract bool DpadLeft();
	public abstract bool DpadRight();
	public abstract bool DpadUp();
	public abstract bool DpadDown();

	public bool PressedRight () {
		return Input.GetAxisRaw(GetHorizontalAxis()) > 0.3f;
	}
	public bool PressedLeft () {
		return Input.GetAxisRaw(GetHorizontalAxis()) < -0.3f;
	}
	public bool PressedUp () {
		return Input.GetAxisRaw(GetVerticalAxis()) > 0;
	}
	public bool PressedDown () {
		return Input.GetAxisRaw(GetVerticalAxis()) < -0.9f;
	}
	public bool PressedJump () {
		return Input.GetButtonDown(GetJumpButton());
	}
	public bool JetpackTrigger () {
		return Input.GetAxisRaw(GetJetpackTrigger()) > 0;
	}
	public bool ShootTrigger () {
		return Input.GetAxisRaw(GetShootTrigger()) > 0;
	}
	public bool ShootTriggerPressed () {
		return Input.GetAxisRaw(GetShootTrigger()) > 0.9f;
	}
	public bool ShootTriggerReleased () {
		return Input.GetAxisRaw(GetShootTrigger()) < 0.1f;
	}
	public bool PressedAButton () {
		return Input.GetButtonDown(GetAButton());
	}
	public bool PressedBButton () {
		return Input.GetButtonDown(GetBButton());
	}
	public bool PressedXButton () {
		return Input.GetButtonDown (GetXButton ());
	}
	public bool PressedStartButton () {
		return Input.GetButtonDown(GetStartButton());
	}
}
~~~

~~~ csharp
public class XboxControllerMapperWindows : AControlsMapper {
	private Dictionary<InputKeyValue, string> _controls;
	private string _systemType = "Windows";

	public XboxControllerMapperWindows (PlayerNumber playerNumber) {
		string playerNumberAndSystem = ((int)playerNumber+1).ToString()+_systemType;
		_controls = new Dictionary<InputKeyValue, string>();
		_controls.Add (InputKeyValue.Horizontal, "Horizontal"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Vertical, "Vertical"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Jump, "Jump"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Jetpack, "Jetpack"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Shoot, "Shoot"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.AimHorizontal, "AimHorizontal"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.AimVertical, "AimVertical"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.A, "Jump"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.B, "Cancel"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Start, "Start"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Select, "Select" + playerNumberAndSystem);
		_controls.Add (InputKeyValue.X, "X"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.Y, "Y"+playerNumberAndSystem);
		_controls.Add (InputKeyValue.DpadHorizontalAxis, "DpadHorizontal" + playerNumberAndSystem);
		_controls.Add (InputKeyValue.DpadVerticalAxis, "DpadVertical" + playerNumberAndSystem);
	}

	public override string GetHorizontalAxis ()
	{
		return _controls[InputKeyValue.Horizontal];
	}
	public override string GetVerticalAxis ()
	{
		return _controls[InputKeyValue.Vertical];
	}
	public override string GetShootTrigger ()
	{
		return _controls[InputKeyValue.Shoot];
	}
	public override string GetJetpackTrigger ()
	{
		return _controls[InputKeyValue.Jetpack];
	}
	public override string GetAimHorizontalAxis ()
	{
		return _controls[InputKeyValue.AimHorizontal];
	}
	public override string GetAimVerticalAxis ()
	{
		return _controls[InputKeyValue.AimVertical];
	}
	public override string GetJumpButton ()
	{
		return _controls[InputKeyValue.Jump];
	}
	public override string GetAButton ()
	{
		return _controls[InputKeyValue.A];
	}
	public override string GetBButton ()
	{
		return _controls[InputKeyValue.B];
	}
	public override string GetXButton ()
	{
		return _controls [InputKeyValue.X];
	}
	public override string GetYButton ()
	{
		return _controls [InputKeyValue.Y];
	}
	public override string GetStartButton ()
	{
		return _controls[InputKeyValue.Start];
	}
	public override string GetSelectButton ()
	{
		return _controls [InputKeyValue.Select];
	}
	public override string GetDpadLeft ()
	{
		return _controls [InputKeyValue.DpadHorizontalAxis];
	}
	public override string GetDpadRight ()
	{
		return _controls [InputKeyValue.DpadHorizontalAxis];
	}
	public override string GetDpadUp ()
	{
		return _controls [InputKeyValue.DpadVerticalAxis];
	}
	public override string GetDpadDown ()
	{
		return _controls [InputKeyValue.DpadVerticalAxis];
	}
	public override bool AimingRight () {
		return Input.GetAxisRaw(GetAimHorizontalAxis()) > 0.6f;
	}
	public override bool AimingLeft () {
		return Input.GetAxisRaw(GetAimHorizontalAxis()) < -0.6f;
	}
	public override bool DpadDown () {
		return Input.GetAxisRaw (GetDpadUp ()) < 0;
	}
	public override bool DpadUp ()
	{
		return Input.GetAxisRaw (GetDpadUp ()) > 0;
	}
	public override bool DpadLeft ()
	{
		return Input.GetAxisRaw (GetDpadLeft ()) < 0;
	}
	public override bool DpadRight ()
	{
		return Input.GetAxisRaw (GetDpadLeft ()) > 0;
	}
}
~~~

* Environment events: because the game will eventually have multiple environment events I created a general environment event system where
environment items can assign to.

~~~ csharp
public class EnvironmentEvents : MonoBehaviour {

	public enum EnvironmentType { Car }

	public delegate void OnEnvironmentCall (EnvironmentType environmentType);
	public static event OnEnvironmentCall onEnvironmentCall;

	public delegate void OnWanted (SpinePlayerController playerController);
	public static event OnWanted onWanted;

	public bool flyingCar = true;
	[SerializeField]
	private int[] _waitTimes;

	private void Start ()
	{
		if (_waitTimes == null)
			Debug.LogError("The 'waitTimes' array is empty, there should atleast by one value", this);
		Timing.RunCoroutine(CarEvent(), Segment.Update);
	}

	private IEnumerator<float> CarEvent ()
	{
		while (flyingCar)
		{
			int waitValue = _waitTimes[Random.Range(0, _waitTimes.Length)];
			yield return Timing.WaitForSeconds(waitValue);
			if (onEnvironmentCall != null)
				onEnvironmentCall(EnvironmentType.Car);
		}
	}

	public static void OnWantedEvent (SpinePlayerController playerController)
	{
		if (onWanted != null)
			onWanted (playerController);
	}
}
~~~

~~~ csharp
public class Car : MonoBehaviour {

	private EnvironmentEvents.EnvironmentType type = EnvironmentEvents.EnvironmentType.Car;
	private Vector2[] _goToPositions;
	private SpriteRenderer _spriteRenderer;
	private AudioSource _audioSource;
	private PolygonCollider2D _collider;
	private BoxCollider2D _triggerCollider;
	private bool _bLeftSideOfScreen;
	private GameObject _marker;
	private Camera _mainCamera;
	[SerializeField]
	private float _movementSpeed = 0.1f;
	[Header("Audio")]
	[SerializeField]
	private AudioClip _carSound;

	void Start () {
		_spriteRenderer = GetComponent<SpriteRenderer>();
		_audioSource = GetComponent<AudioSource> ();
		_collider = GetComponent<PolygonCollider2D>();
		_triggerCollider = GetComponent<BoxCollider2D>();
		_mainCamera = Camera.main;
		_marker = transform.GetChild(0).gameObject;
		_marker.SetActive(false);

		_goToPositions = new Vector2[6];
		_goToPositions[0] = new Vector2(-2, 3.67f);
		_goToPositions[1] = new Vector2(22, 3.67f);
		_goToPositions[2] = new Vector2(-2, 6.05f);
		_goToPositions[3] = new Vector2(22, 6.05f);
		_goToPositions[4] = new Vector2(-2, 9.05f);
		_goToPositions[5] = new Vector2(22, 9.05f);

		_audioSource.clip = _carSound;

		RandomPosition ();
	}

	void OnEnable ()
	{
		EnvironmentEvents.onEnvironmentCall += Move;
	}

	void OnDisable ()
	{
		EnvironmentEvents.onEnvironmentCall -= Move;
	}

	private void RandomPosition ()
	{
		int _index = Random.Range(0, _goToPositions.Length);
		transform.localPosition = _goToPositions[_index];
		_bLeftSideOfScreen = transform.position.x < 0;
		_spriteRenderer.flipX = !_bLeftSideOfScreen;
		_collider.enabled = false;
		_triggerCollider.enabled = false;
	}

	private void Move (EnvironmentEvents.EnvironmentType environmentType)
	{
		if (this.type == environmentType)
		{
			_marker.SetActive(true);

			Vector3 lowerLeft = _mainCamera.ViewportToWorldPoint(new Vector3(0, 0, 0));
			Vector3 lowerRight = _mainCamera.ViewportToWorldPoint(new Vector3(1, 0, 0));

			_marker.transform.position = _bLeftSideOfScreen ? new Vector3(lowerLeft.x + 0.5f, transform.position.y)
				: new Vector3(lowerRight.x - 0.5f, transform.position.y);

			StartCoroutine(GoMove());
		}
	}

	private IEnumerator GoMove ()
	{
		yield return new WaitForSeconds(5);
		float timer = 0;
		Vector3 startPos = transform.position;
		Vector3 newPos = startPos;

		newPos.x += _bLeftSideOfScreen ? 24 : -24;

		_marker.SetActive(false);
		while(Vector3.Distance(transform.position, newPos) > 0.01f) {
			timer += _movementSpeed * Time.deltaTime;
			transform.position = Vector3.Lerp(startPos, newPos, timer);
			yield return new WaitForEndOfFrame();
		}
		RandomPosition();
	}

	private void OnTriggerEnter2D (Collider2D col)
	{
		IKillable killable = col.GetComponent(typeof(IKillable)) as IKillable;
		if (killable != null)
			killable.Kill(true);
	}

	private void OnBecameVisible ()
	{
		_audioSource.PlayOneShot(_carSound);
		_collider.enabled = true;
		_triggerCollider.enabled = true;
	}
}
~~~

* Explosion with circle raycast:

~~~ csharp
public class Explosion : AExplosion {

	public override void Explode (Collider2D colToIgnore, SpinePlayerController owner, Collider2D ownerCol,
		bool wasRevengeBullet)
	{
		_audioSource.PlayOneShot (_explosionSound);
		Collider2D[] splash = Physics2D.OverlapCircleAll(transform.position, base._radius, base.layerMask);
		for (int i = 0; i < splash.Length; i++) {
			if (splash[i] == ownerCol)
			{
				// Vector that points from the explosion position to the player's position
				Vector2 dir =  splash[i].transform.position - transform.position;
				owner.RocketJump(dir);
			}
			else if (splash[i] != colToIgnore)
			{
				IDestructable destructable = splash[i].GetComponent(typeof(IDestructable)) as IDestructable;
				IKillable k = splash[i].GetComponent(typeof(IKillable)) as IKillable;
				if (destructable != null)
					destructable.Destroy(ownerCol, owner, wasRevengeBullet);
				if (k != null && k.Kill(owner.IsWanted()))
				{
					// Wanted Game Mode Kill
					if (GameModeManager.Instance.GetGameMode () == GameMode.Wanted) {

						if (owner.IsWanted ()) {
							ScoreManager.Instance.CalculateScore(owner.Score, owner.IsWanted(), k.IsWanted(), false, wasRevengeBullet);
						}
						if (k.IsWanted ()) {
							ScoreManager.Instance.CalculateScore(owner.Score, owner.IsWanted(), k.IsWanted(), false, wasRevengeBullet);
							GameManager.Instance.WantedGame.DisableTimer (owner);
						}

						bool firstShot = !GameManager.Instance.WantedGame.FirstBulletIsShot;
						if (firstShot) {
							ScoreManager.Instance.CalculateScore(owner.Score, owner.IsWanted(), k.IsWanted(), false, wasRevengeBullet);
							GameManager.Instance.WantedGame.FirstBullet (owner);
						}
					}
				}
			}
		 }
		Timing.RunCoroutine(FadeAway());
	}

	private IEnumerator<float> FadeAway ()
	{
		yield return Timing.WaitForSeconds (_anim.GetCurrentAnimatorStateInfo (0).length);
		_explosionRenderer.enabled = false;
		Destroy (gameObject, 1.5f);
	}
}
~~~

* Managers:

~~~ csharp
public class GameManager : MonoBehaviour {
	public static GameManager Instance { get; private set; }

	public enum GameState { Start, Wanted, Deathmatch, End, Wait, Count };
	private GameState _gameState;

	private delegate void RunState();
	private RunState[] _runStateDelegate;

	public delegate void OnEndState (List<SpinePlayerController> allPlayers);
	public static event OnEndState onEndState;
	public delegate void OnStartState ();
	public static event OnStartState onStartState;

	private ScoreManager _scoreManager;
	public WantedGameRound WantedGame {get; private set; }
	public DeathMatch GetDeathMatch { get; private set; }

	[SerializeField]
	private GameMode _gameModeForDebug;
	[SerializeField]
	private int _wantedRounds = 20;

	public void SwitchState (GameState state) {
		_gameState = state;
	}

	private void Awake () {
		if (Instance == null) {
			Instance = this;
		} else {
			Debug.LogError("There is already a GameManager in the scene, there can only be one", Instance);
			Destroy(this.gameObject);
		}

		_runStateDelegate = new RunState[(int)GameState.Count];
		_runStateDelegate[(int)GameState.Start] = StartGame;
		_runStateDelegate[(int)GameState.Wanted] = BountyGame;
		_runStateDelegate[(int)GameState.Deathmatch] = DeathMatchGame;
		_runStateDelegate[(int)GameState.End] = EndGame;
		_runStateDelegate[(int)GameState.Wait] = Wait;

	}

	private void Start ()
	{
		_gameState = GameState.Start;
	}

	private void OnDestroy () {
		if (_runStateDelegate != null) {
			for (int i = 0; i < (int)GameState.Count; i++) {
				_runStateDelegate[i] = null;
			}
			_runStateDelegate = null;
		}
		Instance = null;
	}

	private void Update () {
		if (_runStateDelegate[(int)_gameState] != null) {
			_runStateDelegate[(int)_gameState]();
		}
	}

	private void StartGame () {
		PlayerManager.Instance.SpawnAllPlayers ();
		_scoreManager = GetComponent<ScoreManager>();
		if (_scoreManager == null) {
			gameObject.AddComponent<ScoreManager>();
		}

		if (GameModeManager.Instance.GetGameMode () == GameMode.Wanted) {
			_gameState = GameState.Wanted;
		}
		if (GameModeManager.Instance.GetGameMode () == GameMode.DeathMatch) {
			_gameState = GameState.Deathmatch;
		}
		onStartState ();
	}

	private void BountyGame () {
		if (WantedGame == null) {
			WantedGame = gameObject.AddComponent<WantedGameRound>();
			WantedGame.maxWantedRounds = _wantedRounds;
		}
	}

	private void DeathMatchGame () {
		if (GetDeathMatch == null) {
			GetDeathMatch = gameObject.AddComponent<DeathMatch> ();
		}
	}

	private void EndGame () {
		float dt = Time.deltaTime;

		List<SpinePlayerController> playerControllers = PlayerManager.Instance.PlayerControllers;
		CameraController.Instance.StopShake ();
		onEndState (playerControllers);

		while (Time.timeScale > 0.1f) {
			Time.timeScale = Mathf.MoveTowards(Time.timeScale, 0, dt * 0.001f);
		}

		Time.timeScale = 0;
		_gameState = GameState.Wait;
	}

	private void Wait () {

  }
}
~~~

~~~ csharp
public class ScoreManager : MonoBehaviour
{
	private PlayerScore[] _playersScores;
	public static ScoreManager Instance { get; private set; }

	private void Awake ()
	{
		if (Instance == null)
			Instance = this;
		else {
			Debug.LogError("There is already a ScoreManager in the scene, there can only be one", Instance);
			Destroy(this);
		}
	}

	private void Start ()
	{
		SpinePlayerController[] playerControllers = PlayerManager.Instance.PlayerControllers.ToArray();
		_playersScores = new PlayerScore[playerControllers.Length];
		for (int i = 0; i < playerControllers.Length; i++)
		{
			_playersScores[i] = playerControllers[i].Score;
		}
	}

	private void OnDestroy ()
	{
		Instance = null;
	}

	public void CalculateScore (PlayerScore target, bool isShooterWanted, bool wasWantedKill, bool wasBulletKill,
		bool wasRevengeKill)
	{
		if (isShooterWanted)
		{
			var value = wasBulletKill ? (target.CurrentScore + (2+target.Rank)*2) :
				(target.CurrentScore + (target.Rank*2));
			target.SetScore(value, isShooterWanted, wasRevengeKill, wasWantedKill);
		}
		// Shooter is not wanted
		else
		{
			if (wasRevengeKill)
			{
				if (wasWantedKill)
				{
					// Revenge wanted bullet kill / revenge wanted splash kill
					var value = wasBulletKill ? (target.CurrentScore + (2+target.Rank)*3) :
						(target.CurrentScore + (target.Rank*4));
					target.SetScore(value, isShooterWanted, wasRevengeKill, wasWantedKill);
				}
				else
				{
					// Revenge normal bullet kill / revenge normal splash kill
					var value = wasBulletKill ? (target.CurrentScore + (4+2)*target.Rank) :
						(target.CurrentScore + (3*target.Rank));
					target.SetScore(value, isShooterWanted, wasRevengeKill, wasWantedKill);
				}
			}
			else
			{
				if (wasWantedKill)
				{
					// Wanted bullet kill / wanted splash kill
					var value = wasBulletKill ? (target.CurrentScore + (4+2)*target.Rank) :
						(target.CurrentScore + (3*target.Rank));
					target.SetScore(value, isShooterWanted, wasRevengeKill, wasWantedKill);
				}
				else
				{
					// Normal bullet kill / normal splash kill
					var value = wasBulletKill ? (target.CurrentScore + (2+target.Rank)) :
						(target.CurrentScore + target.Rank);
					target.SetScore(value, isShooterWanted, wasRevengeKill, wasWantedKill);
				}
			}
		}

		CalculateRank(target);
	}

	public void SurvivorScore (PlayerScore target)
	{
		int value = 4+2*target.Rank;
		target.SetSurvivor(value);

		CalculateRank(target);
	}

	public void CalculateRank (PlayerScore target)
	{
		int rank = 1;
		for (int i = 0; i < _playersScores.Length; i++)
		{
			if (_playersScores[i] != target)
			{
				if (_playersScores[i].CurrentScore < target.CurrentScore)
				{
					rank--;
				}
				else if (_playersScores[i].CurrentScore > target.CurrentScore)
					rank++;
			}
		}
		if (rank < 1) rank = 1;
		if (rank > 4) rank = 4;
		target.SetRank(rank);
	}
}
~~~

![characterSelectionImg]

![deathmatchImg]

[controlsmapper]:https://github.com/ernstluring/blasterfest/tree/master/blasterfest/Controls

[characterSelectionImg]: {{site.baseurl}}/img/blasterfest/character-selection.png
[deathmatchImg]: {{site.baseurl}}/img/blasterfest/deathmatch.png
[wantedImg]: {{site.baseurl}}/img/blasterfest/wanted.png

[github]: https://github.com/ernstluring/blasterfest
[windowsBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgUERGZ01zUUpqNms/view?usp=sharing
[osxBuild]: https://drive.google.com/file/d/0B-0-Rr7MTDqgN21KNFV6RjROVVE/view?usp=sharing
[webBuild]: https://dl.dropboxusercontent.com/u/154577962/Blasterfest%2022-05/index.html
