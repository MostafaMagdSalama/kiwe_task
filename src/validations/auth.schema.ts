import * as yup from "yup";


export const auth = yup.object({
    userName: yup.string().required(),
    password: yup.string().min(6).required()
});
