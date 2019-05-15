import React from 'react';
import { Layout, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import history from '../../../history';
import VerticalInlineMenu from "../../../commutils/components/menu/VerticalInlineMenu";
import {CurrentSessionCache} from "../../../commutils/utils/CurrentCache";
import LoginBox from "../../../commutils/components/login/LoginBox";

class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        const menu = CurrentSessionCache.get("MENU");
        const routes = [];
        const routeSub = subItem => {
            subItem.children.map(item => {
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
            item.children.length === 0 ? route(item) : routeSub(item)
        })
        this.state =  {
            collapsed: false,
            routes: routes
        }
    }

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }

    exit(){
        this.props.main.actions.exit();
    }

    clearCache(){
        this.props.main.actions.clearCache();
    }

    render() {
        let location = '';
        this.state.routes.map(item =>{
            if(history.location.pathname==item.path){
                location = item.value;
            }
        });
        const name = CurrentSessionCache.get("USER").name;
        return(
            <div id="main" className="global">
                <Layout className='global'>
                    <Header className='header'>
                        <div className="header-left-logo"></div>
                        <div className='header-center-div'>
                            <span className='header-center-text'>REACT & SPRING BOOT</span>
                        </div>
                        <div className='header-right-div'>
                            <span className='header-right-text'>{name}，欢迎您！</span>
                            <span className='exit'><Icon type="poweroff" onClick={this.exit.bind(this)}/></span>
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
                                <span className='location-left'>当前位置：<Icon type="environment" className='locationIcon'/></span>
                                <span className='location-center'> {location}</span>
                                <Button className='location-right' size="small" type="dashed" onClick={this.clearCache.bind(this)}>清理缓存</Button>
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