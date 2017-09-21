import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Navigation from "./Navigation";

import data from "../api/tabs";

function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                Component: AsyncComponent.Component
            };
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


function getDefaultRoute(tabs) {
	let defaultComponent = tabs.reduceRight(function(previousTab, currentTab) {
		return (previousTab.order > currentTab.order) ? currentTab : previousTab;
	});
	return <Route exact path="/" render={() => (<Redirect to={`/${defaultComponent.id}`}/>)}/>;
}

const App = () => (
    <div>
        <Navigation tabs={data} />
        <Switch>
            {getDefaultRoute(data)}
            {data.map((tab, index) => {
                let typeComponent = asyncComponent(() =>
                                        import(`/${tab.path}`)
                                            .then(module => module.default)
                );
                return <Route path={`/${tab.id}`} component={typeComponent} key={tab.order} />
            })}
        </Switch>
    </div>
);
export default App;