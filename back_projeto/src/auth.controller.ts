import { Controller, Post, Get, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import {
  validateRegistration,
  validateLogin,
  canAccessAdminPanel,
  User,
} from './auth.service';

const users: User[] = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: 'admin123',
    role: 'admin',
  },
];

@Controller('auth')
export class AuthController {

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    const result = validateRegistration(body, users);

    if (!result.valid) {
      throw new HttpException(
        { message: result.errors[0], errors: result.errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: 'user',
    };

    users.push(newUser);

    return {
      message: 'Usuário cadastrado com sucesso.',
      user: { name: newUser.name, email: newUser.email, role: newUser.role },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { email: string; password: string }) {
    const result = validateLogin(body.email, body.password, users);

    if (!result.success || !result.user) {
      throw new HttpException(
        { message: result.error },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = Buffer.from(
      `${result.user.email}:${result.user.role}`
    ).toString('base64');

    return {
      message: 'Login realizado com sucesso.',
      token,
      user: {
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    };
  }

  @Get('admin')
  adminPanel() {
    const adminUser: User = {
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin123',
      role: 'admin',
    };

    if (!canAccessAdminPanel(adminUser)) {
      throw new HttpException(
        { message: 'Acesso negado. Apenas administradores.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      message: 'Painel do administrador',
      users: users.map((u) => ({ name: u.name, email: u.email, role: u.role })),
      total: users.length,
    };
  }

  @Get('admin/denied')
  adminDenied() {
    const regularUser: User = {
      name: 'Comum',
      email: 'user@email.com',
      password: '123456',
      role: 'user',
    };

    if (!canAccessAdminPanel(regularUser)) {
      throw new HttpException(
        { message: 'Acesso negado. Apenas administradores.' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}