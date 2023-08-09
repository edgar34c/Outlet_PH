import Image from "next/image";
import logo from "../assets/logo.jpg";

export default function Logo(){
    return(
        <div className="flex justify-center items-center">
            <Image src={logo} alt={"Logo"} width={400} height={400}></Image>
        </div>
    )
}