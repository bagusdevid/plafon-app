import {Head} from "@inertiajs/react";
import AdvancedMenu from "@/Components/Profile/AdvancedMenu.jsx";
import Menus from "@/Components/Menus.jsx";
import { Progress, Badge } from "@chakra-ui/react"
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";

export default function SiteLayoutV2({title = 'Default', children}) {

    const {flashMessage, site, auth} = useContext(LayoutContext)

    return <>
        <Head title={title} />
        <div className="bg-neutral-200 w-full lg:w-[600px] mx-auto relative">
            <div className="bg-[url('/images/Emirates_Boeing777.jpg')] relative bg-cover bg-center pt-3 px-5 h-[240px] bg-neutral-200 text-white">
                <div className="absolute left-0 top-0 w-full h-full z-10 bg-black/40">
                </div>
                <div className="flex justify-between w-full relative z-20 mb-5">
                    <div className="w-[300px]">
                        <div className="flex justify-between mb-3">
                            <div className="font-bold">
                                mugi
                            </div>
                            <div>
                                <Badge variant="solid" colorPalette="blue">
                                    VIP0
                                </Badge>
                            </div>
                        </div>
                        <div className="mb-1">
                            <Progress.Root>
                                <Progress.Track>
                                    <Progress.Range />
                                </Progress.Track>
                            </Progress.Root>
                        </div>
                        <div className="text-[13px] text-white/60">
                            Masih 1000000 liter dari mencapai tingkat berikutnya
                        </div>
                    </div>
                    <div className="">
                        logo
                    </div>
                </div>
                <div className="relative flex justify-between z-20">
                    <div>
                        <div>Balance</div>
                        <div>IDR 0</div>
                    </div>
                    <div>
                        <div>Credit score</div>
                        <div>0</div>
                    </div>
                </div>
            </div>
            <div className="pb-[90px] relative z-20 min-h-[calc(100vh_-_184px)] -mt-14 mx-3 bg-white rounded-tl-3xl rounded-tr-3xl">
                {children}
            </div>
            {auth.user ? <Menus /> : ''}
        </div>
    </>
}
