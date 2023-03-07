import instance from "./request.js";

const headers = {
  "X-Parse-Application-Id": "654c6238236e4b61ad984a182d6a52b3",
  "X-Parse-REST-API-Key": "9S0nmGBsl7VQ8rl81U3jKwzAyP4l5pftBJlu11s1",
};

export const validateLoginForm = (data) => {
  return instance.post(
    "/parse/functions/isRegister",
    {
      email: data.email,
      code: data.code,
    },
    {
      headers,
    }
  );
};
export const activationFn = (data) => {
  return instance.post(
    "/parse/functions/upDateVipTime",
    {
      email: data.email,
      code: data.code,
    },
    {
      headers,
    }
  );
};
