import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

import { Steps } from 'primereact/steps';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import CredentialSteps from "./CredentialSteps";
import EnterpriseSteps from "./EnterpriseSteps";
import PersonalSteps from "./PersonalSteps";
import { Toast } from '../layout/Toast';

const User = () => {
    const [activeIndex, setActiveIndex] = useState(0);    
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [identification, setIdentification] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [axiPassword, setAxiPassword] = useState('')
    const [userId, setUserId] = useState('')     
    const [enterpriseName, setEnterpriseName] = useState('')
    const [licencia, setLicencia] = useState('')
    const userServices = new UserService()
    const navigate = useNavigate()
    const [background, setBackground] = useState('#242629')
    

    const items = [
        {
            label: 'Personal',
            command: (event) => {
                
            }
        },
        {
            label: 'Credenciales',
            command: (event) => {
                
            }
        },
        {
            label: 'Empresa',
            command: (event) => {
                
            }
        },
    ];

    const getInfo = () => {
        switch (activeIndex) {
            case 0:
                return <PersonalSteps name={name} setName={setName} lastName={lastName} setLastName={setLastName} identification={identification} setIdentification={setIdentification} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
                break
            case 1:
                return <CredentialSteps password={password} setPassword={setPassword} axiPassword={axiPassword} setAxiPassword={setAxiPassword}  />
                break
            case 2:
                return <EnterpriseSteps enterpriseName={enterpriseName} setEnterpriseName={setEnterpriseName} licencia={licencia} setLicencia={setLicencia}/>
                break
        }
    }

    const clearAll = () => {
        setName('')
        setLastName('')
        setEmail('')
        setIdentification('')
        setPhone('')
        setPassword('')
        setAxiPassword('')
        setEnterpriseName('')
        setLicencia('')
    }

    const onNextSteps = async (e) => {
        e.preventDefault()

        if (activeIndex === 0){
            if(name === "" || lastName === "" || identification === "" || email === "" || phone === ""){
                Toast.fire({
                    icon:'error',
                    title:'Por favor complete los datos para continuar'
                })
                return
            }        
        }

        if (activeIndex === 1){
            if ( password !== "" || axiPassword !== "" ){

                if (password === axiPassword){
                    
                    const user = {
                        name: name,
                        lastName: lastName,
                        identification: identification,
                        email: email,
                        password: password,
                        phoneNumber: phone
                    }
        
                    console.log(user)
                    
                    const res = await userServices.createUser(user)
                    console.log(res.data._id)
                    setUserId(res.data._id)    
                }else {
                    Toast.fire({
                        icon:'error',
                        title:'Las contraseñas no coinciden.'
                    })
                    return
                }            
            }else {
                Toast.fire({
                    icon:'error',
                    title:'Por favor ingrese y valide las contraseñas.'
                })
                return
            }            
        }

        if (activeIndex === 2){

            if (licencia !== "" && enterpriseName !== ""){
                
                const company = {
                    name: enterpriseName,
                    ownerId: userId,
                    license: licencia
                }

                console.log(company)

                const res = await userServices.createCompany(company)

                if(res.status === 201){
                    Toast.fire({
                        icon:'error',
                        title:'Licencia inválida, comunicate con el admin.'
                    })
                    setLicencia("")
                    return
                }

                clearAll()

                navigate('../login', {replace: true})
            }else {
                Toast.fire({
                    icon:'error',
                    title:'Por favor ingresa nombre y licencia.'
                })
            }
            return
        }

        
        setActiveIndex((activeIndex+1))

        if (activeIndex === 1){ setBackground('#2d334a')}
    }

    return (
        <div className='flex align-items-center' style={{ 'height': '100vh', background: background }}>
            <div className='col-12  flex justify-content-center mb-7'>
                <div className='surface-card col-11 lg:col-5 p-4 shadow-2'>
                    <Button icon="pi pi-arrow-left" className="p-button-raised p-2 mb-5" onClick={()=>navigate('/login')}/>
                    <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={true} />
                    <div className="mt-3">
                        { getInfo() }
                        <Button label="CONTINUAR" className="p-button-raised w-full mt-3 p-3" onClick={(e)=> onNextSteps(e)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User 