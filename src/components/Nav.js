import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
    const [show, setShow] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
      window.addEventListener("scroll", () => {
        if(window.scrollY > 50){
            setShow(true)
        }else{
            setShow(false)
        }
      })
    
      return () => {
        window.removeEventListener("scroll", () => {})
      }
    }, [])
    const handleChange = (e) => {
      setSearchValue(e.target.value)
      navigate(`/search?q=${e.target.value}`)
    }

  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img
            alt = 'NetflixLogo'
            src= 'image/NetflixLogo.png'
            className='nav__logo'
            // onClick={() => (window.location.href = "/")}//페이지를 리프레시 하면서 홈으로 이동
            onClick={() => navigate("/")}
        />
        <input value={searchValue} onChange = {handleChange} className = "nav__input" type = "text" placeholder='영화를 검색해주세요.'/>
        <img
            alt = "User logo"
            src = '/image/User.png'
            className='nav__avatar'
        />
    </nav>
  )
}
