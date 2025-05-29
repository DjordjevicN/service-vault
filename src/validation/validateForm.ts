import * as yup from "yup";

export const validateForm = async (
  schema: yup.ObjectSchema<any>,
  data: any
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err: any) {
    const errors: Record<string, string> = {};
    if (err.inner) {
      err.inner.forEach((e: any) => {
        if (e.path) errors[e.path] = e.message;
      });
    }
    return { isValid: false, errors };
  }
};
