import { Outlet } from 'react-router-dom'
// import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { Header } from './header';
import { Navbar } from './Navbar';
const DashLayout = () => {
    console.log('DashLayout component rendered');
    return (
        <>
            <Header />
            <div className="dash-container">
                <Navbar />
                <Outlet />
            </div>
            {/* <DashFooter /> */}
        </>
    );
};
export default DashLayout;