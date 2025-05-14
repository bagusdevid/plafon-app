import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Fieldset, Stack, Input, Button, Alert, Field} from "@chakra-ui/react";
import {useForm} from "@inertiajs/react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {useContext, useEffect, useState} from "react";

export default function SiteActivation({url}) {

    const {flashData} = useContext(LayoutContext)

    const [codeErrorMsg, setCodeErrorMsg] = useState(null)

    useEffect(() => {
        setCodeErrorMsg(flashData)
    }, [flashData])

    const initialValues = {
        domain: url,
        activation_code: ''
    }
    const {data, setData, post, errors} = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post('/site-activation')
    }

    return <SiteLayout title="Site Activation">
        {codeErrorMsg ? <Alert.Root status="error" className="mb-5">
            <Alert.Indicator />
            <Alert.Title>
                {codeErrorMsg}
            </Alert.Title>
        </Alert.Root> : ''}
        <div>
            <form onSubmit={submit}>
            <Stack gap={3} css={{ "--field-label-width": "160px" }}>
                    <CustomField label="Domain/Url" orientation="horizontal">
                        <Input
                            value={data.domain}
                            readOnly
                            type="text"
                        />
                    </CustomField>
                    <CustomField label="Activation Code" orientation="horizontal" invalid={errors.activation_code || codeErrorMsg} isRequired>
                        <div className="flex-1">
                            <Input
                                value={data.activation_code}
                                onChange={(e) => setData('activation_code', e.target.value)}
                                type="text"
                                placeholder="Enter activation code"
                            />
                            {errors.activation_code ? <Field.ErrorText>{errors.activation_code}</Field.ErrorText> : ''}
                        </div>
                    </CustomField>
                <CustomField label="" orientation="horizontal">
                    <div className="flex-1">
                        <Button type="submit">
                            Activate
                        </Button>
                    </div>
                </CustomField>
            </Stack>
        </form>
        </div>
    </SiteLayout>
}
