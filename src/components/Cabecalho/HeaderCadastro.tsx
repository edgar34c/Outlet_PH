import Logo from "./Logo";
import MenuCadastro from "./MenuCadastro";
import Outllet from "./Outlet";

export default function HeaderCadastro(){
    return(
        <div className="bg-black w-screen">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Outllet></Outllet>
                </div>
                <div className="flex-col items-center">
                    <MenuCadastro></MenuCadastro>
                </div>
            </div>
            <div className="w-screen h-px bg-zinc-700"></div>
            <Logo></Logo>
        </div>
    )
}