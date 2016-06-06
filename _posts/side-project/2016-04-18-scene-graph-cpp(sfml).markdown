---
layout: post
title:  "Scene Graph C++ (SFML)"
categories: side-project
description:
---

* __Repository:__ [ernstluring/aircrafter][github]

~~~cpp
#ifndef SceneNode_hpp
#define SceneNode_hpp
class SceneNode : public sf::Transformable, public sf::Drawable, private sf::NonCopyable
{
public:
    typedef std::unique_ptr<SceneNode> Ptr;
public:
    SceneNode();
    // takes unique_ptr<SceneNode> as value and takes ownership of the SceneNode
    void attachChild(Ptr child);
    // searches for an occurrence of the specified node, releases it from the container and returns it to the caller as unique_ptr
    Ptr detachChild(const SceneNode& node);
    void update(sf::Time dt);
    sf::Transform getWorldTransform() const;
    sf::Vector2f getWorldPosition() const;
private:
    virtual void updateCurrent(sf::Time dt);
    void updateChildren(sf::Time dt);

    virtual void draw(sf::RenderTarget& target, sf::RenderStates states) const final;
    virtual void drawCurrent(sf::RenderTarget& target, sf::RenderStates states) const;
    void drawChildren(sf::RenderTarget& target, sf::RenderStates states) const;
private:
    std::vector<Ptr> _children;
    SceneNode* _parent;
};
#endif /* SceneNode_hpp */
~~~

~~~cpp
SceneNode::SceneNode() : _parent(nullptr)
{

}

void SceneNode::attachChild(Ptr child)
{
    child->_parent = this;
    _children.push_back(std::move(child));
}

SceneNode::Ptr SceneNode::detachChild(const SceneNode &node)
{
    // Lamda expression, it returns 'true' if the p.get() is equal to the adress (&) of node.
    auto found = std::find_if(_children.begin(), _children.end(), [&] (Ptr& p) -> bool { return p.get() == &node; });
    assert(found != _children.end());
    Ptr result = std::move(*found);
    result->_parent = nullptr;
    _children.erase(found);
    return result;
}

sf::Transform SceneNode::getWorldTransform() const
{
    sf::Transform t = sf::Transform::Identity;
    for (const SceneNode* node = this;
         node != nullptr; node = node->_parent)
    {
        t = node->getTransform() * t;
    }
    return t;
}

sf::Vector2f SceneNode::getWorldPosition() const
{
    return getWorldTransform() * sf::Vector2f();
}

void SceneNode::update(sf::Time dt)
{
    updateCurrent(dt);
    updateChildren(dt);
}

void SceneNode::updateCurrent(sf::Time dt)
{

}

void SceneNode::updateChildren(sf::Time dt)
{
    for (const Ptr& child : _children)
    {
        child->update(dt);
    }
}

void SceneNode::draw(sf::RenderTarget& target, sf::RenderStates states) const
{
    states.transform *= getTransform();

    // draw the current node
    drawCurrent(target, states);
    drawChildren(target, states);
}

void SceneNode::drawCurrent(sf::RenderTarget &target, sf::RenderStates states) const
{

}

void SceneNode::drawChildren(sf::RenderTarget &target, sf::RenderStates states) const
{
    // iterate through all child nodes and recursively invoke draw()
    for (const Ptr& child : _children)
    {
        child->draw(target, states);
    }
}
~~~
