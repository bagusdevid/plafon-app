import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {IoSkullOutline} from "react-icons/io5";
import {Button, Field, Fieldset, Input, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Link, useForm} from "@inertiajs/react";

export default function ResetPassword({token,email}) {

    const initialValues = {
        token,
        email,
        password: '',
        password_confirmation: ''
    }
    const dataForm = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        dataForm.post('/login')
    }

    return <SiteLayout title="Reset password">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <div className="mb-10 text-center">
                <div className="text-[74px] mb-2">
                    <IoSkullOutline className="mx-auto text-red-500" />
                </div>
                <div>
                    <h2 className="text-[28px]">
                        <span className="font-light">bagus</span>
                        <span className="font-bold">dev.</span>
                    </h2>
                </div>
            </div>
            <Fieldset.Root size="lg">
                <form onSubmit={handleSubmit}>
                    <Fieldset.Content>
                        <CustomField label="Email" invalid={dataForm.errors.email} isRequired>
                            <Input
                                value={dataForm.data.email}
                                onChange={(e) => dataForm.setData('email', e.target.value)}
                                type="email"
                                size="xl"
                                placeholder="Masukkan email Anda"
                                className="w-full"
                                disabled={dataForm.processing}
                            />
                            {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
                        </CustomField>
                        <CustomField label="Password" invalid={dataForm.errors.password} isRequired>
                            <Input
                                value={dataForm.data.password}
                                onChange={(e) => dataForm.setData('password', e.target.value)}
                                type="password"
                                size="xl"
                                placeholder="Masukkan password"
                                disabled={dataForm.processing}
                            />
                            {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                        </CustomField>
                        <CustomField label="Ulangi Password" invalid={dataForm.errors.password_confirmation} isRequired>
                            <Input
                                value={dataForm.data.password_confirmation}
                                onChange={(e) => dataForm.setData('password_confirmation', e.target.value)}
                                type="password"
                                size="xl"
                                placeholder="Konfirmasi password"
                                disabled={dataForm.processing}
                            />
                            {dataForm.errors.password_confirmation ? <Field.ErrorText>{dataForm.errors.password_confirmation}</Field.ErrorText> : ''}
                        </CustomField>
                    </Fieldset.Content>

                    <Stack mt={5}>
                        <Button
                            size="xl"
                            type="submit"
                            alignSelf="flex-start"
                            className="w-full"
                            _disabled={{
                                bgColor: "#ddd",
                                color: "#aaa",
                                opacity: 1
                            }}
                            disabled={dataForm.processing}
                        >
                            Login
                        </Button>
                        <div className="flex justify-between">
                            <Link href="/forgot-password" className="text-[13px] text-red-700">
                                Forgot password
                            </Link>
                            <Link href="/RegisterOld" className="text-[13px]">
                                Sign Up
                            </Link>
                        </div>
                    </Stack>
                </form>
            </Fieldset.Root>
        </div>
    </SiteLayout>
}
