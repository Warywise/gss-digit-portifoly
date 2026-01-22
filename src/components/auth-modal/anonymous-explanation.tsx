import { FaUserSecret } from 'react-icons/fa6';
import Button from '../ui/button';

interface AnonymousExplanationProps {
  onCancel: () => void;
  loading: boolean;
  onConfirm: () => void;
}

const AnonymousExplanation: React.FC<AnonymousExplanationProps> = ({
  onCancel,
  loading,
  onConfirm,
}) => (
  <div className="flex flex-col gap-4 py-4 text-center">
    <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center gap-2">
      <FaUserSecret size={32} className="text-primary" />
      <h3 className="font-bold text-lg">Modo Anônimo</h3>
      <p className="text-sm text-subtitle text-justify px-2">
        Criaremos um perfil temporário com um <strong>nome aleatório e divertido</strong> para você
        interagir (dar likes e comentar).
        <br />
        <br />
        Seus dados ficarão salvos neste navegador. Se quiser, poderá converter essa conta em uma
        conta real no futuro para não perder seu histórico.
      </p>
    </div>

    <div className="flex gap-3 mt-2">
      <Button label="Cancelar" variant="outline" style="flex-1 justify-center" onClick={onCancel} />
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

export default AnonymousExplanation;
