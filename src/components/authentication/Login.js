import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { Divider } from "primereact/divider";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';

import { Carousel } from 'primereact/carousel';
import { Toast } from '../layout/Toast';

const Login = ({ setLogged, getDataCompany }) => {
    const userService = new UserService()

    const features = [
        { title: 'Dashboard', image: 'live-collaboration.svg', text: 'Obtén un resumen de todos tus movimientos, datos y demás información importante para un mejor control y organización de tu empresa.' },
        { title: 'Control de usuarios', image: 'security.svg', text: 'Puedes crear, editar y eliminar usuarios, tendras el control de mejorar el rendimiento de tu equipo.' },
        { title: 'Ingresos y egresos', image: 'subscribe.svg', text: 'Maneja, vigila y controla las finanzas de tu empresa para un crecimiento mas optimo.' }
    ];

    const navigate = useNavigate()

    const onLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email === "" || password === "") {
            Toast.fire({icon: 'error',title: 'Debes rellenar el email y la password'})
            return;
        }
        const login = {
            email: email,
            password: password
        }
        const res = await userService.login(login)
        if (res.status === 201) {
            Toast.fire({icon: 'error',title: res.data.message})
            return;
        }
        if(res.status !== 200 && res.status !== 201){
            Toast.fire({icon:'success', title:'Upss!, error, intenta nuevamente...'})
            return;
        }
        if(res.status === 200){
            Toast.fire({icon:'success', title:'Has iniciado sesión correctamente'})
            getDataCompany(res.data.company)
            sessionStorage.setItem('token', res.data.token)
            setLogged('true')
            navigate('../', { replace: true })
        }
    }

    return (
        <>

            <div className='contabilidad'>
                <div className="px-4 py-8 md:px-6 lg:px-8">
                    <div className="flex flex-wrap shadow-2">

                        <div className="transparencia w-full lg:w-6 px-0 py-4 lg:p-7">
                            <Carousel value={features} itemTemplate={(feature) =>
                                <div className="text-center mb-8">
                                    <img src={`assets/images/blocks/illustration/${feature.image}`} alt="Image" className="mb-6 w-6" />
                                    <div className="mx-auto font-medium text-2xl mb-4 text-blue-400">{feature.title}</div>
                                    <p className="m-0 text-white line-height-3">{feature.text}</p>
                                </div>} />
                        </div>

                        <div className="w-full lg:w-6 p-4 lg:p-7 surface-card">
                            <div className="flex align-items-center justify-content-between mb-7">
                                <span className="text-2xl font-medium text-900">Iniciar sesión</span>
                                <a tabIndex="0" className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150" onClick={() => navigate('../addUser', { replace: true })} >Crear una cuenta.</a>
                            </div>
                            <form onSubmit={onLogin}>
                                <label htmlFor="email4" className="block text-900 font-medium mb-2">Correo Electronico</label>
                                <InputText id="email4" type="text" name='email' className="w-full mb-3 p-3" placeholder='Login Email' />

                                <label htmlFor="password4" className="block text-900 font-medium mb-2">Contraseña login</label>
                                <InputText id="password4" type="password" name='password' className="w-full mb-3 p-3" placeholder='******' />

                                <div className="flex align-items-center justify-content-between mb-5">
                                    <a className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150" onClick={() => navigate('../forgotPassword', { replace: true })} >¿Olvidaste tu contraseña?</a>
                                </div>
                                <Button label="Inicia sesión" className="w-full py-3 font-medium" />
                                <Divider align="center" className="my-2">
                                    <span className="text-600 font-normal text-sm px-2" style={{background:'#16161a'}}>O</span>
                                </Divider>
                                <div className='flex justify-content-center'>
                                    <a className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150" onClick={() => navigate('../auth', { replace: true })} >Activa tu cuenta</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login 