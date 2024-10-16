import { getAllPostSlugs, getPostData } from "../../lib/getMDXPosts";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MdxLayout from "../../layout/layout_mdx";
import Datetime from "../../components/datetime";
import type { PostData, PostSlug } from "../../mdxtypes";
import styles from "../../styles/pages.module.css";
import React from "react";
import Tagbutton from "../../components/tagbutton"; 
import Link from "next/link";
import { formatString } from "../../lib/formatString"; // Certifique-se de que o caminho esteja correto
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";
import { NextSeo } from "next-seo"; // Importa NextSeo

interface PostProps {
  postData: Omit<PostData, "content"> & {
    content: MDXRemoteSerializeResult; // Conteúdo serializado para MDXRemote
  };
}

export async function getStaticPaths() {
  const mdfiles: PostSlug[] = getAllPostSlugs(); // Utilize PostSlug como tipo
  return {
    paths: mdfiles.map((file) => ({
      params: { slug: file.params.slug },
    })),
    fallback: false, // Se `false`, qualquer rota não encontrada retorna 404
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postData: PostData = await getPostData(params.slug);

  // Serializa o conteúdo MDX para uso com MDXRemote
  const mdxSource = await serialize(postData.content);
  
  return {
    props: {
      postData: {
        ...postData,
        content: mdxSource, // Conteúdo serializado
      },
    },
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <MdxLayout>
      <NextSeo
        // title={postData.title}
        // description={postData.slug}
        // openGraph={{
        //   url: `https://petricor.xyz/blog/${postData.slug}`,
        //   title: postData.title,
        //   description: postData.slug,
        //   images: [
        //     {
        //       url: "https://petricor-phi.vercel.app/api/og",
        //       width: 800,
        //       height: 600,
        //       alt: "Imagem com fundo brando e em preto a palavra Petricor",
        //     },
        //   ],
        //   site_name: "Petricor",
        // }}
      />
      <Header 
        titlePre="Blog"
      />
      <Breadcrumb />
      <h1 className={styles.blog_slug_title}>
        <div>{postData.title}</div>
        <div className={styles.blog_slug_subtitle}>
          {postData.subtitle && postData.subtitle.length > 0 ? `${postData.subtitle}` : ""}
        </div>
      </h1>
      <div className={styles.blog_slug_date}>
        <span>
          <Datetime date={postData.date} />
        </span>
      </div>
      <div>
        <MDXRemote {...postData.content} />
      </div>
      <section className={styles.blog_slug_tags}>
        <div className={styles.blog_slug_tags1}>
          {postData.tags.length > 0 && <span>Tags:</span>}
        </div>
        <div className={styles.blog_slug_tags2}>
          {postData.tags.map((tag: string, index: number) => (
            <Link href={`/tags/${formatString(tag)}`} key={index}>
              <Tagbutton># {tag}</Tagbutton>
            </Link>
          ))}
        </div>
      </section>
    </MdxLayout>
  );
}
