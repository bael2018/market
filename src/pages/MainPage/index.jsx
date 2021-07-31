import cls from "./MainPage.module.css"
import { BsChevronDown } from 'react-icons/bs'
import { BiBasket }from 'react-icons/bi'
import { useEffect, useState } from "react"
import { createNewClothes, getClothes } from "../../api"
import { Link, useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { arrayFunc, clothedId } from "../../components/ArrayFunc"

const MainPage = () => {
    const [clothe , setClothe] = useState()
    const [title , setTitle] = useState('')
    const [content , setContent] = useState(['Gj'])
    const [view , setView] = useState(true)
    const { category } = useParams();
    const [loading , setLoading] = useState(false)
    const [changePrize , setChangePrize] = useState(false)
    const [minPrize , setMinPrize] = useState('')
    const [maxPrize , setMaxPrize] = useState('')
    const [searchPrice , setSearchPrice] = useState(false)
    const OFFSET = 9
    const [offset , setOffset] = useState(0)
    const [clotheAmount , setClotheAmount] = useState(OFFSET)
    const [checkLength , setCheckLength] = useState([])

    const [hasLength , setHasLength] = useState(false)
    const el = () => {
        setChangePrize(!changePrize)
        setSearchPrice(!searchPrice)
    }
    const moveForwards = () => {
        setOffset(offset + OFFSET)
        setClotheAmount(clotheAmount + OFFSET)
    }
    const moveBack = () => {
        setOffset(offset - OFFSET)
        setClotheAmount(clotheAmount - OFFSET)
    }

    const [heart , setHeart] = useState([])

    const elems = JSON.parse(localStorage.getItem('user'))
    getClothes('users/' , `${elems}/` , 'cards.json')
        .then(res => res.json())
        .then(r => {
        if(r !== null){
            const dataBase = clothedId(r)
            setHeart(dataBase)
        }
    })

    const [subCategories , setSubCategories] = useState([])
    useEffect(() => {
        getClothes('products.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const defaults = arrayFunc(r)
            const defaultTitle = defaults.filter(item => item.category === category)
            setClothe(defaultTitle[0].subCategory)
            setTitle(defaultTitle[0].subCategory)
        })
    } , [category])

    useEffect(() => {
        getClothes('products.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const newData = arrayFunc(r)
            const filteredArraySub = newData.filter(item => item.category === category)
            const filterOne = filteredArraySub.map(({subCategory}) => {
                return {
                    subCategory
                }
            })
            const newArr = [];
            filterOne.forEach(item =>{
                if(newArr.indexOf(item.subCategory) < 0){
                    newArr.push(item.subCategory)
                }
            })
            setSubCategories(newArr)
            const Base = filteredArraySub.filter(item => item.subCategory === clothe)
            if(Base.length < 9){
                setHasLength(false)
                if((minPrize === '' && maxPrize === '') || (JSON.parse(minPrize) > JSON.parse(maxPrize))){
                    setContent(Base)
                }else{
                    const filteredArray = Base.filter(item => item.price > JSON.parse(minPrize) && item.price < JSON.parse(maxPrize))
                    setContent(filteredArray)
                }
            }else{
                setHasLength(true)
                setCheckLength(Base)
                const newBase = Base.slice(offset , clotheAmount)
                if((minPrize ==='' && maxPrize ==='') || (JSON.parse(minPrize) > JSON.parse(maxPrize))){
                    setContent(newBase)
                }else{
                    const filteredArray = newBase.filter(item => item.price > JSON.parse(minPrize) && item.price < JSON.parse(maxPrize))
                    setContent(filteredArray)
                }
            }
        })
    } , [clothe , category , searchPrice , clotheAmount])  

    const [warningAlert , setWarningAlert] = useState(false)

    const heartbtn = product => {
        if(!localStorage.getItem('user')){
            setWarningAlert(!warningAlert)
            setTimeout(() => {
                setWarningAlert(false)
            }, 3000);
        }else{
            const userId = JSON.parse(localStorage.getItem('user'))
            createNewClothes(product, 'users/' , `${userId}/` , 'cards.json')
        }
    }

    return (
        <section className={cls.male_container}>
            <div className={warningAlert ? `${cls.alert} , ${cls.activeAlert}` : `${cls.alert}` }>Пройдите авторизацию</div>
            <div className={cls.male_container_wrapper}>
                <div className={cls.male_container_wrapper_header}>
                    <span className={cls.male_container_wrapper_header_title}>
                        {title}
                    </span>
                    
                    <div className={cls.male_container_wrapper_header_block}>
                        <ul>
                            <li className={cls.prizeContainer}>
                                <span onClick={() => setChangePrize(!changePrize)}>Цена <BsChevronDown/></span>
                                <div className={changePrize ? `${cls.prizeAppear}` : null}>
                                    <input value={minPrize} onChange={e => setMinPrize(e.target.value)} placeholder="от 0" type="text" />
                                    <input value={maxPrize} onChange={e => setMaxPrize(e.target.value)} placeholder="до 50000" type="text" />
                                    <span onClick={el}>принять</span>
                                </div>
                            </li>
                        </ul>

                        <div className={cls.changeView}>
                            {
                                view ? (
                                    <>
                                        <button className={cls.male_container_wrapper_header_block_view} onClick={() => setView(true)}><span></span><span></span><span></span></button>
                                        <button onClick={() => setView(false)}><span></span><span></span></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setView(true)}><span></span><span></span><span></span></button>
                                        <button className={cls.male_container_wrapper_header_block_view} onClick={() => setView(false)}><span></span><span></span></button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div> 

                <div className={cls.male_container_wrapper_body}>
                    {
                        loading ? (
                            <Loader/>
                        ) : (   
                            <>
                                {
                                    content.map(item => {
                                        return  <div key={item.id} className={view ? `${cls.male_container_wrapper_body_child}` : `${cls.male_container_wrapper_body_child_alt}`}>
                                        <div className={cls.male_container_wrapper_body_child_header}>
                                            <Link to={`/${category}/${clothe}/${item.id}`}>подробнее</Link>
                                            <img src={item.img} alt="img" />
                                        </div>
                                        <div className={cls.male_container_wrapper_body_child_content}>
                                            <span>
                                                {item.price}$
                                                <BiBasket className={
                                                    heart.map(({id}) => {
                                                        return `
                                                            ${id === item.id ? cls.activeHeart : null}
                                                        `
                                                    })
                                                } onClick={() => heartbtn(item)}/>
                                            </span>
                                            <h3>{item.name}</h3>
                                        </div>  
                                    </div>
                                    })
                                }
                                {
                                    hasLength ? (
                                        <div className={cls.btnContainer}>
                                            <button className={`${offset === 0 ? cls.disabledBtn : null}`} onClick={moveBack}>назад</button>
                                            <button className={`${clotheAmount >= checkLength.length ? cls.disabledBtn : null}`} onClick={moveForwards}>вперед</button>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                
                            </>
                        )
                    }
                </div>
            </div>

            <div className={cls.male_container_qualities}>
                <h4>Одежда</h4>
                <ul>
                    {
                        subCategories.map((item , index) => (
                            <li key={index} onClick={() => setClothe(item)}><span onClick={() => setTitle(item)}>{item}</span></li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default MainPage