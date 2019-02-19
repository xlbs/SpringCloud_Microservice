import {connect} from "react-redux";
import TestCompent from "./TestCompent";
import {bindActionCreators} from "redux";
import {changeText,buttonClick} from './TestAction'
import React from "react";

// const mapDispatchToProps = (dispatch) => {
//     return{
//         test1: ()=>dispatch(test1())
//     }
// }
//
// const mapStateToProps = state => {
//     debugger;
//     return{
//         isTimeOut: state.isTimeOut
//     }
// }


function mapStateToProps(state) {
    return { text: state.text }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(
            {
                changeText:changeText,
                buttonClick:buttonClick
            },
            dispatch
        )
    }
}


export default connect(mapDispatchToProps, mapStateToProps)(TestCompent);