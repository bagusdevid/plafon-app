import {Link, usePage} from "@inertiajs/react";
import {AiOutlineHome} from "react-icons/ai";
import {RiVipCrown2Line} from "react-icons/ri";
import {IoSkullOutline} from "react-icons/io5";
import {LuWallet} from "react-icons/lu";
import {FiUser} from "react-icons/fi";

export default function Menus() {

    const {url: inertiaUrl} = usePage()

    const items = [
        {label: 'Beranda', url: '/', icon: <AiOutlineHome className="mx-auto" />},
        {label: 'VIP', url: '/vip', icon: <RiVipCrown2Line className="mx-auto" />},
        {label: 'Logo', url: '/top-up', icon: <IoSkullOutline className="mx-auto" />},
        {label: 'Dompet', url: '/wallet', icon: <LuWallet className="mx-auto" />},
        {label: 'Akun', url: '/profile', icon: <FiUser className="mx-auto" />},
    ]

    return <div className="flex items-center justify-around fixed left-1/2 transform -translate-x-1/2 bottom-0 z-30 w-full lg:w-[600px] h-[50px] bg-white border-t border-solid border-r-neutral-300 shadow-[-1px_-1px_11px_0px_rgba(0,0,0,0.1)]">
        {items.map((bm, k) => {

            if(k === 2) {
                return <Link href={bm.url} className="text-center bg-[#d71921] text-[40px] w-[60px] h-[60px] -mt-5 text-white px-1 py-1 overflow-hidden rounded-full shadow-xl" key={k}>
                    <img src="/images/logo-red_150.png" className="h-full" alt="" />
                </Link>
            }

            return <Link href={bm.url} className="text-center" key={k}>
                <div className={`text-[22px] ${inertiaUrl === bm.url || (new RegExp(`${bm.url}\/[a-z0-9]+$`)).test(inertiaUrl) ? 'text-red-500' : ''}`}>
                    {bm.icon}
                </div>
                <div className={`text-[11px] ${inertiaUrl === bm.url ? 'text-red-500' : ''}`}>
                    {bm.label}
                </div>
            </Link>
        })}
    </div>
}
