import { FastifyReply } from "fastify";

export async function createToken(
  reply: FastifyReply,
  user: { id: string; role: "ADMIN" | "MEMBER" },
  isRefreshToken: boolean = false
) {
  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: isRefreshToken ? "7d" : "10m",
      },
    }
  );

  return token;
}
