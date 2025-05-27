import SiteLayoutV2 from "@/Layouts/SiteLayoutV2.jsx";
import { Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import {thousandSeparator} from "@/Utils/thousandSeparator.jsx";
import {Marquee} from "@devnomic/marquee";
// import "@devnomic/marquee/dist/index.css";

export default function Main({lastTopup}) {
    return <SiteLayoutV2 title="Dompet">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <Tabs.Root defaultValue="members" fitted>
                <Tabs.List>
                    <Tabs.Trigger value="members">
                        <LuUser />
                        Rechard records
                    </Tabs.Trigger>
                    <Tabs.Trigger value="projects">
                        <LuFolder />
                        Transaction records
                    </Tabs.Trigger>
                    <Tabs.Trigger value="tasks">
                        <LuSquareCheck />
                        Bank
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="members">
                    <div className="max-h-[400px] overflow-hidden">
                        <Marquee direction="up" className="gap-[0.3rem]" innerClassName="gap-[0.3rem] [--gap:0.3rem]">
                            {lastTopup.map((lt, key) => {
                                return <LastCredit key={key} amount={lt.amount} name={lt.name} />
                            })}
                        </Marquee>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="projects">Manage your projects</Tabs.Content>
                <Tabs.Content value="tasks">
                    Manage your tasks for freelancers
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </SiteLayoutV2>
}

function LastCredit({name, amount}) {
    return <div className="flex gap-2 border border-solid border-red-500">
        <div className="font-semibold">{name}</div>
        <div>{thousandSeparator(amount)}</div>
    </div>
}
