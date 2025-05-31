import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {Link} from "@inertiajs/react";
import { Tabs } from "@chakra-ui/react"
import {FaChevronLeft} from "react-icons/fa6";
import {FiFileText} from "react-icons/fi";

export default function Main({banks, qr}) {

    // console.log(JSON.stringify(qr));

    return <SiteLayout
        leftNav={<Link href="/"><FaChevronLeft /></Link>}
        title="Top Up"
    >
        <Tabs.Root
            defaultValue="rekening"
            variant="enclosed"
            className=""
        >
            <Tabs.List
                className="w-full rounded-none px-5 py-3"
            >
                <Tabs.Trigger value="rekening">
                    Rekening
                </Tabs.Trigger>
                <Tabs.Trigger value="qrcode">
                    QR Code
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
                value="rekening"
                className="px-5 py-8"
            >
                {banks.map((bank, key) => {
                    return <div className="border border-solid border-neutral-200 px-5 py-3 flex gap-3 rounded-md mb-5">
                        <div className="pt-1 text-gray-500">
                            <FiFileText />
                        </div>
                        <div>
                            <h3 className="font-bold">
                                {bank.bank_name}
                            </h3>
                            <div className="text-sm">
                                {bank.bank_acc_no}
                            </div>
                            <div className="text-sm">
                                a.n. {bank.bank_acc_name}
                            </div>
                        </div>
                    </div>
                })}
            </Tabs.Content>
            <Tabs.Content value="qrcode">
                <div className="px-5 lg:px-10 pt-5 lg:pt-10">
                    <div className="mb-10">
                        We use this QR Code to make payment or top-up, make sure your bank have active this feature.
                    </div>
                    {/*<div dangerouslySetInnerHTML={{ __html: qr }} />*/}
                    <div className="w-[70%] mx-auto">
                        <img src="/images/bagusdigital-qr.jpg" alt="" />
                    </div>
                </div>
            </Tabs.Content>
        </Tabs.Root>

    </SiteLayout>
}
