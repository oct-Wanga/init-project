'use client';

import classNames from 'classnames/bind';
import IconButton from '@_component/common/button/IconButton';
import Modal from '@_component/common/modal/Modal';
import SVGIcon from '@_component/common/SVGIcon';
import useModalStore from '@store/useModalStore';

import styles from './CountrySelectModal.module.css';

const cx = classNames.bind(styles);

interface CountryInfo {
  name: string;
  imgSrc: string;
}

function HeaderContent() {
  const { onCloseModal } = useModalStore();

  const handleClickCancelButton = () => {
    onCloseModal();
  };

  return (
    <div className={cx('header-contents')}>
      <div className={cx('main-contents')}>
        <span className={cx('main-text')}>Title</span>
        <IconButton
          btnSize="w-24"
          variant="transparent"
          className={cx('cancel-icon')}
          icon={<SVGIcon name="icon-cancel" size={22} color="#4E5055" />}
          onClick={handleClickCancelButton}
        />
      </div>
      <div className={cx('sub-contents')}>
        <span className={cx('sub-text')}>Description</span>
      </div>
    </div>
  );
}

export default function CountrySelectModal() {
  return (
    <div className={cx('wrap')}>
      <Modal>
        <Modal.Header isShowLine padding="ptb-28" contents={<HeaderContent />} />
        <div className={cx('modal-body')}>
          <div>Test 1</div>
          <div>Test 2</div>
          <div>Test 3</div>
        </div>
        <Modal.Footer submitText="제출" onSubmit={() => {}} padding="ptb-32" />
      </Modal>
    </div>
  );
}
