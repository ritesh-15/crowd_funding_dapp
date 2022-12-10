import * as yup from "yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .matches(/[a-z]/, "Campaign title must be valid!")
    .required("Cmapaign title is required!"),
  story: yup.string().required("Story is required!"),
  name: yup
    .string()
    .matches(/[a-z]/, "Name must be valid!")
    .required("Name is required!"),
  amount: yup.number().moreThan(0).required("Amount is required!"),
});

export { schema as createCampaignSchema };
