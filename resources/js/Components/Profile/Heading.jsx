import {Button, Menu, Portal} from "@chakra-ui/react";
import {HiDotsVertical} from "react-icons/hi";
import {Link} from "@inertiajs/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import Avatar from "@/Components/Profile/Avatar.jsx";
import AdvancedMenu from "@/Components/Profile/AdvancedMenu.jsx";

export default function Heading() {

    const {auth} = useContext(LayoutContext)

    return <div className="flex justify-between border-b border-solid border-b-neutral-300 pb-8">
        <div></div>
        <Avatar user={auth.user} />
        <div>
            <AdvancedMenu />
        </div>
    </div>
}
