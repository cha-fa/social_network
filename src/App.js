import Navbar from "components/Navbar";
import Login from "pages/Login/Login";
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
import RightNav from "components/RightNav";

const App = () => {
  const currentUser = useSelector((state) => state.auth.user);

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
    <container className="SocialApp">
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route path="/" exact>
            <Home currentUser={currentUser} />
          </Route>
          <Route path="/social_network/">
            <Home currentUser={currentUser} />
          </Route>
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/users/:userSlug" exact>
            <Profile currentUser={currentUser} />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile currentUser={currentUser} />
          </PrivateRoute>
        </Switch>
        <RightNav currentUser={currentUser} />
      </Router>
    </container>
  );
};

export default App;
