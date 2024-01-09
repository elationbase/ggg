import { app } from '@lib/firebase/client';
import { ROUTE_API } from '@lib/routes';
import { loginSchema } from '@lib/schemas';
import { Error } from '@ui/Error';
import { Button, InputText } from '@ui/form';
import { IconEyeClose, IconEyeOpen, IconGoogle } from '@ui/icons';
import type { z } from 'astro/zod';
import {
  GoogleAuthProvider,
  getAuth,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof loginSchema>>;
type SucessForm = z.infer<typeof loginSchema>;
const auth = getAuth(app);

/* This will set the persistence to session */
auth.setPersistence(inMemoryPersistence);

async function postFormData(formData: SucessForm) {
  const { email, password } = formData;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const res = await fetch(ROUTE_API.login, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return data;
    }

    if (res.redirected) {
      window.location.assign(res.url);
    }
  } catch (err) {
    return {
      error: err,
    };
  }
}

async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  const res = await fetch(ROUTE_API.login, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.redirected) {
    window.location.assign(res.url);
  }
}

export default function LoginForm() {
  const [clientErrors, setClientErrors] = useState<Errors>();
  const [formErrors, setFormErrors] = useState();
  const [isEyeVisible, setIsEyeVisible] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientErrors(undefined);
    setFormErrors(undefined);

    const data = new FormData(event.currentTarget);
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }

    const response = await postFormData(result.data);

    if (response?.error) {
      setFormErrors(response.error.code);
    }
  }

  const renderFormErrors = () => {
    if (!formErrors) {
      return null;
    }
    if (formErrors === 'auth/invalid-login-credentials') {
      return <Error message="Invalid Login Credentials" />;
    }
    if (formErrors === 'auth/wrong-password') {
      return <Error message="Your password is incorrect" />;
    }
    if (formErrors === 'auth/user-not-found') {
      return <Error message="You don't have an account with this email" />;
    }
    return <Error message={formErrors} />;
  };

  return (
    <form className="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          type="email"
          id="email"
          name="email"
          label="Email"
          isInvalid={Boolean(clientErrors?.fieldErrors.email)}
          errorMessage={clientErrors?.fieldErrors.email}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          label="Password"
          id="password"
          name="password"
          isInvalid={Boolean(clientErrors?.fieldErrors.password)}
          errorMessage={clientErrors?.fieldErrors.password}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsEyeVisible(!isEyeVisible)}>
              {isEyeVisible ? <IconEyeClose /> : <IconEyeOpen />}
            </button>
          }
          type={isEyeVisible ? 'text' : 'password'}
        />
      </div>

      <Button color="primary" type="submit">
        Sign in
      </Button>
      {renderFormErrors()}
      <div>
        <hr className="h-0 border-t mt-4 border-zinc-300"></hr>
        <p className="-mt-2.5 text-xs text-center text-zinc-500">
          <span className="bg-white px-4">Or with</span>
        </p>
      </div>
      <Button onClick={googleSignIn} variant="bordered" fullWidth>
        <IconGoogle size={16} />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
}
