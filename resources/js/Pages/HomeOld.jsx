import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {IoSkullOutline} from "react-icons/io5";
import {FaDollarSign, FaUser} from "react-icons/fa6";
import {FaHistory} from "react-icons/fa";
import {Link} from "@inertiajs/react";
import {Button} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import CountdownTimer from "@/Components/CountdownTimer.jsx";
import Marquee from "react-fast-marquee";
import {thousandSeparator} from "@/Utils/thousandSeparator.jsx";

export default function HomeOld({donaturs}) {

    // console.log(donaturs)

    const {auth, site} = useContext(LayoutContext)

    const forYous = [
        {icon: <FaUser />, url: '/profile', caption: 'Profile'},
        {icon: <FaDollarSign />, url: '/top-up', caption: 'Top Up'},
        {icon: <FaHistory />, url: '/', caption: 'History'},
    ];

    return <SiteLayout title="Home">
        <div className="mb-5 lg:mb-10 py-1 bg-red-900 flex items-center">
            <div className="text-white px-3 text-[14px] font-bold">
                Last TopUp
            </div>
            <Marquee className="flex-1 py-2 bg-white rounded-tl-full rounded-bl-full">
                {donaturs.map((donatur, key) => {
                    return <Donatur key={key} name={donatur.name} amount={donatur.amount} />
                })}
            </Marquee>
        </div>

        <div className="px-5 lg:px-10">
            <div className="mb-10 flex bg-red-500 rounded-md px-3 py-2">
                <div className="flex-1">
                    <h3 className="text-white font-bold mb-3">Penawaran terbatas</h3>
                    <p className="mb-3 text-white/90 text-[13px]">
                        TopUp sebelum <strong>25 Mei 2025</strong> dan dapatkan extra bonus.
                    </p>
                    <Button size="xs" variant="surface" colorPalette="red" rounded="full">
                        Top Up
                    </Button>
                </div>
                <div className="w-[200px]">
                    <CountdownTimer />
                </div>
            </div>
            <div className="flex gap-5 border-b border-solid border-b-neutral-300 pb-8 mb-8">
                <div className="w-[160px]">
                    <div className="text-center mx-auto text-[70px]">
                        <IoSkullOutline className="mx-auto" />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="mb-5">
                        <h2 className="font-bold">{auth.user.name}</h2>
                        <div className="text-sm text-gray-500">{site.name}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <div className="uppercase text-gray-700 text-[13px]">Balance</div>
                            <div className="font-semibold">IDR 400,000.00</div>
                        </div>
                        <div className="flex-1">
                            <div className="uppercase text-gray-700 text-[13px]">Kredit</div>
                            <div>261</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-10 pb-5 border-b border-solid border-neutral-300">
                <div className="font-semibold mb-5">
                    For You
                </div>
                <div className="flex gap-5">
                    {forYous.map((fy, key) => {
                        return <Link href={fy.url} className="text-center group duration-300" key={key}>
                            <div className="px-7 py-5 border border-solid border-neutral-300 rounded-xl mb-1 group-hover:border-red-300 group-hover:text-red-500">
                                {fy.icon}
                            </div>
                            <div className="text-[13px] group-hover:text-red-500">
                                {fy.caption}
                            </div>
                        </Link>
                    })}
                </div>
            </div>
            <div className="mb-10 pb-5 border-b border-solid border-neutral-300">
                <div className="font-semibold mb-5">
                    Top Up
                </div>
                <div className="flex gap-5 justify-between items-center">
                    <div className="w-1/2">
                        Make sure you don't miss what benefit if you put your money to us.
                    </div>
                    <div>
                        <Button as={Link} href="/top-up">
                            Top Up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </SiteLayout>
}

function Donatur({name, amount}) {
    return <div className="flex gap-2 px-5">
        <div className="font-semibold">{name}</div>
        <div>{thousandSeparator(amount)}</div>
    </div>
}
