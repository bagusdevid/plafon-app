import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCheck, FaMinus, FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset, Button} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {FiEdit} from "react-icons/fi";
import {CustomField} from "@/Components/Forms/CustomField.jsx";

export default function Edit() {

    const {auth} = useContext(LayoutContext)

    const initialValues = {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone
    }
    const dataForm = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault();
        dataForm.put(`/profile/${auth.user.id}`)
    }

    return <SiteLayout title="Profile">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <div className="border-b border-solid border-b-neutral-300 pb-8">
                <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-neutral-200 rounded-full">
                    <FaUser />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center py-2 px-2 bg-neutral-100 mb-8">
                <div>
                    <Link href="/profile" className="text-red-500">
                        <FaMinus />
                    </Link>
                </div>
                <div>
                    <Button type="submit" variant="ghost" size="sm" className="text-green-600">
                        <FaCheck />
                    </Button>
                </div>
            </div>
            <Fieldset.Root size="lg">
                <Fieldset.Content>
                    <CustomField label="Name" invalid={dataForm.errors.name} isRequired>
                        <Input
                            value={dataForm.data.name}
                            onChange={(e) => dataForm.setData('name', e.target.value)}
                            type="text"
                            placeholder="Masukkan nama Anda"
                            className="w-full"
                        />
                        {dataForm.errors.name ? <Field.ErrorText>{dataForm.errors.name}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Email" invalid={dataForm.errors.email} isRequired>
                        <Input
                            value={dataForm.data.email}
                            onChange={(e) => dataForm.setData('email', e.target.value)}
                            type="text"
                            placeholder="Masukkan nama Anda"
                            className="w-full"
                        />
                        {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Phone">
                        <Input
                            value={dataForm.data.phone}
                            onChange={(e) => dataForm.setData('phone', e.target.value)}
                            type="text"
                            placeholder="Masukkan nama Anda"
                            className="w-full"
                        />
                    </CustomField>
                </Fieldset.Content>
            </Fieldset.Root>
            </form>
        </div>
    </SiteLayout>
}
