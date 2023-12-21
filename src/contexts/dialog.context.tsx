import { Button, Modal } from 'antd';
import { createContext, useContext, useCallback, useState, PropsWithChildren } from 'react';

type TDialogContextShowDialog = {
  title: string;
  content: string;
  okTextSubmit?: string;
  onOk: () => void;
  hiddenCancel?: boolean;
};

type TDialogContext = {
  showDialog: (dialog: TDialogContextShowDialog) => void;
};

const DialogContext = createContext<TDialogContext>({
  showDialog() {
    throw new Error('not ready');
  },
});

export const useDiaLog = () => useContext(DialogContext);

type Props = PropsWithChildren;

export const DialogProvider = ({ children }: Props) => {
  const [dialog, setDialog] = useState<TDialogContextShowDialog | undefined>();

  const showDialog = useCallback((newDialog: TDialogContextShowDialog) => {
    setDialog(newDialog);
  }, []);

  const resetDialog = useCallback(() => {
    setDialog(undefined);
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Modal
        title={
          <div className="border-b border-grayscale-border pb-12px">
            <h2 className="text-16px font-semibold">{dialog?.title}</h2>
          </div>
        }
        centered
        open={!!dialog}
        footer={[
          <div className="border-t border-grayscale-border">
            <div className="mt-16px">
              {!dialog?.hiddenCancel && (
                <Button className="rounded-full border-none bg-black-8" onClick={() => resetDialog()} key={'cancel'}>
                  Cancel
                </Button>
              )}
              <Button
                type="primary"
                className="rounded-full border bg-greens-normal"
                key={'delete'}
                onClick={() => {
                  dialog?.onOk();
                  resetDialog();
                }}>
                {dialog?.okTextSubmit || 'Delete'}
              </Button>
            </div>
          </div>,
        ]}>
        {dialog?.content}
      </Modal>
    </DialogContext.Provider>
  );
};
