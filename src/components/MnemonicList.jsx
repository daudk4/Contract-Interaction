import { useSelector } from "react-redux";
import { selectMnemonics } from "../slice/accountSlice";

const MnemonicList = () => {
  const mnemonics = useSelector(selectMnemonics);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {mnemonics.split(" ").map((word) => (
        <p style={{ padding: "8px" }} key={word}>
          {word}
        </p>
      ))}
    </div>
  );
};

export default MnemonicList;
