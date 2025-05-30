import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {FaDollarSign, FaMapLocation, FaPlaneDeparture, FaUser} from "react-icons/fa6";
import {FaHistory} from "react-icons/fa";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import {IoMdAirplane} from "react-icons/io";
import {ImAirplane, ImLocation} from "react-icons/im";
import {Link} from "@inertiajs/react";

export default function HomeOld({tasks}) {

    const challenges = [
        {icon: <FaPlaneDeparture />},
        {icon: <IoMdAirplane />},
        {icon: <ImAirplane />},
        {icon: <FaMapLocation />},
        {icon: <ImLocation />},
    ];

    return <SiteLayout title="Home">
        <Slider
            autoplay
            arrows={false}
            dots
            dotsClass="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1 [&_li]:w-[10px] [&_li]:h-[10px] [&_li]:text-transparent [&_li]:bg-white [&_.slick-active]:bg-red-500 [&_li]:rounded-full"
            className="mb-5"
        >
            <div className="bg-red-300 h-[200px]">
            </div>
            <div className="bg-green-500 h-[200px]">
            </div>
            <div className="bg-teal-500 h-[200px]">
            </div>
        </Slider>
        <div className="px-5">
            <div className="flex flex-wrap gap-3">
                {tasks && tasks.map((task, key) => {
                    return <Link href={`/task/${task.id}`} key={key} className="bg-neutral-200 flex items-center justify-center w-[calc(50%_-_10px)]">
                        <img src={task.photo_300_path} alt="" className="w-full" />
                    </Link>
                })}
            </div>
        </div>
    </SiteLayout>
}
