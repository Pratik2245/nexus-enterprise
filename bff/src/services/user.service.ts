import * as userRepository from '../repositories/user.repository';

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

export const getAllUsers = async () => {
    return userRepository.findAllUsers();
};

export const getUserById = async (id: number) => {
    const user = await userRepository.findUserById(id);

    if (!user) {
        throw new Error('User not found');
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
        throw new Error('User with this identity already exists');
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
        throw new Error('User not found');
    }

    return userRepository.updateUser(id, input);
};

export const removeUser = async (id: number) => {
    const existingUser = await userRepository.findUserById(id);

    if (!existingUser) {
        throw new Error('User not found');
    }

    return userRepository.deleteUser(id);
};