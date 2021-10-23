import './App.css';
import { Switch, Route } from "react-router-dom";
import Chats from "./pages/Chats";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/chats" exact>
            <Chats/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
