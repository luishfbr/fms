import { genSaltSync, hashSync } from "bcrypt-ts";

const salt = genSaltSync(10);

export default function saltAndHashPassword(password: string) {
  return hashSync(password, salt);
}
