import Logo from "./Logo";
import Menu from "./Menu";
import Outllet from "./Outlet";

export default function HeaderLogin(){
    return(
        <div className="bg-black w-screen">
            <div className="flex items-center justify-between">
                <div className="flex items-center mb-5 mt-5">
                    <Outllet></Outllet>
                </div>
            </div>
            <div className="w-screen h-px bg-zinc-700"></div>
            <Logo></Logo>
        </div>
    )
}