import {Image} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa6";

export default function Avatar({user}) {
    if(user.photo) {
        return <div className="mx-auto w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
                src={user.photo_300_path}
                w="100%"
                alt=""
            />
        </div>
    }

    return <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-white rounded-full">
        <FaUser />
    </div>
}
