const ModalHeader: React.FC = () => {
  return (
    <div className="text-center w-full">
      <h2 className="text-xl font-bold">Identifique-se</h2>
      <p className="text-sm text-subtitle mt-1">
        Para interagir com os projetos, precisamos saber quem você é. Seus dados estão seguros, veja
        nossa{' '}
        <a href="/policy" className="text-primary hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
};

export default ModalHeader;
