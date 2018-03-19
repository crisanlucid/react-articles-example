import React from 'react';
import ReactDOM from 'react-dom';
import OlxApp from './components/OlxApp'
import { install } from 'offline-plugin/runtime'

import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<OlxApp />, document.getElementById('app'));

//Service Worker
install();
