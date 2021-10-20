import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { Home } from "../pages/Home";
import { Stream } from "../pages/Stream";
import { Container, ContainerLoader } from "./styles";

export const Routes: React.FC = () => {
    const { databaseInstance } = useAuth();

    if (!databaseInstance) {

        return (
            <ContainerLoader>
                <Loader />
            </ContainerLoader>
        )
    }

    return (
        <Router>
            <Header />
            <Container>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/:id" component={Stream} />
                </Switch>
            </Container>
            <Footer />
        </Router>
    );
}