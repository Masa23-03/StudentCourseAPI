import {
  registerDTO,
  registerResponseDTO,
  loginDTO,
  loginResponseDTO,
} from "./types/dto.types";
import { createArgonHash, verifyArgonHash } from "./utils/argon.util";
import { removeFields } from "../../shared/utils/object.utils";
import { userService } from "../users/user.index";

export class AuthService {
  private service = userService;

  public async register(payLoad: registerDTO): Promise<registerResponseDTO> {
    const hashPassword = await createArgonHash(payLoad.password);
    const user = await this.service.createUser(
      payLoad.name,
      payLoad.email,
      hashPassword
    );
    return user;
  }

  public async login(payLoad: loginDTO): Promise<loginResponseDTO | null> {
    const foundUser = await this.service.findUserByEmail(payLoad.email);
    if (!foundUser) return null;
    const passwordVerification = verifyArgonHash(
      payLoad.password,
      foundUser.password
    );
    if (!passwordVerification) return null;

    return removeFields(foundUser, ["password"]);
  }
}
