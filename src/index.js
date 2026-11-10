import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './modules';
import App from './App';

// Redux Store 생성 및 Thunk 미들웨어 적용
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
// React 18 방식으로 화면 렌더링
const root = createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
