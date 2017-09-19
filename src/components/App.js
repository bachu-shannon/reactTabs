import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Navigation from "./Navigation";

import data from "../api/tabs";

function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            let Component = null;
            this.state = { Component: AsyncComponent.Component };
        }

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

const dummyTable = asyncComponent(() =>
    import('./tabs/dummyTable')
        .then(module => module.default)
);
const dummyChart = asyncComponent(() =>
    import('./tabs/dummyChart')
        .then(module => module.default)
);
const dummyList = asyncComponent(() =>
    import('./tabs/dummyList')
        .then(module => module.default)
);

const App = () => (
    <div>
        <Navigation tabs={data} />
        <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dummyTable"/>)}/>
            <Route path="/dummyTable" component={dummyTable} />
            <Route path="/dummyChart" component={dummyChart} />
            <Route path="/dummyList" component={dummyList} />
        </Switch>
    </div>
);
export default App;