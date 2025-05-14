import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Fieldset, Stack, Input, Button} from "@chakra-ui/react";
import {useForm} from "@inertiajs/react";

export default function SiteActivation({url}) {

    const initialValues = {
        domain: url,
        activation_code: ''
    }
    const {data, setData} = useForm(initialValues)

    return <SiteLayout title="Site Activation">
        <div>
            <Stack gap={3} css={{ "--field-label-width": "160px" }}>
                    <CustomField label="Domain/Url" orientation="horizontal">
                        <Input
                            value={data.domain}
                            readOnly
                            type="text"
                        />
                    </CustomField>
                    <CustomField label="Activation Code" orientation="horizontal">
                        <Input
                            value={data.activation_code}
                            onChange={(e) => setData('activation_code', e.target.value)}
                            type="text"
                            placeholder="Enter activation code"
                        />
                    </CustomField>
                <CustomField label="" orientation="horizontal">
                    <div className="flex-1">
                        <Button>
                            Activate
                        </Button>
                    </div>
                </CustomField>
            </Stack>
        </div>
    </SiteLayout>
}
