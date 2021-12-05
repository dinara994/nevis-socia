import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";



//exact path="/private" component={Private}
//1. ...rest, 2. Component
function PrivateRoute({ component: Component, ...rest }) { //rest - все оставшееся берет
    const auth = useSelector(s => s.user.auth)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                    auth ? (
                    <Component />
                ) : (
                   <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute
// PrivateRoute - в которой завернул тот роут которого я хочу открыть в место обычного роута
//все содержимое в НЁМ передается как Props