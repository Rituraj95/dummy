import * as yup from 'yup'
//regular expression for Indian Phone Number
const regex = /(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})/

//Validation schema definition
export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    phoneNumber: yup.string().matches(regex, "It's not a number").required('phone number is required'),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    hobby: yup.string().max(50, "Too Long").required("Hobby is required")
})