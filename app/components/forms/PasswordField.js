import React from "react";
import { useFormikContext } from "formik";

import PasswordInput from "../PasswordInput";
import ErrorMessage from "./ErrorMessage";

function PasswordField({ name, width, ...otherProps }) {
  //   const [password, setPassword] = useState("");
  //   const { rightIcon } = useTogglePasswordVisibility();
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <PasswordInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default PasswordField;
