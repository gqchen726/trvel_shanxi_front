import React from 'react';
import {
    Route,
    Switch,
    useHistory,
    useRouteMatch,
    useLocation,
    useParams
} from "react-router";
import PropTypes from 'prop-types'
import {Home} from "./Home";
import {LeftNavigationMenu} from "./LeftNavigationMenu";
import {SearchResultShow} from "./SearchResultShow";
import {PersonalCenterW} from "./PersonalCenter";
import {SimpleLogin} from "./SimpleLogin";
import {DataInfoW} from "../component/DataInfo";
import {PageNotFound} from "../component/MyResult";
import Button from "antd/es/button";
import {OrderSteps, OrderStepsW} from "./OrderSteps";
// 学习不使用es6编写react组件
// 编写函数组件而不是类组件
// 学习Hook钩子函数的使用useHistory();
export const MyRouterWithHook = (props) => {


    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();
    const params = useParams();



    let renderResultPage = (statusCode) => {
        let props = {
            extra: <Button type="primary">返回首页</Button>
        };
        switch (statusCode) {
            case 404 :
                props.status = "404";
                props.title = "404";
                props.subTitle = "抱歉, 您访问的页面不存在.";
                return <PageNotFound props={props} />;
            case 403 :
                props.status = "403";
                props.title = "403";
                props.subTitle = "抱歉, 您没有权限访问此页面.";
                return <PageNotFound />;
            case 500 :
                props.status = "500";
                props.title = "500";
                props.subTitle = "抱歉, 服务器发生错误.";
                return <PageNotFound />;
        }
    }

    /**
     * 传入一个组件，验证用户是否登录，如未登录，弹出提示，如已登录，渲染组件
     * @param component
     */
    let accessControl = (component) => {
        let {user} = props;
        return !user ? history.goBack : component;
    }

    console.log(history)
    console.log(match)
    console.log(location)
    console.log(params)
    return (
        <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
            <Switch>
                <Route exact path='/'>
                    <Home keywords={props.keywords} saveSearchKeyWords={props.saveSearchKeyWords} saveAny={props.saveAny} />
                </Route>
                <Route exact path='/home'>
                    <Home keywords={props.keywords} saveSearchKeyWords={props.saveSearchKeyWords} saveAny={props.saveAny} />
                </Route>
                <Route exact path='/menu'>
                    <LeftNavigationMenu />
                </Route>
                <Route exact path='/searchResult'>
                    <SearchResultShow keywords={props.keywords} saveSearchKeyWords={props.saveSearchKeyWords} saveAny={props.saveAny} datas={props.datas} />
                </Route>
                <Route exact path='/personalCenter' >
                    {accessControl(<PersonalCenterW user={props.user} isAdminSpecific={false} />)}
                </Route>
                <Route exact path='/login' >
                    <SimpleLogin getUser={props.getUser} />
                </Route>
                <Route exact path="/dataInfo/:key" >
                    <DataInfoW datas={props.datas} user={props.user} />
                </Route>
                <Route exact path='/myCollections' >
                    {props.accessControl(<PersonalCenterW user={props.user} />)}
                </Route>
                <Route exact path='/result/:statusCode' >
                    {renderResultPage(params.statusCode)}
                </Route>
                <Route exact path='/orderGenerate/:key' >
                    <OrderStepsW datas={props.datas} user={props.user} />
                </Route>
            </Switch>

        </div>
    );


}
MyRouterWithHook.propTypes = {
    getUser: PropTypes.any,
    saveAny: PropTypes.any,
    saveSearchKeyWords: PropTypes.any,
    accessControl: PropTypes.any,
    keywords: PropTypes.string,
    user: PropTypes.object,
    datas: PropTypes.array,

}