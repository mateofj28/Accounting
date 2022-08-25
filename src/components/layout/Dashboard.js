import {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {BankService} from "../../services/bankServices";
import {Chart} from 'primereact/chart';
import {DataTable} from 'primereact/datatable'
import {Column} from "primereact/column";
import {Button} from 'primereact/button'
import {UserService} from "../../services/UserService";
import {Messages} from 'primereact/messages';
import {ChartsService} from "../../services/chartsServices";
import {Carousel} from 'primereact/carousel';
import { object } from "prop-types";


const Dashboard = () => {
    const bankService = new BankService();
    const userService = new UserService()
    const chartsService = new ChartsService()

    const renderBalances = useRef(null)
    const renderCategories = useRef(null)

    const [dataBalance, setDataBalance] = useState(null);
    const [dataCategories, setDataCategories] = useState(null);
    const [dataTableBalanceSheet, setDataTableBalanceSheet] = useState([]);

    const [account, setAccount] = useState([]);

    // accounts = [
    //     {
    //         account: 'nequi',
    //         value: 100
    //     },
    //     {
    //         account: 'daviplata',
    //         value: 2000
    //     }
    // ]
            


    const [balance, setBalance] = useState([]);
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [loadTable, setLoadTable] = useState(true);
    const msgs1 = useRef(null);
    const formatNumber = new Intl.NumberFormat('en-EU')
    const navigate = useNavigate()
    const [balances, setBalances] = useState([])



    const chartPastel = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    "#007E86",
                    "#CC1D1D",
                ],
                hoverBackgroundColor: [
                    "#004C51",
                    "#860000",
                ]
            }
        ]
    }


    const chartCategory = {
        labels: ['Salario', 'Casa', 'internet', 'instalación', 'servicios'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#ff8906",
                    "#e53170"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#ff8906",
                    "#e53170"
                ]
            }]
    }

    const renderDataCategory = () => {
        setDataCategories(chartCategory)
    }

    useEffect(()=> {
        renderDataCategory()
    }, [])

    const listBalance = async () => {
        const res = await userService.balanceSheet()
        console.log(res.data)
        setBalances(res.data)
    }

    const balanceList = [
        {description: 'Sueldos de empleados', category: 2, date: '30/06/2022', debit: 1205, credit: 0, total: 1205},
        {description: 'Pago de membresia', category: 1, date: '01/07/2022', debit: 0, credit: 205, total: 1000},
        {description: 'Pago de membresia', category: 1, date: '01/07/2022', debit: 0, credit: 205, total: 705},
        {description: 'Reparación de cableado', category: 2, date: '014/07/2022', debit: 800, credit: 0, total: 1505},
    ]

    const getDataAccounts = async () => {
        const res = await bankService.getBanksBalances();
        const names = Object.keys(res.data)
        const valuesObject = res.data
        const balanceAccount = []
        
        for (let i = 0; i < names.length; i++){
            var object = {
                account: names[i],
                value: valuesObject[`${names[i]}`]
            }
            console.log(object)
            balanceAccount.push(object)
        }

        console.log(balanceAccount)
        setAccount(balanceAccount)
        console.log(valuesObject)


        // construimos el objeto y se le cambia el estado.
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getDataIncomeVsExpenses = async () => {
        const res = await chartsService.getIncomeVsExpenses()
        return res.data
    }

    const getDataExpensesCategory = async () => {
        const res = await chartsService.getExpenseCategory()
        return res.data
    }

    const getDataTableBalanceSheet = async () => {
        const res = await userService.balanceSheet()
         setDataTableBalanceSheet(res.data)
         setLoadTable(false)
    }

    useEffect(() => {
        msgs1.current.show([
            {severity: 'error', detail: 'No tienes cuentas bancarias', sticky: true, closable: false}
        ]);
        getDataAccounts();
        // listBalance()
        getDataIncomeVsExpenses().then(r => {
            chartPastel.datasets[0].data[0] = r.incomes
            chartPastel.datasets[0].data[1] = r.expenses

            renderBalances.current.refresh()
        })
        getDataExpensesCategory().then(r => {

            chartCategory.datasets[0].data[0] = r.salario
            chartCategory.datasets[0].data[1] = r.casa
            chartCategory.datasets[0].data[2] = r.internet
            chartCategory.datasets[0].data[3] = r.instalation
            chartCategory.datasets[0].data[4] = r.services
            renderCategories.current.refresh()
        })
        getDataTableBalanceSheet()
    }, []);

    const messageNullBanks = () => {
        if (account.length === 0) {
            return (
                <div className="col-12 md:col-5">
                    <Messages ref={msgs1}/>
                </div>
            );
        }
    };

    const renderChartBalance = () => {
        setDataBalance(chartPastel)
    }

    useEffect(() => {
        renderChartBalance()
    }, [])

    //Formateo de las cards de balance de los bancos...

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
        }
    }

    const {basicOptions} = getLightTheme();

    //Datos para la doughnut


    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    //Formateo de la tabla de balances generales
    const categoryType = (balance) => {
        return (
            <span className="orange-badge">{balance.category}</span>
        )
    }

    const formatTotal = (balance) => {
        return (
            <span>${formatNumber.format(balance.total)}</span>
        )
    }

    const itemTemplate = (account) => {
        return (
            <div className="col-12  md:col-10 lg:col-12 p-3">
                <div
                    className="p-3 text-center h-15rem"
                    style={{borderRadius: "12px", background: '#0004', boxShadow: "0 0 10px 0"}}
                >
                    <div className="flex justify-content-start">
                    <span
                        className="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style={{width: "49px", height: "49px"}}
                    >
                    <i className="pi pi-building text-xl text-white"></i>
                    </span>
                    </div>

                    <div className="text-2xl font-light text-white mb-2">{account.account}</div>
                    <h2 className="text-blue-100 font-medium">${formatNumber.format(account.value)}</h2>
                </div>
            </div>
        )
    }

    const responsiveOptions = [
        {
            breakpoint: '1290px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '848px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    return (
        <div className="grid">

            {account.length > 0 && (
                <div className="col-12 sm:col-12 lg:col-12">
                    <Carousel
                        className="col-12"
                        value={account}
                        itemTemplate={itemTemplate}
                        numVisible={4}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}>
                    </Carousel>
                </div>
            )}


            <div className="col-12">
                <div className="grid flex justify-content-center">{messageNullBanks()}</div>
            </div>

            <div className="col-12 grid md:col-12 flex justify-content-center m-2">

                <div className="col-12 md:col-12 lg:col-5 mb-4 sm:mb-0 mr-3"
                     style={{background: '#0004', borderRadius: '10px'}}>
                    <p className="text-center" style={{color: '#fff'}}>Categorias mas costosas</p>
                    <div className="card flex justify-content-center">
                        <Chart ref={renderCategories} type="doughnut" data={dataCategories} style={{position: 'relative', width: '65%'}}/>
                    </div>
                </div>

                <div className="col-12 md:col-12 lg:col-5" style={{background: '#0004', borderRadius: '10px'}}>
                    <p className="text-center" style={{color: '#fff'}}>Ingresos vs Egresos</p>
                    <div className="card flex justify-content-center">
                        <Chart ref={renderBalances} type="pie" data={dataBalance} options={lightOptions}
                               style={{position: 'relative', width: '65%'}}/>
                    </div>
                </div>
            </div>

            <div className="col-12 grid md:col-12 flex justify-content-start m-2">
                <div className="col-12 md:col-12 lg:col-6" style={{background: '#0004', borderRadius: '10px'}}>
                    <p className="text-center" style={{color: '#fff'}}>Balance</p>
                    <div className="card">
                        <Button label="Ver más" className="ml-3 " onClick={() => navigate('/balance')}/>
                        <DataTable
                            emptyMessage="No hay datos disponibles"
                            value={dataTableBalanceSheet}
                            responsiveLayout="scroll"
                            loading={loadTable}
                            className="m-3"
                            paginator rows={6}
                        >
                            <Column field="description" header="Descripción"></Column>
                            <Column field="category" header="Categoria" body={categoryType}></Column>
                            <Column field="total" header="Total" body={formatTotal}></Column>
                        </DataTable>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default Dashboard;
