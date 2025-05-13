import { getData } from '../../../utils/fetchData'
import React from "react"
import  CategoryBlogComponent from "../../../components/Blog/Category/Index"

const CategoryBlog = (props) => {
    return(
        <>
        <CategoryBlogComponent {...props}/>
        </>
         
    )
}

export async function getServerSideProps({ params }) {
    const res = await getData(`blog/byCategory/${params.category}`);
    return {
      props: {
        blogs: res.blogs,
        category: params.category
      },
    };
  }
  
  

export default CategoryBlog