import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import CreateAccount from './pages/CreateAccount';
import NewPassPage from './pages/NewPassPage';
import OtpPage from './pages/OtpPage';
import MainPage from './pages/MainPage';
import Profile from "./pages/Profile"
import EditProfile from './pages/EditProfile';
import TreadPage from './pages/TreadPage';
import SearchProfilePage from './pages/SearchProfilePage';
import ActivityPage from './pages/ActivityPage';
import OtpPageReg from './pages/OtpRegPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ReplyPage from './pages/ReplyPage';
import QuotePage from './pages/QuotePage';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/forgot' element={<ForgotPass/>}/>
    <Route path='/create' element={<CreateAccount/>}/>
    <Route path='/newpass' element={<NewPassPage/>}/>
    <Route path='/otp' element={<OtpPage/>}/>
    <Route path='/otpreg' element={<OtpPageReg/>}/>
    <Route path='/confirmemail' element={<ConfirmEmailPage/>}/>
    <Route path='/main' element ={<MainPage/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/editprof' element={<EditProfile/>}/>
    <Route path='/tread/:id' element={<TreadPage/>}/>
    <Route path='/searchprof/:id' element={<SearchProfilePage/>}/>
    <Route path='/activity' element={<ActivityPage/>}/>
    <Route path='/replypost/:id' element={<ReplyPage/>}/>
    <Route path='/quote/:id' element={<QuotePage/>}/>
    <Route path='/test' element = {<Test/>}/>
   </Routes>
    </div>
  );
}

export default App;


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// Если бы мне сказали, что поцеловав тебя я попаду в ад, то я бы это сделал. Сделал, чтоб хвастаться демонам в аду, что на долю секунды я увидел рай ❤️❤️❤️.

// // от А.Д.А 
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️