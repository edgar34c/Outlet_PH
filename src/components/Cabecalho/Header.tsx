import Logo from "./Logo";
import Menu from "./Menu";
import Outllet from "./Outlet";

export default function Header(){
    return(
        <div className="bg-black w-screen">
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
        </div>
    )
}