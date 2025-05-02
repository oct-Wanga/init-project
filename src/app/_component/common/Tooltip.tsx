import React from 'react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import { Placement } from 'tippy.js';
import Button from '@_component/common/button/Button';
import Ellipsis from '@_component/common/Ellipsis';
import Icon from '@_component/Icon/Icon';
import { ProfilingAnswerDummy, ProfilingknowledgeDummy } from '@constants/Profiling';
import StylePercent from '@datalab/[id]/profile/[profileId]/_component/profiling/stepthree/styledone/StylePercent';
import Tippy from '@tippyjs/react';

import styles from './Tooltip.module.css';

const cx = classNames.bind(styles);

/**
 * Badge에서 사용되는 Tippy
 */

interface TooltipProps {
  label: string | React.ReactNode;
  theme?: { type: 'lg' | 'title' | 'file' | 'info' | 'ai'; title?: React.ReactNode };
  placement?: Placement;
  arrow?: boolean;
  rootClassName?: string;
  heightClassName?: string;
  childVarient?: 'gap' | 'bar';
  children: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  offset?: [number, number];
  onClick?: () => void;
}

// Tippy Header Type
function HeaderTippy({ label, theme }: Pick<TooltipProps, 'label' | 'theme'>) {
  return (
    <div className={cx('tippy-wrapper')}>
      <div className={cx('title')}>{theme?.title}</div>
      <div className={cx('description')}>{label}</div>
    </div>
  );
}

function ProfileStepThree({ label }: Pick<TooltipProps, 'label'>) {
  return (
    <div className={cx('file-wrap')}>
      <Icon.Asset type="pdf" size="w-20" />
      <span className={cx('label')}>
        <Ellipsis contentWidth={150} description={`${label}`} placement="top" />
      </span>
      <div className={cx('page-label')}>p.3</div>
    </div>
  );
}

function ProfileStepThreeInfoContent1() {
  return (
    <span className={cx('tooltip-content')}>
      두 답변은 담고 있는 정보는 비슷하지만, <span className={cx('strong')}>글을 쓰는 스타일</span>이 조금 달라요. 불렛
      리스트나 줄글과 같이, 서로 다른
      <span className={cx('strong')}> 표현 방식</span>에 주목하여 마음에 드는 답변을 선택해 주세요.
    </span>
  );
}

function ProfileStepThreeInfoContent2() {
  return (
    <span className={cx('tooltip-content')}>
      두 답변은 인용 문서에서 발췌한 핵심 내용 외에
      <span className={cx('strong')}>부연 설명을 얼마나 덧붙였는지에 따라</span> 내용이 조금 달라요.{' '}
      <span className={cx('strong')}>지식의 포괄성</span>을 기준으로, 더 마음에 드는 답변을 선택해 주세요.
    </span>
  );
}

export function ProfileStepThreeInfo({ onClick }: { onClick?: () => void }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('survey');

  return (
    <div className={cx('info-wrap')}>
      <div className={cx('header')}>
        <div className={cx('header-box')}>
          <div>
            <Icon.LightbulbDeep size="w-24" />
            <span className={cx('tip')}>Tip</span>
          </div>
          <Button size="full" variant="transparent" startIcon={<Icon.Cancel size="w-16" />} onClick={onClick}>
            닫기
          </Button>
        </div>
      </div>
      <div className={cx('content')}>
        {currentPage === '1' ? <ProfileStepThreeInfoContent1 /> : <ProfileStepThreeInfoContent2 />}
      </div>
    </div>
  );
}

export function AiAnalytics({ onClick }: { onClick?: () => void }) {
  return (
    <div className={cx('ai-wrap')}>
      <div className={cx('header')}>
        <div className={cx('header-box')}>
          <div>
            <Icon.ShinyBlack size="w-20" />
            <span className={cx('tip')}>AI Analytics</span>
          </div>
          <Button size="full" variant="transparent" startIcon={<Icon.Cancel size="w-16" />} onClick={onClick}>
            닫기
          </Button>
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('line')}>
          <StylePercent category="answer" percentInfoList={ProfilingAnswerDummy} />
        </div>
        <StylePercent category="knowledge" percentInfoList={ProfilingknowledgeDummy} />
      </div>
    </div>
  );
}

export default function Tooltip({
  label,
  placement = 'top',
  theme = { type: 'lg' },
  arrow = false,
  rootClassName,
  childVarient = 'gap',
  children,
  heightClassName,
  disabled = false,
  visible,
  offset,
  onClick,
}: TooltipProps) {
  const setTippy = () => {
    if (React.isValidElement(label)) return label;
    switch (theme.type) {
      case 'lg':
        return label;
      case 'title':
        return <HeaderTippy label={label} theme={theme} />;
      case 'file':
        return <ProfileStepThree label={label} />;
      case 'info':
        return <ProfileStepThreeInfo onClick={onClick} />;
      case 'ai':
        return <AiAnalytics onClick={onClick} />;
      default:
        return 'err';
    }
  };

  const className = cx('shadow', rootClassName, heightClassName);
  const childWrapperClassName = cx('content', childVarient);

  return (
    <Tippy
      content={setTippy()}
      arrow={arrow}
      placement={placement}
      theme={theme.type}
      offset={offset ?? [0, 8]}
      className={className}
      disabled={disabled}
      visible={visible}
      interactive
      appendTo={() => document.body}
    >
      <div className={childWrapperClassName}>{children}</div>
    </Tippy>
  );
}
