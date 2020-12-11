# Regret

Yolo, carpe diem, counterfactual regret minimization; these are some of the
terms that describe living a life free of regret. Kind of. It may be a bit
difficult to determine a Nash Equilibrium, and sometimes it doesn't even
exist at all. But with this section, we explore and implement a way of
determining a best strategy for a game (Aang and Bang's fight) by using an
regret minimization algorithm.

# Definitions

- **Regret of not choosing an action** is the difference between the
  utility of that action and what we actually chose, with respect to
  the fixed choices of other players.

  - For an action profile **a** that we actually play, and **(s1,s2)**
    be an action profile we want to find the regret of, we can define regret
    as: `regret = utility(s1,s2) - utility(a)`.
    - Note we only need **s1, s2** since we are talking about a two player
      game. This tuple / vector would be longer if the number of players
      increase.
    - Regret is associated with a certain player, so we will want to use a
      player's utility function, or some **u_i**. In code, this translates
      to `utilityAang`.
    - Also note that the regret for the same action is 0.
  - If Aang attacks with Fire and Bang attacks with Water, we know that
    `utilityAang(Fire, Water) = -1` from our table.
    - The action profile "played" is `(Fire, Water)`.
    - Let's say we want to find **Aang's regret for not choosing Earth**
      - **s1** = `Earth` (the action we regret not choosing)
      - **s2** = `Fire` (Bang's action)
      - **a** = `(Fire, Water)` (the action profile that actually happened)
    - Aang regrets **not** picking `Earth` in this scenario
      with `regret = 2` (shown below)

```sml
val regret = utilityAang(s1,s2) - utilityAang(a)
           = utilityAang(Earth, Fire) - utilityAang(Water, Fire)
           = 1 - (~1) = 2
```

- **Regret Matching** is a way we can inform future play / learn how to play
  game by using regret as a heuristic and bench mark.

  - Select a player's action randomly according to a distribution that's
    proportional **positive regrets**.
    - If we have higher regret for a certain action, we want to pick that action
      with a higher probability next time we play this game.
    - We can emulate this by keeping track of the distribution from which the
      players select an action
  - We can use distributions to inform our choice, and then update the
    distributions according to our regrets.
    - By giving higher weight to actions we regret, that means the next time
      we play the game, we play according to a strategy that **minimizes regret**. _It's almost as if you had a second life, and said "I know what I'm doing differently" after having experienced it in your first life._
    - Going along with the analogy, the more lives we live, the more we know what we
      will regret. Over the series of many iterations, we begin to fine tune this
      distribution and ultimately our strategy.
  - Regret Matching is a kind of **regret minimization** technique that can help
    us learn how to play games in an ideal way.
    - Over many iterations, we will approach a **correlated equilibrium**.
    - A correlated equilibrium is a more general version of the nash equilibrium.
      Namely, it's a kind of strategy that players would reach if they could
      correlate play with some sort of random third-party signal.
    - This is the reason for the data visualizations on the first page! We can
      see that overtime, the strategies of the algorithm will
      [converge on a correlated equilibrium](http://www.dklevine.com/archive/refs4572.pdf).
  - You can train two regret minimizers on each other to find the correlated
    equilibrium for a normal form game! I personally implemented this and you
    can see on the next page.

- **Counterfactual Regret Minimization** is a strategy that then applies
  **regret matching** onto sequential games. So while Rock Paper Scissors
  is a sort of "one shot" game, a more sequential could be something like poker.
  We can also model the fight between Aang and Bang as a sequential game, where
  perhaps we use "Health Points" as a way to keep track of global utility
  _(in poker, this global utility would be the money you have, and the local utility acould be how likely your hand is to win)_. I did not end up having time to do this, but this would've been really cool to implement.
