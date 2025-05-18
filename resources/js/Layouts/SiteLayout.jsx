import {Head, Link} from "@inertiajs/react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import FloatingMessage from "@/Components/FloatingMessage.jsx";
import {FaBars, FaRegUser} from "react-icons/fa6";
import {Stack, Drawer, Portal, Button, CloseButton} from "@chakra-ui/react";
import {MdAttachMoney, MdDashboard, MdLogout} from "react-icons/md";
import {AiOutlineHome} from "react-icons/ai";
import {RiVipCrown2Line, RiVipCrownFill} from "react-icons/ri";
import {LuWallet} from "react-icons/lu";
import {FiUser} from "react-icons/fi";
import {IoSkullOutline} from "react-icons/io5";
import Menus from "@/Components/Menus.jsx";

export default function SiteLayout({title = 'Default', leftNav = null, children}) {

    const {flashMessage, site, auth} = useContext(LayoutContext)

    // console.log(auth)

    const [alert, setAlert] = useState({
        show: false,
        status: 'success',
        message: ''
    })

    useEffect(() => {
        if(flashMessage) {

            setAlert({show: true, status: 'success', message: flashMessage})

            const timeoutId = setTimeout(() => {
                setAlert({show: false, status: 'success', message: flashMessage})
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [flashMessage])

    const portalRef = useRef(null)

    const menus = [
        {label: 'Dashboard', url: '/', icon: <MdDashboard />, method: 'get'},
        {label: 'Top Up', url: '/top-up', icon: <MdAttachMoney />, method: 'get'},
        {label: 'Profile', url: '/profile', icon: <FaRegUser />, method: 'get'},
        {label: 'Logout', url: '/logout', icon: <MdLogout />, method: 'post'},
    ]

    const bottomMenus = [
        {label: 'Beranda', url: '/', icon: <AiOutlineHome className="mx-auto" />},
        {label: 'VIP', url: '#', icon: <RiVipCrown2Line className="mx-auto" />},
        {label: 'Logo', url: '/top-up', icon: <IoSkullOutline className="mx-auto" />},
        {label: 'Dompet', url: '#', icon: <LuWallet className="mx-auto" />},
        {label: 'Akun', url: '/profile', icon: <FiUser className="mx-auto" />},
    ]

    return <>
                <FloatingMessage
                    show={alert.show}
                    status={alert.status}
                >
                    {alert.message}
                </FloatingMessage>
                <Head title={`${title} - ${site.name}`} />

                <div className="bg-white w-full lg:w-[600px] mx-auto relative">
                    <div className="flex justify-between items-center px-5 h-[60px] bg-red-600 text-white">
                        <div>
                            {leftNav ? leftNav : ''}
                        </div>
                        <div className="font-bold text-[18px]">
                            {title}
                        </div>
                        <div>
                            {auth.user ? <Button variant="plain" size="md" className="text-white">
                                    <FaBars />
                                </Button> : ''}
                        </div>
                    </div>
                    <div className="pb-[90px] min-h-[calc(100vh_-_60px)]">
                        {children}
                    </div>
                    {auth.user ? <Menus /> : ''}
                </div>

    </>
}

const DrawerContainer = forwardRef(
    function DrawerContainer(props, ref) {
        return (
            <Stack
                className="relative w-full lg:w-[600px] overflow-hidden min-h-screen mx-auto"
                ref={ref}
                {...props}
            />
        )
    },
)
