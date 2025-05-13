import React from "react";
import { getData } from "../../utils/fetchData";
import PageComponent from "../../components/Page/Index";

const Page = (props) => {
  return (
    <>
      <PageComponent {...props}/>
    </>
  );
};

export async function getServerSideProps({ params }) {
  if(params.slug == "contact-us") {return null}
  else{
    const res = await getData(`page/${params.slug}`);
    return {
      props: {
        page: res.page,
      },
    };
  }
}

export default Page;
