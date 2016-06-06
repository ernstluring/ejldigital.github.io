---
layout: post
title:  "State Machine in C++ (SFML)"
categories: side-project
description:
---
* __Repository:__ [ernstluring/arkanoid-clone][github]

<br />

~~~cpp
#ifndef GameState_h
#define GameState_h
class GameState {
public:
    Game* game;
    virtual void draw(const float dt) = 0;
    virtual void update(const float dt) = 0;
    virtual void handleInput() = 0;
    virtual ~GameState() { }
};
#endif /* GameState_h */
~~~

~~~cpp
#ifndef GameStateMain_hpp
#define GameStateMain_hpp
class GameStateMain : public GameState
{
private:
    sf::View view;
    Ball ball;
    Paddle paddle;

    Brick bricks[256];
    int amountOfBricks = 0;

    const float BRICK_WIDTH = 60.f;
    const float BRICK_HEIGHT = 20.f;
    const int COUNT_BLOCKS_X = 11;
    const int COUNT_BLOCKS_Y = 4;
    CollisionDetection col;
public:
    void draw(const float dt);
    void update(const float dt);
    void handleInput();
    bool deleteBrick(int i);
    void collision(Paddle& paddle, Ball& ball);
    void collision(Brick& brick, Ball& ball);

    GameStateMain(Game* game);
};
#endif /* GameStateMain_hpp */
~~~

~~~cpp
#ifndef GameStateStart_hpp
#define GameStateStart_hpp
class GameStateStart : public GameState
{
private:
    sf::View view;
    sf::Sprite background;
    void loadGame();

public:
    void draw(const float dt);
    void update(const float dt);
    void handleInput();

    GameStateStart(Game* game);
};
~~~

[github]: https://github.com/ernstluring/arkanoid-clone/tree/master/Arkanoid%20Clone/StateMachine
