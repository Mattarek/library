import { useFormik } from "formik";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const initialValues = {
  title: "",
  author: "",
  datePub: "",
};

const onSubmit = () => {};

export const FormikSearchForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="title"
        name="title"
        label="Tytuł"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="author"
        name="author"
        label="Autor"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
      />
      <TextField
        id="datePub"
        name="datePub"
        label="Data publikacji"
        value={formik.values.datePub}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.datePub && Boolean(formik.errors.datePub)}
        helperText={formik.touched.datePub && formik.errors.datePub}
      />

      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
};
