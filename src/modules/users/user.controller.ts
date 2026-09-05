import { HttpErrorStatus, StringObject } from "../../shared/utils/types.utils";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private service: UserService) {}

  //getUsers
  getUsers = async (
    req: Request<
      StringObject,
      StringObject,
      StringObject,
      { page: string; limit: string }
    >,
    res: Response
  ) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { records, totalRecords } = await this.service.getUsers(page, limit);
    res.paginationResponse(records, { page, limit, totalRecords });
  };
  //getUser
  getUser = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id)
      return res.error({
        statusCode: 400,
        message: "ID required",
      });

    const user = await this.service.getUser(id);
    if (!user)
      return res.error({
        statusCode: 404,
        message: "User not found",
      });
    res.ok(user);
  };
  //getMe
  getMe = async (req: Request, res: Response) => {
    const me = req.user!;
    const user = await this.service.getUser(me.id);
    if (!user)
      return res.error({
        statusCode: HttpErrorStatus.Unauthorized,
        message: "User not found",
      });

    res.ok(user);
  };
  //updateMe
  updateMe = async (req: Request, res: Response) => {
    const me = req.user!;
    const { name, email } = req.body as { name?: string; email?: string };
    const updated = await this.service.updateUser(me.id, name, email);
    if (!updated)
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "User not found",
      });
    res.ok(updated);
  };
  //createCoach
  createCoach = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const exist = await this.service.findUserByEmail(email);
    if (exist) {
      return res.error({
        statusCode: HttpErrorStatus.BadRequest,
        message: "User with this email already exist",
      });
    }

    const coach = await this.service.createUser(name, email, password, "COACH");
    res.create(coach);
  };
  //createUser
  createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const created = await this.service.createUser(name, email, password);
    res.create(created);
  };
}
