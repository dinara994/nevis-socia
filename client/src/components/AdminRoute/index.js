import {isAuth} from "../../lib/authentication";
import {Redirect, Route} from "react-router-dom";


//exact path="/private" component={Private}
//1. ...rest, 2. Component
function AdminRoute({ component: Component, ...rest }) { //rest - все оставшееся берет

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth() && isAuth().role === "admin" ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default AdminRoute