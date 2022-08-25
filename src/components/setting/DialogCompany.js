import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { Toast } from "../layout/Toast"
import { InputText } from "primereact/inputtext"
import { UserService } from "../../services/UserService"
import { useEffect, useState } from "react"

const DialogCompany = ({setViewCompany, viewCompany}) => {

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const userService = new UserService()

    const onCancel = () => {
      setViewCompany(false)
    }

    const onSubmit = async() => {
      if(name.trim() === '' || url.trim() === ''){
        Toast.fire({icon:'error', title:'No dejes espacios en blanco'})
        return; 
      }
      const data = {
        logoUrl:url,
        name:name
      }
      const res = await userService.editCompany(data)
      if(res.status === 201){
        Toast.fire({icon:'error',title:res.data.message || 'Ha ocurrido un error, intenta nuevamente'})
        return
      }
      console.log(res)

      setViewCompany(false)
      onCancel()
      Toast.fire({icon:'success',title:'Cambios guardados correctamente'})
        window.location.reload()
    }

    const getCompanyDetails = async() => {
      const res = await userService.companyDetails()
      console.log(res.data)
      setName(res.data.name)
      setUrl(res.data.logo)
    }

    useEffect(()=> {
      getCompanyDetails()
    },[])

  return (
        <Dialog
            visible={viewCompany}
            onHide={()=>setViewCompany(false)}
            modal
            style={{width:'30em'}}
            showHeader={false}
            baseZIndex={99}
            footer={
                <div className=" border-top-1 surface-border pt-3 flex">
                    <Button
                      icon="pi pi-times"
                      label="Cerrar"
                      onClick={onCancel}
                      className="w-12 p-button-danger"
                    />
                    <Button
                      icon="pi pi-check"
                      label="Guardar"
                      onClick={onSubmit}
                      className="w-12"
                    />
                </div>
              }>
                <div>
                    <h1 className="text-center" style={{color:'#fff'}}>Edita tu compañia</h1>
                    <div>
                        <label htmlFor="name" style={{fontSize:'20px', color:'#fff'}}>Nombre</label>
                        <InputText id="name" className="mt-2 mb-4" placeholder="Nuevo nombre" value={name || ''} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="logo" style={{fontSize:'20px', color:'#fff'}}>Logo</label>
                        <InputText id="logo" className="mt-2 mb-4" placeholder="URL" value={url || ''} onChange={(e)=>setUrl(e.target.value)} />
                    </div>
                </div>
        </Dialog>
  )
}

export default DialogCompany