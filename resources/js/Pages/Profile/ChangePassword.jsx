import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCheck, FaChevronLeft, FaMinus, FaUser} from "react-icons/fa6";
import {Button, Field, Fieldset, Input, Menu, Portal} from "@chakra-ui/react";
import {HiDotsVertical} from "react-icons/hi";
import {Link, useForm} from "@inertiajs/react";
import {FiEdit} from "react-icons/fi";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import Heading from "@/Components/Profile/Heading.jsx";
import {IoChevronBack} from "react-icons/io5";
import {PasswordInput} from "@/Components/ui/password-input.jsx";

export default function ChangePassword() {

    const initialValue = {
        current_password: '',
        password: '',
        password_confirmation: '',
    }
    const dataForm = useForm(initialValue)

    const handleSubmit = (e) => {
        e.preventDefault();
        dataForm.put('/profile/change-password')
    }

    return <form onSubmit={handleSubmit}>
        <SiteLayout
        title="Ubah password"
        leftNav={<Link href="/profile/edit"><FaChevronLeft /></Link>}
        rightNav={<Button type="submit" size="xs" colorPalette="green">Simpan</Button>}
    >
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <Fieldset.Root size="lg">
                <Fieldset.Content>
                    <CustomField label="Password saat ini" invalid={dataForm.errors.current_password} isRequired>
                        <PasswordInput
                            value={dataForm.data.current_password}
                            onChange={(e) => dataForm.setData('current_password', e.target.value)}
                            placeholder="Masukkan password saat ini"
                        />
                        {dataForm.errors.current_password ? <Field.ErrorText>{dataForm.errors.current_password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Password baru" invalid={dataForm.errors.password} isRequired>
                        <PasswordInput
                            value={dataForm.data.password}
                            onChange={(e) => dataForm.setData('password', e.target.value)}
                            placeholder="Masukkan password baru"
                        />
                        {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Ulangi password baru" invalid={dataForm.errors.password_confirmation} isRequired>
                        <PasswordInput
                            value={dataForm.data.password_confirmation}
                            onChange={(e) => dataForm.setData('password_confirmation', e.target.value)}
                            placeholder="Masukkan kembali password baru"
                        />
                        {dataForm.errors.password_confirmation ? <Field.ErrorText>{dataForm.errors.password_confirmation}</Field.ErrorText> : ''}
                    </CustomField>
                </Fieldset.Content>
            </Fieldset.Root>
        </div>
    </SiteLayout>
    </form>
}
