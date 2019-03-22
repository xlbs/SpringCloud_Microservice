import React from 'react';
import { Layout,Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import history from '../../history';
import VerticalInlineMenu from "../../commutils/components/menu/VerticalInlineMenu";
import RouteConfigFile from '../../routes/RouteConfigFile';
import {CurrentCache} from "../../commutils/utils/CurrentCache";
import LoginBox from "../../commutils/components/login/LoginBox";

class MainComponent extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        const menu = CurrentCache.get().menu;
        const routes = [];
        const routeSub = subItem => {
            subItem.childMenu.map(item => {
                let temp = {
                    path: subItem.url+item.url,
                    value: subItem.name+'/'+item.name
                };
                routes.push(temp);
            })
        }
        const route = item => {
            let temp = {
                path: item.url,
                value: item.name
            };
            routes.push(temp);
        }
        menu.map(item => {
            item.childMenu.length === 0 ? route(item) : routeSub(item)
        })
        this.state =  {
            collapsed: false,
            routes: routes
        }
    }

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }

    exitLogin(){
        this.props.main.actions.exitLogin()
    }

    render() {
        let location = '';
        this.state.routes.map(item =>{
            if(history.location.pathname==item.path){
                location = item.value;
            }
        });
        const name = CurrentCache.get().user.name;
        return(
            <div id="main" className="global">
                <Layout className='global'>
                    <Header className='header'>
                        <div className="logo"></div>
                        <div className='left-div'>
                            <span className='text'>ANTD-UI-管理系统</span>
                        </div>
                        <div className='right-div'>
                            <span className='right-text'>{name}，欢迎您！</span>
                            <span className='exit'><Icon type="poweroff" onClick={this.exitLogin.bind(this)}/></span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider collapsible
                               collapsed={this.state.collapsed}
                               onCollapse={this.onCollapse.bind(this)} >
                            <VerticalInlineMenu></VerticalInlineMenu>
                        </Sider>
                        <Layout>
                            <div id='location' className='location'>
                                <span className='locationText'>当前位置：<Icon type="environment" className='locationIcon'/></span>
                                <span className='locationText2'> {location}</span>
                            </div>
                            <Content className='content'>
                                {this.props.main.isTimeOut?
                                    <div id='timeout'>
                                        <div id="cover" className='cover'></div>
                                        <div className="login-frame">
                                            <LoginBox login={this.props.main}/>
                                        </div>
                                    </div>
                                    :
                                    <div id='content' className='global'>
                                        {this.props.main.children}
                                    </div>
                                }
                            </Content>
                            <Footer className='footer'>
                                <span>版权所有：谢李宝生 &nbsp;京ICP备18720968930 &nbsp;微信公众号: xlbs10086 &nbsp;</span>
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )

    }

}

export default MainComponent;