import AddNumber from '../components/AddNumber';
import { Component } from 'react';
import store from '../store';

export default class extends Component {
  render() {
    return <AddNumber onClick={function (size) {
      store.dispatch({ type: 'INCREMENT', size });
    }.bind(this)} />
  }
}