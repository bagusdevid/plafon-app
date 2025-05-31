import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Button, Field, Input, NativeSelect} from "@chakra-ui/react";
import {Link} from "@inertiajs/react";
import {FaChevronLeft} from "react-icons/fa6";
import {useContext, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {thousandSeparator} from "@/Utils/thousandSeparator.jsx";
import AccBank from "@/Components/AccBank.jsx";

export default function Main({bank}) {

    const {auth} = useContext(LayoutContext)

    return <SiteLayout
        leftNav={<Link href="/profile"><FaChevronLeft /></Link>}
        title="Withdraw"
    >
        <div className="text-center py-10">
            <div className="font-bold text-[28px]">
                {thousandSeparator(auth.user.balance)}
            </div>
            <div className="text-sm text-gray-500">
                Account balance
            </div>
        </div>
        <div className="px-5 mb-5">
            <CustomField label="Jumlah">
                <Input
                    type="text"
                    size="lg"
                    placeholder="Masukkan jumlah yang akan ditarik"
                />
            </CustomField>
        </div>
        <div className="px-5">
            <AccBank bank={bank} />
            <div className="mt-5">
                <Button type="button" colorPalette="red" className="w-full">
                    Withdraw
                </Button>
            </div>
        </div>
    </SiteLayout>
}
