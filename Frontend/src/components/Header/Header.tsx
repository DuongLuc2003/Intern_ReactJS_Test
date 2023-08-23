import React , {useRef,useEffect,useState}from 'react';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import './header.css';
import { motion }from "framer-motion"
import { Container, Row } from 'reactstrap';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import {useSelector}from 'react-redux'
import  useAuth  from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
const nav__links = [
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'cart',
    display:'Cart'
  },
]
  const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser}:any = useAuth()
  const totalQuantity = useSelector((state:any) => state.cart.totalQuantity)
  const profileActionRef:any = useRef(null)
  const [isProfileActionsVisible, setIsProfileActionsVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const handleProfileClick = () => {
    setIsProfileActionsVisible(!isProfileActionsVisible);
  };
  useEffect(() => {
    if (currentUser) {
      setAvatarUrl(currentUser.photoURL);
    }
  }, [currentUser]);
  const logout = () => {
    signOut(auth).then(()=>{
       toast.success('Logged out')
       navigate('/home')
    }).catch(err=> {
       toast.error(err.message)
    })
  }
  const navigateToCart = () => {
    navigate("/cart")
  }
  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle('show__profileActions');
  };
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            <div className='navigation'>
              <ul className='menu'>
                {
                  nav__links.map((item,index)=>(
                    <li className='nav_item' key={index}><NavLink to={item.path} 
                    className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink></li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className='fav__icon'>
                <i className="ri-heart-line"></i>
                <span className='badge'>0</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}><i className="ri-shopping-bag-line"></i> <span className='badge'>{totalQuantity}</span></span>
              <div className='profile'>
                <motion.img
               whileTap={{scale:1.3}} 
               src={avatarUrl ? avatarUrl : userIcon}
               alt="" 
               onClick={handleProfileClick}
               />
             {isProfileActionsVisible && (
                  <div className='profile__actions' ref={profileActionRef} >
                    {currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'> 
                        <Link to='/signup'>Signup</Link>
                        <Link to='/signin'>Signin</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
