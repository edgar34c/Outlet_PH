import api from "@/api/api";
import HeaderDescricao from "@/components/Cabecalho/HeaderDescricao";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useProd } from "@/components/ProductContext";
import Head from 'next/head';
import { useCart } from "@/components/CartContext";

export default function Descricao() {
  const { produtos, setProdutos } = useProd(); // Using the custom hook to access the product context
  const [quant, setQuant] = useState(1)
  const router = useRouter(); // Router hook from Next.js for getting route information
  const { codproduto } = router.query; // Destructuring and getting the 'codproduto' from the query parameter
  const [imagemPrincipal, setImagemPrincipal] = useState(""); // State variable to store the main image URL
  const cart = useCart()

  useEffect(() => {
    // This useEffect hook will be called once when the component is mounted
    if (codproduto) {
      carregarProdutos(); // Function to load product data from the API
    }
  }, [codproduto]); // Depend on the codproduto parameter to trigger the data fetch

  useEffect(() => {
    console.log("Quant = ", quant)
  }, [quant]);



  async function carregarProdutos() {
    try {
      // Making an API request to get product data using the 'codproduto' from the query parameter
      const data = await api.descricao(codproduto);
      setProdutos(data); // Updating the state with the product data received from the API
      setImagemPrincipal(data.length > 0 ? data[0].imagem : ""); // Definindo a primeira imagem como a imagem principal inicialmente
    } catch (error) {
      console.error(error); // Log any errors that occurred during the API request
    }
  }

  // Function to handle image click event
  function handleImageClick(imageUrl: any) {
    setImagemPrincipal(imageUrl); // Update the state with the clicked image URL
  }


  //campo de quantidade
  function mais_prod() {
    setQuant(prevQuant => prevQuant + 1);
  }


  function menos_prod() {
    if (quant > 1) {
      setQuant(prevQuant => prevQuant - 1);
      console.log(quant)
    }
  }

  const add = (produto: any, quantidade: any) => () => {
    cart.addToCart(produto, quantidade);
    window.location.assign("/carrinho");
  };

  // Rendering the product description on the page
  return (
    <div className="w-screen h-screen text-black">
      <HeaderDescricao></HeaderDescricao>
      {produtos.length > 0 && (
        <div key={produtos.id} className="flex flex-wrap justify-center md:justify-between m-5 space-x-5">
          <Head><title>{produtos[0].nome}</title></Head>
          <div className="flex flex-col gap-3">
            <img src={`http://192.168.1.8/backPH/img/${imagemPrincipal}`} alt={produtos[0].nome} width={300} height={300} />
            <img src={`http://192.168.1.8/backPH/img/${produtos[0].imagem}`} alt={produtos[0].nome} width={100} onClick={() => handleImageClick(produtos[0].imagem)} />
            {produtos[0].imagens && (
              <img
                src={`http://192.168.1.8/backPH/img/${produtos[0].imagens}`}
                alt={produtos[0].nome}
                width={100}
                onClick={() => handleImageClick(produtos[0].imagens)}
              />
            )}
            {produtos.length > 1 && (
              <img src={`http://192.168.1.8/backPH/img/${produtos[1].imagens}`} alt={produtos[1].nome} width={100} onClick={() => handleImageClick(produtos[1].imagens)} />
            )}

            <h1 className="mt-5 text-2xl font-bold">Descrição:</h1>
            <p className="text-xl">
              {produtos[0].descricao}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <h2 className="text-xl">{produtos[0].nome}</h2>
            <p className="text-2xl">
              {produtos[0].preco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div className="border border-black rounded-lg border-collapse">
              <input type="button" value="+" onClick={mais_prod} className="p-1 border border-black border-collapse rounded-sm text-lg" />
              <input type="text" readOnly value={`${quant}`} id='txt_quant' className="text-center w-14 text-lg" />
              <input type="button" value="-" onClick={menos_prod} className="p-1 border border-black border-collapse rounded-sm text-lg font-semibold" />
            </div>
            <button
              type="submit"
              className="text-white font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center bg-zinc-950 hover:bg-zinc-800 focus:bg-zinc-700 mt-2"
              onClick={add(produtos[0], quant)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
