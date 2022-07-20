import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <br />
          <Input name="id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <Input
            name="nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Input
            name="password"
            value={password}
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="passwordCheck">비밀번호 체크</label>
          <br />
          <Input
            name="passwordCheck"
            value={passwordCheck}
            type="password"
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorDiv>비밀번호가 일치하지 않습니다.</ErrorDiv>}
        </div>
        <div>
          <Checkbox name="term" checked={term} onChange={onChangeTerm}>
            위 약관들에 동의합니다.
          </Checkbox>
          {termError && <ErrorDiv>약관에 동의하셔야 합니다.</ErrorDiv>}
        </div>
        <SubmitDiv>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </SubmitDiv>
      </Form>
    </AppLayout>
  );
};

export default Signup;

const ErrorDiv = styled.div`
  color: red;
`;

const SubmitDiv = styled.div`
  margin-top: 10px;
`;
