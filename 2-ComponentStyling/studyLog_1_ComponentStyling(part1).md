Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## classNames 라이브러리

**className 에 동적으로 css class 를 추가해주고 싶을 때** 사용하면 편리한 라이브러리 [classnames](https://github.com/JedWatson/classnames)

```react
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames(['foo', 'bar']); // => 'foo bar'

// 동시에 여러개의 타입으로 받아올 수 도 있습니다.
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// false, null, 0, undefined 는 무시됩니다.
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```



## ...rest props

컴포넌트가 어떤 props 를 받을 지 확실치는 않지만 그대로 다른 컴포넌트 또는 HTML 태그에 전달을 해주어야 하는 상황에는  `...rest` 문법을 활용하면 된다.

`App.js`

```react
import React from 'react';
import './App.scss';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <div className="buttons">
        {/* 아래처럼 onClick 이벤트를 props로 전달해준다 */}
        <Button size="large" onClick={() => console.log('클릭됐다!')}>
          BUTTON
        </Button>
        <Button>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>
    </div>
  );
}

export default App;
```
`Button.js`

```react
import React from 'react';
import classNames from 'classnames';
import './Button.scss';

// 이렇게 ...rest 를 사용해서 우리가 지정한 props를 제외한 값들을 rest 라는 객체에 모아준다
function Button({ children, size, color, outline, fullWidth, ...rest }) {
  return (
    <button
      className={classNames('Button', size, color, { outline, fullWidth })}
      // buttons 태그에 ...rest를 해주면 rest 객체 안의 값들을 모두 button 태그에 설정해준다
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue'
};

export default Button;
```

