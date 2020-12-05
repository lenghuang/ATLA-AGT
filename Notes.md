# Regret Minimization and Avatar the Last Airbender

## Aang vs Baang

Earth, Fire, Water, Air. Long ago, the four nations lived in peace and harmony. Thanks to the Avatar Aang, the master of all four elements, conflicts were mitigated and resolutions were devised.

But it all changed one day... there was a sudden tear in the very fabric of our reality: an anti-Avatar appeared! He too had mastered all four elements. However, the anti-Avatar Bang seeked to wreak havoc and destroy the peace Aang had built.

War ravaged on as Bang laid waste onto the world. It all culminated into a final fight between Aang and Bang.

How might we model this fight? Let's use game theory to model this fight as a **two-player zero sum game**.

## Game Theory

Game theory studies situations that involves decision making amongst multiples rational parties or people. Suppose the the fight between Aang and Bang is represented as a game, where either Avatar must select what element they wish to use to attack the other. If this sounds similar to rock, paper, and scissors (RPS), then you've got the right idea.

Before we talk about game theory, let's first define the way in which the four elements dominate one another. _There's nothing formal about this, but we'll just use this intuition to help us define a clear hierarchy._

### Elemental Hierarchy

<span>
<img src="./pictures/ed_character.jpeg" alt="drawing" height="300"/>
<img src="./pictures/ed_names.jpeg" alt="drawing" height="300"/>
</span>

Similarly to how in RPS, rock beats scissors, scissors beats paper, and paper beats rock, we establish an elemental ordering for our game. Namely Earth beats Water, Water beats Fire, Fire beats Air, and Air beats Earth. Unlike RPS, we also introduce a notion of "draws", where Water and Air tie with each other, as do Earth and Fire. To simplify things, we do not permit self loops (elements tie with themselves).

### Definitions

We will be referring to the following definitions and notations when talking about a **normal-form game (N, A, u)**.

- **N** is a finite set of _n_ players in our game.
  - In our scenario, _n=2_, since Aang is facing Bang.
- **A** is the set of all possible combinations of actions our players can take.
  - So if player _i_ has a set of actions _S_i_, then _A = S_1 x ... x S_n_, or the cross product each player's actions.
  - Each combination is referred to as an **action profile**.
  - In our game, Aang and Baang have identical actions. So for a set _S = {Earth, Water, Fire, Air}_, our game defines _A = S x S_ for our two players.
  - It follows that an example action profile for our game is some tuple of elements, such as _(Earth, Fire)_, or _(Water, Air)_, representing the actions that (Aang, Bang) choose respectively.
- **u** is a function mapping each action profile to a vector of utilities for each player.
  - We often refer to _u_i_ as a player's **payoff**.
  - For our game, the following `SML` function represents what our utility is. This is the exact same thing as the **Elemental Hierarchy** images, just written out more formally to help us better understand the game theory interpretation.

```sml
  datatype Element = Earth | Water | Fire | Air
  fun utility ((Water, Fire) : Element * Element) : int = 1
    | utility ((Fire, Water) : Element * Element) : int = ~1
    | utility ((Water, Water) : Element * Element) : int = 0
    | utility ((Fire, Fire) : Element * Element) : int = 0
    | ...
    | ...
    | ...
    | utility ((Air, Earth) : Element * Element) : int = 1

```

Writing out every action profile and mapping it to a certain utility gets redundant, so a common representation of a utility function, as well as just normal-form games is a table. This is usually for two player games with smaller action profiles, as it can get more complicated with larger action profiles and more players.

|           | Earth  | Fire   | Water  | Air    |
| --------- | ------ | ------ | ------ | ------ |
| **Earth** | (0,0)  | (0,0)  | (1,-1) | (-1,1) |
| **Fire**  | (0,0)  | (0,0)  | (-1,1) | (1,-1) |
| **Water** | (-1,1) | (1,-1) | (0,0)  | (0,0)  |
| **Air**   | (1,-1) | (-1,1) | (0,0)  | (0,0)  |

> So if the above table represents our normal-form game, we might say that the row's represent Aang's choices, and the column's Bang's choices. For example, if Aang uses an Air attack and Bang uses and Earth attack, we go to the Air row and Earth column. In other words, at (Air, Earth), we see that our utility is the tuple (1,-1). Meaning Aang has a positive utility and Bang has a negative utility. This follows with our intuition since (according to our elemental hierarchy), Air beats Earth!

It's important to understand the above ideas about game theory, as well as their formal mathematical definitions before we move on to explore a particular way to reason about games: **Regret Minimization**.

## Code a website where you can test the algorithm on different inputs

## Case on form of elemental dominance, generalize to that
