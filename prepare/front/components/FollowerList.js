import { Button, Card, List } from "antd";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";

const FollowerList = ({ header, data }) => {
  return (
    <ListWrapper
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      loadMore={
        <LoadDiv>
          <Button>더 보기</Button>
        </LoadDiv>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <RenderItemList>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </RenderItemList>
      )}
    />
  );
};

export default FollowerList;

FollowerList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const LoadDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const RenderItemList = styled(List.Item)`
  margin-top: 20px;
`;
