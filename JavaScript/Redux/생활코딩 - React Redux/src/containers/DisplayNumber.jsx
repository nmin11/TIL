import DisplayNumber from '../components/DisplayNumber';
import { useSelector } from 'react-redux';

export default function WrappingDisplayNumber () {
  const number = useSelector((state) => state.number);
  return <DisplayNumber number={number} />
}

/* use connect method
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    number: state.number
  }
}

export default connect(mapStateToProps)(DisplayNumber);

 */

/* use store
import { Component } from 'react';
import store from '../store';

export default class extends Component {
  state = { number: store.getState().number }
  constructor(props) {
    super(props);
    store.subscribe(function () {
      this.setState({ number: store.getState().number });
    }.bind(this));
  }

  render() {
    return <DisplayNumber number={this.state.number} />
  }
}
 */