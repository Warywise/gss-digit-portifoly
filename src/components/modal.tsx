import React, { JSX } from 'react';
import Button from './button';

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  header?: string | JSX.Element;
  body?: string | JSX.Element;
  footer?: string | JSX.Element;
  closabe?: boolean;
  hideOkButton?: boolean;
  hideCancelButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({
  visible,
  closabe,
  hideOkButton,
  onCancel,
  hideCancelButton,
  onConfirm,
  body,
  header,
  footer,
  size = 'md',
}) => {
  const modalSizes = {
    sm: 'w-1/5',
    md: 'w-2/5',
    lg: 'w-3/5',
  };

  const handleBlur = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = event.target as HTMLElement;

    // If target dont have a parent, the click is outside the modal
    if (!targetElement.offsetParent) onCancel();
  };

  return (
    <div
      className={`modal ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 pointer-events-none -translate-y-8 scale-90'
      }`}
      onClick={handleBlur}
    >
      <div className={`relative m-4 p-4 rounded-lg bg-background shadow-sm ${modalSizes[size]}`}>
        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-text/80">
          {header}
          {closabe && (
            <span
              className="absolute right-2.5 top-1 cursor-pointer hover:text-text/75"
              onClick={onCancel}
            >
              X
            </span>
          )}
        </div>
        <div className="relative border-t border-border py-4 leading-normal text-text/75 font-light">
          {body}
        </div>
        {/* TODO: fazer footer com possibilidade de botões de ações nele ou não */}
        {/* TODO: responsividade mobile */}
        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end gap-2">
          {footer}
          {!hideCancelButton && (
            <Button variant="outline" onClick={onCancel} label="Cancelar" style="hover:bg-muted" />
          )}
          {!hideOkButton && onConfirm && (
            <Button variant="success" onClick={onConfirm} label="Confirmar" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
