import {useState} from "react";
import {useForm} from "@inertiajs/react";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {CustomField} from "@/Components/Forms/CustomField.jsx";
import {Button, Field, Input, NativeSelect} from "@chakra-ui/react";

export default function AccBank({bank}) {
    const [formAddShow, setFormAddShow] = useState(false)
    const [formIsEdit, setFormIsEdit] = useState(false)

    const bankAccount = useForm({
        id: bank ? bank.id : null,
        bank_name: bank ? bank.bank_name : '',
        bank_acc_no: bank ? bank.bank_acc_no : '',
        bank_acc_name: bank ? bank.bank_acc_name : ''
    })

    const onBankSubmit = (e) => {
        e.preventDefault();
        bankAccount.post('/wallet/addBank')
    }

    const onEditSubmit = (e) => {
        e.preventDefault()
        bankAccount.put(`/wallet/${bankAccount.data.id}`, {
            onSuccess: () => setFormIsEdit(false)
        })
    }

    const handleDelete = (e) => {
        if(confirm('Are you sure want to delete')) {
            e.preventDefault()
            bankAccount.delete(`/wallet/${bankAccount.data.id}`);
        }
    }

    return <PersonalBank
        bank={bank}
        formAdd={{formAddShow, setFormAddShow}}
        formEdit={{formIsEdit, setFormIsEdit}}
        onBankSubmit={onBankSubmit}
        onEditSubmit={onEditSubmit}
        dataBank={bankAccount}
        onDelete={handleDelete}
    />
}

function PersonalBank({bank, formAdd, formEdit, onEditSubmit, onDelete, onBankSubmit, dataBank}) {
    if(bank) {
        return <>
            {formEdit.formIsEdit ? <BankForm
                formAdd={formAdd}
                formEdit={formEdit}
                isEdit
                onSubmit={onEditSubmit}
                dataBank={dataBank}
            /> : <ExistingBank bank={bank} onDelete={onDelete} formEdit={formEdit} />}
        </>
    }

    return <>
        {formAdd.formAddShow ? <BankForm
            formAdd={formAdd}
            formEdit={formEdit}
            onSubmit={onBankSubmit}
            dataBank={dataBank}
        /> : <Bank
            setFormAddShow={formAdd.setFormAddShow}
        />}
    </>
}

function ExistingBank({bank, formEdit, onDelete}) {
    return <div className="relative border border-solid border-neutral-200 px-5 py-5 rounded-md">
        <div className="font-bold mb-1">
            {bank.bank_name}
        </div>
        <div className="font-semibold">
            {bank.bank_acc_no}
        </div>
        <div>
            a.n. {bank.bank_acc_name}
        </div>
        <div className="absolute right-2 top-2">
            <div className="flex flex-col gap-3">
                <button type="button" onClick={() => formEdit.setFormIsEdit(true)} className="cursor-pointer opacity-50">
                    <FaEdit />
                </button>
                <form onSubmit={onDelete}>
                    <button type="submit" className="cursor-pointer text-red-500/50">
                        <FaTrashAlt />
                    </button>
                </form>
            </div>
        </div>
    </div>
}

function BankForm({dataBank, onSubmit, formAdd, formEdit, isEdit = false}) {

    // console.log(dataBank)

    const banks = [
        {label: 'Bank Mandiri', value: 'Bank Mandiri'},
        {label: 'Bank BCA', value: 'Bank BCA'},
        {label: 'Bank BRI', value: 'Bank BRI'},
        {label: 'Bank BNI', value: 'Bank BNI'},
        {label: 'Bank BSI', value: 'Bank BSI'},
        {label: 'Bank Permata', value: 'Bank Permata'},
        {label: 'Bank CIMB Niaga', value: 'Bank CIMB Niaga'},
    ]

    return <form onSubmit={onSubmit}>
        <CustomField label="Nama bank" invalid={dataBank.errors.bank_name} isRequired className="mb-5">
            <NativeSelect.Root
                size="md"
            >
                <NativeSelect.Field
                    value={dataBank.data.bank_name}
                    onChange={(e) => dataBank.setData('bank_name', e.target.value)}
                >
                    <option value="">Pilih bank</option>
                    {banks.map((bank, key) => {
                        return <option value={bank.value} key={key}>
                            {bank.label}
                        </option>
                    })}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
            {dataBank.errors.bank_name ? <Field.ErrorText>{dataBank.errors.bank_name}</Field.ErrorText> : ''}
        </CustomField>
        <CustomField label="No rekening" invalid={dataBank.errors.bank_acc_no} isRequired className="mb-5">
            <Input
                value={dataBank.data.bank_acc_no}
                onChange={(e) => dataBank.setData('bank_acc_no', e.target.value)}
                placeholder="Tulis nomor rekening"
                type="text"
            />
            {dataBank.errors.bank_acc_no ? <Field.ErrorText>{dataBank.errors.bank_acc_no}</Field.ErrorText> : ''}
        </CustomField>
        <CustomField label="Atas nama" invalid={dataBank.errors.bank_acc_name} isRequired className="mb-5">
            <Input
                value={dataBank.data.bank_acc_name}
                onChange={(e) => dataBank.setData('bank_acc_name', e.target.value)}
                placeholder="Tulis nomor rekening"
                type="text"
            />
            {dataBank.errors.bank_acc_name ? <Field.ErrorText>{dataBank.errors.bank_acc_name}</Field.ErrorText> : ''}
        </CustomField>
        <div className="flex gap-2">
            <Button type="submit" size="sm">
                Simpan
            </Button>
            <Button type="button" variant="ghost" onClick={() => isEdit ? formEdit.setFormIsEdit(false) : formAdd.setFormAddShow(false)}>
                Batal
            </Button>
        </div>
    </form>
}

function Bank({setFormAddShow}) {
    return <>
        <div className="border border-solid border-neutral-200 p-2 mb-3">
            <div className="h-[150px] flex justify-center items-center bg-neutral-200 text-sm text-gray-500">
                Belum ada rekening bank terdaftar
            </div>
        </div>
        <div>
            <Button type="button" className="w-full" colorPalette="red" onClick={() => setFormAddShow(true)}>
                Tambahkan rekening bank
            </Button>
        </div>
    </>
}
