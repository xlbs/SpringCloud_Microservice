import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {actions} from "./HomeAction";
import HomeComponent from './HomeCompent';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = state => ({
    context: state.home.context
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);