import * as userRepository from '../repositories/user.repository';
import { AppError } from '../utils/app-error';
type CreateUserInput = {
    issuer: string;
    subject: string;
    name: string;
    email: string;
};

type UpdateUserInput = {
    name?: string;
    email?: string;
    status?: 'ACTIVE' | 'INACTIVE';
};
export const getAllUsers = async (
    page: number,
    limit: number,
    search?: string,
    sortBy: 'name' | 'email' | 'createdAt' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
) => {
    const offset = (page - 1) * limit;

    const result = await userRepository.findAllUsers(
        limit,
        offset,
        search,
        sortBy,
        sortOrder
    );

    return {
        data: result.data,
        pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit),
        },
        sorting: {
            sortBy,
            sortOrder,
        },
    };
};

export const getUserById = async (id: number) => {
    const user = await userRepository.findUserById(id);

    if (!user) {
        throw new AppError(404, "User Not Found");
    }

    return user;
};

export const createNewUser = async (input: CreateUserInput) => {
    const { issuer, subject, name, email } = input;

    if (!issuer || !subject || !name || !email) {
        throw new Error('All user fields are required');
    }

    const existingUser = await userRepository.findUserByIdentity(
        issuer,
        subject
    );

    if (existingUser) {
        throw new AppError(409, 'User with this identity already exists');
    }

    return userRepository.createUser({
        issuer,
        subject,
        name,
        email,
    });
};

export const updateExistingUser = async (
    id: number,
    input: UpdateUserInput
) => {
    const existingUser = await userRepository.findUserById(id);

    if (!existingUser) {
        throw new AppError(404, 'User not found');
    }

    return userRepository.updateUser(id, input);
};

export const removeUser = async (id: number) => {
    const existingUser = await userRepository.findUserById(id);

    if (!existingUser) {
        throw new AppError(404, 'User not found');
    }

    return userRepository.deleteUser(id);
};