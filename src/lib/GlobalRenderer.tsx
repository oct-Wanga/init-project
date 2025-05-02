import ModalRenderer from '@_component/common/modal/ModalRenderer';
import ToastRenderer from '@_component/common/toast/ToastRenderer';

/**
 * Portal을 사용하여 렌더링하는 요소들의 집합
 */
export default function GlobalRenderer() {
  return (
    <>
      <ModalRenderer />
      <ToastRenderer />
      <div id="toast-root" />
      <div id="modal-root" />
    </>
  );
}
