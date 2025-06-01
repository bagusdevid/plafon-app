import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaChevronLeft, FaTelegram, FaWhatsapp} from "react-icons/fa6";
import {Link} from "@inertiajs/react";
import {IoLogoWhatsapp} from "react-icons/io";

export default function Main({customer_service}) {

    const customerservice = [
        {icon: <FaTelegram />, label: 'Customer Service 1', url: ''},
        {icon: <FaTelegram />, label: 'Customer Service 2', url: ''}
    ]

    return <SiteLayout
        leftNav={<Link href="/profile"><FaChevronLeft /></Link>}
        title="Customer Service">
        <div className="bg-neutral-200 px-5 py-5 min-h-screen">
            <ul className="bg-white rounded-md">
                {customer_service.map((cs, key) => {
                    const borderB = key + 1 < customerservice.length ? 'border-b border-solid border-neutral-200' : '';
                    const url = cs.telegram ? `https://t.me/${cs.account}` : `https://wa.me/${cs.account}`;

                   return <li key={key}>
                       <Link href={url} target="_blank" className={`flex items-center gap-2 py-3 px-5 ${borderB}`}>
                           <div>
                               {cs.service === 'telegram' ? <FaTelegram className="text-[20px] text-[#24A1DE]" /> : <IoLogoWhatsapp className="text-[20px] text-[#128C7E]" />}
                           </div>
                           <div>
                               {cs.account}
                           </div>
                       </Link>
                   </li>
                })}
            </ul>
        </div>
    </SiteLayout>
}
