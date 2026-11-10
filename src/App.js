import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';
import UsersContainer from './containers/UsersContainer';

const App = () => {
    return (
        <div>
            <Menu />
            <Switch>
                <Route
                    path="/red"
                    component={RedPage}
                />
                <Route
                    path="/blue"
                    component={BluePage}
                />

                {/* 사용자 목록 페이지 */}
                <Route
                    path="/users"
                    component={UsersContainer}
                />

            </Switch>
        </div>
    );
};

export default App;