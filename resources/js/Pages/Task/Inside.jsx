import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {FaCanadianMapleLeaf, FaChevronLeft, FaFlagUsa, FaMapLocation, FaPlaneDeparture} from "react-icons/fa6";
import {
    Button,
    CheckboxCard,
    CheckboxGroup,
    Float,
    Icon,
    SimpleGrid,
    SegmentGroup
} from "@chakra-ui/react"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"
import {Link} from "@inertiajs/react";
import {Times} from "@/Components/CountDown/index.jsx";
import {useContext, useEffect, useState} from "react";
import {LayoutContext} from "@/Layouts/Layout.jsx";
import {GiCommercialAirplane, GiTakeMyMoney} from "react-icons/gi";
import {IoMdCheckmarkCircle, IoMdCloseCircle, IoMdGlobe} from "react-icons/io";
import {TbBeach} from "react-icons/tb";
import {thousandSeparator} from "@/Utils/thousandSeparator.jsx";
import {AiTwotoneDollar, AiTwotoneDollarCircle} from "react-icons/ai";
import {CiBadgeDollar} from "react-icons/ci";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const icons = [
    <GiCommercialAirplane className="text-[45px]" />,
    <IoMdGlobe className="text-[45px]" />,
    <FaFlagUsa className="text-[45px]" />,
    <TbBeach className="text-[45px]" />,
    <GiTakeMyMoney className="text-[45px]" />,
    <CiBadgeDollar className="text-[45px]" />,
    <FaCanadianMapleLeaf className="text-[45px]" />
]

export default function Inside({task}) {

    const {auth} = useContext(LayoutContext)

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [taskSession, setTaskSession] = useState(true)
    const [taskCode, setTaskCode] = useState(null)
    const [currentBalance, setCurrentBalance] = useState(auth.user.balance)

    const [items, setItems] = useState([])
    const answers = [true, true, false, false]
    const [prevRightAnswer, setPrevRightAnswer] = useState({
        code: '',
        options: [],
        expense: []
    })

    const [shuffledIcons, setShuffledIcons] = useState(icons);

    const [bet, setBet] = useState([])
    const [expense, setExpense] = useState({
        bet: [],
        total: 0
    })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (taskSession) {
            if(submitted) {
                setSubmitted(false)
            } else {
                setPrevRightAnswer({code: taskCode, expense, options: items})
            }
            axios.post('/task/getTaskCode')
                .then(res => {
                    setTaskCode(res.data.results)
                    setTaskSession(false)
                    setBet([])
                    setExpense({bet: [], total: 0})
                    const shuffleAnswer = shuffleArray(answers)
                    const shuffleItems = shuffleArray(task.options).map((item, key) => {
                        item.answer = shuffleAnswer[key]
                        return item;
                    })
                    setItems(shuffleArray(shuffleItems))
                    setShuffledIcons(shuffleArray(icons))
                })
                .catch(err => console.log(err))
        }

        return () => setTaskSession(false)
    }, [taskSession])

    useEffect(() => {
        if(bet.length > 0) {
            const expenseBet = bet.map((item) => {
                const filtered = items.filter(itm => itm.id === item)
                return {
                    id: item,
                    label: filtered[0].label,
                    cost: filtered[0].cost,
                    answer: filtered[0].answer,
                    qty: 1,
                    total: filtered[0].cost * 1
                }
            })
            const initialValue = 0;
            const total = expenseBet.map((ex, i) => ex.total)
                .reduce((accumulator, currentValue) => accumulator + currentValue,
                    initialValue);
            setExpense({bet: expenseBet, total})
        } else {
            setExpense({bet: [], total: 0})
        }
    }, [bet])

    const handleSubmit = () => {
        setSubmitted(true)
        axios.post(`/task/bet`, {
            task_id: task.id,
            code: taskCode,
            expense,
            bet_options: items
        })
            .then(res => {
                if(res.data.success) {
                    // console.log(res.data.prev)
                    setPrevRightAnswer(res.data.prev)
                    setCurrentBalance(res.data.currentBalance)
                    setTaskSession(true);
                }
            })
            .catch(err => console.log(err))
    }

    return <SiteLayout
        leftNav={<Link href="/"><FaChevronLeft /></Link>}
        title="Tugas"
    >
        <div className="pb-[50px]">
            <div className="flex justify-between px-5 py-5 bg-neutral-100">
                <div>
                    <div className="uppercase text-[12px] text-gray-600">Task code</div>
                    <div className="text-[20px] font-semibold">
                        {taskCode ? taskCode : ''}
                    </div>
                </div>
                <div>
                    <div className="text-right uppercase text-[12px] text-gray-600">Remaining</div>
                    <Times minutes={1} sess={{taskSession, setTaskSession}} />
                </div>
            </div>
            {prevRightAnswer.code ? <PrevReport answers={prevRightAnswer} /> : ''}
            <div className="px-5 mt-5 mb-5">
                <Mistery
                    items={items}
                    dataBet={{bet, setBet}}
                    icons={shuffledIcons}
                    user={auth.user}
                />
            </div>
            <div className="fixed left-1/2 transform -translate-x-1/2 bottom-0 w-full lg:w-[600px] border-t border-solid border-t-neutral-200 shadow-[-1px_-1px_11px_0px_rgba(0,0,0,0.1)]">
                <div className="bg-white">
                    <div className="flex justify-between py-2 px-5 border-b border-solid border-b-neutral-200">
                        <div>
                            {/*<h4>Multiple</h4>*/}
                            {/*<SegmentGroup.Root defaultValue="x1" size="xs">*/}
                            {/*    <SegmentGroup.Indicator />*/}
                            {/*    <SegmentGroup.Items items={["x1", "x2", "x3"]} />*/}
                            {/*</SegmentGroup.Root>*/}
                            Balance
                        </div>
                        <div className="font-bold">
                            {thousandSeparator(currentBalance)}
                        </div>
                    </div>
                    {expense.bet.length > 0 ? <BetReport bet={expense.bet} /> : ''}
                    <div className="flex justify-between items-center py-2 px-5">
                        <div>{thousandSeparator(expense.total)}</div>
                        <div>
                            <Button
                                type="button"
                                disabled={bet.length === 0}
                                onClick={handleSubmit}
                                _disabled={{
                                    bg: "gray.300",
                                    color: "gray.500"
                                }}
                            >
                                Kirim
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SiteLayout>
}

