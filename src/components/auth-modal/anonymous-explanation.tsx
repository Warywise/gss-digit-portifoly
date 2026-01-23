import { FaUserSecret } from 'react-icons/fa6';
import Button from '../ui/button';
import { useEffect } from 'react';

interface AnonymousExplanationProps {
  onCancel: () => void;
  loading: boolean;
  onConfirm: () => void;
  changeNickname: () => void;
  displayName?: string;
}

const AnonymousExplanation: React.FC<AnonymousExplanationProps> = ({
  onCancel,
  loading,
  onConfirm,
  changeNickname,
  displayName,
}) => {
  useEffect(() => {
    changeNickname();
  }, [changeNickname]);

  return (
    <div className="flex flex-col gap-4 py-4 text-center">
      <article className="bg-secondary/25 p-4 rounded-lg flex flex-col items-center gap-2">
        <FaUserSecret size={32} className="text-primary" />
        <h3 className="font-bold text-lg">Modo Anônimo</h3>
        <p className="text-sm text-text/70 subtitle text-justify px-2 mb-2">
          Criaremos um perfil temporário com um{' '}
          <strong className="font-extrabold">nome aleatório e divertido</strong> para você interagir
          (dar likes e comentar).
          <div className="h-3" />
          Seus dados ficarão salvos neste navegador. Se quiser, poderá converter essa conta em uma
          conta real no futuro para não perder seu histórico.
        </p>

        <div className="bg-secondary/10 p-4 rounded-sm">
          <h3 className="text-sm font-medium">Seu nome de usuário será:</h3>
          <h4 className="mt-1 font-bold text-md font-mono">{displayName}</h4>
          <Button
            label="Gerar outro nome"
            variant="secondary"
            size="sm"
            style="mt-2"
            onClick={changeNickname}
            disabled={loading}
          />
        </div>
      </article>

      <div className="flex gap-3 mt-2">
        <Button
          label="Cancelar"
          variant="outline"
          style="flex-1 justify-center"
          onClick={onCancel}
        />
        <Button
          label={loading ? 'Criando...' : 'Entendi, Criar Perfil!'}
          variant="default"
          style="flex-1 justify-center"
          onClick={onConfirm}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default AnonymousExplanation;
