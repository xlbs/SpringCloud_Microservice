import React from 'react';

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.actions.home2();
        this.props.actions.home1();

    }

    render() {
        return(
            <div>
                {this.props.context}
            </div>
        )
    }

}

export default HomeComponent;