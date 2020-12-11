import React from "react"
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import gfm from 'remark-gfm'
import Button from 'react-bootstrap/Button'

const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter language={language} children={value} />
    }
  }

const Title = () => {
    return (
        <div className="title">
            <h1> Understanding Regret </h1>
            <i><h4> Defining the notion of "regret" within the context of
                    Algorithmic Game Theory </h4></i>
        </div>);
}

const regret = `
### Regret

Yolo, carpe diem, counterfactual regret minimization; these are some of the
terms that describe living a life free of regret. Kind of. It may be a bit
difficult to determine a Nash Equilibrium, and sometimes it doesn't even
exist at all. But with this section, we explore and implement a way of
determining a best strategy for a game (Aang and Bang's fight) by using an
regret minimization algorithm.

### Definitions

- **Regret of not choosing an action** is the difference between the
  utility of that action and what we actually chose, with respect to
  the fixed choices of other players.

  - For an action profile **a** that we actually play, and **(s1,s2)**
    be an action profile we want to find the regret of, we can define regret
    as: \`regret = utility(s1,s2) - utility(a)\`.
    - Note we only need **s1, s2** since we are talking about a two player
      game. This tuple / vector would be longer if the number of players
      increase.
    - Regret is associated with a certain player, so we will want to use a
      player's utility function, or some **u_i**. In code, this translates
      to \`utilityAang\`.
    - Also note that the regret for the same action is 0.
  - If Aang attacks with Fire and Bang attacks with Water, we know that
    \`utilityAang(Fire, Water) = -1\` from our table.
    - The action profile "played" is \`(Fire, Water)\`.
    - Let's say we want to find **Aang's regret for not choosing Earth**
      - **s1** = \`Earth\` (the action we regret not choosing)
      - **s2** = \`Fire\` (Bang's action)
      - **a** = \`(Fire, Water)\` (the action profile that actually happened)
    - Aang regrets **not** picking \`Earth\` in this scenario
      with \`regret = 2\` (shown below)

~~~sml
val regret = utilityAang(s1,s2) - utilityAang(a)
           = utilityAang(Earth, Fire) - utilityAang(Water, Fire)
           = 1 - (~1) = 2
~~~

- **Regret Matching**
  - (Work in Progress)

`

function Regret() {
  return (
    <div className="central-card">
        {Title()}
        <div className="content">
            <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                {regret}
            </ReactMarkdown>
        </div>
        <div style={{paddingTop: "2rem", textAlign: "center", margin: "auto"}}>
            <Button variant="light" size="lg" href="/code">
                See the implementation!
            </Button>{' '}
        </div>
        <div className="empty"></div>
    </div>
  );
}

export default Regret;
