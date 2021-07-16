import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  originalUrl: yup.string().url('URL is invalid').required('URL is required'),
});
