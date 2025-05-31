import {Image} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa6";
import {MdOutlineFileUpload} from "react-icons/md";
import {IoMdCamera} from "react-icons/io";

export default function Avatar({user, isEditable = false, ...rest}) {
    if(user.photo) {
        return <div className="relative mx-auto w-[120px] h-[120px] rounded-full overflow-hidden">
            <div className="mx-auto w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                    src={user.photo_300_path}
                    w="100%"
                    alt=""
                />
            </div>
            {isEditable ? <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <FileButton {...rest} />
            </div> : ''}
        </div>
    }

    return <div className="relative mx-auto w-[120px] h-[120px] rounded-full overflow-hidden">
        <div className="flex items-center justify-center text-[46px] w-[120px] h-[120px] bg-white rounded-full">
            <FaUser />
        </div>
        {isEditable ? <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <FileButton {...rest} />
        </div> : ''}
    </div>
}

function FileButton({...rest}) {
    return <>
        <input type="file" id="myidfile" hidden {...rest} />
        <label htmlFor="myidfile" className="block cursor-pointer bg-neutral-200 rounded-full py-1 px-1">
            <MdOutlineFileUpload className="text-[20px]" />
        </label>
    </>
}
