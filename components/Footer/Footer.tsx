import { colorsAux } from '@/styles/colorsAux'
import React from 'react'
import { Logo } from '../icons'

const Footer = () => {
    return (
        <footer style={{backgroundColor: colorsAux.darkprimary}} className="w-full flex items-center justify-center md:justify-start py-10 md:pl-20">
            <div className='flex flex-col items-center gap-4 text-white'>
                <Logo width={60} heigth={60}/>
                <div className='flex justify-center'>
                    <p>{new Date().getFullYear()} - Todos los derechos reservados ©</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer