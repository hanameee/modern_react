import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Counter from './test/Counter'
import ContextSample from './ContextSample'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ContextSample />, document.getElementById('root'));
// ReactDOM.render(<Counter initialCount = {0} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
