import { Layout, Menu } from 'antd';
import React from 'react'

import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Switch from "antd/es/switch";
import SubMenu from "antd/es/menu/SubMenu";
import {UserStateBar} from "./UserStateBar";
import {Route} from "react-router";
import {Home} from "./Home";
import {HashRouter, Link} from "react-router-dom";
import {Clock} from "../component/Clock";
import {LeftNavigationMenu} from "./LeftNavigationMenu";
import {SearchResult} from "./SearchResult";


export class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineMode: false,
            lightTheme: true,
            user:props.user
        };

    }

    getUser = (here,user) => {
        this.props.getUser(here,user)
        this.setState({
            user: user
        })
    }

    changeMode = () => {
        this.setState({
            lineMode: !this.state.lineMode,
        })
    };

    changeTheme = () => {
        this.setState({
            lightTheme: !this.state.lightTheme,
        })
    };

    render () {
        let {lineMode} = this.state;
        let {lightTheme} = this.state;
        const { Header, Content, Footer, Sider } = Layout;
        return (
            <HashRouter>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                        theme='light'
                    >
                        <div className="logo"/>
                        <Switch onChange={this.changeMode} />

                        <Menu
                            mode={!lineMode ? 'vertical' : 'inline'}
                            theme='light'
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="sub0" title="首页" icon={<UserOutlined/>}>
                                <Link to={'/home'}>首页</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title="景区查看" icon={<UserOutlined/>}>
                                <Menu.Item key="5">大同古城墙</Menu.Item>
                                <Menu.Item key="6">华严寺</Menu.Item>
                                <Menu.Item key="6">善化寺</Menu.Item>
                                <Menu.Item key="6">悬空寺</Menu.Item>
                                <Menu.Item key="7">云冈石窟</Menu.Item>
                                <Menu.Item key="8">桃花山景区桃花山景区</Menu.Item>
                                <Menu.Item key="8">九龙壁</Menu.Item>
                                <Menu.Item key="8">晋华宫煤矿</Menu.Item>
                            </SubMenu>


                            <Menu.Item key="sub2" title="个人中心" icon={<UserOutlined/>}>
                                <Link to={'/mine'}>个人中心</Link>
                            </Menu.Item>

                            <Menu.Item key="sub3" title="我的订单" icon={<UserOutlined/>}>
                                <Link to={'/menu'}>我的订单</Link>
                            </Menu.Item>

                            <Menu.Item key="sub4" title="我的收藏" icon={<UserOutlined/>}>
                                <Link to={'/menu'}>我的收藏</Link>
                            </Menu.Item>

                            <Menu.Item key="sub5" title="浏览历史" icon={<UserOutlined/>}>
                                <Link to={'/searchResult'}>浏览历史</Link>
                            </Menu.Item>





                            {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                            {/*    nav 1*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                            {/*    nav 2*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                            {/*    nav 3*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="4" icon={<BarChartOutlined/>}>*/}
                            {/*    nav 4*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="5" icon={<CloudOutlined/>}>*/}
                            {/*    nav 5*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="6" icon={<AppstoreOutlined/>}>*/}
                            {/*    nav 6*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="7" icon={<TeamOutlined/>}>*/}
                            {/*    nav 7*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="8" icon={<ShopOutlined/>}>*/}
                            {/*    nav 8*/}
                            {/*</Menu.Item>*/}
                        </Menu>

                    </Sider>
                    <Layout className="site-layout"
                            style={{
                                marginLeft: 200,
                                height: '100vh',
                            }}
                    >
                        {/*<Header className="site-layout-background" style={{padding: 0}}>*/}
                        {/*    <StateBar user={this.state.user} getUser={this.getUser} />*/}
                        {/*</Header>*/}
                        <UserStateBar user={this.state.user} getUser={this.getUser} />
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                                <Route exact path='/home'>
                                    <Home />
                                </Route>
                                <Route exact path='/mine'>
                                    <Clock />
                                </Route>
                                <Route exact path='/menu'>
                                    <LeftNavigationMenu />
                                </Route>
                                <Route exact path='/searchResult'>
                                    <SearchResult />
                                </Route>

                            </div>





                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }
}