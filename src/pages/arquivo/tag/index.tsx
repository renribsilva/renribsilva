import { GetServerSideProps } from "next";

// Componente de redirecionamento (não vai renderizar nada)
const RedirectIndex = () => {
  return null;
};

// Função getServerSideProps que redireciona para /arquivo
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/arquivo", // Redireciona para /arquivo
      permanent: false, // Redirecionamento temporário
    },
  };
};

export default RedirectIndex;
