import { ethers } from "ethers";

export async function initializeProvider() {
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed");
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  }
}

export async function generateMnemonic() {
  const entropy = ethers.randomBytes(16);
  const mnemonic = ethers.Mnemonic.fromEntropy(entropy);
  const mnemonicPhrase = mnemonic.phrase;
  return mnemonicPhrase;
}
