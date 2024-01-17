import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app/styles/App.css';
import './app/styles/Main.css';
import Home from "./app/components/Home";
import Categories from "./app/components/Categories";
import Transactions from "./app/components/Transactions";
import Reports from "./app/components/Reports";
class App extends Component {


  render() {
    return(
        <React.Fragment>
          <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/categories' component={Categories}/>
                <Route exact path='/transactions' component={Transactions}/>
                <Route exact path='/reports' component={Reports}/>
            </Switch>
          </Router>
        </React.Fragment>
    );
  }
}

export default App;
