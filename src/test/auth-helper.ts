import { supabase } from '@/config/supabase';
import { sign } from 'jsonwebtoken';
import { env } from '@/config/env';

type User = {
  id: string;
  email: string;
  role?: string;
};

export async function createTestUser(overrides: Partial<User> = {}): Promise<User> {
  const email = `test-${Date.now()}@example.com`;
  const password = 'Test123!@#';

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Failed to create test user');

  // Create user profile in public.users table if needed
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: authData.user.email,
      ...overrides
    })
    .select()
    .single();

  if (userError) throw userError;
  if (!userData) throw new Error('Failed to create user profile');

  return userData;
}

export async function generateAuthToken(user: User): Promise<string> {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role || 'user'
    },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export async function cleanupTestUsers() {
  // Delete test users from auth.users
  const { data: users, error: fetchError } = await supabase.auth.admin.listUsers();
  if (fetchError) throw fetchError;

  const testUsers = users.users.filter(user => user.email?.includes('test-'));
  
  for (const user of testUsers) {
    await supabase.auth.admin.deleteUser(user.id);
  }

  // Delete test user profiles from public.users
  await supabase
    .from('users')
    .delete()
    .like('email', 'test-%');
} 


