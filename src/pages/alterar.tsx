import api from "@/api/api";
import HeaderCadastro from "@/components/Cabecalho/HeaderCadastro";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function alterar() {
    const [id, setId] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [nomeProd, setNomeProd] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const router = useRouter();
    const { codproduto } = router.query;
    const [isLogado, setIsLogado] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (codproduto) {
                    const data = await api.prodById(codproduto);
                    setProdutos(data);
                    if (data.length > 0) {
                        setNomeProd(data[0].nome); // Acessar o nome do produto corretamente
                        setPreco(data[0].preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
                        setDescricao(data[0].descricao)
                        setId(data[0].codproduto)
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [codproduto]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLogado = window.localStorage.getItem('logado');
            setIsLogado(storedLogado === 'true');
            setIsPageLoaded(true);
        }
    }, []); // Executar somente no montagem do componente

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.atualizar(id, nomeProd, preco, descricao);
            alert(response);
            router.push(`/excluir`);
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao processar o cadastro.');
        }
    };

    if (isPageLoaded) {
        if (isLogado) {
            return (
                <div className="h-screen text-black">
                    <Head><title>Alterar produtos</title></Head>
                    <HeaderCadastro></HeaderCadastro>
                    <div className="text-center font-bold text-4xl">Alterar produto</div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center mt-4">
                            <input
                                type="text"
                                placeholder="Nome do produto"
                                defaultValue={nomeProd}
                                className="border border-black rounded-md w-2/4 h-7 shadow-sm shadow-black"
                                onChange={(e) => setNomeProd(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <input
                                type="text"
                                placeholder="Preço"
                                className="border border-black rounded-md w-2/4 h-7 shadow-sm shadow-black"
                                onChange={(e) => setPreco(e.target.value)}
                                value={preco}
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <textarea
                                placeholder="Descrição do produto"
                                className="border border-black rounded-md w-2/4 h-52 shadow-sm shadow-black"
                                onChange={(e) => setDescricao(e.target.value)}
                                value={descricao}
                            ></textarea>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="text-white bg-black rounded-md w-36 h-10">Enviar</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            // Redirecionamento de rota para a página de login
            if (typeof window !== 'undefined') {
                window.location.assign("/login"); // ou window.location.replace("/login")
            }
            return null
        }
    }
}