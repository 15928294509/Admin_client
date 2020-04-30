import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from './images/logo.png'

export default class Login extends Component {
    formRef = React.createRef()
    constructor(porps) {
        super(porps)
    }

    onFinish = values => {
        let { username, password } = values;
        alert(username)
    };
    vaildatePwd = (rule, value) => {
        value = value ? value.trim() : ""
        if (!value.length) {
            return Promise.reject("密码必须输入")
        } else if (value.length < 4) {
            return Promise.reject("密码不能小于4位")
        } else if (value.length > 12) {
            return Promise.reject("密码不能小于12位")
        } else if (!/^[a-zA-Z0-9_]+$/g.test(value)) {
            return Promise.reject("密码必须是英文,数字,下划线组成")
        } else {
            return Promise.resolve()
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '用户名是必须的',
                                },
                                {
                                    max: 12,
                                    message: "用户名不能大于12位"
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/g,
                                    message: "用户名必须是英文,数字,下划线组成"
                                },
                                {
                                    min: 4,
                                    message: "用户名不能小于4位"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    validator: this.vaildatePwd
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
