import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/styles.scss';
import HomePage from './pages/homepage';
import Photos from './pages/photos';
import Header from './components/header';
import PhotoDetails from './pages/photo';
import 'bootstrap/scss/bootstrap.scss';

function App() {
  return (
    <BrowserRouter>
      <Header text={'Photo Browser'} />
      <Routes>
        <Route path='*' element={<HomePage />}></Route>
        <Route path='/photos' element={<Photos />} />
        <Route path='/albums' element={<HomePage />}></Route>
        <Route path='/albums/:id/photos' element={<Photos />} />
        <Route path='/photo/:id' element={<PhotoDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
