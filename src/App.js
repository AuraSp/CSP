import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchSection from "./components/SearchSection";
import Card from './components/Card';

function App() {
  return (
    <div className="container m-auto p-0">

      <Header />

      <main className='row col-lg-12 col-md-12 col-sm-12 p-0 mx-0'>
        <SearchSection />
        <Card />
      </main>

      <Footer />

    </div>
  );
}

export default App;
