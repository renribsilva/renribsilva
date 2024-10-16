import Head from "next/head";
import React from "react";

interface HeaderProps {
  titlePre?: string;
}

const Header = ({
  titlePre = "Petricor",
}: HeaderProps) => {

  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
  };

  return (
    <Head>
      <title>{metas.title}</title>
      <meta property="og:title" content="Blog | Petricor"/>
    </Head>
  );
};

export default Header;
