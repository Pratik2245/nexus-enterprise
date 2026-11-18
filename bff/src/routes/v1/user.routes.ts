import { Router } from 'express';
import { userQuerySchema } from '../../validators/user-query.validator';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../../controllers/user.controller';

import { validate } from '../../middleware/validate';

import {
    createUserSchema,
    updateUserSchema,
} from '../../validators/user.validator';

const router = Router();

router.get('/', validate(userQuerySchema, "query"), getAllUsers);
router.get('/:id', getUserById);

router.post('/', validate(createUserSchema), createUser);

router.patch('/:id', validate(updateUserSchema), updateUser);

router.delete('/:id', deleteUser);

export default router;