import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCheck, FaMinus, FaUser} from "react-icons/fa6";
import {Field, Input, Fieldset, FileUpload, Button} from "@chakra-ui/react";
import {useContext} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {FiEdit} from "react-icons/fi";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {HiUpload} from "react-icons/hi";
import Heading from "@/Components/Profile/Heading.jsx";

export default function ChangeAvatar() {

    const {auth} = useContext(LayoutContext)

    const initialValues = {
        id: auth.user.id,
        photo: '',
    }
    const dataForm = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault();
        dataForm.post(`/profile/change-avatar`)
    }

    return <SiteLayout title="Profile">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <Heading />
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
                        <CustomField label="Photo" invalid={dataForm.errors.photo} isRequired>
                            <FileUpload.Root
                                value={dataForm.data.photo}
                                onChange={(e) => dataForm.setData('photo', e.target.files[0])}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> Upload file
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List />
                            </FileUpload.Root>
                            {dataForm.errors.photo ? <Field.ErrorText>{dataForm.errors.photo}</Field.ErrorText> : ''}
                        </CustomField>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </div>
    </SiteLayout>
}
