import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const Server = ({ location, context }) => {
    return (
        <StaticRouter location={location} context={context}>
            <App />
        </StaticRouter>
    );
};
export function render(location, context = {}) {
    return ReactDOMServer.renderToString(
        <Server
            location={location}
            context={context}
        />
    );
}
