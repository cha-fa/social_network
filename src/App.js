import Navbar from "components/Navbar";
import Auth from "pages/Auth/Auth";
import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import Registration from "pages/Registration/Registration";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const currentUser = useSelector((state) => state.user);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

  return (
    <container>
      <h1>New twitter</h1>
      {currentUser && <p>User {currentUser.email} est connecté</p>}
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Auth} />
          <PrivateRoute path="/profile" exact component={Profile} />
        </Switch>
      </Router>
    </container>
  );
};

export default App;
