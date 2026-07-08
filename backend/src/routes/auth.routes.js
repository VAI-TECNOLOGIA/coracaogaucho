import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { rateLimit } from '../middlewares/rateLimit.js';

const r = Router();

// Proteção contra brute-force / abuso nos endpoints públicos de autenticação.
const loginLimit = rateLimit({ windowMs: 60_000, max: 10, message: 'Muitas tentativas de login. Aguarde um minuto.' });
const resetLimit = rateLimit({ windowMs: 60_000, max: 4, message: 'Muitas solicitações. Aguarde um minuto.' });

r.post('/login', loginLimit, auth.login);
r.post('/forgot-password', resetLimit, auth.forgotPassword);
r.post('/reset-password', resetLimit, auth.resetPassword);

r.get('/me', authenticate, auth.me);
r.post('/change-password', authenticate, auth.changePassword);
r.post('/register', authenticate, authorize('LIDER'), auth.register);

export default r;
