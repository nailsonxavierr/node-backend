import jwt from 'jsonwebtoken';

const SECRET_KEY = 'C2AEC7386FF96967DAC6FB45BDBAC9CB4DE785CE0B4B2977610D61A2ECF036EB'; // Substitua pelo seu segredo

export function authenticateUser(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function getToken(username: string) {
    const email = username;
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
}