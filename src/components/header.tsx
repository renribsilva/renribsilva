import Head from "next/head";
import React from "react";

interface HeaderProps {
  titlePre?: string;
}

const Header = ({
  titlePre = "renribsilva",
}: HeaderProps) => {

  const defaultTitle = titlePre === "renribsilva" ? "renribsilva" : `${titlePre} | renribsilva`;

  const metas = {
    title: defaultTitle,
  };

  return (
    <Head>
      <title>{metas.title}</title>
    </Head>
  );
};

export default Header;
