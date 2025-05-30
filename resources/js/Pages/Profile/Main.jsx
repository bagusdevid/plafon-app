import Menus from "@/Components/Menus.jsx";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Head, Link} from "@inertiajs/react";
import Avatar from "@/Components/Profile/Avatar.jsx";
import AdvancedMenu from "@/Components/Profile/AdvancedMenu.jsx";
import {FiUser} from "react-icons/fi";
import {PiHandWithdraw} from "react-icons/pi";
import {LuCrown} from "react-icons/lu";
import {BsEnvelopeArrowUp} from "react-icons/bs";
import {RiCustomerService2Fill} from "react-icons/ri";
import {IoChevronForwardOutline} from "react-icons/io5";
import {MdLogout} from "react-icons/md";

export default function Main() {

    const {flashMessage, site, auth} = useContext(LayoutContext)

    const menus = [
        {label: 'Personal information', icon: <FiUser />, url: '/profile/edit'},
        {label: 'Withdraw', icon: <PiHandWithdraw />, url: '/withdraw'},
        {label: 'VIP', icon: <LuCrown />, url: '/vip'},
        {label: 'Invite your friend', icon: <BsEnvelopeArrowUp />, url: '/invite'},
        {label: 'Customer service', icon: <RiCustomerService2Fill />, url: '/customer-service'},
        {label: 'Logout', icon: <MdLogout />, url: '/logout'},
    ]

    return <>
        <Head title="Akun" />
        <div className="relative bg-[url('/images/emirates-fly-better3.jpg')] bg-center bg-center w-full lg:w-[600px] min-h-screen mx-auto relative">
            <div className="absolute left-0 top-0 w-full h-full bg-black/40">

            </div>
            <div className="flex justify-between items-center px-5 h-[60px] bg-red-600 text-white">
                <div>
                </div>
                <div className="font-bold text-[18px]">
                    Akun
                </div>
                <div>
                    {auth.user ? <AdvancedMenu onNavbar /> : ''}
                </div>
            </div>
            <div className="pb-[90px] relative z-20 px-5">
                <div className="py-5">
                    <Avatar user={auth.user} />
                    <div className="text-white flex justify-between mt-5 px-5">
                        <div className="text-white">
                            <div className="uppercase text-[12px] text-white/70">
                                Credit
                            </div>
                            <div className="font-bold text-[18px]">
                                200</div>
                        </div>
                        <div>
                            <div className="uppercase text-[12px] text-right text-white/70">
                                Balance
                            </div>
                            <div className="font-bold text-[18px]">
                                220000</div>
                        </div>
                    </div>
                </div>
                <ul className="bg-white/80 rounded-lg px-5 py-2">
                    {menus.map((menu,key) => {
                        const borderBClass = key+1 < menus.length ? 'border-b border-solid border-b-neutral-200' : '';
                        return <li key={key}>
                            <Link href={menu.url} method={key === menus.length - 1 ? 'post' : 'get'} as={key === menus.length - 1 ? 'button' : 'a'} className={`flex items-center gap-3 py-3 ${borderBClass}`}>
                                <div>
                                    {menu.icon}
                                </div>
                                <div className="flex-1">
                                    {menu.label}
                                </div>
                                <div>
                                    <IoChevronForwardOutline />
                                </div>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
            {auth.user ? <Menus /> : ''}
        </div>
    </>
}
