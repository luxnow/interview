import './App.css';
import LoginPanel from './components/LoginPanel';
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header>header</header>
      <main>
        <Router>
          <div>
            <Route exact path="/" component={LoginPanel} />
            {/* <Route path="/Jsdemob" component={Jsdemob} />
            <Route path="/Jsdemoc" component={Jsdemoc} /> */}
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
