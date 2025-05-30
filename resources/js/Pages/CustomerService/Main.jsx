import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaTelegram} from "react-icons/fa6";

export default function Main() {

    const customerservice = [
        {icon: <FaTelegram />, label: 'Customer Service 1', url: ''},
        {icon: <FaTelegram />, label: 'Customer Service 2', url: ''}
    ]

    return <SiteLayout title="Customer Service">
        <div className="bg-neutral-200 px-5 py-5 min-h-screen">
            <ul className="bg-white rounded-md">
                {customerservice.map((cs, key) => {

                    const borderB = key + 1 < customerservice.length ? 'border-b border-solid border-neutral-200' : '';

                   return <li className={`flex items-center gap-2 py-3 px-5 ${borderB}`}>
                       <div>
                           {cs.icon}
                       </div>
                       <div>
                           {cs.label}
                       </div>
                   </li>
                })}
            </ul>
        </div>
    </SiteLayout>
}
