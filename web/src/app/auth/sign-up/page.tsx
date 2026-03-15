import { cookies } from 'next/headers';

import { SignUpForm } from './form';

const AuthSignUpPage = async () => {
  console.log(await cookies());

  return <SignUpForm />;
};

export default AuthSignUpPage;
