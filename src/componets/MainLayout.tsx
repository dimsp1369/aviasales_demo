import React, {FC} from 'react';
import logo from '../assets/img/Logo.svg'


const MainLayout: FC = ({children}) => {
    return (
        <div className={'MainLayout'}>
            <img src={logo} alt="Logo"/>
            <div className={'MainLayout__Content'}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
