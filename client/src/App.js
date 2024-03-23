import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

import Header from './Header';
import Footer from './Footer';
import Homepage from './pages/Homepage';
import SubmitPhotos from './pages/SubmitPhotos';
import OurContacts from './pages/OurContacts'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
function App() {
  return (

    <NextUIProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/SubmitPhotos" element={<SubmitPhotos/>} />
          <Route path="/OurContacts" element={<OurContacts/>} />
        </Routes>
      
        
        <Footer />
      </>
    </NextUIProvider>
  );
}

export default App;
