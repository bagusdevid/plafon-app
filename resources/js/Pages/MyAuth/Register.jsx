import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {Button, Field, Fieldset, Input, Stack} from "@chakra-ui/react";
import {Link, useForm} from "@inertiajs/react";
import {IoSkullOutline} from "react-icons/io5";

export default function Register() {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        invitation_code: '',
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
            <Fieldset.Root size="lg">
                <form onSubmit={handleSubmit}>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.name}
                                onChange={(e) => dataForm.setData('name', e.target.value)}
                                type="text"
                                placeholder="Masukkan nama Anda"
                                className="w-full"
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.email}
                                onChange={(e) => dataForm.setData('email', e.target.value)}
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="w-full"
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Phone</Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.phone}
                                onChange={(e) => dataForm.setData('phone', e.target.value)}
                                type="text"
                                placeholder="Masukkan telepon Anda"
                                className="w-full"
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.password}
                                onChange={(e) => dataForm.setData('password', e.target.value)}
                                type="password"
                                placeholder="Masukkan password"
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.password_confirmation}
                                onChange={(e) => dataForm.setData('password_confirmation', e.target.value)}
                                type="password"
                                placeholder="Ulangi password"
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>
                                Invitation Code
                            </Field.Label>
                            <Input
                                size="xl"
                                value={dataForm.data.invitation_code}
                                onChange={(e) => dataForm.setData('invitation_code', e.target.value)}
                                disabled
                                type="text"
                                placeholder="Masukkan kode undangan"
                            />
                        </Field.Root>
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
