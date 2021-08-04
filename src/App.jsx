import Header from "./pages/Header"
import cls from './App.module.css'
import { Redirect, Route, Switch } from "react-router-dom"
import MalePage from "./pages/MainPage"
import General from './pages/General Page'
import Login from "./Auth/Login"
import Register from './Auth/Register'
import Footer from "./pages/Footer"
import HeartsList from "./components/HeartsList"
import SinglePage from "./pages/SinglePage"

const App = () => {
    return (
        <section className={cls.root}>
            <Header />
            <Switch>
                <Route exact component={General} path='/' />
                <Route component={MalePage} path='/products/:category' />
                <Route exact component={Login} path='/login' />
                <Route exact component={Register} path='/register'/>
                <Route component={SinglePage} path='/:gen/:cat/:id'/>
                <Route component={HeartsList} path='/heartList'/>
                <Redirect to='/'/>
            </Switch>
            <Footer/>
        </section>
    )
}

export default App