import Sidebar from "./SideBar";
import '../css/Layout.css'

const Layout = ({ children }: any) => {
  return (
    <>
    <div className="h-100 d-flex flex-row">
        <div className="side-bar">
            <Sidebar />
        </div>
        <div style={{width: "80%"}}>
          <div className="main-header">
              <h2>Header</h2>
          </div>
          <div className="main-container">
              {children}
          </div>
        </div>
    </div>
    </>
  );
};

export default Layout;