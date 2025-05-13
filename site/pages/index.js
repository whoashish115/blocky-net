import React from "react";
import HomeComponent from "../components/Home/Index";
import { getData } from "../utils/fetchData";

const Home = (props) => {
  return (
    <>
      <HomeComponent {...props} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const blogsRes = await getData(`blog?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`);
  const recentBlogRes = await getData('blog?limit=3&sort=-createdAt&category=all&title=all')
  const trendingBlogRes = await getData('blog?limit=3&sort=-views&category=all&title=all')

  return {
    props: {
      recentBlog: recentBlogRes?.blogs || [],
      trendingBlog: trendingBlogRes?.blogs|| [],
      blogs: blogsRes?.blogs|| [],
      result: blogsRes?.result|| 0,
    },
  };
}

export default Home;
