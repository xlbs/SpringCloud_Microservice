import React from "react";
import connect from "react-redux/es/connect/connect";

class TestCompent extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>  {this.props.text} </h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
    return { text: state.text }
}

function mapDispatchToProps(dispatch){
    return{
        // actions : bindActionCreators({changeText:changeText,buttonClick:buttonClick},dispatch)
    }
}

const TestApp = connect(mapStateToProps,mapDispatchToProps)(TestCompent);

export default TestApp;