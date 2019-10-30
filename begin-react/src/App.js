import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Hello color="navy" name="해나" isSpecial="true"/>
      </Wrapper>
    </div>
  );
}

export default App;
