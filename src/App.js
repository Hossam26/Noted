import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login/login';
import Registration from './Registration/Registration';
function App() {
  return (
    <Router basename='/login'>
    <div className="App">
     <Switch>
    <Route exact path="/">
            <Navbar show={false}></Navbar>
            <Login></Login>
          </Route>
          <Route exact path="/profile">
            <Navbar show={true}></Navbar>
            <Profile></Profile>
            </Route>
          <Route exact path="/login">
            <Navbar show={false}></Navbar>
            <Login></Login>
          </Route>
          <Route  exact path="/registration">
            <Navbar></Navbar>
           <Registration></Registration>
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
