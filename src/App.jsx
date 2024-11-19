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

  // async function contractInteraction() {
  //   const name = await contract.name();
  //   let balanceOf = await contract.balanceOf(signer.address);
  //   balanceOf = ethers.formatEther(balanceOf);

  //   console.log(name);
  //   console.log(balanceOf);

  //   // const getName = contract.getFunction("name");
  //   // const getSymbol = contract.getFunction("symbol");
  //   // const getBalanceOf = contract.getFunction("balanceOf");
  //   // const getTotalSupply = contract.getFunction("totalSupply");

  //   // const name = await getName();
  //   // const symbol = await getSymbol();
  //   // const balance = await getBalanceOf(signer.address);
  //   // const totalSupply = await getTotalSupply();
  // }

  async function sendToken() {
    try {
      console.log(contract.interface);

      //static values
      const from = "0xFCBd8FC50Ee21A442c1f2956e46aFDE1A6a63BA4";
      const to = "0x313Ba70c24509E641734a6b204313f8cE14f7cA5";
      const amount = ethers.parseEther("1.0");

      const gasFee = await contract.transferFrom.estimateGas(from, to, amount);
      const gasLimit = parseInt(gasFee);
      // const populateTransaction = await contract.transfer.  (
      //   to,
      //   amount
      // );
      // console.log(populateTransaction, "   populateTransaction");

      // const tx = await contract.transfer(to, amount, { gasLimit });
      // const receipt = await tx.wait();
      const tx = await contract.transferFrom(from, to, amount, {
        gasLimit,
      });

      console.log(tx, "   TX");
      const receipt = await tx.wait();
      console.log(receipt, "  Receipt");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* <section style={{ padding: "16px" }}>
        <button onClick={() => setShowForm(true)}>Create new account</button>
        {showForm && <CreateAccForm setShowForm={setShowForm} />}
        {mnemonics && <MnemonicList />}
        <button onClick={handleAddAccount}>Add new account</button>
      </section> */}

      <section>
        <button onClick={sendToken}>Send Token</button>
      </section>
    </>
  );
}

export default App;
