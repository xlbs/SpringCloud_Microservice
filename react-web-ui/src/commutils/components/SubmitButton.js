import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const style = {
    padding: '10px 20px',
    width: 140,
    display: 'block',
    margin: '20px auto',
    fontSize: '16px',
};

class SubmitButton extends React.Component{

    render(){
        const {name, form, dispatch} = this.props;
        return(
            <button
                type="button"
                style={style}
                onClick={() => dispatch(submit(form))}
            >
                {name}
            </button>
        )
    }
    
}

export default connect()(SubmitButton);