function BetReport({bet}) {
    return <div className="max-h-[60px] overflow-y-auto border-b border-solid border-b-neutral-200">
    {bet.map((itm, ky) => {
        return <div key={ky} className="flex justify-between text-[13px] py-1 px-5">
            <div>
                {itm.label}
            </div>
            <div className="flex gap-2">
                <div>x{itm.qty}</div>
                <div>{itm.total}</div>
            </div>
        </div>
    }
    )}
    </div>
}

function PrevReport({answers}) {
    // console.log(answers)
    return <div className="bg-neutral-100 py-2 flex justify-between px-5 mt-1 mb-5">
        <div>
            <div className="uppercase text-[11px] text-gray-500">Prev report</div>
            <div className="flex items-center gap-5">
                <div className={`font-semibold ${answers.expense.bet.length > 0 ? 'text-green-700' : 'text-gray-700'}`}>
                {answers.code}
                </div>
                {answers.expense.bet.length > 0 ? <div className="flex gap-1">{answers.expense.bet.map((item, k) => {
                    return <div key={k} className="">
                        {item.answer ? <IoMdCheckmarkCircle className="text-green-500"/> :
                            <IoMdCloseCircle className="text-red-500"/>}
                    </div>
                })}</div> : ''}
            </div>
        </div>
        <div>
            <div className="uppercase text-[11px] text-gray-500 text-right">Correct answers</div>
            <div className="text-gray-700">
            {answers.options
                .filter((an) => an.answer === true)
                .map(item => item.label).join(', ')}
            </div>
        </div>
    </div>
}

const Mistery = ({items, user, dataBet, icons}) => {

    return (
        <CheckboxGroup
            value={dataBet.bet}
            onValueChange={(e) => dataBet.setBet(e)}
            className="p-0"
        >
            <SimpleGrid className="flex flex-row flex-wrap gap-2">
                {items.map((item, k) => {

                    return <CheckboxCard.Root
                        key={item.label}
                        className="w-[calc(50%_-_20px)] flex-auto py-8"
                        value={item.id}
                        _checked={{
                            bg: "gray.200",
                            borderColor: 'gray.300'
                        }}
                        disabled={user.balance < item.cost}
                    >
                        <CheckboxCard.HiddenInput/>
                        <CheckboxCard.Control className="p-0">
                            <CheckboxCard.Content className="px-5">
                                <CheckboxCard.Label className="flex gap-3">
                                    <div className="text-gray-300">
                                        {icons[k]}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-[18px]">
                                            {item.label}
                                        </div>
                                        <div>
                                            {thousandSeparator(item.cost)}
                                        </div>
                                    </div>
                                </CheckboxCard.Label>
                            </CheckboxCard.Content>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                })}
            </SimpleGrid>
        </CheckboxGroup>
    )
}
