import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Button, Input} from "@chakra-ui/react";

export default function Main() {
    return <SiteLayout>
        <div className="text-center py-10">
            <div className="font-bold text-[28px]">
                220.000
            </div>
            <div>
                Account balance
            </div>
        </div>
        <div className="px-5">
            <div className="mb-5">
                <CustomField label="Jumlah">
                    <Input
                        type="text"
                        size="lg"
                        placeholder="Masukkan jumlah yang akan ditarik"
                    />
                </CustomField>
            </div>
            <div className="border border-solid border-neutral-300 rounded-md px-5 py-5 mb-5">
                <h3>Bank Mandiri</h3>
                <div>133023200323203</div>
                <div>a.n. Tubagus GP</div>
            </div>
            <div>
                <Button type="button" size="lg" colorPalette="red" className="w-full">
                    Withdraw
                </Button>
            </div>
        </div>
    </SiteLayout>
}
