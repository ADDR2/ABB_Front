import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// containers
import PieceContainer from '../containers/Piece';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect to="/piece/0"/>
            </Route>
            <Route path="/piece/:pieceId" component={ PieceContainer } />
        </Switch>
    </Router>
);

export default MainRouter;