import React from "react";
import "../assets/css/App.css";
import TeamCompareView from "./TeamCompareView";
import load from "../assets/img/load.svg"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={load} alt="logo" className="nbax_logo_img"/>
          <span className="titleApp">NBAx</span>
        </header>
        <TeamCompareView
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
        />
        {/* <footer className="App-footer"></footer> */}
      </div>
    );
  }
}

export default App;
