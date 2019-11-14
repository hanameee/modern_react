import React, { Component } from 'react';

class Counter extends Component {
    // constructor(props){
    //     super(props);
    //     this.handleIncrease = this.handleIncrease.bind(this);
    //     this.handleDecrease = this.handleDecrease.bind(this);

    //     this.state = {
    //         counter : 0
    //     }
    // }

    state = {
        counter : 0,
        fixed : 1
    }

    handleIncrease = () => {
        // this.setState({
        //     counter : this.state.counter + 1
        // })
        // 함수형 업데이트
        this.setState(state => ({
            counter : state.counter + 1
        }))
        console.log(this)
    }
    handleDecrease = () => {
        this.setState({
            counter : this.state.counter - 1
        })
        console.log(this)
    }
    render() {
        return (
            <>
                <h1>{this.state.counter}</h1>
                <button onClick = {this.handleIncrease}>+1</button>
                <button onClick = {this.handleDecrease}>-1</button>
                <p>고정된 값: {this.state.fixed}</p>
            </>
        )
    }
}

export default Counter;