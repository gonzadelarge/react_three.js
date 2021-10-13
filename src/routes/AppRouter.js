import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CubePage, SpherePage, ToroidePage, HomePage, StepsPage, ShoesPage, ErrorPage } from "../pages/index"
import { Navbar } from '../components/core/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route exact path="/cube" component={ CubePage } />
                    <Route exact path="/shoes" component={ ShoesPage } />
                    <Route exact path="/toroide" component={ ToroidePage } />
                    <Route exact path="/sphere" component={ SpherePage } />
                    <Route exact path="/steps" component={ StepsPage } />
                    <Route component={ ErrorPage } />
                </Switch>
            </div>
        </Router>
    )
}
