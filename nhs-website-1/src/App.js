
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Eligibility from './components/pages/Eligibililty';
import SignIn from './components/pages/SignIn';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/eligibility' component={Eligibility} />
          <Route path='/sign-in' component={SignIn} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
