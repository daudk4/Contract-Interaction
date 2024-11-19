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
