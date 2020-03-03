import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Signup from "./Component/Signup";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Router>
              <Route path="/" exact component={Signup}></Route>
              <Route path="/signup" exact component={Signup}></Route>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
