import {Button, Image, Menu, Portal} from "@chakra-ui/react";
import {HiDotsVertical} from "react-icons/hi";
import {Link} from "@inertiajs/react";
import {FaRegCircleUser} from "react-icons/fa6";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";

export default function AdvancedMenu({onNavbar = false}) {

    const {auth} = useContext(LayoutContext)

    const items = [
        {label: 'Ubah password', url: '/profile/change-password', method: 'get'},
        {label: 'Ubah photo', url: '/profile/change-avatar', method: 'get'},
        {label: 'Logout', url: '/logout', method: 'post'},
    ];

    return <Menu.Root positioning={{ placement: "bottom-end" }}>
        {onNavbar ? <Menu.Trigger asChild>
            <Button size="sm" unstyled className="cursor-pointer rounded-full overflow-hidden flex items-center justify-center text-[30px] text-black w-[32px] h-[32px] text-white">
                {auth.user && auth.user.photo ? <Image src={auth.user.photo_thumb_path} alt="" /> : <FaRegCircleUser />}
            </Button>
        </Menu.Trigger> : <Menu.Trigger asChild>
            <Button size="sm" unstyled className="cursor-pointer py-1 pl-2">
                <HiDotsVertical />
            </Button>
        </Menu.Trigger>}
        <Portal>
            <Menu.Positioner>
                <Menu.Content>
                    {items.map((item, key) => {
                        return <Menu.Item asChild value={item.url} key={key}>
                            {item.method === 'post' ? <Link href={item.url} method="post" as="button">
                                {item.label}
                            </Link> : <Link href={item.url}>
                                {item.label}
                            </Link>}
                        </Menu.Item>
                    })}
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root>
}
