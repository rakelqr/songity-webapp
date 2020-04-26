import React, { Component } from 'react';
import './App.css';
import SignIn from './components/modalSignIn';
import SignUp from './components/modalSignUp';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false,
      showSignUp: false,
    }

  }

  openSignIn = () => {
    this.setState({
      showSignIn: true,
      showSignUp: false
    });
  };

  openSignUp = () => {
    this.setState({ showSignUp: true, showSignIn: false})
  };

  render() {
    const { showSignIn, showSignUp } = this.state;
    return (
      <div>
        <header>
          <h1>Página inicial de nuestra app de Songity</h1>
        </header>
        <nav>
          <button>Una ruta</button>
          <button>Segunda ruta</button>
        </nav>
        <div className="account">
          <div onClick={this.openSignIn}>Entrar a tu cuenta</div>
          <div onClick={this.openSignUp}>Crear una cuenta</div>
          {showSignIn && <SignIn />}
          {showSignUp && <SignUp />}
        </div>
      </div>
    )
  }
}
