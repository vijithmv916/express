import express, { NextFunction } from 'express'
import { Request, Response } from "express-serve-static-core"
import { CatchAsyncError } from '../../middleware/catchAsyncErrors'
import { CreateNewUser, DeleteUser, GetUser, GetAllUser, UpdateUser } from './useController'
import { User } from '../../models/user'
const router = express.Router()

router.get(
    '/hi',
    CatchAsyncError(
        (req: Request, res: Response, next: NextFunction) =>
            res.status(200).json(('Hello World!'))
    )
)

router.get(
    '/',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {
            // return res.status(200).json("Hello World!")
            return res.status(200).json((await GetAllUser()))
        }
    )
)

router.get(
    '/summary',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {

            let [ distinctEmailDomains, seniorCitizenCount ] = await Promise.all([
                User.distinct('email', {}),
                User.countDocuments({ age: { $gt: 60 } })
            ]);

            distinctEmailDomains = [...new Set(distinctEmailDomains.map(mail => mail.split('@')[1]))];
            // Prepare response data
            const summaryData = {
                registered_email_domains: distinctEmailDomains,
                senior_citizen_count: seniorCitizenCount
            };

            res.json(summaryData);
        }
    )
)

router.get(
    '/:id',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {
            let user = await GetUser(Number(req.params.id))
            res.status(200).json({
                succsess: true,
                data: user
            })
        }
    )
)

router.post(
    '/:id',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {
            req.body.id = Number(req.params.id)
            console.log(req.body);
            await CreateNewUser(req.body)
            res.status(200).json({
                succsess: true,
                message: 'User created'
            })
        }
    )
)

router.put(
    '/:id',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {
            await UpdateUser(Number(req.params.id), req.body)
            res.status(200).json({
                succsess: true,
                message: 'User updated'
            })
        }
    )
)

router.delete(
    '/:id',
    CatchAsyncError(
        async (req: Request, res: Response, next: NextFunction) => {
            await DeleteUser(Number(req.params.id))
            res.status(200).json({
                success: true,
                message: 'User deleted'
            })
        }
    )
)

export default router