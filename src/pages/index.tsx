import { useEffect, useState } from 'react';
import Grid from "@/components/Grid";
import HeaderHome from "@/components/Cabecalho/HeaderHome";
import IconeFlutuante from "@/components/IconeFlutuante";
import api from '../api/api';
import { useCart } from '@/components/CartContext'
import Head from 'next/head';
import { useRouter } from "next/router";


export default function index() {
  const [produtos, setProdutos] = useState([]);
  const cart = useCart()
  const router = useRouter();

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const data = await api.pegaProd();
      setProdutos(data);
    } catch (error) {
      console.error(error); // Erro na requisição
    }
  }

  function descricao(id: any){
    router.push(`/descricao?codproduto=${id}`);
  }
  const add = (produto: any) => () => {
    cart.addToCart(produto)
    window.location.assign("/carrinho")
  }

  return (
    <div className="h-screen w-screen flex-col items-center">
      <Head><title>Outlet PH</title></Head>
      <HeaderHome></HeaderHome>
      <Grid>
        {produtos.map((produto) => (
          <div className="bg-gray-800 shadow-md rounded-lg max-w-sm dark:bg-gray-900 dark:border-gray-800" key={produto.codproduto}>
            <div className="w-48 h-48">
              <a onClick={() => {descricao(produto.codproduto)}}>
                <img className="rounded-t-lg p-8 w-full h-full cursor-pointer" src={`http://192.168.1.8/backPH/img/${produto.imagem}`} alt={produto.nome} />
              </a>
            </div>
            <div className="px-5 pb-5">
              <div className='pl-6'>
                <a onClick={() => {descricao(produto.codproduto)}}>
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white cursor-pointer">{produto.nome}</h3>
                </a>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
              </div>
              <button className={`
              text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2
              `} onClick={add(produto)}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </Grid>
      <IconeFlutuante></IconeFlutuante>
    </div>
  )
}
