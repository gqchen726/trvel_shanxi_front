import { Steps } from 'antd';
import { 
    UserOutlined, 
    LoadingOutlined, 
    SmileOutlined 
} from '@ant-design/icons';
import React from "react";
import Card from "antd/es/card";
import Button from "antd/es/button";
import {MyDescriptions} from "./MyDescriptions";
import {withRouter} from "react-router";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import "./../public/css/OrderStep.css"

const { Step } = Steps;
import {util} from "../common/Util";
import {Link} from "react-router-dom";

export class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
                ConfirmStatus: "process",
                ViewDetail: "wait"
            },
            orderDetail: {},
        }
    }

    componentWillMount() {
        let {orderId} = this.props.match.params;
        axios.get(`${urlsUtil.order.getOrderUrl}?orderId=${orderId}`).then((response) => {
            let {data} = response;
            if (data.code == 0) {
                let orderDetail = data.body;
                if (orderDetail.order.status === "generated") {
                    setTimeout(() => {
                        this.setState({
                            orderDetail: orderDetail,
                            status: {
                                ConfirmStatus: "process",
                                ViewDetail: "wait"
                            },
                        })
                    },0)
                } else if(orderDetail.order.status === "confirmed") {
                    setTimeout(() => {
                        this.setState({
                            orderDetail: orderDetail,
                            status: {
                                ConfirmStatus: "finish",
                                ViewDetail: "process"
                            },
                        })
                    },0)
                }
            } else {
                util.tipMessage('orderDetail tips',data.message)
            }
        })


    }


    next = () => {
        let {status, orderDetail} = this.state;
        if ("process" == status.ViewDetail) {
            return ;
        }
        if ("process" == status.ConfirmStatus) {


            axios.get(`${urlsUtil.order.updateOrderStatus}?mobileNumber=${this.props.user.mobileNumber}&orderId=${orderDetail.order.orderId}&status=paid`)
                .then((response) => {
                    let data = response.data;
                    if (data.code == 0) {
                        let orderDetail = data.body;
                        status.ConfirmStatus = "finish";
                        status.ViewDetail = "finish";
                        this.setState({
                            status: status,
                            orderDetail: orderDetail
                        })
                    } else {
                        util.tipMessage("????????????????????????",data.message)
                    }
                })
            this.setState({
                status: status
            })
        }
    }

    returnOrderCard = (status,orderDetail) => {
        if (!orderDetail.order) {
            return ;
        }
        if (status.ConfirmStatus == "process") {

            if (!orderDetail) return <div>data is null</div>

            return (
                <div>
                    <br />
                    <div className={"OrderCode"}>
                        {
                            orderDetail.order.orderId ? orderDetail.order.orderId : null
                        }
                    </div>
                    <div className={"OrderDetail"}>
                        <br />
                        <MyDescriptions
                            descriptered={orderDetail.order}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                        <br />
                        <MyDescriptions
                            descriptered={orderDetail.product}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                    </div>
                </div>
            );
        }
        if (status.ViewDetail == "process") {
            if (!orderDetail) return <div>data is null</div>

            return (
                <div>
                    <br />
                    <div className={"OrderCode"}>
                        {
                            orderDetail.order.orderId ? orderDetail.order.orderId : null
                        }
                    </div>
                    <div className={"OrderDetail"}>
                        <br />
                        <MyDescriptions
                            descriptered={orderDetail.order}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                        <br />
                        <MyDescriptions
                            descriptered={orderDetail.product}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                    </div>
                </div>
            );
        }
    }
    render() {
        let {status, orderDetail} = this.state;
        return (
            <Card>
                <Steps>
                    <Step status={status.ConfirmStatus}
                          title="Confirm"
                          icon={status.ConfirmStatus == "process" ? <LoadingOutlined /> :<UserOutlined />}
                    />
                    <Step status={status.ViewDetail}
                          title="ViewDetail"
                          icon={<SmileOutlined />}
                    />
                </Steps>
                {/*1.??????????????????*/}
                {/*2.????????????*/}
                {/*3.??????????????????*/}
                {
                    this.returnOrderCard(status, orderDetail)
                }
                {
                    status.ViewDetail === "process" ? (
                        <Button
                            type={"primary"}
                            style={{width:'10%'}}
                            key={"goHome"}
                        >
                            <Link to={'/home'} >
                                ????????????
                            </Link>
                        </Button>
                    ): (
                        <div>
                            <Button
                                type={"primary"}
                                style={{width:'10%'}}
                                onClick={this.next}
                            >
                                ?????????
                            </Button>
                        </div>
                    )
                }
            </Card>
        );
    }
}
export const OrderDetailW = withRouter(OrderDetail)