
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute: React.FC<any> = ({ component: Component }) => {
    const { user } = useAuth();
    return (
        <Route
            render={(props: any) =>
                !!user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}