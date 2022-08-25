import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Toast } from "../layout/Toast"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import License from "../../services/LicenseServices"

const DialogLicense = ({setViewLicense, viewLicense}) => {
    const [licenseDetails, setLicenseDetails] = useState([])
    const licenseServices = new License()
    
    const onCancel = () => {
        setViewLicense(false)
    }

    const licenseDetail = async() => {
        const res = await licenseServices.getLicenseDetail()
        console.log(res.data)
        setLicenseDetails(res.data)
    }

    useEffect(()=> {
        licenseDetail()
    },[])


  return (
        <Dialog
            visible={viewLicense}
            onHide={()=>setViewLicense(false)}
            modal
            style={{width:'30em'}}
            showHeader={false}
            footer={
                <div className=" border-top-1 surface-border pt-3 flex">
                    <Button
                      icon="pi pi-times"
                      label="Cerrar"
                      onClick={onCancel}
                      className="w-12 p-button-danger"
                    />
                </div>
              }
        >
            <div className="text-center">
                {licenseDetails.status === "1"
                ? <h1 style={{color:'#35FC08'}}><i className="pi pi-check-circle mr-2" style={{fontSize:'30px'}}></i>Licencia Habilitada</h1>
                : <h1 style={{color:'#EB1900'}}><i className="pi pi-times-circle mr-2" style={{fontSize:'30px'}}></i>Licencia Deshabilitada</h1>
                }
            </div>
                <div>
                    <p style={{color:'#fff'}}><i className="pi pi-calendar-times mr-3" style={{color:'#fff', fontSize:'20px'}}></i>Fecha de expiración : <span>{licenseDetails.expiration || 'Indefinido'}</span></p>
                    <p style={{color:'#fff'}}><i className="pi pi-users mr-3" style={{color:'#fff', fontSize:'20px'}}></i>Usuarios permitidos : <span style={{padding:"1px 5px", borderRadius:'5px', fontWeight:'600'}}>{licenseDetails.allowUsers || 0}</span></p>
                </div>
                <hr />
                <div className="text-center">
                <small style={{color:'#fff9'}}>Si tienes problemas o requieres mas información ponte en contacto con <strong>administración</strong></small>
                </div>
        </Dialog>
  )
}

export default DialogLicense