import './App.css';
import { Switch, Route } from "react-router-dom";
import Chats from "./pages/Chats";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn"

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/chats" exact>
                    <Chats />
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
                <Route path="/login" exact>
                    <LogIn />
                </Route>
                <Route path="/" exact>
                    <LogIn />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
