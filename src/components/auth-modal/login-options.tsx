import { FaEnvelope, FaGoogle, FaUserSecret } from 'react-icons/fa6';
import Button from '../ui/button';

interface LoginOptionsProps {
  onGoogleLogin: () => void;
  onEmailLogin: () => void;
  onAnonymousLogin: () => void;
  loading: boolean;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({
  onGoogleLogin,
  onEmailLogin,
  onAnonymousLogin,
  loading,
}) => (
  <div className="flex flex-col gap-3 py-4">
    <Button
      label={
        <>
          <FaGoogle /> Entrar com Google
        </>
      }
      onClick={onGoogleLogin}
      variant="outline"
      style="w-full justify-center py-6 text-base"
      disabled={loading}
    />

    <Button
      label={
        <>
          <FaEnvelope /> Crie um login com E-mail e Senha
        </>
      }
      onClick={onEmailLogin}
      variant="secondary"
      style="w-full justify-center"
    />

    <div className="relative my-2">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-muted px-2 text-subtitle">Ou</span>
      </div>
    </div>

    <Button
      label={
        <>
          <FaUserSecret /> Continuar como Anônimo
        </>
      }
      onClick={onAnonymousLogin}
      variant="ghost"
      style="w-full justify-center py-6 text-base"
      disabled={loading}
    />
  </div>
);

export default LoginOptions;
