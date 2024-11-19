import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addAccount, setAccountDetails } from "../slice/accountSlice";
import { create_Acc_Form_ValidationSchema } from "../utils/validationSchema";
import { createHDNodeWallet, generateMnemonic } from "../utils/account";

export const CreateAccForm = ({ setShowForm }) => {
  const dispatch = useDispatch();
  const {
    values: { password, confirmPassword },
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    // validationSchema: create_Acc_Form_ValidationSchema,
    onSubmit: onHandleSubmit,
  });

  async function onHandleSubmit(values, { resetForm }) {
    if (values.password !== values.confirmPassword) return;
    const mnemonics = await generateMnemonic();
    const mnemonicPhrase = mnemonics.phrase;
    // const mnemonicPhrase =
    //   "absent segment usual pulp secret prepare skirt dial impose unlock account deny";
    dispatch(
      setAccountDetails({
        mnemonics: mnemonicPhrase,
        password: values.password,
      })
    );
    const wallet = await createHDNodeWallet(mnemonicPhrase, 0);
    dispatch(addAccount(wallet));
    resetForm();
    setShowForm(false);
  }

  return (
    <section style={{ margin: "32px 0", width: "300px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Password:</label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter password..."
            type="password"
          />
        </div>
        <div style={{ height: "24px", padding: "8px 0" }}>
          {touched.password && errors.password && (
            <p style={{ margin: 0, padding: "0 ", color: "red" }}>
              {errors.password}
            </p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="re enter password..."
            type="password"
          />
        </div>
        <div style={{ height: "24px", padding: "8px 0" }}>
          {touched.confirmPassword && errors.confirmPassword && (
            <p style={{ margin: 0, padding: "0", color: "red" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </section>
  );
};
