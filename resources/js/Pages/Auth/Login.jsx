import {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import AdvancedMenu from "@/Components/Profile/AdvancedMenu.jsx";
import Menus from "@/Components/Menus.jsx";
import {Button, Input, Stack} from "@chakra-ui/react";
import {PasswordInput} from "@/Components/ui/password-input.jsx";
import {RiCustomerService2Line} from "react-icons/ri";
import {MdHelpOutline} from "react-icons/md";
import FloatingMessage from "@/Components/FloatingMessage.jsx";

export default function Login() {

    const {site, errors: loginErrors, flashMessage} = useContext(LayoutContext);
    const [formErrors, setFormErrors] = useState([])
    const [alert, setAlert] = useState({
        show: false,
        status: 'success',
        message: ''
    })

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
        if(flashMessage) {

            setAlert({show: true, status: 'success', message: flashMessage})

            const timeoutId = setTimeout(() => {
                setAlert({show: false, status: 'success', message: flashMessage})
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [flashMessage])

    const initialValues = {
        username: '',
        password: '',
    }
    const {data, setData, post, errors, processing} = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return <>
        <FloatingMessage
            show={alert.show}
            status={alert.status}
        >
            {alert.message}
        </FloatingMessage>
        <Head title={`Login - ${site.name}`} />
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
                            className="w-[240px] lg:w-[320px] mx-auto"
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
                    <form onSubmit={handleSubmit}>
                    <Stack className="bg-white/20 rounded-lg px-5 pt-3 mb-2">
                        <Input
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            type="text"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "rgba(255,255,255,.5)" }}
                            color="white"
                            size="lg"
                            placeholder="Username"
                            variant="flushed"
                            className="border-b-white/20"
                        />
                        <PasswordInput
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            _placeholder={{ color: "rgba(255,255,255,.3)" }}
                            css={{ "--focus-color": "transparent" }}
                            color="white"
                            size="lg"
                            placeholder="Password"
                            variant="flushed"
                            className="border-none"
                            isDark={false}
                        />
                    </Stack>
                    <div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-red-800 disabled:bg-white/40 disabled:opacity-full disabled:text-white/60 mb-2"
                            disabled={processing}
                        >
                            Login
                        </Button>
                        <div className="flex justify-between">
                            <Link href="/forgot-password" className="text-white/40 text-sm">
                                Forgot password
                            </Link>
                            <Link href="/register" className="text-white/40 text-sm">
                                Register
                            </Link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
