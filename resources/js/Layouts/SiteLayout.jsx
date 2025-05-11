import {Head, Link} from "@inertiajs/react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import FloatingMessage from "@/Components/FloatingMessage.jsx";
import {FaBars, FaRegUser} from "react-icons/fa6";
import {Stack, Drawer, Portal, Button, CloseButton} from "@chakra-ui/react";
import {MdAttachMoney, MdDashboard, MdLogout} from "react-icons/md";

export default function SiteLayout({title = 'Default', leftNav = null, children}) {

    const {flashMessage, auth} = useContext(LayoutContext)

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

    return <>
        <Drawer.Root>
            <DrawerContainer ref={portalRef}>
        <FloatingMessage
            show={alert.show}
            status={alert.status}
        >
            {alert.message}
        </FloatingMessage>
        <Head title={title} />

                <div className="bg-white">
                    <div className="flex justify-between items-center px-5 w-full lg:w-[600px] h-[60px] bg-red-600 text-white">
                        <div>
                            {leftNav ? leftNav : ''}
                        </div>
                        <div className="font-bold text-[18px]">
                            {title}
                        </div>
                        <div>
                            {auth.user ? <Drawer.Trigger asChild>
                                <Button variant="plain" size="md" className="text-white">
                                    <FaBars />
                                </Button>
                            </Drawer.Trigger> : ''}
                        </div>
                    </div>
                    <div className="px-10 py-10 min-h-[calc(100vh_-_60px)]">
                        {children}
                    </div>
                </div>
            </DrawerContainer>
            <Portal container={portalRef}>
                <Drawer.Backdrop pos="absolute" boxSize="full" />
                <Drawer.Positioner pos="absolute" boxSize="full">
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Drawer Title</Drawer.Title>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div>
                                {menus.map((menu, key) => {
                                    return <Link key={key} href={menu.url} method={menu.method} as="a" className="flex items-center py-3 px-3 rounded-md duration-300 group hover:bg-red-100 w-full cursor-pointer">
                                        <div className="w-[30px] text-gray-500 group-hover:text-red-400">
                                            {menu.icon}
                                        </div>
                                        <div className="flex-1 font-medium text-[16px] group-hover:text-red-700 text-left">
                                            {menu.label}
                                        </div>
                                    </Link>
                                })}
                            </div>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
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
