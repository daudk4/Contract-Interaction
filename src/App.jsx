import { useState } from "react";
import { CreateAccForm } from "./components/CreateAccForm";
import { useSelector } from "react-redux";
import { selectMnemonics } from "./slice/accountSlice";

function App() {
  const mnemonics = useSelector((state) =>
    selectMnemonics(state.accountReducer)
  );
  const [showForm, setShowForm] = useState(false);
  return (
    <section style={{ padding: "16px" }}>
      <button onClick={() => setShowForm(true)}>Create new account</button>
      {showForm && <CreateAccForm setShowForm={setShowForm} />}
      {mnemonics && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {mnemonics.split(" ").map((word) => (
            <p style={{ padding: "8px" }} key={word}>
              {word}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

export default App;
