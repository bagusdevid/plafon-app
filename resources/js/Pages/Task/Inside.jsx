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
import {Link} from "@inertiajs/react";
import {Times} from "@/Components/CountDown/index.jsx";
import {useEffect, useState} from "react";

export default function Inside({task, code}) {

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [taskSession, setTaskSession] = useState(true)
    const [taskCode, setTaskCode] = useState(null)

    useEffect(() => {
        if (taskSession) {
            axios.post('/task/getTaskCode')
                .then(res => {
                    setTaskCode(res.data.results)
                    setTaskSession(false)
                })
                .catch(err => console.log(err))
        }

        return () => setTaskSession(false)
    }, [taskSession])

    return <SiteLayout title="Tugas">
        <div className="pb-[50px]">
            <div className="bg-neutral-200 mb-5 flex items-center justify-center text-[70px] max-h-[350px] overflow-hidden">
                <img src={task.photo_300_path} alt="" className="w-full" />
            </div>
            <div className="flex justify-between mb-5 px-5 py-5 bg-neutral-100">
                <div className="text-[20px] font-semibold">
                    {taskCode ? taskCode : ''}
                </div>
                <div>
                    <Times minutes={1} />
                </div>
            </div>
            <div className="px-5 mb-5">
                <Mistery />
            </div>
            <div className="px-5">
                <div className="flex flex-wrap gap-3">
                    {task.thumbs_inside_path && task.thumbs_inside_path.map((tip, key) => {
                        return <Link href="#" key={key} className="bg-neutral-200 flex w-[calc(50%_-_10px)]">
                            <img src={tip} alt="" className="w-full !h-auto" />
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

    const icons = [<HiShieldCheck className="text-2xl" />, <HiGlobeAlt className="text-2xl" />, <HiUser className="text-2xl" />, <HiLockClosed className="text-2xl" />]

    return (
        <CheckboxGroup defaultValue={["Guest"]}>
            <SimpleGrid minChildWidth="100px" gap="2">
                {items.map((item, k) => (
                    <CheckboxCard.Root align="center" key={item.label}>
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                            <CheckboxCard.Content>
                                {icons[k]}
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
