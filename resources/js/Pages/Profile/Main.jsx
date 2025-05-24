import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset, Menu, Button, Portal, Image} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link} from "@inertiajs/react";
import {CiEdit} from "react-icons/ci";
import {FiEdit} from "react-icons/fi";
import {HiDotsVertical, HiOutlineDotsVertical} from "react-icons/hi";
import Heading from "@/Components/Profile/Heading.jsx";

export default function Main() {

    const {auth} = useContext(LayoutContext)

    // console.log(auth.user)

    return <SiteLayout title="Profile">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <Heading />
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
