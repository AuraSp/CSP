import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CompanyDetails from "./Components/CompanyDetails/CompanyDetails";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/MainContainer/main.css';


function App() {

  return (
    <div className="container-fluid mx-auto my-0 p-0 mainContainer">

      <Header />

      <main className='row col-lg-12 col-md-12 col-sm-12 p-0 mx-0'>
        <CompanyDetails />
      </main>

      <Footer />

    </div>
  );
}

export default App;
