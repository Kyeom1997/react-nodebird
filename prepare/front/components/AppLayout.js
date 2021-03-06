import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>노드버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput enterButton />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {isLoggedIn ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://velog.io/@hang_kem_0531"
              target="_blank"
              rel="noreferrer noopener"
            >
              Made by Kyeom
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
