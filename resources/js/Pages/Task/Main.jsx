import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaMapLocation, FaPlaneDeparture} from "react-icons/fa6";
import {
    CheckboxCard,
    CheckboxGroup,
    Float,
    Icon,
    SimpleGrid,
} from "@chakra-ui/react"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"
import CountDown, {Times} from "@/Components/CountDown/index.jsx";
import CountdownTimer from "@/Components/CountdownTimer.jsx";
import {IoMdAirplane} from "react-icons/io";
import {ImAirplane, ImLocation} from "react-icons/im";
import {Link} from "@inertiajs/react";

export default function Main({code}) {

    const challenges = [
        {icon: <FaPlaneDeparture />},
        {icon: <IoMdAirplane />},
        {icon: <ImAirplane />},
        {icon: <FaMapLocation />},
        {icon: <ImLocation />},
    ];

    return <SiteLayout title="Tugas">
        <div className="pb-[50px]">
            <div className="bg-neutral-200 mb-5 flex items-center justify-center text-[70px] h-[300px]">
                <FaPlaneDeparture />
            </div>
            <div className="flex justify-between mb-5 px-5 py-5 bg-neutral-100">
                <div className="text-[20px] font-semibold">
                    {code}
                </div>
                <div>
                    {/*<Times minutes={5} />*/}
                </div>
            </div>
            <div className="px-5 mb-5">
                <Mistery />
            </div>
            <div className="px-5">
                <div className="flex flex-wrap gap-3">
                    {challenges.map((ch, key) => {
                        return <Link href="#" key={key} className="bg-neutral-200 flex items-center justify-center text-[55px] py-12 w-[calc(33.3333%_-_10px)]">
                            {ch.icon}
                        </Link>
                    })}
                </div>
            </div>
        </div>
        <div className="bg-neutral-200 px-5 py-5 fixed bottom-[50px] z-10 left-1/2 transform -translate-x-1/2 w-full lg:w-[600px]">
            <div className="flex">
                <div>
                    Multiple
                </div>
                <div className="flex-1">
                    <input type="text" placeholder="multiple" />
                </div>
                <div>
                    Balance
                </div>
            </div>
        </div>
    </SiteLayout>
}

const Mistery = () => {
    return (
        <CheckboxGroup defaultValue={["Guest"]}>
            <SimpleGrid minChildWidth="100px" gap="2">
                {items.map((item) => (
                    <CheckboxCard.Root align="center" key={item.label}>
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                            <CheckboxCard.Content>
                                <Icon fontSize="2xl" mb="2">
                                    {item.icon}
                                </Icon>
                                <CheckboxCard.Label>{item.label}</CheckboxCard.Label>
                            </CheckboxCard.Content>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                ))}
            </SimpleGrid>
        </CheckboxGroup>
    )
}

const items = [
    { icon: <HiShieldCheck />, label: "Hotels", description: "Give full access" },
    { icon: <HiUser />, label: "Car Rentals", description: "Give limited access" },
    {
        icon: <HiGlobeAlt />,
        label: "Tours & activities",
        description: "Give read-only access",
    },
    { icon: <HiLockClosed />, label: "Airport transfers", description: "No access" },
]
