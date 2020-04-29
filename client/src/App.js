import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged: false,
        };
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <NavBar user={this.state.user} /> */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/* {/* <Route exact path="/veterinaria" component={Veterinaria} /> */}
                            <Route exact path="/login" component={SignIn} />
                            <Route exact path="/registration" component={SignUp} />
                        </Switch>
                        {/* <Footer /> */}
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
