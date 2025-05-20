import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {IoSkullOutline} from "react-icons/io5";
import {Button, Field, Fieldset, Input, Stack} from "@chakra-ui/react";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Link, useForm} from "@inertiajs/react";

export default function ForgotPassword({status}) {

    const initialValues = {
        email: '',
    }
    const dataForm = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        dataForm.post('/forgot-password')
    }

    return <SiteLayout title="Forgot password">
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

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

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
                            Email Password Reset Link
                        </Button>
                        <div className="flex justify-between">
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
