import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";
import FollowerList from "../components/FollowerList";
import { FollowList } from "../components/FollowList";
import NickNameEditForm from "../components/NickNameEditForm";

const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로잉 목록" data={followerList} />
        <FollowerList header="팔로워 목록" data={followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;

const followerList = [
  { nickname: "행갬" },
  { nickname: "반해라" },
  { nickname: "행개미" },
];
const followingList = [
  { nickname: "행갬" },
  { nickname: "바보" },
  { nickname: "제로초" },
];
