import { ethers } from "ethers";

// export async function initializeProvider() {
//   try {
//     const provider = new ethers.JsonRpcProvider(
//       "http://182.176.169.225:13000/"
//     );
//     return provider;
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function initializeProvider() {
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  }
}

export async function generateMnemonic() {
  const entropy = ethers.randomBytes(16);
  const mnemonic = ethers.Mnemonic.fromEntropy(entropy);
  return mnemonic;
}

export async function createHDNodeWallet(phrase, index) {
  const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
  const wallet = ethers.HDNodeWallet.fromMnemonic(
    mnemonic,
    `m/44'/60'/0'/0/${index}`
  );
  return wallet;
}
