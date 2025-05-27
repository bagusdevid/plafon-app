import SiteLayoutV2 from "@/Layouts/SiteLayoutV2.jsx";
import { Accordion, Span } from "@chakra-ui/react"
import {LuCrown} from "react-icons/lu";

export default function Main() {

    const items = [
        {value: '0', title: 'VIP0', text: 'Rp 0', fromColor: 'from-blue-700', toColor: 'to-blue-400'},
        {value: '2', title: 'VIP2', text: 'Rp 1500000', fromColor: 'from-lime-700', toColor: 'to-lime-400'},
        {value: '1', title: 'VIP1', text: 'Rp 1000000', fromColor: 'from-red-700', toColor: 'to-red-400'},
        {value: '3', title: 'VIP3', text: 'Rp 2000000', fromColor: 'from-teal-700', toColor: 'to-teal-400'},
        {value: '4', title: 'VIP4', text: 'Rp 2500000', fromColor: 'from-orange-700', toColor: 'to-orange-400'},
    ]
    return <SiteLayoutV2 title="VIP">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <Accordion.Root multiple defaultValue={["b"]} className="">
                {items.map((item, index) => (
                    <Accordion.Item key={index} value={item.value} className={`relative overflow-hidden bg-linear-to-bl border-b-0 ${item.fromColor} ${item.toColor} mb-2 rounded-md`}>
                        <Accordion.ItemTrigger className="pl-5 pr-1 text-white cursor-pointer">
                            <Span flex="1">{item.title}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent className="min-h-[120px] px-5 flex items-center relative">
                            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
                        </Accordion.ItemContent>
                        <LuCrown className="absolute -top-5 right-16 text-[212px] text-white/20" />
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    </SiteLayoutV2>
}
