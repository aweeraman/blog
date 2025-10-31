import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:page" element={<Home />} />
        <Route path="/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
