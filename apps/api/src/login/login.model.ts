import {Prisma, User, Zip} from "@prisma/client";


export class LoginModel implements Prisma.UserCreateInput {
    username: string;
    email: string;
    password: string;
    address?: string | null;
    Zip: Prisma.ZipCreateNestedOneWithoutUserInput;
    Privilages: Prisma.PrivilagesCreateNestedOneWithoutUserInput;
    Customer?: Prisma.CustomerCreateNestedManyWithoutUserInput;
    Order?: Prisma.OrderCreateNestedManyWithoutUserInput;
}