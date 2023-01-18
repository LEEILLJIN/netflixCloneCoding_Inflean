import requests from './api/requests';
import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Row from './components/Row';
import {Outlet, Route, Routes} from "react-router-dom"
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';


const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet />
      {/* outlet자리에 자식컴포넌트가 레이아웃화 되어 나타난다. */}
      <Footer/>
    </div>
  )
}
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path=':movieId' element={<DetailPage/>}/>
          <Route path='search' element={<SearchPage/>}/>


        </Route>
      </Routes>
    </div>
  );
}

export default App;
