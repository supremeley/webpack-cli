import React from 'react';
import ReactDOM from 'react-dom';
import './app.less';
import './app.css';
import testImg from '../assets/test.gif';
import testsImg from '../assets/test2.jpg';
import { common } from '../../common';
import { a } from './tree-shaking';

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      console.log(Text);
      this.setState({ Text: Text.default });
    });
  }

  render() {
    // debugger
    const resb = common();
    const resA = a();
    const { Text } = this.state;

    return (
      <div className="app">
        {resb}
        <span className="apps">{resA}</span>
        <span className="apps">in</span>
        {/* <img src={testImg} /> */}
        <img src={testsImg} onClick={this.loadComponent.bind(this)} />
        {Text ? <Text /> : null}
        {Text}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
