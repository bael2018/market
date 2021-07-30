import { NavLink , Link } from "react-router-dom"
import cls from "./Header.module.css"
import {BiBasket} from 'react-icons/bi'
import {GiClothes} from 'react-icons/gi'
import { AiOutlinePhone } from 'react-icons/ai'
import { FaMapMarkerAlt , FaSignInAlt , FaSignOutAlt } from 'react-icons/fa'
import { useEffect, useState } from "react"
import { fire } from "../../services/firebase"
import { getClothes } from "../../api"
import {arrayFunc, singleArray} from '../../components/ArrayFunc'

const Header = () => {
    const [scroll , setScroll] = useState(false)
    const [confirm , setConfirm] = useState(false)
    const [categories , setCategories] = useState([])

    const localUser = JSON.parse(localStorage.getItem('user'))

    const singOutBtn = e => {
        e.preventDefault()
        setConfirm(!confirm)
    }

    const [searchInput , setSearchInput] = useState('')
    const [searchData , setSearchData] = useState([])

    useEffect(() => {
        getClothes('products.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const searchBase = arrayFunc(r)
            const newSearchBase = searchBase.filter(item => item.name.toUpperCase().includes(searchInput.toUpperCase()))
            setSearchData(newSearchBase)
        })
    } , [searchInput])

    const signOutBtnConfirm = e => {
        e.preventDefault()
        fire.auth().signOut()
        localStorage.removeItem('user')
        setConfirm(!confirm)
        window.location.reload()
    }

    useEffect(() => {
        getClothes('categories.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const newCategories = singleArray(r)
            setCategories(newCategories)
        })
    } , [])
    
    window.onscroll = () => {
        if(window.scrollY > 70){
            setScroll(true)
        }else{
            setScroll(false)
        }
    }

    const [heartCount , setHeartCount] = useState([])

    if(localStorage.getItem('user')){
        getClothes('users/' , `${localUser}/` , 'cards.json')
        .then(res => res.json())
        .then(r => {
            if(r !== null){
                const heartsBase = arrayFunc(r)
                setHeartCount(heartsBase)
            }
        })
    }

    return (
        <>
            <div onClick={signOutBtnConfirm} className={`${!confirm ? cls.confirmDelete : cls.confirmDelete_alt}`}>
                <span>Хотите выйти?</span>
            </div>
            <div className={cls.header_upper}>
                <div>
                    <ul className={scroll ? cls.contacts_delete : null}>
                        <li>
                            <AiOutlinePhone/>
                            +996 700 450 450
                        </li>
                        <li>
                            <FaMapMarkerAlt/>
                            Чуй, улица 720001
                        </li>
                    </ul>
                    {
                        scroll && (
                            <div className={cls.fixedBar}>
                                <span>
                                    <NavLink activeClassName={cls.clotheBtn} exact to='/'>
                                        Главная
                                    </NavLink>
                                </span>
                                {
                                    categories.map((item , index) => {
                                        return (
                                            <span>
                                                <NavLink key={index} activeClassName={cls.clotheBtn} exact to={`/products/${item}`}>
                                                    {item} <GiClothes/>
                                                </NavLink>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        )
                    }

                    <ul className={cls.header_upper_links}>
                        <li>
                            <Link to='/heartList'><BiBasket/></Link>
                            {heartCount.length === 0 ? null : <span>{heartCount.length}</span>}
                        </li>
                        {
                            localUser === null ? (
                                <li>
                                    <NavLink exact to='/login'>
                                        <FaSignInAlt/>
                                    </NavLink>
                                </li>
                            ) : (
                                 <li onClick={singOutBtn}>
                                    <FaSignOutAlt/>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className={cls.header_middle}>
                <div className={cls.header_middle_wrap}>
                    <ul>
                        <li>
                            <NavLink activeClassName={cls.clotheBtn} exact to='/'>
                                Главная
                            </NavLink>
                        </li>
                        {
                            categories.map((item , index) => {
                                return (
                                    <li>
                                        <NavLink key={index} activeClassName={cls.clotheBtn} exact to={`/products/${item}`}>
                                            {item} <GiClothes/>
                                        </NavLink>
                                    </li>
                                )
                            })
                      }
                    </ul>
                    <ul>
                        <li>
                            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder='Поиск' type="text" />
                            <div className={searchInput === '' ? cls.searchContainerActive : cls.searchContainer}>
                                {
                                    searchData.length === 0 ? (
                                        <h1 className={cls.emptySearch}>Ничего нету</h1>
                                    ) : (
                                        searchData.map(({img , id , name , category , subCategory}) => {
                                            return  <div key={id} className={cls.searchInner}>
                                            <img src={img} alt="img" />
                                            <Link onClick={() => setSearchInput('')} to={`/${category}/${subCategory}/${id}`} >
                                                {name}
                                            </Link>
                                        </div>
                                        })
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cls.header_lower}>
                Только до 30 Сентября скидки до 30%
            </div>  
        </>
    )
}

export default Header

