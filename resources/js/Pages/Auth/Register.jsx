import {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import AdvancedMenu from "@/Components/Profile/AdvancedMenu.jsx";
import Menus from "@/Components/Menus.jsx";
import {Button, Input, Stack} from "@chakra-ui/react";
import {PasswordInput} from "@/Components/ui/password-input.jsx";
import {RiCustomerService2Line} from "react-icons/ri";
import {MdHelpOutline} from "react-icons/md";

export default function Register({invitation}) {

    const {site, errors: loginErrors, flashData} = useContext(LayoutContext);

    const [formErrors, setFormErrors] = useState([])
    const [invitationCodeError, setInvitationCodeError] = useState(null)

    useEffect(() => {
        if(loginErrors.hasOwnProperty('username') || loginErrors.hasOwnProperty('password')) {
            const modifiedArray = Object.entries(loginErrors).map(([key, value]) => {
                return { errorKey: key, errorValue: value };
            });
            setFormErrors(modifiedArray)
        }

        return () => setFormErrors([]);
    }, [loginErrors])

    useEffect(() => {
        setInvitationCodeError(flashData)
    }, [flashData])

    const initialValues = {
        name: '',
        username: '',
        password: '',
        password_confirmation: '',
        invitation_code: invitation,
    }
    const {data, setData, post, errors, processing} = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/register', {
            onSuccess: () => console.log('ok')
        })
    }

    return <>
        <Head title={`Register - ${site.name}`} />
        <div className="bg-[#d71921] w-full lg:w-[600px] mx-auto relative">
            <div className="h-[60px] px-5 flex items-center justify-between">
                <div>
                </div>
                <div className="flex gap-2 items-center">
                    <MdHelpOutline className="text-[26px] text-white/40" />
                    <RiCustomerService2Line className="text-[26px] text-white/40" />
                </div>
            </div>
            <div className="pb-[90px] min-h-[calc(100vh_-_60px)] flex flex-col gap-10 justify-center">
                <div>
                    <div className="text-center">
                        <img
                            src="/images/emiratesclub-logo.png"
                            alt=""
                            className="w-[320px] mx-auto"
                        />
                    </div>
                </div>
                <div className="px-5">
                    {formErrors.length > 0 ? <div className="bg-red-500 text-white/60 text-sm border-2 border-solid border-red-600 rounded-md px-3 py-2 mb-3">
                        {formErrors.map((err, k) => {
                            return <div key={k}>
                                {err.errorValue}
                            </div>
                        })}
                    </div> : ''}
                    {invitationCodeError ? <div className="bg-red-500 text-white/60 text-sm border-2 border-solid border-red-600 rounded-md px-3 py-2 mb-3">
                        <div>
                        {invitationCodeError}
                        </div>
                    </div> : ''}
                    <form onSubmit={handleSubmit}>
                    <Stack className="bg-white/20 rounded-lg px-5 pt-3 mb-2">
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            placeholder="Nama lengkap"
                            variant="flushed"
                            className="border-b-white/30"
                        />
                        <Input
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            type="text"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            placeholder="Username"
                            variant="flushed"
                            className="border-b-white/30"
                        />
                        <PasswordInput
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            className="border-b-white/30"
                            placeholder="Masukkan Password"
                            variant="flushed"
                        />
                        <PasswordInput
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            placeholder="Ulangi Password"
                            variant="flushed"
                            className="border-b-white/30"
                        />
                        <Input
                            value={data.invitation_code}
                            onChange={(e) => setData('invitation_code', e.target.value)}
                            type="text"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            placeholder="Kode invitation"
                            variant="flushed"
                            className="border-none"
                        />
                    </Stack>
                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-red-800 disabled:bg-white/40 disabled:opacity-full disabled:text-white/60 mb-2"
                            disabled={processing}
                        >
                            Register
                        </Button>
                        <div className="flex justify-between">
                            <Link href="/forgot-password" className="text-white/40 text-sm">
                                Forgot password
                            </Link>
                            <Link href="/login" className="text-white/40 text-sm">
                                Login
                            </Link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
