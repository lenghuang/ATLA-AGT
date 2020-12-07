# Regret

Yolo, carpe diem, counterfactual regret minimization; these are some of the
terms that describe living a life free of regret. Kind of. It may be a bit
difficult to determine a Nash Equilibrium, and sometimes it doesn't even
exist at all. But with this section, we explore and implement a way of
determining a best strategy for a game (Aang and Bang's fight) by using an
regret minimization algorithm.

# Definitions

- **Regret of not choosing an action** is the difference between the utility of that action and what we actually chose.

  - Let's say Aang and Bang both have 100 Health Points (HP), and that a successful attack does 1 damage. If Aang attacks with Water and Bang attacks with Fire, we know that `utility(Water, Fire) = (1,-1)`
