import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import MainComponent from "./MainCompent";
import {actions} from "./MainAction";


const mapStateToProps = state =>({
    userName: state.mains.userName,
    password: state.mains.password,
    userNameDisabled: state.mains.userNameDisabled,
    passwordDisabled: state.mains.passwordDisabled,
    errorMsg: state.mains.errorMsg,
    isTimeOut: state.mains.isTimeOut
})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

// const mapDispatchToProps = (dispatch) => {
//     return{
//         testTimeOut: ()=>testTimeOut(dispatch),
//         loginSubmit: ()=>loginSubmit(dispatch),
//         timeOut: ()=>timeOut(dispatch)
//     }
// }
//
// const mapStateToProps = state => {
//     return{
//         isTimeOut: state.mains.isTimeOut
//     }
// }

export default connect(mapStateToProps,mapDispatchToProps)(MainComponent);