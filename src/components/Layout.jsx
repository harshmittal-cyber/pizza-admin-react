import {Link} from 'react-router-dom';
import Navbar from './Navbar'


const Layout=({children})=>{
    return (
        <section className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Navbar/>
        <div className="flex-lg-1 h-screen overflow-y-lg-auto">
          <nav className='navbar navbar-light position-lg-sticky top-lg-0 d-none d-lg-block overlap-10 flex-none bg-white border-bottom px-0 py-3'>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <h3>Dashboard</h3>      
            <Link to={"/settings"} className="btn btn-sm btn-square bg-tertiary bg-opacity-20 bg-opacity-100-hover text-tertiary text-white-hover">C</Link>
            </div>
          </nav>
          <main className='py-6 bg-surface-secondary'>
            <div className="container-fluid">
              {children}
            </div>
          </main>
        </div>
      </section>
    )
}

export default Layout