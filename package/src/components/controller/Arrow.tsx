'use client';

import { NAME_SPACE } from '../../constants/core';
import { setViewDateByType } from '../../utils/datetime';

type TViewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewDate: string;
  direction: 'prev' | 'next';
  viewType: TViewType;
  setViewDate: (value: string) => void;
}

function ControllerArrow({
  viewDate,
  viewType,
  direction,
  setViewDate,
}: IProps) {
  const getViewDateUnit = (type: string): number => {
    if (type === 'year') return Number(viewDate.split('-')[0]);
    else if (type === 'month') return Number(viewDate.split('-')[1]);
    else return Number(viewDate.split('-')[2]);
  };

  const handleControl = (action: string) => {
    const isExtra = action.startsWith('extra');
    const unit = viewType === 'month' && !isExtra ? 'month' : 'year';

    const deltas: { [key: string]: number } = {
      month: 1,
      year: 1,
      decade: 10,
      century: 100,
    };

    let delta = deltas[viewType] as number;

    if (viewType !== 'month' && isExtra) {
      delta *= 10;
    }

    if (action === 'extraPrev' || action === 'prev') {
      delta *= -1;
    }

    setViewDate(
      setViewDateByType(viewDate, getViewDateUnit(unit) + delta, unit)
    );
  };

  return (
    <button
      type="button"
      className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-${direction}`}
      onClick={() => handleControl(direction)}
    >
      Next
    </button>
  );
}

export default ControllerArrow;
