import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Cmapaign title is required!"),
  story: yup.string().required("Story is required!"),
  name: yup.string().required("Name is required!"),
  amount: yup.number().moreThan(0).required("Amount is required!"),
  endDate: yup.date().required("End date is required!"),
});

export { schema as createCampaignSchema };
