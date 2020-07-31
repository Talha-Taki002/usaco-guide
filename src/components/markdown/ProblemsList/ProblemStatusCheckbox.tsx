import * as React from 'react';
import Tooltip from '../../Tooltip/Tooltip';
import { Problem } from '../../../models/problem';
import { useContext } from 'react';
import UserDataContext from '../../../context/UserDataContext';
import {
  NEXT_PROBLEM_STATUS,
  PREV_PROBLEM_STATUS,
  ProblemProgress,
} from '../../../models/problem';

export default function ProblemStatusCheckbox({
  problem,
  size = 'small',
}: {
  problem: Problem;
  size?: 'small' | 'large';
}) {
  const { userProgressOnProblems, setUserProgressOnProblems } = useContext(
    UserDataContext
  );
  let status: ProblemProgress =
    userProgressOnProblems[problem.uniqueID] || 'Not Attempted';
  const color: { [key in ProblemProgress]: string } = {
    'Not Attempted': 'bg-gray-200',
    Solving: 'bg-yellow-300',
    Solved: 'bg-green-500',
    Ignored: 'bg-red-100',
    Skipped: 'bg-blue-300',
  };
  const handleClick = () => {
    setUserProgressOnProblems(problem, NEXT_PROBLEM_STATUS[status]);
  };
  const handleRightClick = e => {
    e.preventDefault();
    setUserProgressOnProblems(problem, PREV_PROBLEM_STATUS[status]);
  };
  return (
    <Tooltip
      content={status}
      hideOnClick={false}
      type="compact"
      position="left"
    >
      <span
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={`inline-block ${size === 'small' ? 'h-6 w-6' : 'h-8 w-8'}`}
      >
        <span
          className={
            `inline-block ${
              size === 'small' ? 'h-6 w-6' : 'h-8 w-8'
            } rounded-full cursor-pointer transition duration-100 ease-out ` +
            color[status]
          }
        />
      </span>
    </Tooltip>
  );
}
