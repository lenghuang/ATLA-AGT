<h1> Regret Minimization in Avatar
  <img src="./site/src/pictures/aang.png" alt="visualize" height="75"/>
</h1>

### 15-251: Great Theoretical Ideas of Computer Science

Hey there! My name is Len, and this is my submission for a class I was taking
in Fall 2020 commonly called "251". We got to choose a topic and do really whatever,
so I chose to explore the topic of algorithmic game theory. More specifically
Regret Minimization. Combined with the iconic rerelease of Avatar the Last Airbender onto
Netflix in 2020, I found inspiration to combine the two in this project.

Check out the live site here: https://atla-agt.web.app/home

### Directory

- `code`: Contains various implementations of regret matching, as well as a `flask` API that is being hosted with `pythonanywhere.com`.
- `notes`: Contains conceptual information and related notes.
- `pictures`: Some of my drawings to better discuss AGT
- `site`: React website to put everything together

### Visualize the Algorithm Over 50,000 Iterations

Check out how the strategies of the players change after 50,000 iterations of the regret matching learning algorithm.

<img src="./pictures/visualize.gif" alt="visualize" height="350"/>

### Test This Out On Your Own "Games"

Input your own tables, or two-person normal form games, with their respective utilites to try out the learning algorithm on your own games.

<img src="./pictures/editMatrix.gif" alt="editMatrix" height="350"/>

### Sources

- [An Introduction to Counterfactual Regret Minimization](http://modelai.gettysburg.edu/2013/cfr/cfr.pdf)
- [Faster Regret Matching](https://arxiv.org/abs/2001.05318)
- [MIT 15.S50 Game Theory and Analytics](https://ocw.mit.edu/courses/sloan-school-of-management/15-s50-poker-theory-and-analytics-january-iap-2015/lecture-notes/MIT15_S50IAP15_L7_GameTheor.pdf)
- [Adaptive Procedure Leading to Correlated Equilibrium](http://www.dklevine.com/archive/refs4572.pdf)
