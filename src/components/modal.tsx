import React, { JSX, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const modalSizes = {
    sm: 'w-3/5 md:w-2/5 lg:w-1/5',
    md: 'w-5/6 md:w-3/5 lg:w-2/5',
    lg: 'w-19/20 md:w-4/5 lg:w-3/5',
  };

  const handleBlur = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = event.target as HTMLElement;

    // If target dont have a parent, the click is outside the modal
    if (!targetElement.offsetParent) onCancel();
  };

  useEffect(() => {
    if (visible) {
      setTimeout(
        () => modalRef.current?.classList.add('bg-foreground/60', 'backdrop-blur-md'),
        100,
      );
    } else {
      modalRef.current?.classList.remove('bg-foreground/60', 'backdrop-blur-md');
    }
  }, [visible]);

  return (
    <div
      className={`modal ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 pointer-events-none -translate-y-8 scale-90'
      }`}
      onClick={handleBlur}
      ref={modalRef}
    >
      <div className={`inner-modal ${modalSizes[size]}`}>
        <header className="flex shrink-0 items-center pb-4 text-xl font-medium text-text/80">
          {header}
          {closabe && (
            <span
              className="absolute right-2.5 top-1 cursor-pointer hover:text-text/75"
              onClick={onCancel}
            >
              x
            </span>
          )}
        </header>
        <div className="relative border-t border-border py-4 leading-normal text-text/75 font-light">
          {body}
        </div>
        <footer className="flex shrink-0 flex-wrap items-center pt-4 gap-2">
          {footer}
          <div className="flex w-full justify-end gap-2">
            {!hideCancelButton && (
              <Button
                variant="outline"
                onClick={onCancel}
                label="Cancelar"
                style="hover:bg-muted"
              />
            )}
            {!hideOkButton && onConfirm && (
              <Button variant="success" onClick={onConfirm} label="Confirmar" />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
