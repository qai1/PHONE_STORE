import { ResponseError } from "../error/responseError.js";

export default function validate(schema, req) {
  const result = schema.safeParse(req);

  console.log(result);

  if (!result.success) {
    const message = result.error.issues[0].message;
    throw new ResponseError(400, message);
  }

  return result.data;
}
