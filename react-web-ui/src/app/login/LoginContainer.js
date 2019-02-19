import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginCompent from "./LoginCompent";
import {actions} from "./LoginAction";

const mapStateToProps = state =>({
    userName: state.login.userName,
    password: state.login.password,
    userNameDisabled: state.login.userNameDisabled,
    passwordDisabled: state.login.passwordDisabled,
    errorMsg: state.login.errorMsg
})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

// const mapDispatchToProps = (dispatch) => {
//     return{
//         loginSubmit: ()=>loginSubmit(dispatch),
//     }
// }
//
// const mapStateToProps = state => {
//     return{
//
//     }
// }

export default connect(mapStateToProps,mapDispatchToProps)(LoginCompent);