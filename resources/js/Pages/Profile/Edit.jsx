import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCheck, FaChevronLeft, FaChevronRight, FaMinus, FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset, Editable, Button} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {FiEdit} from "react-icons/fi";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import Avatar from "@/Components/Profile/Avatar.jsx";
import {IoChevronForward} from "react-icons/io5";

export default function Edit() {

    const {auth, site} = useContext(LayoutContext)
    // console.log(auth)

    const initialValues = {
        id: auth.user.id,
        name: auth.user.name,
        username: auth.user.username,
        email: auth.user.email,
        phone: auth.user.phone
    }
    const {data, setData, post, put, errors} = useForm(initialValues)

    const editables = [
        {label: 'Nama lengkap', keyValue: 'name'},
        {label: 'Username', keyValue: 'username'},
        {label: 'Email', keyValue: 'email'},
        {label: 'Telepon', keyValue: 'phone'},
    ]

    const handlePersonalChange = (value, field) => {
        // console.log(value, field)
        axios.put(`/profile/changeField/${initialValues.id}`, {[field]: value, field, value})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/profile/${auth.user.id}`)
    }

    const handleAvatarChange = (photo) => {
        // console.log(photo)
        axios.post('/profile/change-avatar', {photo}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return <SiteLayout
        leftNav={<Link href="/profile"><FaChevronLeft /></Link>}
        title="Personal Info"
    >
        <div className="bg-neutral-200 flex gap-5 items-center py-5 px-7">
            <div className="flex-1">
                <Avatar isEditable user={auth.user} onChange={(e) => handleAvatarChange(e.target.files[0])} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold">
                    {data.username}
                </h3>
                <div className="text-sm">
                    {site.name}
                </div>
                <div className="mt-5">
                    <div className="flex gap-3">
                        <div className="uppercase text-neutral-500 text-sm">
                            Credit
                        </div>
                        <div className="font-bold">120</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="uppercase text-neutral-500 text-sm">
                            Balance
                        </div>
                        <div className="font-bold">
                            220000
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-5">
            <ul>
                {editables.map((edit, key) => {
                    return <li key={key} className="py-3 flex items-center justify-between border-b border-solid border-b-neutral-200">
                        <div>
                            {edit.label}
                        </div>
                        <div>
                            <Editable.Root
                                textAlign="end"
                                onClick={(e) => e.stopPropagation()}
                                value={data[edit.keyValue]}
                                onChange={(e) => setData(edit.keyValue, e.target.value)}
                                onBlur={(e) => handlePersonalChange(e.target.value, edit.keyValue)}
                            >
                                <Editable.Preview />
                                <Editable.Input />
                            </Editable.Root>
                        </div>
                    </li>
                })}
                <li className="border-b border-solid border-b-neutral-200">
                    <Link href="/profile/change-password" className="py-3 flex items-center justify-between">
                        <div>
                            Password
                        </div>
                        <div>
                            <FaChevronRight />
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    </SiteLayout>

    // return <SiteLayout title="Profile">
    //     <div className="px-5 lg:px-10 pt-5 lg:pt-10">
    //         <div className="border-b border-solid border-b-neutral-300 pb-8">
    //             <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-neutral-200 rounded-full">
    //                 <FaUser />
    //             </div>
    //         </div>
    //         <form onSubmit={handleSubmit}>
    //         <div className="flex justify-between items-center py-2 px-2 bg-neutral-100 mb-8">
    //             <div>
    //                 <Link href="/profile" className="text-red-500">
    //                     <FaMinus />
    //                 </Link>
    //             </div>
    //             <div>
    //                 <Button type="submit" variant="ghost" size="sm" className="text-green-600">
    //                     <FaCheck />
    //                 </Button>
    //             </div>
    //         </div>
    //         <Fieldset.Root size="lg">
    //             <Fieldset.Content>
    //                 <CustomField label="Name" invalid={dataForm.errors.name} isRequired>
    //                     <Input
    //                         value={dataForm.data.name}
    //                         onChange={(e) => dataForm.setData('name', e.target.value)}
    //                         type="text"
    //                         placeholder="Masukkan nama Anda"
    //                         className="w-full"
    //                     />
    //                     {dataForm.errors.name ? <Field.ErrorText>{dataForm.errors.name}</Field.ErrorText> : ''}
    //                 </CustomField>
    //                 <CustomField label="Email" invalid={dataForm.errors.email} isRequired>
    //                     <Input
    //                         value={dataForm.data.email}
    //                         onChange={(e) => dataForm.setData('email', e.target.value)}
    //                         type="text"
    //                         placeholder="Masukkan nama Anda"
    //                         className="w-full"
    //                     />
    //                     {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
    //                 </CustomField>
    //                 <CustomField label="Phone">
    //                     <Input
    //                         value={dataForm.data.phone}
    //                         onChange={(e) => dataForm.setData('phone', e.target.value)}
    //                         type="text"
    //                         placeholder="Masukkan nama Anda"
    //                         className="w-full"
    //                     />
    //                 </CustomField>
    //             </Fieldset.Content>
    //         </Fieldset.Root>
    //         </form>
    //     </div>
    // </SiteLayout>
}
