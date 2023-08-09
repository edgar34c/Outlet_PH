import login from "../assets/login.png";
import carrinho from "../assets/carrinho-de-compras.png";
import Image from "next/image";

export default function Menu(){
    return(
        <div className="flex items-center text-center gap-3 text-white mr-4 mt-4 mb-1">
            <a href="carrinho">
                <figure>
                    <Image src={carrinho} alt={"carrinho"} width={50} height={50} className="bg-white rounded-md"></Image>
                    <figcaption>Carrinho</figcaption>
                </figure>
            </a>
        </div>
    )
}