import React, { Component } from 'react';

class Hello extends Component {
    static defaultProps = {
       name : '이름없음' 
    }
    render() {
        const { color, isSpecial, name } = this.props;
        return (
            <h1 style={{ color }}>
            {isSpecial && <b>*</b>}
            안녕하세요 {name}
            </h1>           
        )
    }
}

export default Hello;