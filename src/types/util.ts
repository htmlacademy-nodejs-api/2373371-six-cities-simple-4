import { Request } from 'express';

export type UnknownRecord = Record<string, unknown>;

export type GenericReq<RT, QT = UnknownRecord, P = UnknownRecord> = Request<P, UnknownRecord, RT, QT>;
