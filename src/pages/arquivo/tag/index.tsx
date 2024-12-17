import { GetServerSideProps } from "next";

const RedirectIndex = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/arquivo", 
      permanent: false, 
    },
  };
};

export default RedirectIndex;
