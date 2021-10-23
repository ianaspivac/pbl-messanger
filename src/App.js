import './App.css';
import { Switch, Route } from "react-router-dom";
import Chats from "./pages/Chats";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/chats" exact>
            <Chats/>
        </Route>
          <Route path="/signup" exact>
              <SignUp/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
