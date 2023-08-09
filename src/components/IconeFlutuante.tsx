import Image from "next/image";
import instagram from "../components/assets/instagram.png"

export default function IconeFlutuante(){
    return(
        <div className="fixed bottom-10 right-10">
            <a href="https://api.whatsapp.com/send/?phone=5511940547458&text&type=phone_number&app_absent=0" target="_blank"><Image src={"https://storage.googleapis.com/neuro-cdn/uploads/72d189bd35267b7a5707699a3705e293.png"} alt={"WhatsApp"} width={50} height={50} className="rounded-full"></Image></a>
            <a href="https://www.instagram.com/outllet_ph/" target="_blank"><Image src={instagram} alt={"Instagram"} width={50} height={50} className="rounded-full mt-1"></Image></a>
        </div>
    )
}

