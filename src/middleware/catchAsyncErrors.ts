import { NextFunction } from "express";

export const CatchAsyncError = (theFunc: any) =>
    (req: any, res: any, next: NextFunction) => { return Promise.resolve(theFunc(req, res, next)).catch(next) }