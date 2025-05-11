import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link} from "@inertiajs/react";
import {CiEdit} from "react-icons/ci";
import {FiEdit} from "react-icons/fi";

export default function Main() {

    const {auth} = useContext(LayoutContext)

    return <SiteLayout title="Profile">
        <div className="border-b border-solid border-b-neutral-300 pb-8">
            <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-neutral-200 rounded-full">
                <FaUser />
            </div>
        </div>
        <div className="flex justify-between items-center py-2 px-2 bg-neutral-100 mb-8">
            <div>
                sa
            </div>
            <div>
                <Link href="/profile/edit">
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
    </SiteLayout>
}
