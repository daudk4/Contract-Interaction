import { useState } from "react";
import { createHDNodeWallet } from "./utils/account";
import MnemonicList from "./components/MnemonicList";
import { useDispatch, useSelector } from "react-redux";
import { CreateAccForm } from "./components/CreateAccForm";
import {
  addAccount,
  selectAccounts,
  selectMnemonics,
} from "./slice/accountSlice";

function App() {
  const [showForm, setShowForm] = useState(false);
  const mnemonics = useSelector(selectMnemonics);
  console.log(mnemonics);
  const accounts = useSelector(selectAccounts);
  const dispatch = useDispatch();

  async function handleAddAccount() {
    const newAccount = await createHDNodeWallet(mnemonics, accounts.length);
    dispatch(addAccount(newAccount));
  }

  return (
    <section style={{ padding: "16px" }}>
      <button onClick={() => setShowForm(true)}>Create new account</button>
      {showForm && <CreateAccForm setShowForm={setShowForm} />}
      {mnemonics && <MnemonicList />}
      <button onClick={handleAddAccount}>Add new account</button>
    </section>
  );
}

export default App;
