import React from 'react';
import '../../statics/css/commcss.css';
import '../../statics/css/login.css';
import LoginBox from "../../commutils/components/login/LoginBox";

class MainComponent extends React.Component {

    constructor(props){
        super(props);
        this.props.actions.testTimeOut();
    }

    render() {
        const mains = this.props;
        return(
            <div className='global'>
                {this.props.isTimeOut?
                    <div>
                        <div id="cover" className='cover'></div>
                        <div className='loginFrame'>
                            <LoginBox login={mains}/>
                        </div>
                    </div>
                    :
                    <div id='content'>
                        <div>
                            <h1>主页内容</h1>
                        </div>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                }
            </div>
        )

    }

}

export default MainComponent;