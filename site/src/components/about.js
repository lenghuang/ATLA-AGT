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
            <h1> About </h1>
            <i><h4> What is this website exactly? </h4></i>
        </div>);
}

const regret = `
### 15-251: Great Theoretical Ideas of Computer Science

Hey there! My name is Len, and this is my submission for a class I was taking
in Fall 2020 commonly called "251". We got to choose a topic and do really whatever,
so I chose to explore the topic of algorithmic game theory. More specifically
Regret Minimization. Combined with the iconic rerelease of Avatar the Last Airbender onto
Netflix in 2020, I found inspiration to combine the two in this project.

### Sources
- [An Introduction to Counterfactual Regret Minimization](http://modelai.gettysburg.edu/2013/cfr/cfr.pdf)
- [Faster Regret Matching](https://arxiv.org/abs/2001.05318)
- [MIT 15.S50 Game Theory and Analytics](https://ocw.mit.edu/courses/sloan-school-of-management/15-s50-poker-theory-and-analytics-january-iap-2015/lecture-notes/MIT15_S50IAP15_L7_GameTheor.pdf)


### Other Links
- 👻 [Read my story on my site](https://lenghuang.github.io/)
- 👾 [View the Github for this Project](https://github.com/lenghuang/ATLA-AGT)
- 👨‍💻 [View my projects on Notion](https://www.notion.so/812fbd0d64b448d2a0742703a7434deb/)
- 👔 [Connect with me on LinkedIn](https://linkedin.com/in/len-huang/)

`

function About() {
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

export default About;
