import { useRef } from "react";
import { StyleClass } from 'primereact/styleclass';
import { useNavigate } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';
import { Toast } from './Toast'


const TopBat = ({ setTheme, theme, setLogged }) => {
    const btnRef22 = useRef(null);
    const btnRef23 = useRef(null);

    const navigate = useNavigate()
    
    const lightTheme = `.surface-section {
        background-color: #3f51b5 !important;
    }
    .text-gray-300 {
        color: #fffffe !important;
    }
    .surface-card {
        background-color: #fffffe !important;
    }
    .surface-ground {
        background-color: #eff0f3 !important;
    }
    .text-900 {
        color: #094067 !important;
    }
    .text-600 {
        color: #5f6c7b !important;
    }
    .text-700 {
        color: #fffffe !important;
    }
    .text-xl {
        color: #094067;        
    }`

    const logout = () => {
        setLogged(false)
        //Todo axios logout - Logout en backend
        navigate("../login", { replace: true })
        Toast.fire({icon:'success', title:'Has cerrado sesión correctamente'})
    }

    return (
        <div>
            {theme === 1 && (<style>{lightTheme}</style>)}
            <div className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border" style={{ height: '60px' }}>
                <div className="flex">
                    <StyleClass nodeRef={btnRef22} selector="#app-sidebar-5" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                        <a ref={btnRef22} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                            <i className="pi pi-bars text-4xl"></i>
                            <Ripple />
                        </a>
                    </StyleClass>
                    {/* <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" className="border-none" placeholder="Search" />
                </span> */}
                </div>
                <StyleClass nodeRef={btnRef23} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                    <a ref={btnRef23} className="p-ripple cursor-pointer block lg:hidden text-700">
                        <i className="pi pi-ellipsis-v text-2xl"></i>
                        <Ripple />
                    </a>
                </StyleClass>
                <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
                    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                    <li onClick={logout}>
                        <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-700 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                            transition-duration-150 transition-colors">
                            <i className="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i>
                            <span className="block lg:hidden font-medium">Cerrar sesión</span>
                            <Ripple />
                        </a>
                    </li>                    

                </ul>
            </div>
        </div>

    )
}

export default TopBat
















// <div
//         className="flex justify-content-between align-items-center px-5 border-bottom-1 relative lg:static border-white-alpha-10"
//         style={{ height: "60px" }}
//     >
//         <div className="flex">
//             <StyleClass
//                 nodeRef={btnRef38}
//                 selector="#app-sidebar-8"
//                 enterClassName="hidden"
//                 enterActiveClassName="fadeinleft"
//                 leaveToClassName="hidden"
//                 leaveActiveClassName="fadeoutleft"
//                 hideOnOutsideClick
//             >
//                 <a
//                     ref={btnRef38}
//                     className="p-ripple cursor-pointer block lg:hidden text-gray-300 mr-3"
//                 >
//                     <i className="pi pi-bars text-4xl"></i>
//                     <Ripple />
//                 </a>
//             </StyleClass>
//         </div>
//         <StyleClass
//             nodeRef={btnRef39}
//             selector="@next"
//             enterClassName="hidden"
//             enterActiveClassName="fadein"
//             leaveToClassName="hidden"
//             leaveActiveClassName="fadeout"
//             hideOnOutsideClick
//         >
//             <a
//                 ref={btnRef39}
//                 className="p-ripple cursor-pointer block lg:hidden text-gray-300"
//             >
//                 <i className="pi pi-ellipsis-v text-2xl"></i>
//                 <Ripple />
//             </a>
//         </StyleClass>

//         <ul
//             className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static px-3 py-3 lg:py-0 mr-3 lg:mr-0"
//             style={{
//                 backgroundImage:
//                     "linear-gradient(60deg, #29323c 0%, #485563 100%)",
//                 borderRadius: "30px",
//             }}
//         >
//             <li className="mr-0 lg:mr-3">
//                 <a
//                     className="p-ripple flex p-3 lg:p-2 align-items-center text-gray-300 hover:bg-bluegray-700 font-medium cursor-pointer
//           transition-duration-150 transition-colors"
//                     style={{ borderRadius: "30px" }}
//                 >
//                     <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
//                     <span className="block lg:hidden font-medium">Inbox</span>
//                     <Ripple />
//                 </a>
//             </li>
//             <li className="mr-0 lg:mr-3">
//                 <a
//                     className="p-ripple flex p-3 lg:p-2  align-items-center text-gray-300 hover:bg-bluegray-700 font-medium cursor-pointer
//           transition-duration-150 transition-colors"
//                     style={{ borderRadius: "30px" }}
//                 >
//                     <i
//                         className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"
//                         severity="danger"
//                     >
//                         <Badge severity="danger" />
//                     </i>
//                     <span className="block lg:hidden font-medium">
//                         Notifications
//                     </span>
//                     <Ripple />
//                 </a>
//             </li>
//             <li className="border-top-1 lg:border-top-none lg:mt-0 mt-2 lg:pt-0 pt-2 border-white-alpha-10">
//                 <a
//                     className="p-ripple flex p-3 lg:p-2  align-items-center hover:bg-bluegray-700 font-medium cursor-pointer
//           transition-duration-150 transition-colors"
//                     style={{ borderRadius: "30px" }}
//                 >
//                     <img
//                         src="assets/images/blocks/avatars/circle/avatar-f-1.png"
//                         className="mr-3 lg:mr-0"
//                         style={{ width: "32px", height: "32px" }}
//                     />
//                     <div className="block lg:hidden">
//                         <div className="text-gray-300 font-medium">
//                             Josephine Lillard
//                         </div>
//                         <span className="text-gray-500 font-medium text-sm">
//                             Marketing Specialist
//                         </span>
//                     </div>
//                     <Ripple />
//                 </a>
//             </li>
//         </ul>
//     </div>