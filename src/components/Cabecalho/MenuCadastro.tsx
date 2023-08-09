import { useLogin } from "../LoginContext";
import alterar from "../assets/editar.png";
import excluir from "../assets/lixeira.png";
import sair from "../assets/sair.png";
import Image from "next/image";

export default function MenuCadastro(){
    const login = useLogin()
    return(
        <div className="flex items-center text-center gap-3 text-white mr-4 mt-4 mb-1">
            <a href="/excluir">
                <figure>
                    <Image src={excluir} alt={"excluir"} width={50} height={50} className="bg-white p-1 rounded-md"></Image>
                    <figcaption>Excluir</figcaption>
                </figure>
            </a>
            <a href="/login" className="mr-2" onClick={login.logoff}>
                <figure>
                    <Image src={sair} alt={"sair"} width={50} height={50} className="bg-white p-1 rounded-md"></Image>
                    <figcaption>Sair</figcaption>
                </figure>
            </a>
        </div>
    )
}