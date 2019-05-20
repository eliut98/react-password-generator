import React, { Component } from "react";
import { render } from "react-dom";
import { numbers, symbols, capitalLetters, lowercase } from "./characters";

import "./style.scss";

const characters = {
  isLowercase: lowercase,
  isUpperCase: capitalLetters,
  isNumber: numbers,
  isSymbol: symbols
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      chars: 12,
      isLowercase: true,
      isUpperCase: false,
      isNumber: false,
      isSymbol: false,
      pwdStrength: "#5ed98a"
    };
  }

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = () => {
    let result = "";
    let password = "";
    let chars = this.state.chars;

    for (let prop in this.state) {
      if (this.state[prop] && prop !== "result" && prop !== "chars") {
        result += characters[prop];
      }
    }

    result = result.trim();

    for (let i = 0; i < chars; i++) {
      let code = Math.floor(Math.random() * result.length);
      password += result.charAt(code);
    }

    this.setState({ result: password });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.generatePassword();
  };

  handleChars = e => {
    let { chars } = this.state;
    
    if (e.target.id === "plus") {
      this.setState(prevState => ({
        chars: prevState.chars + 1
      }));
    }

    if (this.state.chars > 1) {
      if (e.target.id === "minus") {
        this.setState(prevState => ({
          chars: prevState.chars - 1
        }));
      }
    }

    if (chars > 8) {
      this.setState({ pwdStrength: "#5ed98a" });
    }
    if (chars <= 8) {
      this.setState({ pwdStrength: "rgb(152, 203, 111)" });
    }
    if (chars <= 6) {
      this.setState({ pwdStrength: "rgb(216, 209, 69)" });
    }
    if (chars <= 3) {
      this.setState({ pwdStrength: "rgb(241, 50, 43)" });
    }

  };

  handleOptions = e => {
    const option = e.target.id;
    switch (option) {
      case "symbol":
        this.setState(prevState => ({
          isSymbol: !prevState.isSymbol
        }));
        break;
      case "number":
        this.setState(prevState => ({
          isNumber: !prevState.isNumber
        }));
        break;
      case "upper":
        this.setState(prevState => ({
          isUpperCase: !prevState.isUpperCase
        }));
        break;
    }
  };

  handleResult = e => {
    e.target.select();
    document.execCommand("copy");
  };

  render() {
    const {
      result,
      chars,
      pwdStrength,
      isNumber,
      isSymbol,
      isUpperCase
    } = this.state;
    return (
      <div className="container">
        <header className="header">
          <h1>React Password Generator</h1>
        </header>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="pwdLength">
            <span>Password length</span>
            <div className="pwdChars">
              <button className="btn" onClick={this.handleChars} id="minus">
                -
              </button>
              <input type="text" value={chars} readOnly />
              <button className="btn" onClick={this.handleChars} id="plus">
                +
              </button>
            </div>
          </div>

          <div className="row">
            <span>Symbols</span>
            <button className="btn" id="symbol" onClick={this.handleOptions}>
              {isSymbol ? (
                <i className="fas fa-check" />
              ) : (
                <i className="fas fa-times" />
              )}
            </button>
          </div>

          <div className="row">
            <span>Numbers</span>
            <button className="btn" id="number" onClick={this.handleOptions}>
              {isNumber ? (
                <i className="fas fa-check" />
              ) : (
                <i className="fas fa-times" />
              )}
            </button>
          </div>

          <div className="row">
            <span>Capital Letters</span>
            <button className="btn" id="upper" onClick={this.handleOptions}>
              {isUpperCase ? (
                <i className="fas fa-check" />
              ) : (
                <i className="fas fa-times" />
              )}
            </button>
          </div>

          <div className="result-container">
            <div className="password">
              <input
                type="text"
                defaultValue={result}
                readOnly
                onClick={this.handleResult}
              />
              <div
                className="pwdStrength"
                style={{ backgroundColor: pwdStrength }}
              />
            </div>
            <button
              className="generate"
              type="submit"
              title="Generate password"
            >
              <i className="fas fa-sync-alt" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
