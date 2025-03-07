import * as yup from "yup";


export const favouriteCity = yup.object({
    city: yup.string().required()
});
