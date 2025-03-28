import { getAllPostSlugs, getPostData } from "../../lib/getMDXPosts";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MdxLayout from "../../layout/layout_mdx";
import Datetime from "../../components/datetime";
import type { PostData, PostSlug } from "../../mdxtypes";
import styles from "../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import { formatString } from "../../lib/formatString"; 
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";
import ArchiveButton from "../../components/archiveButton";
import { serialize } from "next-mdx-remote/serialize";

interface PostProps {
  postData: Omit<PostData, "content"> & {
    content: MDXRemoteSerializeResult;
  };
}

export async function getStaticPaths() {
  const mdfiles: PostSlug[] = getAllPostSlugs();
  return {
    paths: mdfiles.map((file) => ({
      params: { slug: file.params.slug },
    })),
    fallback: false, 
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {

  const postData: PostData = await getPostData(params.slug);
  const mdxSource = await serialize(postData.content);
  
  return {
    props: {
      postData: {
        ...postData,
        content: mdxSource,
      },
      ogtitle: postData.title, 
      ogdescription: postData.subtitle, 
    },
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <MdxLayout>
      <Header titlePre={postData.title} />
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
            <Link href={`/arquivo/tag/${formatString(tag)}`} key={index}>
              <ArchiveButton># {tag}</ArchiveButton>
            </Link>
          ))}
        </div>
      </section>
    </MdxLayout>
  );
}
