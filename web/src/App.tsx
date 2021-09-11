import './App.css';
import LoginPanel from './components/LoginPanel';
import { HashRouter as Router, Route } from 'react-router-dom'
import Info from './components/Info';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logon">LOGO</div>
        <ul className="list">
          <li>Product</li>
          <li>Service</li>
          <li>AboutUs</li>
        </ul>
      </header>
      <main>
        <Router>
          <div>
            <Route exact path="/" component={LoginPanel} />
            <Route path="/info" component={Info} />
          </div>
        </Router>
      </main>
    </div>
  );
}


export default App;
