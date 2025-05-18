import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset, Menu, Button, Portal} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link} from "@inertiajs/react";
import {CiEdit} from "react-icons/ci";
import {FiEdit} from "react-icons/fi";
import {HiDotsVertical, HiOutlineDotsVertical} from "react-icons/hi";

export default function Main() {

    const {auth} = useContext(LayoutContext)

    return <SiteLayout title="Profile">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <div className="flex justify-between border-b border-solid border-b-neutral-300 pb-8">
                <div></div>
                <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-neutral-200 rounded-full">
                    <FaUser />
                </div>
                <div>
                    <Menu.Root positioning={{ placement: "bottom-end" }}>
                        <Menu.Trigger asChild>
                            <Button size="sm" unstyled className="cursor-pointer py-1 pl-2">
                                <HiDotsVertical />
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item asChild value="/profile/change-password">
                                        <Link href="/profile/change-password">
                                            Ubah password
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item asChild value="/profile/change-avatar">
                                        <Link href="/profile/change-avatar">
                                            Ubah photo
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item asChild value="/logout">
                                        <Link href="/logout" method="post" as="button">
                                            Logout
                                        </Link>
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </div>
            </div>
            <div className="flex justify-between items-center py-2 px-2 bg-neutral-100 mb-8">
                <div>
                </div>
                <div>
                    <Link href="/profile/edit" title="edit">
                        <FiEdit />
                    </Link>
                </div>
            </div>
            <Fieldset.Root size="lg">
                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label className="uppercase text-gray-500 text-[13px]">
                            Name
                        </Field.Label>
                        <div className="font-medium">
                            {auth.user.name}
                        </div>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label className="uppercase text-gray-500 text-[13px]">
                            Email
                        </Field.Label>
                        <div className="font-medium">
                            {auth.user.email}
                        </div>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Phone</Field.Label>
                        <div className="font-medium">
                            {auth.user.phone}
                        </div>
                    </Field.Root>
                </Fieldset.Content>
            </Fieldset.Root>
        </div>
    </SiteLayout>
}
