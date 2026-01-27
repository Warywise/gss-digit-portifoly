import { FormEvent } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';

interface LoginEmailProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  setIsSignUp: (value: boolean) => void;
  loading?: boolean;
  isSignUp?: boolean;
}

const LoginEmail: React.FC<LoginEmailProps> = ({
  onSubmit,
  loading,
  onCancel,
  isSignUp,
  setIsSignUp,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-4 py-4">
    {isSignUp ? (
      <h3 className="m-auto font-bold text-lg">Cadastro</h3>
    ) : (
      <h3 className="m-auto font-bold text-lg">Entrar</h3>
    )}
    {isSignUp && (
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome de Usuário</label>
        <Input
          type="text"
          name="display_name"
          placeholder="Ex: Chucky Norris Silva"
          minLength={3}
          required
        />
      </div>
    )}
    <div className="space-y-2">
      <label className="text-sm font-medium">Email</label>
      <Input type="email" name="email" placeholder="seu@email.com" required />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Senha</label>
      <Input type="password" name="password" placeholder="••••••••" minLength={6} required />
    </div>

    <div className="flex flex-col gap-2 mt-2">
      <Button
        type="submit"
        label={loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Confirmar'}
        style="w-full justify-center"
        disabled={loading}
      />
      <button
        type="button"
        onClick={onCancel}
        className="text-sm text-center text-subtitle hover:underline mt-2"
      >
        Voltar para opções de login
      </button>
    </div>

    <p className="text-sm text-center text-subtitle">
      {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
      <span
        className="text-primary cursor-pointer hover:underline font-bold"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Faça Login' : 'Cadastre-se'}
      </span>
    </p>
  </form>
);

export default LoginEmail;
