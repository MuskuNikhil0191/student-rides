import "./App.css";
import Footer from "./Components/Footer";
import NavbarComponent from "./Components/NavbarComponent";
import RoutesComponent from "./Routing/RoutesComponent";
import { AuthProvider } from "./Utils/Auth";

function App() {
  return (
    <div className="App m-0">
      <AuthProvider>
        <div style={{}}>
          <NavbarComponent />
        </div>
        <div style={{ minHeight: "100vh" }}>
          <RoutesComponent />
        </div>
        <div style={{}}>
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
