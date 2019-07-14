import React from 'react';
import img from '../../statics/images/404.png';


class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.enter = this.enter.bind(this);
        this.state = {
            animated: ''
        };
    }



    enter() {
        this.setState({animated: 'hinge'})
    };

    render() {
        return (
            <div className="div-404">
                <div>
                    <div className="div-img">
                        <img src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
                    </div>
                    <div className="div-text">
                        <h1>程序员正在策马奔腾开发，请您耐心等待一段时间！</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;