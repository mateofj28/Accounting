import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog'
import { Password } from 'primereact/password'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../layout/Toast';
import { UserService } from '../../services/UserService';

const ForgotPass = () => {

    
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [email, setEmail] = useState('')
    const [visible, setVisible] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [validateToken, setValidateToken] = useState('')

    const userService = new UserService()
    const navigate = useNavigate()
    
    const onCancel = () => {
        setVisible(false)
        setValidateToken('')
    }

    const onCancelPassword = () => {
        setVisiblePassword(false)
        setPasswordOne('')
        setPasswordTwo('')
        setEmail('')
    }

    const onUser = async(e) => {
        e.preventDefault()
        if(email.trim() === ''){
            Toast.fire({icon:'error', title:'Ingresa tu email...'})
            return;
        }
        const data = {
            email: email,
        }
        const res = await userService.forgotPassword(data)
        if(res.status === 201){
            Toast.fire({icon:'error', title:res.data.message || 'Upss! ocurrio un error, intenta nuevamente.'})
            return;
        }
        console.log(res)
        Toast.fire({icon:'success', title:'Código enviado correctamente...'})
        setVisible(true)
    }
    
    const onValidateToken = async(e) => {
        e.preventDefault()
        if(validateToken.trim() === ''){
            Toast.fire({icon:'error', title:'Ingresa el código que se te envio...'})
            return
        }
        const data = {
            email:email,
            token:validateToken
        }
        const res = await userService.validateTokenForgot(data)
        if(res.status === 201){
            Toast.fire({icon:'error', title:res.data.message || 'Upss! ocurrio un error, intenta nuevamente.'})
            return;
        }
        console.log(res)
        Toast.fire({icon:'success', title:'Usuario validado correctamente...'})
        onCancel()
        setVisiblePassword(true)
    }

    const onNewPassword = async(e) => {
        e.preventDefault()
        if(passwordOne.trim() === "" || passwordTwo.trim() === ""){
            Toast.fire({icon:'error', title:'No dejes espacios en blanco'})
            return
        }
        if(passwordOne !== passwordTwo){
            Toast.fire({icon:'error', title:'Las contraseñas deben coincidir'})
            return
        }
        const data = {
            email:email,
            password:passwordOne
        }
        const res = await userService.setPassword(data)
        console.log(res)
        if(res.status === 201){
            Toast.fire({icon:'error', title:res.data.message || 'Upss! ocurrio un error, intenta nuevamente.'})
            return;
        }

        console.log(data)
        Toast.fire({icon:'success', title:'Contraseña creada correctamente...'})
        onCancelPassword()
        setTimeout(()=> {
            navigate('/login')
        },1000)
    }

    return (
        <div className='flex align-items-center' style={{ 'height': '100vh', background: '#232323' }}>
            <Dialog
            visible={visible}
            onHide={()=>setVisible(false)}
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
                      label="Validar"
                      onClick={onValidateToken}
                      className="w-12 p-button-success"
                    />
                </div>
              }>
            <div>
                <p className='text-center' style={{color:'#fff', fontWeight:'600', fontSize:'30px'}}>Valida tu email</p>
                <p className='text-center' style={{color:'#fff9'}}>Ingresa el <strong>CÓDIGO</strong> para validar que si eres tu.</p>
                <InputText className="mt-1 block mb-3" value={validateToken} onChange={(e) => setValidateToken(e.target.value)} placeholder='Ingresa tu código' />
            </div>

            </Dialog>

            <Dialog
            visible={visiblePassword}
            onHide={()=>setVisiblePassword(false)}
            modal
            style={{width:'30em'}}
            showHeader={false}
            baseZIndex={99}
            footer={
                <div className=" border-top-1 surface-border pt-3 flex">
                    <Button
                      icon="pi pi-times"
                      label="Cerrar"
                      onClick={onCancelPassword}
                      className="w-12 p-button-danger"
                    />
                    <Button
                      icon="pi pi-check"
                      label="Guardar"
                      onClick={onNewPassword}
                      className="w-12 p-button-success"
                    />
                </div>
              }>
            <div>
                <p className='text-center' style={{color:'#fff', fontWeight:'600', fontSize:'30px'}}>Crea tu nueva contraseña</p>
                <p className='text-center' style={{color:'#fff9'}}>Ingresa tu nueva contraseña.</p>
                <Password className="mt-1 block mb-6" value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)} placeholder='Nueva contraseña' />
                <Password className="mt-1 block mb-4" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} placeholder='Repite tu contraseña' />
            </div>

            </Dialog>

            <div className='col-12  flex justify-content-center mb-7'>
                <div className='surface-card shadow-6 p-6' style={{ borderRadius: '18px', width:'30em'}}>
                    <div className='flex justify-content-center'>
                        <img src="assets/images/blocks/logos/lock.png" alt="hyper" height={100} />
                    </div>
                    <h2 className='text-center' style={{ color: '#fffffe' }}>¿Olvidaste tu contraseña?</h2>
                    <p className='text-center' style={{color:'#fff9'}}>Ingresa tu <strong>EMAIL</strong> para crear una nueva contraseña</p>
                    <InputText className="mt-1 block mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ejemplo@email.com' />
                    <Button label="CONTINUAR" className="p-button-raised w-full mt-3 p-3" onClick={(e) => onUser(e)} />
                    <Button label="REGRESAR" className="p-button-raised w-full mt-3 p-3 " onClick={(e) => navigate('../login', {replace: true})} style={{ background: '#f45d48', border: '#f45d48'}}/>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass 