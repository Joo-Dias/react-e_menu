import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){

        // Verifico se o usuário existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error("User/password incorrect")
        }

        // Verifico se a senha inserida está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("User/password incorrect")
        }

        // Gerar um token JWT e devolver os dados do usuário

        return {ok: true}
    }
}

export { AuthUserService }