import Button from "./myUiLibrary/Button";

const ConfirmationModal = ({
  show,
  title,
  close,
  confirm,
}: {
  show: boolean;
  title: string;
  close: () => void;
  confirm: () => void;
}) => {
  return (
    <div className="">
      {show && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={close}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray80 rounded shadow-lg p-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <div className="flex justify-end mt-4">
                <Button variant="text" onClick={close}>
                  Cancel
                </Button>
                <Button
                  variant="text"
                  wrapperClassName="text-red-500"
                  onClick={confirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmationModal;
