import React from "react";
import  DetailBlogComponent from "../../../components/Blog/Category/DetailBlog";
import { getData } from "../../../utils/fetchData";

const DetailBlog = (props) => {
  return (
    <>
      <DetailBlogComponent {...props} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const blogRes = await getData(`blog/bySlug/${params.slug}`);
  return {
    props: {
      blog: blogRes.blog ? blogRes.blog : {},
      nextBlog: blogRes.nextBlog ? blogRes.nextBlog : {},
      prevBlog: blogRes.prevBlog ? blogRes.prevBlog : {},
      relatedBlog: blogRes.relatedBlogs ? blogRes.relatedBlogs : [],
    },
  };
}

export default DetailBlog;
