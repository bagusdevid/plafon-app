import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {IoSkullOutline} from "react-icons/io5";
import {FaDollarSign, FaUser} from "react-icons/fa6";
import {FaHistory} from "react-icons/fa";
import {Link} from "@inertiajs/react";
import {Button} from "@chakra-ui/react";

export default function Home() {

    const forYous = [
        {icon: <FaUser />, url: '/profile', caption: 'Profile'},
        {icon: <FaDollarSign />, url: '/top-up', caption: 'Top Up'},
        {icon: <FaHistory />, url: '/', caption: 'History'},
    ];

    return <SiteLayout title="Home">
        <div className="flex gap-5 border-b border-solid border-b-neutral-300 pb-8 mb-8">
            <div className="w-[160px]">
                <div className="text-center mx-auto text-[70px]">
                    <IoSkullOutline className="mx-auto" />
                </div>
            </div>
            <div className="flex-1">
                <div className="mb-5">
                    <h2 className="font-bold">Tubagus GP</h2>
                    <div className="text-sm text-gray-500">BagusDev club</div>
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
                    return <Link href={fy.url} className="text-center group duration-300">
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
    </SiteLayout>
}
