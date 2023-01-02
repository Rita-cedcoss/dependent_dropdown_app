import "./App.css";
import Dropdowncomponent from "./Dependent_Dropdown_App/Dropdowncomponent";
import "@shopify/polaris/build/esm/styles.css";
import "./Dependent_Dropdown_App/Dropdown.css";
import { ErrorBoundary } from "react-error-boundary";
import FuncErrorboundary from "./Dependent_Dropdown_App/FuncErrorboundary";
function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={FuncErrorboundary}>
        <Dropdowncomponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
