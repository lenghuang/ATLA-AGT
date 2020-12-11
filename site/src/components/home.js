import React, { useState } from "react"

const Title = () => {
    return (
        <div className="title">
            <h1> Regret Matching in Avatar the Last Airbender </h1>
            <h3> An exploration into game theory, looking at regret matching in two person normal form games. </h3>
        </div>);
}

function Home() {
  return (
    <div className="central-card">
        {Title()}
        {Title()}
        {Title()}
        {Title()}
        {Title()}
    </div>
  );
}

export default Home;
