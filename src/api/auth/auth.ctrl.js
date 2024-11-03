import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/*
POST /api/auth/register
{
  id: 'A',
  password: 'B'
}
*/
export const register = async (req, res) => {
  const { id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const member = await Member.create({ userid: id, password: hashedPassword });
    const token = jwt.sign({ id: member.id }, JWT_SECRET, { expiresIn: '6h' });
    res.json({ token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'User ID already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed', details: error.message });
    }
  }
};

export const login = async (req, res) => {
  const { id, password } = req.body;

  try {
    const member = await Member.findOne({ where: { userid: id } });

    if (member && await bcrypt.compare(password, member.password)) {
      const token = jwt.sign({ id: member.id }, JWT_SECRET, { expiresIn: '6h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

/*
POST /api/auth/logout
*/
export const logout = (req, res) => {
  res.json({ message: 'Logged out' });
};
