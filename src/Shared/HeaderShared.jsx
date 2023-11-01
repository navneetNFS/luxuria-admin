import { Dropdown } from 'react-bootstrap';
import DefaultUserProfile from '../assets/images/avatar.png'
import { useSelector } from 'react-redux/es';
import { selectCurrentUserIsVerified } from '../store/slices/auth-slice';
export default function Header() {
  const varified = useSelector(selectCurrentUserIsVerified)
  return (
    <>
      <header className="admin-header">
        <nav className="header_navbar">
          <div className="left_menu">
            {/* <form className="search_box" method="POST">
              <div className="search_select">
                <select name="searchtype" className="form-control border-0">
                  <option>Based On</option>
                </select>
                <i className='fa fa-caret-down select-icon'></i>
              </div>
              <div className="search_input">
                <input type="text" name="search" id="" className="form-control border-0 placeholder-normal" placeholder="Search Keyword" />
              </div>
              <button type="submit" className="search-btn text-primary"><i className="fa fa-search"></i></button>
            </form> */}
          </div>

          {
            varified ? <div className="right_menu">
              <button className="only-button text-primary-hover me-3"><i className="fa fa-bell-o"></i></button>
              <button className="only-button text-primary-hover me-3"><i className="fa fa-sun-o"></i></button>
              <Dropdown className='profile_dd'>
                <Dropdown.Toggle id="profileDD" className='btn-user'>
                  <img src={DefaultUserProfile} alt="admin" />
                </Dropdown.Toggle>

                <Dropdown.Menu className='profile_dd_menu'>
                  <Dropdown.Item href="/dashboard" className='profile-dd-item text-primary-hover'>My Profile</Dropdown.Item>
                  <Dropdown.Item href="/dashboard" className='profile-dd-item text-primary-hover'>Change Password</Dropdown.Item>
                  <Dropdown.Item href="/log-out" className='profile-dd-item text-primary-hover'>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> : ''
          }

        </nav>
      </header>
    </>
  )
}
