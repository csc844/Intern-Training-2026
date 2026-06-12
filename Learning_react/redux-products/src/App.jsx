import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import "./App.css"; // 👈 IMPORTANT: CSS import

function App() {
  return (
    <div>
      <h1>Redux Product CRUD App</h1>

      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;