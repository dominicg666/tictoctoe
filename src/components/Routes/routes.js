import React, { Suspense, lazy } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

const Overview = lazy(() => import('../Overview'));

const Routes = () => {
    return (
        <Suspense fallback={null}>
            <HashRouter basename="/">
                <Switch>
                    <Route exact path="/">
                        <Overview />
                    </Route>
                </Switch>
            </HashRouter>
        </Suspense>
    );
};

export default Routes;
