import Logo from "./Logo";
import Menu from "./Menu";
import Outllet from "./Outlet";

export default function HeaderHome(){
    return(
        <div className="bg-black w-screen mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Outllet></Outllet>
                </div>
                <div className="flex-col items-center">
                    <Menu></Menu>
                </div>
            </div>
            <div className="w-screen h-px bg-zinc-700"></div>
            <Logo></Logo>
            <div className="flex justify-center items-center bg-orange-100 w-screen text-black text-4xl font-bold">
                Produtos
            </div>
        </div>
    )
}