import SiteLayoutV2 from "@/Layouts/SiteLayoutV2.jsx";
import {Button, Input, Tabs, NativeSelect, Field} from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import {thousandSeparator} from "@/Utils/thousandSeparator.jsx";
import {Marquee} from "@devnomic/marquee";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {useContext, useState} from "react";
import {useForm} from "@inertiajs/react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import AccBank from "@/Components/AccBank.jsx";
import {LayoutContext} from "@/Layouts/Layout.jsx";
// import "@devnomic/marquee/dist/index.css";

export default function Main({lastTopup, bank}) {

    // console.log(lastTopup)

    const {auth} = useContext(LayoutContext)

    return <SiteLayoutV2 title="Dompet">
        <div className="px-5 lg:px-10 pt-5 lg:pt-5">
            <Tabs.Root defaultValue="members" fitted>
                <Tabs.List>
                    <Tabs.Trigger value="members" className="px-0 h-auto">
                        <div className="py-1">
                            <div className="">
                                <LuUser className="mx-auto text-[20px]" />
                            </div>
                            <div>
                                Recharge records
                            </div>
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="projects" className="px-0 h-auto">
                        <div className="py-1 text-center">
                            <div className="">
                                <LuFolder className="mx-auto text-[20px]" />
                            </div>
                            <div>
                                Transaction records
                            </div>
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="tasks" className="px-0 h-auto">
                        <div className="py-1">
                            <div className="">
                                <LuSquareCheck className="mx-auto text-[20px]" />
                            </div>
                            <div>
                                Bank
                            </div>
                        </div>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="members">
                    <div className="max-h-[400px] overflow-hidden">
                        <Marquee direction="up" className="gap-[0.3rem]" innerClassName="gap-[0.3rem] [--gap:0.3rem]">
                            {lastTopup.map((lt, key) => {
                                return <LastCredit
                                    key={key}
                                    amount={lt.amount}
                                    name={lt.name}
                                    dt={lt.dt}
                                />
                            })}
                        </Marquee>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="projects">
                    Manage your projects
                </Tabs.Content>
                <Tabs.Content value="tasks">

                    <AccBank bank={bank} />

                </Tabs.Content>
            </Tabs.Root>
        </div>
    </SiteLayoutV2>
}

function LastCredit({name, amount, dt}) {
    return <div className="flex justify-between items-center px-3 py-2 bg-neutral-200 rounded-md">
        <div className="">
            <div className="font-semibold">
                {name}
            </div>
            <div className="text-sm text-gray-700">
                {dt}
            </div>
        </div>
        <div>
            {thousandSeparator(amount)}
        </div>
    </div>
}
