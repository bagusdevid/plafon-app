import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {Button, Field, Fieldset, Alert, Input, Stack} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import {IoSkullOutline} from "react-icons/io5";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";

export default function Register({invitation}) {

    // console.log(invitation)

    const {flashData} = useContext(LayoutContext)

    const [codeErrorMsg, setCodeErrorMsg] = useState(null)

    useEffect(() => {
        setCodeErrorMsg(flashData)
    }, [flashData])

    const initialValues = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        invitation_code: invitation,
        phone: ''
    }
    const dataForm = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        dataForm.post('/register', {
            onSuccess: () => console.log('ok')
        })
    }

    return <SiteLayout title="Register">
        <div>
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
            {codeErrorMsg ? <Alert.Root status="error" className="mb-5">
                <Alert.Indicator />
                <Alert.Title>
                    {codeErrorMsg}
                </Alert.Title>
            </Alert.Root> : ''}
            <Fieldset.Root size="lg">
                <form onSubmit={handleSubmit}>
                    <Fieldset.Content>
                        <CustomField label="Name" invalid={dataForm.errors.name} isRequired>
                            <Input
                                size="xl"
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
                                size="xl"
                                value={dataForm.data.email}
                                onChange={(e) => dataForm.setData('email', e.target.value)}
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="w-full"
                            />
                            {dataForm.errors.email ? <Field.ErrorText>{dataForm.errors.email}</Field.ErrorText> : ''}
                        </CustomField>
                        <CustomField label="Phone" invalid={dataForm.errors.phone}>
                            <Input
                                size="xl"
                                value={dataForm.data.phone}
                                onChange={(e) => dataForm.setData('phone', e.target.value)}
                                type="text"
                                placeholder="Masukkan telepon Anda"
                                className="w-full"
                            />
                        </CustomField>
                        <CustomField label="Password" invalid={dataForm.errors.password} isRequired>
                            <Input
                                size="xl"
                                value={dataForm.data.password}
                                onChange={(e) => dataForm.setData('password', e.target.value)}
                                type="password"
                                placeholder="Masukkan password"
                            />
                            {dataForm.errors.password ? <Field.ErrorText>{dataForm.errors.password}</Field.ErrorText> : ''}
                        </CustomField>
                        <CustomField label="Ulangi password" invalid={dataForm.errors.password_confirmation} isRequired>
                            <Input
                                size="xl"
                                value={dataForm.data.password_confirmation}
                                onChange={(e) => dataForm.setData('password_confirmation', e.target.value)}
                                type="password"
                                placeholder="Ulangi password"
                            />
                            {dataForm.errors.password_confirmation ? <Field.ErrorText>{dataForm.errors.password_confirmation}</Field.ErrorText> : ''}
                        </CustomField>
                        <CustomField label="Invitation Code" invalid={dataForm.errors.invitation_code} isRequired>
                            <Input
                                size="xl"
                                value={dataForm.data.invitation_code}
                                onChange={(e) => dataForm.setData('invitation_code', e.target.value)}
                                type="text"
                                placeholder="Masukkan kode undangan"
                            />
                            {dataForm.errors.invitation_code ? <Field.ErrorText>{dataForm.errors.invitation_code}</Field.ErrorText> : ''}
                        </CustomField>
                    </Fieldset.Content>


                    <Stack mt={5}>
                        <Button size="xl" type="submit" alignSelf="flex-start" className="w-full">
                            Register
                        </Button>
                        <div className="flex justify-between">
                            <Link href="#" className="text-[13px] text-red-700">
                                Forgot password
                            </Link>
                            <Link href="/login" className="text-[13px]">
                                Sign In
                            </Link>
                        </div>
                    </Stack>
                </form>
            </Fieldset.Root>
        </div>
    </SiteLayout>
}
