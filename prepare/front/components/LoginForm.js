import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput("");
  const [pwd, onChangePwd] = useInput("");

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ id, pwd }));
  }, [id, pwd]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="id">아이디</label>
        <br />
        <Input name="id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="pwd">비밀번호</label>
        <br />
        <Input
          name="pwd"
          type="password"
          value={pwd}
          onChange={onChangePwd}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
