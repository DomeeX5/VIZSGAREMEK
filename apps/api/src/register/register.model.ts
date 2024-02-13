import {Prisma, User, Zip} from "@prisma/client";


export class RegisterModel implements Prisma.UserCreateInput {
    user_id: number;
    username: string;
    email: string;
    password: string;
    address?: string | null;
    Zip: Prisma.ZipCreateNestedOneWithoutUserInput;
    Privilages: Prisma.PrivilagesCreateNestedOneWithoutUserInput;
    Customer?: Prisma.CustomerCreateNestedManyWithoutUserInput;
    Order?: Prisma.OrderCreateNestedManyWithoutUserInput;
}