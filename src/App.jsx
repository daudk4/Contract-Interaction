import { useEffect, useState } from "react";
import MnemonicList from "./components/MnemonicList";
import { createHDNodeWallet } from "./utils/account";
import { useDispatch, useSelector } from "react-redux";
import { CreateAccForm } from "./components/CreateAccForm";
import {
  addAccount,
  selectAccounts,
  selectMnemonics,
} from "./slice/accountSlice";
import { contract, signer } from "./utils/contract";
import { ethers } from "ethers";

function App() {
  const [showForm, setShowForm] = useState(false);
  const mnemonics = useSelector(selectMnemonics);
  const accounts = useSelector(selectAccounts);
  const dispatch = useDispatch();

  async function handleAddAccount() {
    const newAccount = await createHDNodeWallet(mnemonics, accounts.length);
    dispatch(
      addAccount({
        address: newAccount.address,
        chainCode: newAccount.chainCode,
        fingerprint: newAccount.fingerprint,
        path: newAccount.path,
        publicKey: newAccount.publicKey,
      })
    );
  }

  async function contractInteraction() {
    const name = await contract.name();
    let balanceOf = await contract.balanceOf(signer.address);
    balanceOf = ethers.formatEther(balanceOf);

    console.log(name);
    console.log(balanceOf);

    console.log(contract.interface);

    // const getName = contract.getFunction("name");
    // const getSymbol = contract.getFunction("symbol");
    // const getBalanceOf = contract.getFunction("balanceOf");
    // const getTotalSupply = contract.getFunction("totalSupply");

    // const name = await getName();
    // const symbol = await getSymbol();
    // const balance = await getBalanceOf(signer.address);
    // const totalSupply = await getTotalSupply();
  }

  useEffect(() => {
    contractInteraction();
  }, []);

  return (
    <>
      <section style={{ padding: "16px" }}>
        <button onClick={() => setShowForm(true)}>Create new account</button>
        {showForm && <CreateAccForm setShowForm={setShowForm} />}
        {mnemonics && <MnemonicList />}
        <button onClick={handleAddAccount}>Add new account</button>
      </section>

      <section></section>
    </>
  );
}

export default App;
