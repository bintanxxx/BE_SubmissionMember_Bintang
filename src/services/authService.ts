import { prisma } from "../configs/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "@prisma/client";

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  role: "ORGANIZER" | "CUSTOMER";
}

export const registerUser = async (data: RegisterInput) => {
  // 1. cek duplikasi email
  const existingUser = await prisma.users.findUnique({
    where: { email: data.email },
  });

  if (existingUser) throw new Error("Email already exists");

  // 2. mengenkripsi password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 3. simpan data user ke db
  const newUser = await prisma.users.create({
    data: {
      full_name: data.fullName,
      email: data.email,
      password_hash: hashedPassword,
      role: data.role,
    },
  });

  // 3. mengembalikan data user tanpa hash password
  const { password_hash, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginInput) => {
  // 1. cari user berdasarkan email
  const user = await prisma.users.findUnique({
    where: { email: data.email },
  });

  // 2. kalo usernya gada lempar error
  if (!user) throw new Error("Invalid email or password");

  // 3. cek password
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  // 4. kalo pwnya gasama lempar error
  if (!isPasswordValid) throw new Error("Invalid email or password");

  //   5. buat jwt token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  //   return data user tanpa password
  const { password_hash, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: token,
  };
};
