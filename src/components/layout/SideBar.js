import { useRef } from "react";
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";


const SideBar = ({logo, setLogged}) => {
    const btnRef20 = useRef(null);
    const btnRef21 = useRef(null);    
    const navigate = useNavigate()

    // console.log(logo)
    return (
        <div id="app-sidebar-5" className="hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none bg-gray-900" style={{ height: '100vh'}} >
            <div className="flex flex-column h-full" style={{position: 'fixed', background: "rgb(31 31 36)"}}>
                <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500" style={{ height: '60px' }}>
                    <img src={logo} alt="hyper-light" height={50} />
                </div>
                <div className="mt-3">
                    <ul className="list-none p-3 m-0">
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../', {replace: true})} >
                                <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Home</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../income', {replace: true})} >
                                <i className="pi pi-angle-double-up mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Ingreso</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../expenses', {replace: true})} >
                                <i className="pi pi-angle-double-down mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Egreso</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../balance', {replace: true})} >
                                <i className="pi pi-chart-line mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Balance</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../dueIncome', {replace: true})} >
                                <i className="pi pi-search-plus mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Cobrar</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../dueExpenses', {replace: true})} >
                                <i className="pi pi-search-minus mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Pagar</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full" onClick={()=> navigate('../setting', {replace: true})} >
                                <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Ajustes</span>
                                <Ripple />
                            </a>
                        </li>                        
                    </ul>
                </div>
                <div className="mt-auto mx-3">
                    <hr className="mb-3  border-top-1 border-gray-800" />
                    <a className="p-ripple my-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">                        
                        <Avatar icon="pi pi-user" className="mr-2 lg:mr-0" size="xlarge" />
                        <span className="font-medium inline lg:hidden">Usuario</span>
                        <Ripple />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SideBar




























{/* <div
            id="app-sidebar-8"
            className=" hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 select-none animation-duration-300 animation-ease-in-out border-white-alpha-10"
            style={{
                width: "280px",
                backgroundImage: "linear-gradient(60deg, rgb(74 47 22) 0%, #3b7bcf 100%)",
                height: "100%"
            }}
        >
            <div className="flex flex-column h-full w-17rem sm:w-17rem md:w-17rem lg:w-18rem xl:w-18rem xxl:w-2" style={{ position: 'fixed' }}>
                <div
                    className="flex align-items-center px-5 flex-shrink-0 "
                    style={{ height: "60px" }}
                >
                    <img
                        src="assets/images/blocks/logos/konexAvatar.png"
                        alt="Image"
                        height="60"
                    />
                </div>
                <div className="overflow-y-auto">
                    <ul className="list-none p-3 m-0">
                        <li>
                            <StyleClass
                                nodeRef={btnRef33}
                                selector="@next"
                                enterClassName="hidden"
                                enterActiveClassName="slidedown"
                                leaveToClassName="hidden"
                                leaveActiveClassName="slideup"
                            >
                                <div
                                    ref={btnRef33}
                                    className="p-ripple p-3 flex align-items-center justify-content-between text-gray-500 cursor-pointer"
                                >
                                    <span className="font-medium">FAVORITES</span>
                                    <i className="pi pi-chevron-down"></i>
                                    <Ripple />
                                </div>
                            </StyleClass>
                            <ul className="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <a
                                        className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                        style={{ borderRadius: "30px" }}
                                    >
                                        <i className="pi pi-home mr-2"></i>
                                        <span className="font-medium">Dashboard</span>
                                        <Ripple />
                                    </a>
                                </li>
                                <li>
                                    <StyleClass
                                        nodeRef={btnRef34}
                                        selector="@next"
                                        enterClassName="hidden"
                                        enterActiveClassName="slidedown"
                                        leaveToClassName="hidden"
                                        leaveActiveClassName="slideup"
                                    >
                                        <a
                                            ref={btnRef34}
                                            className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                            style={{ borderRadius: "30px" }}
                                        >
                                            <i className="pi pi-user mr-2"></i>
                                            <span className="font-medium">Usuarios</span>
                                            <i className="pi pi-chevron-down ml-auto"></i>
                                            <Ripple />
                                        </a>
                                    </StyleClass>
                                    <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                        <li>
                                            <StyleClass
                                                nodeRef={btnRef35}
                                                selector="@next"
                                                enterClassName="hidden"
                                                enterActiveClassName="slidedown"
                                                leaveToClassName="hidden"
                                                leaveActiveClassName="slideup"
                                            >
                                                <a
                                                    ref={btnRef35}
                                                    className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                                    style={{ borderRadius: "30px" }}
                                                    onClick={() => navigate("../listUser", { replace: true })}
                                                >
                                                    <i className="pi pi-users mr-2"></i>
                                                    <span className="font-medium">Listar Usuarios</span>

                                                    <Ripple />
                                                </a>
                                            </StyleClass>

                                        </li>
                                        <li>
                                            <StyleClass
                                                nodeRef={btnRef35}
                                                selector="@next"
                                                enterClassName="hidden"
                                                enterActiveClassName="slidedown"
                                                leaveToClassName="hidden"
                                                leaveActiveClassName="slideup"
                                            >
                                                <a
                                                    ref={btnRef35}
                                                    className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                                    style={{ borderRadius: "30px" }}
                                                    onClick={() => navigate("../listUser", { replace: true })}
                                                >
                                                    <i className="pi pi-users mr-2"></i>
                                                    <span className="font-medium">Crear usuarios</span>

                                                    <Ripple />
                                                </a>
                                            </StyleClass>

                                        </li>                                
                                    </ul>
                                </li>

                                <li>
                                    <StyleClass
                                        nodeRef={btnRef38}
                                        selector="@next"
                                        enterClassName="hidden"
                                        enterActiveClassName="slidedown"
                                        leaveToClassName="hidden"
                                        leaveActiveClassName="slideup"
                                    >
                                        <a
                                            ref={btnRef38}
                                            className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                            style={{ borderRadius: "30px" }}
                                        >
                                            <i className="pi pi-user mr-2"></i>
                                            <span className="font-medium">Clientes</span>
                                            <i className="pi pi-chevron-down ml-auto"></i>
                                            <Ripple />
                                        </a>
                                    </StyleClass>
                                    <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                        <li>
                                            <StyleClass
                                                nodeRef={btnRef39}
                                                selector="@next"
                                                enterClassName="hidden"
                                                enterActiveClassName="slidedown"
                                                leaveToClassName="hidden"
                                                leaveActiveClassName="slideup"
                                            >
                                                <a
                                                    ref={btnRef39}
                                                    className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                                    style={{ borderRadius: "30px" }}
                                                    onClick={() => navigate("../listCustomer", { replace: true })}
                                                >
                                                    <i className="pi pi-users mr-2"></i>
                                                    <span className="font-medium">Listar Clientes</span>

                                                    <Ripple />
                                                </a>
                                            </StyleClass>

                                        </li>
                                        <li>
                                            <a
                                                className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                                style={{ borderRadius: "30px" }}
                                            >
                                                <i className="pi pi-chart-line mr-2"></i>
                                                <span className="font-medium">Expenses</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                
                                {/* <li>
                                    <a
                                        className="p-ripple flex align-items-center cursor-pointer p-3 text-gray-300 hover:bg-bluegray-700 transition-duration-150 transition-colors"
                                        style={{ borderRadius: "30px" }}
                                    >
                                        <i className="pi pi-cog mr-2"></i>
                                        <span className="font-medium">Settings</span>
                                        <Ripple />
                                    </a>
                                </li> 
                            </ul >
                        </li >
                    </ul >                    
                </div >
            </div >
        </div > 

        (copy)
        --h-full     lo hacen largo
        --lg:h-auto

        --surface-section

        hidden
        lg:block
        flex-shrink-0
        absolute
        lg:static
        left-0
        top-0
        z-1 
        border-right-1

        --surface-border 

        w-18rem 
        lg:w-7rem 

        select-none

        bg-gray-900




        (original)    
        hidden
        lg:block
        absolute
        lg:static
        left-0
        top-0
        z-1    
        flex-shrink-0
        border-right-1
        select-none


        animation-duration-300 
        animation-ease-in-out 
        border-white-alpha-10    






















        */}