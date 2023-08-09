import React, { useEffect, useState } from "react";
import lixeira from "@/components/assets/lixeira.png";
import Image from "next/image";
import editar from "@/components/assets/editar.png";
import Head from "next/head";
import HeaderCadastro from "@/components/Cabecalho/HeaderCadastro";
import api from "@/api/api";
import { useRouter } from "next/router";

export default function Excluir() {
  const [produtos, setProdutos] = useState([]);
  const router = useRouter();
  const [isLogado, setIsLogado] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLogado = window.localStorage.getItem('logado');
      setIsLogado(storedLogado === 'true');
      setIsPageLoaded(true);
      carregarProdutos();
    }
  }, []);

  async function carregarProdutos() {
    try {
      const data = await api.pegaProd();
      setProdutos(data);
    } catch (error) {
      console.error(error); // Erro na requisição
    }
  }

  async function excluir(id: any) {
    try {
      await api.excluir(id);
    } catch (error) {
      console.error(error); // Erro na requisição
    }
    window.location.reload();
  }

  function alterar(id: any) {
    router.push(`/alterar?codproduto=${id}`);
  }

  if (isPageLoaded) {
    if (isLogado) {
      return (
        <div>
          <HeaderCadastro></HeaderCadastro>
          <Head>
            <title>Produtos cadastrados</title>
          </Head>
          <div>
            <div className="w-full border border-gray-300 bg-gray-400 text-center text-xl font-bold text-black">
              PRODUTOS CADASTRADOS
            </div>
            <table className="border-collapse w-full text-black">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-center">
                    Nome
                  </th>
                  <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-center">
                    Preço
                  </th>
                  <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-center">
                    Descrição
                  </th>
                  <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-center">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.codproduto}>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {produto.nome}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {produto.preco.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {produto.descricao}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 flex justify-center gap-4">
                      <div
                        className="cursor-pointer text-center"
                        onClick={() => {
                          excluir(produto.codproduto);
                        }}
                      >
                        <Image src={lixeira} alt={"Excluir"} width={20} height={20} />
                        Deletar
                      </div>
                      <div
                        className="cursor-pointer text-center"
                        onClick={() => {
                          alterar(produto.codproduto);
                        }}
                      >
                        <Image src={editar} alt={"Editar"} width={20} height={20} />
                        Editar
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // Redirecionamento de rota para a página de login
      if (typeof window !== 'undefined') {
        window.location.assign("/login"); // ou window.location.replace("/login")
      }
      return null
    }
  }
}
