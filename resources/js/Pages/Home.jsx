import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Head, Link} from "@inertiajs/react";
import {Badge, Progress} from "@chakra-ui/react";
import Menus from "@/Components/Menus.jsx";
import {FaArrowDown, FaMoneyBill, FaMoneyBillTransfer, FaPlus} from "react-icons/fa6";
import {MdOutlineAccountBox, MdRedeem} from "react-icons/md";
import {GoTasklist} from "react-icons/go";
import {IoIosArrowRoundForward} from "react-icons/io";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import {BsThreeDots} from "react-icons/bs";
import {IoWallet} from "react-icons/io5";

export default function Home({tasks, newsFeeds}) {

    // console.log(newsFeeds)

    const {flashMessage, site, auth} = useContext(LayoutContext)

    const shortcuts = [
        {label: 'Top Up', url: '#', icon: <FaPlus />},
        {label: 'Redeem', url: '', icon: <FaArrowDown />},
        {label: 'Lainnya', url: '', icon: <BsThreeDots />},
    ]

    return <>
        <Head title="Home" />
        <div className="bg-neutral-200 w-full lg:w-[600px] mx-auto relative">
            <Slider
                autoplay
                fade
                speed={500}
                className="h-[240px] overflow-hidden"
            >
                <div>
                    <img src="/images/slider1.jpg" alt="" />
                </div>
                <div>
                    <img src="/images/slider3.jpg" alt="" />
                </div>
                <div>
                    <img src="/images/slider2.jpg" alt="" />
                </div>
            </Slider>
            <div className="pb-[90px] relative z-20 min-h-[calc(100vh_-_240px)] px-5">
                <div className="bg-white rounded-md flex justify-between -mt-7 shadow-md px-5 py-3 mb-14">
                    <div className="flex gap-3 items-center">
                        <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-neutral-200">
                            <IoWallet className="text-[18px] text-[#d71921]" />
                        </div>
                        <div>
                            <div className="font-bold">
                                {auth.user.username}
                            </div>
                            <div className="text-sm">
                                Rp 200.000
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        {shortcuts.map((shortcut, key) => {
                           return <Link href="#" key={key} className="text-center">
                               <div className="w-[24px] h-[24px] mx-auto flex justify-center items-center text-white rounded-full bg-[#d71921] mb-1">
                                   {shortcut.icon}
                               </div>
                               <div className="text-[12px]">
                                   {shortcut.label}
                               </div>
                           </Link>
                        })}
                    </div>
                </div>
                <div className="mb-12">
                    <div className="pb-20 -mt-7 px-5 py-3 bg-gradient-to-b from-white to-transparent rounded-tl-md rounded-tr-md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[20px] font-bold">
                                Tugas
                            </h3>
                            <div>
                                <IoIosArrowRoundForward />
                            </div>
                        </div>
                        <div className="text-[13px]">
                            Lorem ipsum dolor sit amet amet ipsum dolor neretivi gooese fran acktuila wiuss pra dumsetra
                        </div>
                    </div>
                    <Slider
                        autoplay={false}
                        infinite={false}
                        dots
                        slidesToShow={2}
                        slidesToScroll={1}
                        dotsClass="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1 [&_li]:w-[10px] [&_li]:h-[10px] [&_li]:text-transparent [&_li]:bg-white [&_.slick-active]:bg-red-500 [&_li]:rounded-full"
                        className="mb-5 -mt-16 [&_.slick-prev]:z-20 [&_.slick-prev]:left-0 [&_.slick-prev]:before:text-[32px] [&_.slick-prev]:before:opacity-100 [&_.slick-prev]:before:text-red-500 [&_.slick-next]:right-0 [&_.slick-next]:before:text-[32px] [&_.slick-next]:before:opacity-100 [&_.slick-next]:before:text-red-500"
                    >
                        {tasks.map((task, key) => {
                            return <div className="px-2" key={key}>
                                <Link href={`/task/${task.id}`} className="block max-h-[200px] rounded-md overflow-hidden">
                                    <img
                                        src={task.photo_300_path}
                                        alt=""
                                        className="w-full"
                                    />
                                </Link>
                            </div>
                        })}
                    </Slider>
                </div>
                <div>
                    <div className="bg-white rounded-md">
                        <div className="px-5 py-3">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[20px] font-bold">
                                    News
                                </h3>
                                <div>
                                    <IoIosArrowRoundForward />
                                </div>
                            </div>
                            <div className="text-[13px]">
                                Lorem ipsum dolor sit amet amet ipsum dolor neretivi gooese fran acktuila wiuss pra dumsetra
                            </div>
                        </div>
                        <ul>
                            {newsFeeds.map((nf, key) => {
                                return <li key={key} className="flex items-center gap-5 px-5 py-2 border-b border-solid border-b-neutral-200">
                                    <div className="w-[150px] overflow-hidden rounded-md">
                                        <Link href={nf.url} className="block">
                                            <img src={nf.thumb} className="w-full" alt="" />
                                        </Link>
                                    </div>
                                    <div className="flex-1">
                                        <Link href={nf.url}>
                                            {nf.title}
                                        </Link>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {auth.user ? <Menus /> : ''}
        </div>
    </>
}
