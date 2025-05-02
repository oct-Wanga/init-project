'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import Button from '@_component/common/button/Button';
import IconButton from '@_component/common/button/IconButton';
import Icon from '@_component/Icon/Icon';
import { isNumeric } from '@lib/RegExp';

import styles from './Pagination.module.css';

const cx = classNames.bind(styles);
const TEST_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface ArrowButtonProps {
  position: 'left' | 'right'; // 화살표 방향
}

function DisabledDoubleButton(props: ArrowButtonProps) {
  const { position } = props;

  return (
    <div className={cx('icon-btn-wrapper', 'disabled', { right: position === 'right' })}>
      <IconButton size="w-32" variant="tertiary" disabled>
        <Icon.DoubleArrowGray size="w-32" />
      </IconButton>
    </div>
  );
}

function DisabledButton(props: ArrowButtonProps) {
  const { position } = props;

  return (
    <div className={cx('icon-btn-wrapper', 'disabled', { right: position === 'right' })}>
      <IconButton size="w-32" variant="tertiary" disabled>
        <Icon.ArrowGray size="w-32" />
      </IconButton>
    </div>
  );
}

function ActiveButton(props: ArrowButtonProps) {
  const { position } = props;

  return (
    <div className={cx('icon-btn-wrapper', { left: position === 'left' })}>
      <IconButton size="w-32" variant="tertiary">
        <Icon.ArrowBlack size="w-32" />
      </IconButton>
    </div>
  );
}

function ActiveDoubleButton(props: ArrowButtonProps) {
  const { position } = props;

  return (
    <div className={cx('icon-btn-wrapper', { left: position === 'left' })}>
      <IconButton size="w-32" variant="tertiary">
        <Icon.DoubleArrowBlack size="w-32" />
      </IconButton>
    </div>
  );
}

export default function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');

  // const calcDisabledButton = () => {
  //   //   TODO: DisabledButton 과 ActiveButton 사용할 조건 명시
  // };

  const handlerRoutePage = (page: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set('page', `${page}`);
    router.push(`?${decodeURIComponent(current.toString())}`, {
      scroll: false,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <DisabledButton position="left" />
      <DisabledDoubleButton position="left" />
      <ActiveButton position="left" />
      <ActiveDoubleButton position="left" />
      {TEST_LIST.map((value, index) => (
        <div
          className={cx('icon-btn-wrapper', {
            'pagination-selected': value === (isNumeric(currentPage ?? '1') ? Number(currentPage ?? '1') : 1),
          })}
          key={value + index}
        >
          <Button
            key={value}
            variant="tertiary"
            size="medium"
            onClick={() => {
              handlerRoutePage(value);
            }}
          >
            {value}
          </Button>
        </div>
      ))}
      <DisabledButton position="right" />
      <DisabledDoubleButton position="right" />
      <ActiveButton position="right" />
      <ActiveDoubleButton position="right" />
    </div>
  );
}
