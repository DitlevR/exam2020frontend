import React, { Component } from "react";
import facade from "./apifacade";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }

  getData = () => {
    facade.getData().then(data => {
      this.setState({ dataFromServer: data });
    });
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
        <button onClick={this.getData}>get star wars</button>
        <h3></h3>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }; //TODO
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  }; //TODO
  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <LogIn login={this.login} />
        ) : (
          <div>
            <LoggedIn />

            <button onClick={this.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
