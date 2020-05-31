import React, { Component } from 'react';
import '../public/css/styles.css';

import { ExampleUserInput, ExampleUserOutput } from '../components/Practice1';
import { ExampleChar, ExampleValidation } from '../components/Practice2';
import ErrorBoundary from '../components/common/ErrorBoundary';

class App extends Component {
  state = {
    userInput: '',
  }

  inputChangeHandler = event => this.setState({userInput: event.target.value})

  deleteCharHandler = index => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({userInput: updatedText});
  }

  render() {
    const charList = this.state.userInput.split('').map((ch, index) => 
      <ExampleChar character={ch} key={index} clicked={() => this.deleteCharHandler(index)} />);

    return (
      <div className="App">
        <ExampleUserInput type={'text'} className={'example-user-input'} style={ {boder: '2px solid red'} } changed={this.inputChangeHandler} currentName={this.state.userInput} />
        <ExampleUserOutput username={this.state.userInput} />
        <ErrorBoundary key={Math.round(Math.random() * 10)}>
          <ExampleValidation inputLength={this.state.userInput.length}/>
        </ErrorBoundary>
        {charList}
      </div>
    );
  }
};

export default App;
