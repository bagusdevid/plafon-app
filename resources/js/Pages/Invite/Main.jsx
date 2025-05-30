import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Input, Clipboard, InputGroup, IconButton, Textarea} from "@chakra-ui/react";

export default function Main() {
    return <SiteLayout title="Invite your friends">
        <div className="px-5 py-10">
            <CustomField label="Invitation code" className="mb-7">
                <Clipboard.Root maxW="100%" value="https://chakra-ui.com">
                    <InputGroup endElement={<ClipboardIconButton />}>
                        <Clipboard.Input asChild>
                            <Input />
                        </Clipboard.Input>
                    </InputGroup>
                </Clipboard.Root>
            </CustomField>
            <CustomField label="URL Link">
                <Clipboard.Root maxW="100%" value="https://chakra-ui.com">
                    <InputGroup endElement={<ClipboardIconButton />}>
                        <Clipboard.Input asChild>
                            <Textarea cols={50} />
                        </Clipboard.Input>
                    </InputGroup>
                </Clipboard.Root>
            </CustomField>
        </div>
    </SiteLayout>
}

const ClipboardIconButton = () => {
    return (
        <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs" me="-2">
                <Clipboard.Indicator/>
            </IconButton>
        </Clipboard.Trigger>
    )
}
