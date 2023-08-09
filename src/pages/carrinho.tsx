import HeaderLogin from "@/components/Cabecalho/HeaderLogin";
import { useCart } from "@/components/CartContext";
import IconeFlutuante from "@/components/IconeFlutuante";
import Head from "next/head";
import { IoMdTrash } from "@react-icons/all-files/io/IoMdTrash";

export default function carrinho() {

    const cart = useCart()

    const remove = (id: any) => () => {
        cart.removeFromCart(id)
    }

    function home() {
        window.location.assign("/")
    }

    function whats() {
        window.location.assign("/whatsForms")
    }

    const chanQuantity = (id: any) => (evt: any) => {
        const newValue = Number(evt.target.value);
        if (newValue > 0) {
          cart.changeQuantity(id, newValue);
        } else {
          evt.target.value = 0;
          cart.changeQuantity(id, 0);
          remove(id)();
        }
    };

    const tlt = cart.valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <div>
            <Head><title>Carrinho</title></Head>
            <HeaderLogin></HeaderLogin>
            <div className="flex-col justify-center w-70 h-1/4">
                <div className="text-center bg-zinc-800 text-white font-bold text-4xl">Carrinho</div>
                <div className="flex flex-col w-full h-screen md:px-14 md:py-7 bg-gray-200">

                    {Object.keys(cart.cart).map(key => {
                        const product = cart.cart[key];
                        const preco = product.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                        cart.total()

                        return (
                            <div key={key} className="w-full flex flex-col h-fit gap-4 p-4 bg-white">

                                <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm bg-white">
                                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                                        <div className="flex flex-row gap-6 items-center">
                                            <div className="w-28 h-28">
                                                <img className="w-full h-full" src={`http://192.168.1.8/backPH/img/${product.imagem}`} alt={product.nome} />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-lg text-gray-800 font-semibold">{product.nome}</p>
                                            </div>
                                        </div>

                                        <div className="self-center text-center">
                                            <p className="text-gray-800 font-normal text-xl">{preco}</p>
                                        </div>
                                        <div className="self-center">
                                            <button>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end text-gray-800 cursor-pointer" onClick={remove(key)}>
                                        <IoMdTrash></IoMdTrash>
                                        <button className="w-1/6 text-base">Remover</button>
                                    </div>
                                    <div className="flex flex-row self-center gap-1">
                                        <input type="number" defaultValue={product.quantity} onBlur={chanQuantity(key)} className="w-10 h-10 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm p-1" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {Object.keys(cart.cart).length !== 0 ? (
                        <div className="flex flex-col w-full h-fit gap-4 p-4 bg-white">
                            {
                                <div className="flex flex-col w-full sm:w-1/3 md:w-2/3 h-fit gap-4 p-4 bg-white">
                                    <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                                        <div className="flex flex-row md:justify-between">
                                            <p className="text-gray-600">Total:</p>
                                            <div>
                                                <p className="font-bold text-gray-600">{tlt}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md"
                                                onClick={whats}
                                            >
                                                FINALIZAR COMPRA
                                            </button>
                                            <button
                                                className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
                                                onClick={home}
                                            >
                                                ADICIONAR MAIS PRODUTOS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full md:w-2/3 h-fit gap-4 pb-2.5 bg-white">
                            {
                                <div className="flex flex-col text-center">
                                    <p className="text-black text-3xl pb-4">O carrinho está vazio.</p>
                                    <button
                                        className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm text-gray-700 text-hover shadow-md w-full"
                                        onClick={home}
                                    >
                                        ADICIONAR PRODUTOS AO CARRINHO
                                    </button>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
            <IconeFlutuante></IconeFlutuante>
        </div>
    );
}