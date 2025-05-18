import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCheck, FaMinus, FaUser} from "react-icons/fa6";
import {Button, Field, Fieldset, Input, Menu, Portal} from "@chakra-ui/react";
import {HiDotsVertical} from "react-icons/hi";
import {Link, useForm} from "@inertiajs/react";
import {FiEdit} from "react-icons/fi";
import {CustomField} from "@/Components/Forms/CustomField.jsx";

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

    return <SiteLayout title="Ubah password">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <div className="flex justify-between border-b border-solid border-b-neutral-300 pb-8">
                <div></div>
                <div className="flex items-center justify-center text-[46px] mx-auto w-[120px] h-[120px] bg-neutral-200 rounded-full">
                    <FaUser />
                </div>
                <div>
                    <Menu.Root positioning={{ placement: "bottom-end" }}>
                        <Menu.Trigger asChild>
                            <Button size="sm" unstyled className="cursor-pointer py-1 pl-2">
                                <HiDotsVertical />
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item>
                                        <Link href="#">
                                            Change password
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link href="#">
                                            Change photo
                                        </Link>
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
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
                    <CustomField label="Password saat ini" invalid={dataForm.errors.current_password} isRequired>
                        <Input
                            value={dataForm.data.current_password}
                            onChange={(e) => dataForm.setData('current_password', e.target.value)}
                            type="password"
                            placeholder="Masukkan password saat ini"
                        />
                        {dataForm.errors.current_password ? <Field.ErrorText>{dataForm.errors.current_password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Password baru" invalid={dataForm.errors.password} isRequired>
                        <Input
                            value={dataForm.data.password}
                            onChange={(e) => dataForm.setData('password', e.target.value)}
                            type="password"
                            placeholder="Masukkan password baru"
                        />
                        {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                    </CustomField>
                    <CustomField label="Ulangi password baru" invalid={dataForm.errors.password_confirmation} isRequired>
                        <Input
                            value={dataForm.data.password_confirmation}
                            onChange={(e) => dataForm.setData('password_confirmation', e.target.value)}
                            type="password"
                            placeholder="Masukkan kembali password baru"
                        />
                        {dataForm.errors.password_confirmation ? <Field.ErrorText>{dataForm.errors.password_confirmation}</Field.ErrorText> : ''}
                    </CustomField>
                </Fieldset.Content>
            </Fieldset.Root>
            </form>
        </div>
    </SiteLayout>
}
