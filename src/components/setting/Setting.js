import { Avatar } from "primereact/avatar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DialogCompany from "./DialogCompany"
import DialogLicense from "./DialogLicense"


const Setting = () => {
    const [viewLicense, setViewLicense] = useState(false)
    const [viewCompany, setViewCompany] = useState(false)

    const navigate = new useNavigate()

    return (
        <div className="flex align-items-start justify-content-center" style={{ height: '100vh' }}>
            <DialogLicense setViewLicense={setViewLicense} viewLicense={viewLicense} />
            <DialogCompany setViewCompany={setViewCompany} viewCompany={viewCompany} />
            <div className="flex justify-content-center">
                <div className="col-12 p-2">
                    <div className="shadow-2 surface-card border-round p-4 h-full">
                        <div className="grid">
                            <div className="col-6 shadow-2 mt-3">
                                <div className="cursor-pointer" onClick={() => navigate('../userCompany', { replace: true })}>
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-user" className="mr-2" size="xlarge" />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Usuarios</h2>
                                </div>
                            </div>
                            <div className="col-6 shadow-2 mt-3" onClick={()=>setViewLicense(true)}>
                                <div className="cursor-pointer">
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-key" className="mr-2" size="xlarge" style={{ backgroundColor: '#e53170', color: '#ffffff' }} />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Licencias</h2>
                                </div>
                            </div>
                            <div className="col-6 shadow-2 mt-3">
                                <div className="cursor-pointer" onClick={() => navigate('../bank', { replace: true })}>
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-dollar" className="mr-2" size="xlarge" style={{ backgroundColor: '#a786df', color: '#ffffff' }} />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Cuentas</h2>
                                </div>
                            </div>
                            <div className="col-6 shadow-2 mt-3" onClick={()=>setViewCompany(true)}>
                                <div className="cursor-pointer" >
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-building" className="mr-2" size="xlarge" style={{ backgroundColor: '#bae8e8' }} />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Compañia</h2>
                                </div>
                            </div>
                            {/* <div className="col-6 shadow-2 mt-3" onClick={()=> navigate('../dueExpenses', {replace: true})}>
                                <div className="cursor-pointer" >
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-arrow-circle-up" className="mr-2" size="xlarge" style={{ backgroundColor: '#e16162' }} />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Por Pagar</h2>
                                </div>
                            </div>
                            <div className="col-6 shadow-2 mt-3" onClick={()=> navigate("../dueIncome", {replace: true})}>
                                <div className="cursor-pointer" >
                                    <div className="flex justify-content-center">
                                        <Avatar icon="pi pi-arrow-circle-down" className="mr-2" size="xlarge" style={{ backgroundColor: '#fde24f' }} />
                                    </div>
                                    <h2 className="text-center" style={{ color: '#fffffe' }}>Por Cobrar</h2>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting