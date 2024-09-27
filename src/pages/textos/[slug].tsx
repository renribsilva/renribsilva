import { getAllPostSlugs, getPostData } from '../../lib/getCollection';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import MdxLayout from '../../layout/mdx';
import Datetime from '../../components/datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { PostData, PostSlug } from '../../mdxtypes';
import styles from "../../styles/mdx.module.css"

interface PostProps {
  postData: Omit<PostData, 'content'> & {
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
      <h1 className={styles.mdxtitle}>{postData.title}</h1>
      <div className={styles.mdxdate}>
        <span>{<FontAwesomeIcon icon={faCalendar} />}</span>
        <span>
          <Datetime date={postData.date} mod={postData.mod} />
        </span>
      </div>
      <div>
        <MDXRemote {...postData.content} />
      </div>
    </MdxLayout>
  );
}